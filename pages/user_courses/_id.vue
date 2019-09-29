<template>
  <v-layout row :style="{ 'flex-wrap': this.$vuetify.breakpoint.smAndDown ? 'wrap' : '' }">
    <!-- Left Flex -->
    <v-flex sm12 md5 lg5 xl5>
      <p class="header-text">
        {{ userCourse.course.name }}
      </p>
      <div class="description-title">
        <v-avatar
          size="25"
          class="icon-middle mr-2"
        >
          <img :src="userCourse.course.image_url">
        </v-avatar>
        {{ userCourse.course.name }}
      </div>
      <div class="description-text py-3 pr-5">
        <p>
          {{ userCourse.course.description }}
        </p>
      </div>
      <v-flex xs10 class="pb-3">
        <hr>
      </v-flex>
      <v-flex
        v-for="(day, dayId) in userCourse.course.days"
        :key="dayId"
        class="py-1"
      >
        <v-btn
          flat
          class="ma-0 attachment-btn"
          @click="goToPanel(dayId)"
        >
          <v-icon
            class="mr-2"
            color="warning"
          >
            insert_drive_file
          </v-icon>
          Day {{ dayId + 1 }}
        </v-btn>
      </v-flex>
    </v-flex>
    <!-- /Left Flex -->

    <!-- Right Flex -->
    <v-flex xs12>
      <v-card class="rounded-card">
        <img
          src="~/assets/images/circles.png"
          height="100"
          width="140"
          align="right"
        >
        <v-layout row wrap>
          <v-flex sm4 xl3 class="pa-4">
            <v-avatar size="90">
              <img :src="userCourse.course.image_url">
            </v-avatar>
          </v-flex>
          <v-flex xs4 sm7>
            <p class="header-text">
              {{ userCourse.course.name }}
            </p>
            <v-progress-linear
              color="warning"
              :value="courseProgress"
            />
          </v-flex>
          <v-flex xs1 sm1 md1 lg1 xl1>
            <div class="progress-bar-txt">
              {{ courseProgress }} %
            </div>
          </v-flex>
        </v-layout>
      </v-card>
      <v-flex class="mt-5">
        <v-expansion-panel v-model="daysPanel" expand>
          <v-expansion-panel-content
            v-for="(day, dayId) in userCourse.course.days"
            :key="dayId"
            class="pt-2"
          >
            <div slot="header">
              Day {{ dayId + 1 }}
              <v-icon
                v-show="clonedDailyJournals[dayId].state === 'complete'"
                color="green"
                class="icon-middle pl-2"
              >
                check_circle
              </v-icon>
            </div>
            <v-card class="grey lighten-4">
              <v-layout row>
                <v-flex xs5 sm7 md6 lg6 xl6>
                  <p class="expansion-text pl-4">
                    Daily Mission
                  </p>
                  <v-radio-group
                    v-model="userCourse.daily_journals[dayId].state"
                    :mandatory="false"
                    class="pl-5"
                  >
                    <v-radio label="Complete" value="complete" />
                    <v-radio label="Half Complete" value="half_complete" />
                    <v-radio label="Incomplete" value="incomplete" />
                  </v-radio-group>
                  <p class="expansion-text pl-4 ma-0">
                    Self Assessment
                  </p>
                  <div class="text-xs-center pb-4">
                    <v-rating
                      v-model="userCourse.daily_journals[dayId].assessment"
                      background-color="orange lighten-3"
                      color="orange"
                    />
                  </div>
                </v-flex>
                <v-flex
                  xs7
                  sm12
                  md12
                  lg12
                  xl12
                  class="px-4"
                >
                  <p class="expansion-text">
                    Daily Journal
                  </p>
                  <v-textarea
                    v-model="userCourse.daily_journals[dayId].note"
                    outline
                    label="Write your notes here..."
                  />
                  <v-flex xs12 class="text-xs-center text-sm-center text-md-center text-lg-center">
                    <template v-if="userCourse.daily_journals[dayId].file">
                      <img
                        v-if="userCourse.daily_journals[dayId].file.split('.').pop() === 'pdf'"
                        src="~/assets/images/pdf.svg"
                        height="100"
                      >
                      <img
                        v-else
                        :src="baseURL + userCourse.daily_journals[dayId].file"
                        height="180"
                      >
                      <v-flex>
                        <a
                          :href="baseURL + userCourse.daily_journals[dayId].file"
                        >
                          Download File
                        </a>
                      </v-flex>
                    </template>
                    <v-text-field
                      :key="fileNameKey"
                      v-model="userCourse.daily_journals[dayId].file_name"
                      label="Upload File"
                      prepend-icon="attach_file"
                      @click="pickFile(dayId)"
                    />
                    <input
                      :ref="`file-${dayId}`"
                      type="file"
                      style="display: none"
                      @change="onFilePicked($event, dayId)"
                    >
                  </v-flex>
                  <v-flex text-xs-right pb-3>
                    <v-btn
                      class="white--text"
                      depressed
                      color="red lighten-1"
                      :disabled="clonedDailyJournals[dayId].state === 'complete'"
                      @click="updateDailyJournal(dayId)"
                    >
                      Submit
                    </v-btn>
                  </v-flex>
                </v-flex>
              </v-layout>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-flex>
    </v-flex>
    <!-- /Right Flex -->
  </v-layout>
