<template>
  <v-layout>
    <ForgotPassword
      @showLoginForm="showLoginForm"
      @confirmPasswordReset="confirmPasswordReset"
    />
  </v-layout>
</template>

<script>
import ForgotPassword from '~/components/password/ForgotPassword'

export default {
  auth: false,

  components: {
    ForgotPassword
  },
  data() {
    return {}
  },
  methods: {
    showLoginForm() {
      this.$router.push('/login')
    },
    confirmPasswordReset(email, path) {
      const postData = {
        email: email,
        redirect_url: path
      }
      this.$axios
        .post('/auth/password', postData)
        .then(response => {
          if (response.status === 200) {
            this.$router.push({
              path: '/confirmation/resend_email',
              query: {
                confirmationMethod: 'password_reset',
                postParams: postData
              }
            })
            this.snackbar.info('Check your Email for confirmation')
          }
        })
        .catch(() => {
          this.snackbar.error('Something wrong happened')
        })
    }
  }
}
</script>
