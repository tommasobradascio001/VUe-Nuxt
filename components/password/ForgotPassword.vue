<template>
  <v-flex
    text-xs-center
    xs12
    sm9
    md6
    lg5
    xl5
    class="forgot-password"
  >
    <v-card class="rounded-card">
      <img
        src="~/assets/images/circles.png"
        height="80"
        width="120"
        align="right"
      >
      <template>
        <div class="pa-5">
          <v-layout row wrap class="pb-3 main-buttons">
            <v-btn
              small
              round
              depressed
              :color="loginButtonProperties.buttonColor"
              :style="`color:${loginButtonProperties.textColor}`"
              :flat="loginButtonProperties.flat"
              @click="showLoginForm"
            >
              Login
            </v-btn>
            <v-btn
              small
              round
              depressed
              :color="forgotPasswordButtonProperties.buttonColor"
              :style="`color:${forgotPasswordButtonProperties.textColor}`"
              :flat="forgotPasswordButtonProperties.flat"
            >
              Forgot Password
            </v-btn>
          </v-layout>
          <form @submit.prevent="resetPassword">
            <p>
              You informed us that you forgot your password.
              If you really did, tell us your email and we will send you a password
              reset form.
            </p>
            <v-text-field
              v-model="email"
              :error-messages="emailErrors"
              label="E-mail"
              required
              @input="$v.email.$touch()"
              @blur="$v.email.$touch()"
            />
            <v-btn
              round
              block
              color="red"
              style="color:white"
              :disabled="resetDisabled"
              @click="resetPassword"
            >
              Reset My Password
            </v-btn>
            <p>
              If you didn't mean to reset your password then you can just
              click on login button above and proceed normally to login.
            </p>
          </form>
        </div>
      </template>
    </v-card>
  </v-flex>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'

export default {
  validations: {
    email: { required, email }
  },

  data() {
    return {
      email: '',
      redirectPath: 'http://localhost:3000/password/reset_password',
      loginForm: false,
      forgotPasswordForm: true
      // rememberMe: false
    }
  },
  computed: {
    loginButtonProperties() {
      if (this.loginForm) {
        return {
          buttonColor: 'orange lighten-2',
          textColor: 'white',
          flat: false
        }
      } else {
        return {
          buttonColor: 'grey darken-1',
          textColor: 'grey darken-1',
          flat: true
        }
      }
    },
    forgotPasswordButtonProperties() {
      if (this.forgotPasswordForm) {
        return {
          buttonColor: 'orange lighten-2',
          textColor: 'white',
          flat: false
        }
      } else {
        return {
          buttonColor: 'grey darken-1',
          textColor: 'grey darken-1',
          flat: true
        }
      }
    },
    emailErrors() {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('Must be valid e-mail')
      !this.$v.email.required && errors.push('E-mail is required')
      return errors
    },
    resetDisabled() {
      if (this.$v.email.$anyError || !this.$v.email.$anyDirty) {
        return true
      }
      return false
    }
  },
  methods: {
    showLoginForm() {
      this.$emit('showLoginForm')
    },
    resetPassword() {
      this.$emit('confirmPasswordReset', this.email, this.redirectPath)
    }
  }
}
</script>

<style scoped>
.main-buttons {
  margin-left: -30px;
}
.forgot-password {
  margin: 0 auto;
}
.rounded-card {
  border-radius: 15px;
}
p {
  margin-top: 20px;
  text-align: left !important;
  color: dimgrey;
}
</style>
