<template>
  <v-flex
    text-xs-center
    xs12
    sm8
    md6
    lg4
    xl3
    class="login"
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
          <v-layout row wrap class="pb-3">
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
              :color="signUpButtonProperties.buttonColor"
              :style="`color:${signUpButtonProperties.textColor}`"
              :flat="signUpButtonProperties.flat"
              @click="showSignUpForm"
            >
              Sign Up
            </v-btn>
          </v-layout>
          <form v-if="loginForm" @submit.prevent="login">
            <v-text-field
              v-model="loginParams.email"
              :error-messages="loginEmailErrors"
              label="E-mail"
              required
              @input="$v.loginParams.email.$touch()"
              @blur="$v.loginParams.email.$touch()"
            />
            <v-text-field
              v-model="loginParams.password"
              type="password"
              :error-messages="loginPasswordErrors"
              label="Password"
              required
              @input="$v.loginParams.password.$touch()"
              @blur="$v.loginParams.password.$touch()"
            />
            <!-- <v-flex xs12 sm6>
              <v-checkbox
                v-model="rememberMe"
                label="Remember Me"
              />
            </v-flex> -->
            <v-btn
              flat
              round
              color="grey darken-1"
              @click="forgotPassword"
            >
              Forgot Password?
            </v-btn>

            <v-btn
              round
              block
              color="red"
              style="color:white"
              :disabled="loginDisabled"
              @click="login"
            >
              Login
            </v-btn>
            <div class="surround-hr">
              <b class="section-title">
                or
              </b>
            </div>
            <v-btn
              flat
              class="custom-btn"
              :href="linkedInUrl"
            >
              <v-avatar size="40px">
                <img
                  src="~/assets/images/linkedin.svg"
                >
              </v-avatar>
              <div class="px-3">
                Login with LinkedIn
              </div>
            </v-btn>
          </form>

          <form v-else @submit.prevent="login">
            <v-text-field
              v-model="signUpParams.firstName"
              label="First Name"
              required
              :error-messages="firstNameErrors"
              @input="$v.signUpParams.firstName.$touch()"
              @blur="$v.signUpParams.firstName.$touch()"
            />
            <v-text-field
              v-model="signUpParams.lastName"
              label="Last Name"
              required
              :error-messages="lastNameErrors"
              @input="$v.signUpParams.lastName.$touch()"
              @blur="$v.signUpParams.lastName.$touch()"
            />
            <v-text-field
              v-model="signUpParams.phoneNumber"
              label="Phone Number"
              required
              type="number"
              :error-messages="phoneNumberErrors"
              @input="$v.signUpParams.phoneNumber.$touch()"
              @blur="$v.signUpParams.phoneNumber.$touch()"
            />
            <v-text-field
              v-model="signUpParams.email"
              :error-messages="signUpEmailErrors"
              label="E-mail"
              required
              @input="$v.signUpParams.email.$touch()"
              @blur="$v.signUpParams.email.$touch()"
            />
            <v-text-field
              v-model="signUpParams.password"
              type="password"
              :error-messages="signUpPasswordErrors"
              label="Password"
              required
              @input="$v.signUpParams.password.$touch()"
              @blur="$v.signUpParams.password.$touch()"
            />
            <v-text-field
              v-model="signUpParams.confirmedPassword"
              type="password"
              :error-messages="confirmedPasswordErrors"
              label="Confirm Password"
              required
              @input="$v.signUpParams.confirmedPassword.$touch()"
              @blur="$v.signUpParams.confirmedPassword.$touch()"
            />
            <v-flex xs12 sm12>
              <v-checkbox
                v-model="signUpParams.termsAccepted"
                label="I accept Terms and Conditions"
                :error-messages="termsAndConditionsErrors"
                required
                @change="$v.signUpParams.termsAccepted.$touch()"
              />
            </v-flex>
            <v-flex xs12 sm12 text-xs-left pb-3>
              <a class="terms" href="">
                View Terms & Conditions
              </a>
            </v-flex>
            <v-btn
              round
              block
              color="red"
              style="color:white"
              :disabled="signUpDisabled"
              @click="signUp"
            >
              Sign Up
            </v-btn>
          </form>
        </div>
      </template>
    </v-card>
  </v-flex>
</template>

<script>
import { required, email, sameAs, minLength } from 'vuelidate/lib/validators'
import { passwordFormat } from '~/plugins/customValidators'

