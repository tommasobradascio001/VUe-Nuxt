import Vue from 'vue'
const _ = require('lodash')

const snackbarPayload = {
  show: true,
  message: '',
  color: ''
}

Vue.mixin({
  computed: {
    _() {
      return _
    },
    snackbar() {
      const vue = this
      return {
        info(message) {
          snackbarPayload.message = message
          snackbarPayload.color = 'blue'
          vue.$store.commit('snackbar/set', snackbarPayload)
        },
        success(message) {
          snackbarPayload.message = message
          snackbarPayload.color = 'green'
          vue.$store.commit('snackbar/set', snackbarPayload)
        },
        error(message) {
          snackbarPayload.message = message
          snackbarPayload.color = 'red'
          vue.$store.commit('snackbar/set', snackbarPayload)
        },
        custom(message, color) {
          snackbarPayload.message = message
          snackbarPayload.color = color
          vue.$store.commit('snackbar/set', snackbarPayload)
        }
      }
    }
  },
  methods: {
    currentUser() {
      return this.$auth.$state.user.data
    }
  }
})
