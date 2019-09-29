<template>
  <v-layout justify-center row wrap>
    <v-flex
      v-for="course in courses"
      :key="course.id"
      xs12
      sm8
      md6
      lg4
      xl3
      class="card my-3"
    >
      <CourseCard
        :id="course.id"
        type="course"
        :title="course.name"
        :description="course.description"
        :image="course.image_url"
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
      courses: []
    }
  },
  mounted() {
    this.$axios
      .get('/courses')
      .then(response => {
        if (response.status === 200) {
          this.courses = response.data
        }
      })
      .catch(() => {
        this.snackbar.error('Error while fetching courses')
      })
  }
}
</script>

<style scoped>
.card {
  padding: 15px;
}
</style>
