<template>
  <v-toolbar>
    <v-btn fab depressed @click="goToPlans()">
      <img src="~/assets/images/logo.svg">
    </v-btn>
    <v-spacer />
    <v-toolbar-items v-if="$auth.loggedIn" class="hidden-sm-and-down">
      <v-menu offset-y>
        <v-btn slot="activator" flat class="text-xs-center">
          <v-chip
            small
            disabled
            :color="chipColor"
            :text-color="chipTextColor"
          >
            {{ userBadge }} {{ userPoints }} &nbsp;&nbsp;&nbsp;&nbsp;
            <v-avatar>
              <img src="https://randomuser.me/api/portraits/men/1.jpg">
            </v-avatar>
            {{ userName }}
          </v-chip>
        </v-btn>
        <v-list>
          <v-list-tile @click="logout">
            <v-list-tile-title>Log out</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar-items>
  </v-toolbar>
</template>


<script>
export default {
  data() {
    return {
      levels: [
        { name: '3', value: 600000 },
        { name: '2', value: 20000 },
        { name: '1', value: 0 }
      ],
      badges: [
        { name: 'Expert', value: 90000 },
        { name: 'Mentor', value: 75000 },
        { name: 'Masters', value: 60000 },
        { name: 'Day-Traveling Worker', value: 45000 },
        { name: 'Competent Craftsman', value: 33000 },
        { name: 'Peer', value: 30000 },
        { name: 'Associate', value: 25000 },
        { name: 'Journeyman', value: 20000 },
        { name: 'Greenhorn', value: 18000 },
        { name: 'Neophyte', value: 15000 },
        { name: 'Beginner', value: 12000 },
        { name: 'Novice', value: 7000 },
        { name: 'Learner', value: 1500 },
        { name: 'Assistant', value: 500 },
        { name: 'Apprentice', value: 0 }
      ],
      chipColors: [
        { name: 'orange lighten-3', value: 600000 },
        { name: 'green lighten-1', value: 20000 },
        { name: 'pink lighten-1', value: 0 }
      ],
      textColors: [
        { name: 'black', value: 600000 },
        { name: 'white', value: 0 }
      ]
    }
  },
  computed: {
    userName() {
      const user = this.currentUser()
      return user.first_name + ' ' + user.last_name
    },
    userPoints() {
      return this.currentUser().points
    },
    userBadge() {
      const points = this.currentUser().points
      const badge = this._.find(this.badges, o => {
        return o.value <= points
      })
      return badge.name
    },
    userLevel() {
      const points = this.currentUser().points
      const level = this._.find(this.levels, o => {
        return o.value <= points
      })
      return level.name
    },
    chipColor() {
      const points = this.currentUser().points
      const color = this._.find(this.chipColors, o => {
        return o.value <= points
      })
      return color.name
    },
    chipTextColor() {
      const points = this.currentUser().points
      const color = this._.find(this.textColors, o => {
        return o.value <= points
      })
      return color.name
    }
  },
  methods: {
    logout() {
      try {
        this.$auth.logout()
      } catch (err) {
        this.snackbar.error('Error while authenticating.')
      }
    },
    goToPlans() {
      this.$router.push('/plans')
    }
  }
}
</script>
