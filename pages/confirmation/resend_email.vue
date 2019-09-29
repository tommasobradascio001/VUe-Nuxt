<template>
  <v-layout>
    <ResendEmail
      :confirmation-method="confirmationMethod"
      :post-params="postParams"
      @resendEmail="resendEmail"
    />
  </v-layout>
</template>

<script>
import ResendEmail from '~/components/confirmation/ResendEmail'

export default {
  auth: false,

  components: {
    ResendEmail
  },
  data() {
    return {
      confirmationMethod: this.$route.query.confirmationMethod,
      postParams: this.$route.query.postParams
    }
  },
  methods: {
    resendEmail(apiEndpoint, postData) {
      this.$axios
        .post(apiEndpoint, postData)
        .then(response => {
          if (response.status === 200) {
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
