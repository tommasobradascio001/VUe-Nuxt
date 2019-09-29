<template>
  <v-layout>
    <ResetPassword
      @resetPassword="resetPassword"
    />
  </v-layout>
</template>

<script>
import ResetPassword from '~/components/password/ResetPassword'

export default {
  auth: false,

  components: {
    ResetPassword
  },
  data() {
    return {}
  },
  methods: {
    resetPassword(newPassword, newPasswordConfirmation) {
      const putData = {
        password: newPassword,
        password_confirmation: newPasswordConfirmation,
        uid: this.$route.query.uid,
        client: this.$route.query.client,
        'access-token': this.$route.query['access-token']
      }
      this.$axios
        .put('/auth/password', putData)
        .then(response => {
          if (response.status === 200) {
            this.snackbar.success('Password updated successfully')
            this.$router.push('/login')
          }
        })
        .catch(() => {
          this.snackbar.error('Something wrong happened')
        })
    }
  }
}
</script>
