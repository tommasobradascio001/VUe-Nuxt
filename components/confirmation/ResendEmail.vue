<template>
  <v-flex
    text-xs-center
    xs10
    sm6
    md6
    lg5
    xl5
    class="centered"
  >
    <v-card class="rounded-card">
      <img
        src="~/assets/images/circles.png"
        height="80"
        width="120"
        align="right"
      >
      <div class="pa-5">
        <div>
          <p class="header-text">
            Confirm Your Email
          </p>
        </div>
        <p>
          We have sent you an Email to confirm your account.
          Before proceeding, go to your email and click confirm your email to
          have your account activated
        </p>
        <v-btn
          round
          block
          color="red"
          style="color:white"
          @click="resendEmail"
        >
          Resend Email
        </v-btn>
      </div>
    </v-card>
  </v-flex>
</template>

<script>
export default {
  props: ['confirmationMethod', 'postParams'],
  data() {
    return {}
  },
  computed: {
    apiEndpoint() {
      if (this.confirmationMethod === 'signup') {
        return '/auth/resend_email_confirmation'
      } else {
        return '/auth/password'
      }
    },
    postData() {
      if (this.confirmationMethod === 'signup') {
        return {
          email: this.postParams.email,
          password: this.postParams.password,
          password_confirmation: this.postParams.password_confirmation,
          first_name: this.postParams.first_name,
          last_name: this.postParams.last_name,
          phone: this.postParams.phone
        }
      } else {
        return {
          email: this.postParams.email,
          redirect_url: this.postParams.redirect_url
        }
      }
    }
  },
  methods: {
    resendEmail() {
      this.$emit('resendEmail', this.apiEndpoint, this.postData)
    }
  }
}
</script>

<style scoped>
.centered {
  margin: 0 auto;
}
.rounded-card {
  border-radius: 15px;
}
p {
  margin-top: 20px;
  margin-bottom: 50px;
  text-align: left !important;
  color: dimgrey;
}
.header-text {
  font-size: 1.2em;
}
</style>
