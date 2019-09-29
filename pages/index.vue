<template>
  <v-layout justify-center row wrap>
    <v-flex
      v-for="option in options"
      :key="option.title"
      xs12
      sm8
      md6
      lg4
      xl3
      class="card my-3"
    >
      <PlanCard
        :title="option.title"
        :points="option.points"
        :description="option.description"
        :image="option.image"
      />
    </v-flex>
    <v-flex xs12>
      <div class="text-xs-center mt-1">
        <v-btn color="red lighten-1" depressed dark @click="goToTimeline">
          Go To Plan
        </v-btn>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import PlanCard from '~/components/index/PlanCard'

export default {
  components: {
    PlanCard
  },
  data() {
    return {
      options: {
        profileSync: {
          title: 'Profile Sync',
          points: '100',
          description:
            'Update your profile or sync it with existing social media platform. This data will help us know more about your experience. You will enter it once here and it will sync across all the social media if you need it to. Your competency profile will include all your background information and recommendation on jobs that fit you.',
          image: '/index/fb-linkedin.svg'
        },
        personality: {
          title: 'Personality',
          points: '100',
          description:
            'You can apply for different psychometric testing that would identify your career interest very accurately. Tests available are Briggs Type Indicator (MBTI), Briggs-Myers Type Indicator, Keirsey Tremperament Sorter and Career Development Inventory.',
          image: '/index/cycle.svg'
        },
        learningGoals: {
          title: 'Learning Goals',
          points: '100',
          description:
            'Identify your learning goals for the next 3 to 5 years. Be unique, create your own or use from existing library of goals',
          image: '/index/learning-goals.svg'
        }
      }
    }
  },
  methods: {
    goToTimeline() {
      this.$router.push('/plans/timeline')
    }
  }
}
</script>

<style scoped>
.card {
  padding: 15px;
}
.centered-button {
  display: flex;
  justify-content: center;
}
</style>
