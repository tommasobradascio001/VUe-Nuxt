<template>
  <v-snackbar
    v-model="show"
    :bottom="true"
    :timeout="timeout"
    :color="color"
  >
    {{ message }}
    <v-btn
      color="white"
      flat
      @click="show = false"
    >
      Close
    </v-btn>
  </v-snackbar>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      color: '',
      timeout: 4000,
      message: ''
    }
  },
  created() {
    this.$store.watch(
      state => state.snackbar.show,
      () => {
        const show = this.$store.state.snackbar.show
        if (show !== false) {
          this.message = this.$store.state.snackbar.message
          this.color = this.$store.state.snackbar.color
          this.show = true
          this.$store.commit('snackbar/set', {
            show: false,
            message: '',
            color: ''
          })
        }
      }
    )
  }
}
</script>
