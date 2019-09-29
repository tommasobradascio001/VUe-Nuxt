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
        :title="course.name"
        :description="course.description"
        :image="course.image"
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
      courses: [
        {
          name: 'Interaction Design',
          description:
            'The MSI program is highly interdisciplinary, featuring faculty from a wide range of academic fields. It draws students from diverse undergraduate majors, ranging from the arts and humanities to science and engineering.',
          image: '/plan/michigan.png'
        },
        {
          name: 'Interaction Design',
          description:
            'The MSI program is highly interdisciplinary, featuring faculty from a wide range of academic fields. It draws students from diverse undergraduate majors, ranging from the arts and humanities to science and engineering.',
          image: '/plan/michigan.png'
        },
        {
          name: 'Interaction Design',
          description:
            'The MSI program is highly interdisciplinary, featuring faculty from a wide range of academic fields. It draws students from diverse undergraduate majors, ranging from the arts and humanities to science and engineering.',
          image: '/plan/michigan.png'
        },
        {
          name: 'Interaction Design',
          description:
            'The MSI program is highly interdisciplinary, featuring faculty from a wide range of academic fields. It draws students from diverse undergraduate majors, ranging from the arts and humanities to science and engineering.',
          image: '/plan/michigan.png'
        }
      ]
    }
  }
}
</script>

<style scoped>
.card {
  padding: 15px;
}
</style>
