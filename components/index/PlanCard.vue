<template>
  <v-card class="rounded-plan-card">
    <div class="plan-card-container">
      <img
        src="~/assets/images/index/header.svg"
        class="responsive-image"
      >
      <div class="left-plan-text">
        {{ title }}
      </div>
      <div class="right-plan-text">
        {{ points }} Points
      </div>
    </div>
    <v-card-title>
      <div class="pa-3 centered-image image-box d-flex align-items-center">
        <img
          :src="image"
          align="center"
          class="responsive-image"
        >
      </div>
    </v-card-title>
    <div class="pa-3 description-box">
      {{ description }}
    </div>
    <v-card-actions class="pa-4">
      <v-btn color="red lighten-1" depressed round block dark>
        Start
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: ['title', 'points', 'description', 'image'],
  data() {
    return {}
  }
}
</script>

<style scoped>
@media all and (max-width: 960px) {
  .rounded-plan-card {
    border-radius: 50px;
  }
}
@media all and (min-width: 960px) {
  .rounded-plan-card {
    border-radius: 30px;
  }
}
.image-box {
  height: 150px;
}
.description-box {
  height: 160px;
  color: dimgrey;
}
</style>
