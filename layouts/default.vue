<template>
  <v-app class="white">
    <Toolbar />
    <Snackbar />

    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Toolbar from '~/components/generic/Toolbar.vue'
import Snackbar from '~/components/generic/Snackbar.vue'

export default {
  components: {
    Toolbar,
    Snackbar
  },
  data() {
    return {}
  }
}
</script>
