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
    </div>
    <div class="centered-image image-box d-flex align-items-center">
      <img
        :src="image"
        align="center"
        class="responsive-image"
      >
    </div>
    <div class="pa-3 description-box">
      {{ description }}
    </div>
    <v-card-actions class="pa-4">
      <v-flex text-xs-left>
        <v-btn color="red lighten-1" flat class="underline-btn">
          Learn More
        </v-btn>
      </v-flex>
      <v-flex text-xs-right pr-2>
        <v-btn
          v-show="type"
          color="red lighten-1"
          flat
          @click="enroll"
        >
          Enroll
          <v-icon>keyboard_arrow_right</v-icon>
        </v-btn>
      </v-flex>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: ['type', 'id', 'title', 'description', 'image'],
  data() {
    return {
      payload: {},
      endpoint: ''
    }
  },
  methods: {
    getPayload() {
      if (this.type === 'event') {
        this.endpoint = '/user_events'
        return {
          user_event: {
            event_id: this.id
          }
        }
      } else if (this.type === 'course') {
        this.endpoint = '/user_courses'
        return {
          user_course: {
            course_id: this.id
          }
        }
      } else {
        alert('YOU ARE IN DEEP SHIT.')
      }
    },
    enroll() {
      const payload = this.getPayload()
      this.$axios
        .post(this.endpoint, payload)
        .then(response => {
          this.snackbar.success(
            `Enrolled in ${this.title} ${this.type} successfully`
          )
        })
        .catch(err => {
          console.log(err)
          this.snackbar.error('Oops something wrong happened !')
        })
    }
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
  height: 120px;
}
.description-box {
  color: dimgrey;
}
</style>