export default {
  validations: {
    loginParams: {
      email: { required, email },
      password: { required }
    },
    signUpParams: {
      firstName: { required },
      lastName: { required },
      phoneNumber: { required },
      password: { required, passwordFormat, minLength: minLength(8) },
      confirmedPassword: { required, sameAsPassword: sameAs('password') },
      email: { required, email },
      termsAccepted: { checked: sameAs(() => true) }
    }
  },

  data() {
    return {
      loginParams: {
        email: '',
        password: ''
      },
      signUpParams: {
        firstName: '',
        LastName: '',
        phoneNumber: '',
        email: '',
        password: '',
        confirmedPassword: '',
        termsAccepted: false
      },
      loginForm: true,
      signUpForm: false,
      linkedInUrl: this.$axios.defaults.baseURL + '/auth/linkedin'
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
    signUpButtonProperties() {
      if (this.signUpForm) {
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
    firstNameErrors() {
      const errors = []
      if (!this.$v.signUpParams.firstName.$dirty) return errors
      !this.$v.signUpParams.firstName.required &&
        errors.push('First name is required.')
      return errors
    },
    lastNameErrors() {
      const errors = []
      if (!this.$v.signUpParams.lastName.$dirty) return errors
      !this.$v.signUpParams.lastName.required &&
        errors.push('Last name is required.')
      return errors
    },
    phoneNumberErrors() {
      const errors = []
      if (!this.$v.signUpParams.phoneNumber.$dirty) return errors
      !this.$v.signUpParams.phoneNumber.required &&
        errors.push('Phone number is required.')
      return errors
    },
    loginPasswordErrors() {
      const errors = []
      if (!this.$v.loginParams.password.$dirty) return errors
      !this.$v.loginParams.password.required &&
        errors.push('Password is required.')
      return errors
    },
    signUpPasswordErrors() {
      const errors = []
      if (!this.$v.signUpParams.password.$dirty) return errors
      !this.$v.signUpParams.password.required &&
        errors.push('Password is required.')
      !this.$v.signUpParams.password.minLength &&
        errors.push('Password must be at least 8 characters.')
      !this.$v.signUpParams.password.passwordFormat &&
        errors.push(
          'Password must contain at least 1 lower case letter, 1 upper case letter, 1 number, and 1 special character'
        )
      return errors
    },
    confirmedPasswordErrors() {
      const errors = []
      if (!this.$v.signUpParams.confirmedPassword.$dirty) return errors
      !this.$v.signUpParams.confirmedPassword.required &&
        errors.push('You must confirm your password.')
      !this.$v.signUpParams.confirmedPassword.sameAsPassword &&
        errors.push('Passwords do not match.')
      return errors
    },
    loginEmailErrors() {
      const errors = []
      if (!this.$v.loginParams.email.$dirty) return errors
      !this.$v.loginParams.email.email && errors.push('Must be valid e-mail')
      !this.$v.loginParams.email.required && errors.push('E-mail is required')
      return errors
    },
    signUpEmailErrors() {
      const errors = []
      if (!this.$v.signUpParams.email.$dirty) return errors
      !this.$v.signUpParams.email.email && errors.push('Must be valid e-mail')
      !this.$v.signUpParams.email.required && errors.push('E-mail is required')
      return errors
    },
    termsAndConditionsErrors() {
      const errors = []
      if (!this.$v.signUpParams.termsAccepted.$dirty) return errors
      !this.$v.signUpParams.termsAccepted.checked &&
        errors.push('You must agree to terms & conditions')
      return errors
    },
    loginDisabled() {
      if (this.$v.loginParams.$anyError || !this.$v.loginParams.$anyDirty) {
        return true
      }
      return false
    },
    signUpDisabled() {
      if (
        this.$v.signUpParams.$anyError ||
        !this.$v.signUpParams.$anyDirty ||
        !this.signUpParams.termsAccepted
      ) {
        return true
      }
      return false
    }
  },
  mounted() {
    if (process.env.NODE_ENV === 'development') {
      this.loginParams.email = 'ahmed@test.com'
      this.loginParams.password = '12345678aA!'
    }
  },
  methods: {
    login() {
      this.$emit('login', this.loginParams)
    },
    signUp() {
      this.$emit('signUp', this.signUpParams)
    },
    showLoginForm() {
      this.signUpForm = false
      this.loginForm = true
    },
    showSignUpForm() {
      this.loginForm = false
      this.signUpForm = true
    },
    forgotPassword() {
      this.$emit('showForgotPasswordForm')
    }
  }
}
</script>

<style scoped>
.login {
  margin: 0 auto;
}
.terms {
  font-size: 12px;
}
.rounded-card {
  border-radius: 15px;
}
.surround-hr {
  width: 100%;
  height: 12px;
  border-bottom: 1px solid #bdbdbd;
  text-align: center;
  margin-bottom: 40px;
  margin-top: 40px;
}
.section-title {
  color: grey;
  font-size: 15px;
  background-color: white;
  padding: 0 10px;
}
.custom-btn::before {
  color: transparent;
}
.custom-btn:hover {
  color: navy;
}
</style>