</template>

<script>
import _ from 'lodash'

export default {
  data: () => {
    return {
      daysPanel: [],
      fileNameKey: 0,
      clonedDailyJournals: []
    }
  },
  computed: {
    baseURL() {
      return this.$axios.defaults.baseURL
    },
    courseProgress() {
      let completedDays = 0
      const totalDays = this.clonedDailyJournals.length
      this.clonedDailyJournals.forEach(day => {
        if (day.state === 'complete') {
          completedDays += 1
        }
      })
      return Math.floor((completedDays / totalDays) * 100)
    }
  },
  async asyncData({ $axios, params, error }) {
    try {
      const response = await $axios.get(`user_courses/${params.id}`)
      return {
        userCourse: response.data
      }
    } catch (e) {
      if (e.response.status === 404) {
        error({ statusCode: 404, message: 'Course not found' })
      } else {
        error({ message: 'Something wrong happened' })
      }
    }
  },
  created() {
    this.clonedDailyJournals = _.cloneDeep(this.userCourse.daily_journals)
  },
  mounted() {
    this.userCourse.daily_journals.forEach(day => {
      day.file_data = null
      day.file_name = null
    })
  },
  methods: {
    goToPanel(dayId) {
      this.daysPanel = [
        ...Array(this.userCourse.daily_journals.length).keys()
      ].map(_ => false)
      this.daysPanel[dayId] = true
    },
    updateDailyJournal(dayId) {
      const payload = { daily_journal: this.userCourse.daily_journals[dayId] }
      this.$axios
        .put(
          `/daily_journals/${this.userCourse.daily_journals[dayId].id}`,
          payload
        )
        .then(response => {
          if (response.status === 200) {
            this.userCourse.daily_journals[dayId] = response.data
            this.clonedDailyJournals = _.cloneDeep(
              this.userCourse.daily_journals
            )
            this.snackbar.success('Day updated successfully')
          }
        })
        .catch(() => {
          this.snackbar.error('Error while updating day')
        })
    },
    pickFile(dayId) {
      this.$refs['file-' + dayId][0].click()
    },
    onFilePicked(e, dayId) {
      const files = e.target.files
      if (files[0] !== undefined) {
        this.userCourse.daily_journals[dayId].file_name = files[0].name
        if (
          this.userCourse.daily_journals[dayId].file_name.lastIndexOf('.') <= 0
        ) {
          return
        }
        const fr = new FileReader()
        fr.readAsDataURL(files[0])
        fr.addEventListener('load', () => {
          this.userCourse.daily_journals[dayId].file_data = fr.result
        })
        this.fileNameKey += 1
      } else {
        this.userCourse.daily_journals[dayId].file_name = ''
        this.userCourse.daily_journals[dayId].file_data = ''
      }
    }
  }
}
</script>

<style scoped>
.centered {
  margin: 0 auto;
}
.rounded-card {
  border-radius: 30px;
}
.header-text {
  font-size: 1.4em;
  color: dimgrey;
  padding-top: 30px;
  padding-bottom: 10px;
}
.expansion-text {
  font-size: 1.2em;
  color: dimgrey;
  padding-top: 30px;
  padding-bottom: 10px;
}
.progress-bar-txt {
  padding-top: 80px;
  padding-left: 10px;
  font-size: 13px;
  color: dimgrey;
}
.description-title {
  font-size: 1.3em;
  color: dimgrey;
}
.description-text {
  font-size: 1.1em;
  color: dimgrey;
}
.attachment-btn::before {
  color: transparent;
}
.icon-middle {
  vertical-align: middle;
}
</style>
