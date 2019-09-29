<template>
  <v-layout justify-center row wrap>
    <v-flex
      v-for="event in events"
      :key="event.id"
      xs12
      sm8
      md6
      lg4
      xl3
      class="card my-3"
    >
      <CourseCard
        :id="event.id"
        type="event"
        :title="event.name"
        :description="event.description"
        :image="event.image_url"
      />
    </v-flex>
  </v-layout>
</template>

<script>
import CourseCard from '~/components/plan/CourseCard'

export default {
  components: {
    CourseCard
  },
  data() {
    return {
      events: []
    }
  },
  mounted() {
    this.$axios
      .get('/events')
      .then(response => {
        if (response.status === 200) {
          this.events = response.data
        }
      })
      .catch(() => {
        this.snackbar.error('Error while fetching events')
      })
  }
}
</script>

<style scoped>
.card {
  padding: 15px;
}
</style>
