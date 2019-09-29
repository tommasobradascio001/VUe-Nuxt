<template>
  <v-flex
    text-xs-center
    xs12
    sm8
    md6
    lg4
    xl3
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
          <v-layout row wrap class="pb-3 main-button">
            <v-btn
              small
              round
              depressed
              color="orange lighten-2"
              style="color:white"
            >
              Forgot Password
            </v-btn>
          </v-layout>
          <form @submit.prevent="resetPassword">
            <p>
              You need to reset your password by entering your new
              password here.
            </p>
            <v-text-field
              v-model="newPassword"
              type="password"
              :error-messages="newPasswordErrors"
              label="Password"
              required
              @input="$v.newPassword.$touch()"
              @blur="$v.newPassword.$touch()"
            />
            <v-text-field
              v-model="newPasswordConfirmation"
              type="password"
              :error-messages="newPasswordConfirmationErrors"
              label="Confirm Password"
              required
              @input="$v.newPasswordConfirmation.$touch()"
              @blur="$v.newPasswordConfirmation.$touch()"
            />
            <v-btn
              round
              block
              color="red"
              style="color:white"
              :disabled="resetDisabled"
              @click="resetPassword"
            >
              Set My Password
            </v-btn>
          </form>
        </div>
      </template>
    </v-card>
  </v-flex>
</template>

<script>
import { required, sameAs, minLength } from 'vuelidate/lib/validators'
import { passwordFormat } from '~/plugins/customValidators'

export default {
  validations: {
    newPassword: { required, minLength: minLength(8), passwordFormat },
    newPasswordConfirmation: {
      required,
      sameAsNewPassword: sameAs('newPassword')
    }
  },
  data() {
    return {
      newPassword: '',
      newPasswordConfirmation: ''
    }
  },
  computed: {
    newPasswordErrors() {
      const errors = []
      if (!this.$v.newPassword.$dirty) return errors
      !this.$v.newPassword.required && errors.push('Password is required.')
      !this.$v.newPassword.minLength &&
        errors.push('Password must be at least 8 characters.')
      !this.$v.newPassword.passwordFormat &&
        errors.push(
          'Password must contain at least 1 lower case letter, 1 upper case letter, 1 number, and 1 special character'
        )
      return errors
    },
    newPasswordConfirmationErrors() {
      const errors = []
      if (!this.$v.newPasswordConfirmation.$dirty) return errors
      !this.$v.newPasswordConfirmation.required &&
        errors.push('You must confirm your password.')
      !this.$v.newPasswordConfirmation.sameAsNewPassword &&
        errors.push('Passwords do not match.')
      return errors
    },
    resetDisabled() {
      if (
        this.$v.newPasswordConfirmation.$anyError ||
        !this.$v.newPasswordConfirmation.$anyDirty
      ) {
        return true
      }
      return false
    }
  },
  methods: {
    resetPassword() {
      this.$emit(
        'resetPassword',
        this.newPassword,
        this.newPasswordConfirmation
      )
    }
  }
}
</script>

<style scoped>
.main-button {
  margin-left: -10px;
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
