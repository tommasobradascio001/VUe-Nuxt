<template>
  <v-layout>
    <Credentials
      v-if="loginForm"
      @login="login"
      @signUp="signUp"
      @showForgotPasswordForm="showForgotPasswordForm"
    />
  </v-layout>
</template>

<script>
import Credentials from '~/components/Credentials.vue'

export default {
  components: {
    Credentials
  },
  data() {
    return {
      dialog: false,
      loginForm: true,
      forgotPasswordForm: false
    }
  },
  mounted() {
    if (this.$route.query.token) {
      this.$auth.setToken('local', this.$route.query.token)
      this.$route.query.token = false
      this.$router.go()
    }
  },
  methods: {
    async login(loginParams) {
      try {
        await this.$auth.login({
          data: {
            email: loginParams.email,
            password: loginParams.password
          }
        })
        await this.$auth.fetchUser()
        this.snackbar.success('Welcome Back :)')
      } catch (error) {
        if (error.response && error.response.status === 401) {
          this.snackbar.error('Wrong email or password.')
        } else {
          this.snackbar.error('Error while authenticating')
        }
      }
    },
    signUp(signUpParams) {
      const postData = {
        email: signUpParams.email,
        password: signUpParams.password,
        password_confirmation: signUpParams.confirmedPassword,
        first_name: signUpParams.firstName,
        last_name: signUpParams.lastName,
        phone: signUpParams.phoneNumber
      }
      this.$axios
        .post('/auth', postData)
        .then(response => {
          if (response.status === 200) {
            this.$router.push({
              path: '/confirmation/resend_email',
              query: {
                confirmationMethod: 'signup',
                postParams: postData
              }
            })
            this.snackbar.info('Check your Email for confirmation')
          }
        })
        .catch(() => {
          this.snackbar.error('Error while authenticating')
        })
    },
    showLoginForm() {
      this.forgotPasswordForm = false
      this.loginForm = true
    },
    showForgotPasswordForm() {
      this.$router.push('/password/forgot_password')
    }
  }
}
</script>
