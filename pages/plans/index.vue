<template>
  <div>
    <!-- <v-toolbar
      dark
      color="red lighten-2"
    > -->
    <!-- <v-toolbar-title>Search Courses:</v-toolbar-title>
      <v-autocomplete
        v-model="select"
        :loading="loading"
        :items="items"
        :search-input.sync="search"
        cache-items
        class="mx-3"
        flat
        hide-no-data
        hide-details
        label="Enter the name of the course you wish to search for"
        solo-inverted
      /> -->
    <v-tabs
      v-model="activeTab"
      fixed-tabs
      active-class="red white--text"
      color="transparent"
      hide-slider
      mobile-break-point="350"
    >
      <v-tab
        v-for="tab in tabs"
        :key="tab"
        ripple
      >
        {{ tab }}
      </v-tab>
    </v-tabs>
    <!-- </v-toolbar> -->
    <v-tabs-items v-model="activeTab">
      <v-tab-item
        v-for="tab in tabs"
        :key="tab"
      >
        <v-card flat color="transparent">
          <div v-if="activeTab === 0" class="ma-2">
            <CareerChoices />
          </div>
          <div v-else-if="activeTab === 1" class="ma-2">
            <Courses />
          </div>
          <div v-else-if="activeTab === 2" class="ma-2">
            <OnlineCourses />
          </div>
          <div v-else-if="activeTab === 3" class="ma-2">
            <Events />
          </div>
          <div v-else-if="activeTab === 4" class="ma-2">
            <JobShadowing />
          </div>
          <div v-else class="ma-2">
            <Apprenticeship />
          </div>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
    <div class="text-xs-center">
      <v-btn
        color="red lighten-1"
        dark
        depressed
        @click="goToTimeline"
      >
        Go To Timeline
      </v-btn>
    </div>
  </div>
</template>

<script>
import CareerChoices from '~/components/plan/tabs_content/CareerChoices'
import Courses from '~/components/plan/tabs_content/Courses'
import OnlineCourses from '~/components/plan/tabs_content/OnlineCourses'
import Events from '~/components/plan/tabs_content/Events'
import JobShadowing from '~/components/plan/tabs_content/JobShadowing'
import Apprenticeship from '~/components/plan/tabs_content/Apprenticeship'

export default {
  components: {
    CareerChoices,
    Courses,
    OnlineCourses,
    Events,
    JobShadowing,
    Apprenticeship
  },
  data() {
    return {
      // loading: false,
      // search: null,
      // select: null,
      // items: [],
      // states: ['Interaction Design'],
      activeTab: 0,
      tabs: [
        'Career Choices',
        'Courses',
        'Online Courses',
        'Events',
        'Job Shadowing',
        'Apprenticeship'
      ]
    }
  },
  methods: {
    goToTimeline() {
      this.$router.push('/plans/timeline')
    }
  }
  // watch: {
  //   search(val) {
  //     val && val !== this.select && this.querySelections(val)
  //   }
  // },
  // methods: {
  //   querySelections(v) {
  //     this.loading = true
  //     // Simulated ajax query
  //     setTimeout(() => {
  //       this.items = this.states.filter(e => {
  //         return (e || '').toLowerCase().indexOf((v || '').toLowerCase()) > -1
  //       })
  //       this.loading = false
  //     }, 500)
  //   }
  // }
}
</script>
