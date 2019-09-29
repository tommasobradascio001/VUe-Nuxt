<template>
  <v-layout>
    <v-flex
      text-xs-center
      xs12
      sm8
      md6
      lg4
      xl3
      class="add-card"
    >
      <v-card class="rounded-card">
        <img
          src="~/assets/images/circles.png"
          height="80"
          width="120"
          align="right"
        >
        <div class="pa-5">
          <div>
            <p class="header-text">
              New Course
            </p>
          </div>
          <form @submit.prevent="add">
            <!-- Name -->
            <v-text-field
              v-model="name"
              label="Name"
              required
            />
            <!-- /Name -->
            <!-- Type -->
            <v-select
              v-model="type"
              :items="typeItems"
              label="Type"
              item-text="text"
              item-value="value"
            />
            <!-- /Type -->
            <!-- Description -->
            <v-textarea
              v-model="description"
              label="Description"
              required
            />
            <!-- /Description -->
            <!-- Department -->
            <v-text-field
              v-model="department"
              label="Department"
              required
            />
            <!-- /Department -->
            <!-- University -->
            <v-text-field
              v-model="university"
              label="University"
              required
            />
            <!-- /University -->
            <!-- Pre-Event -->
            <v-text-field
              v-model="preEvent"
              label="Pre-Event"
              required
            />
            <!-- /Pre-Event -->
            <!-- Presenter -->
            <v-text-field
              v-model="presenter"
              label="Presenter"
              required
            />
            <!-- /Presenter -->
            <!-- Media URL -->
            <v-text-field
              v-model="mediaUrl"
              label="Media URL"
              required
            />
            <!-- /Media URL -->
            <!-- Start Date -->
            <v-menu
              v-model="startDateMenu"
              :close-on-content-click="false"
              :nudge-right="40"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              min-width="290px"
            >
              <v-text-field
                slot="activator"
                v-model="startDate"
                label="Start Date"
                prepend-icon="event"
                readonly
              />
              <v-date-picker v-model="startDate" color="red lighten-2" @input="startDateMenu = false" />
            </v-menu>
            <!-- /Start Date -->
            <!-- Start Time -->
            <v-menu
              ref="startMenu"
              v-model="startTimeMenu"
              :close-on-content-click="false"
              :nudge-right="40"
              :return-value.sync="startTime"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              max-width="290px"
              min-width="290px"
            >
              <v-text-field
                slot="activator"
                v-model="startTime"
                label="Start Time"
                prepend-icon="access_time"
                readonly
              />
              <v-time-picker
                v-if="startTimeMenu"
                v-model="startTime"
                color="red lighten-2"
                full-width
                @change="$refs.startMenu.save(startTime)"
              />
            </v-menu>
            <!-- /Start Time -->
            <!-- End Date -->
            <v-menu
              v-model="endDateMenu"
              :close-on-content-click="false"
              :nudge-right="40"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              min-width="290px"
            >
              <v-text-field
                slot="activator"
                v-model="endDate"
                label="End Date"
                prepend-icon="event"
                readonly
              />
              <v-date-picker v-model="endDate" color="red lighten-2" @input="endDateMenu = false" />
            </v-menu>
            <!-- /End Date -->
            <!-- End Time -->
            <v-menu
              ref="endMenu"
              v-model="endTimeMenu"
              :close-on-content-click="false"
              :nudge-right="40"
              :return-value.sync="endTime"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              max-width="290px"
              min-width="290px"
            >
              <v-text-field
                slot="activator"
                v-model="endTime"
                label="End Time"
                prepend-icon="access_time"
                readonly
              />
              <v-time-picker
                v-if="endTimeMenu"
                v-model="endTime"
                color="red lighten-2"
                full-width
                @change="$refs.endMenu.save(endTime)"
              />
            </v-menu>
            <!-- /End Time -->
            <!-- Recurrent -->
            <v-select
              v-model="recurrent"
              :items="recurrencyItems"
              label="Recurrent"
              prepend-icon="replay"
              item-text="text"
              item-value="value"
            />
            <!-- /Recurrent -->
            <!-- Location -->
            <v-text-field
              v-model="location"
              prepend-icon="gps_fixed"
              label="Location"
              required
            />
            <!-- /Location -->
            <!-- Cost -->
            <v-text-field
              v-model="cost"
              label="Cost"
              prepend-icon="attach_money"
              required
            />
            <!-- /Cost -->
            <v-btn
              round
              block
              color="red lighten-1"
              style="color:white"
              @click="addCourse"
            >
              Add Course
            </v-btn>
          </form>
        </div>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      description: '',
      type: 0,
      typeItems: [
        {
          text: 'Seminar',
          value: 0
        },
        {
          text: 'Training',
          value: 1
        }
      ],
      image: '',
      department: '',
      university: '',
      startDate: new Date().toISOString().substr(0, 10),
      endDate: new Date().toISOString().substr(0, 10),
      startTime: null,
      endTime: null,
      recurrent: 0,
      recurrencyItems: [
        {
          text: 'Weekly',
          value: 0
        },
        {
          text: 'Monthly',
          value: 1
        }
      ],
      location: '',
      cost: '',
      preEvent: '',
      presenter: '',
      mediaUrl: '',
      startDateMenu: false,
      endDateMenu: false,
      startTimeMenu: false,
      endTimeMenu: false
    }
  },
  methods: {
    addCourse() {
      const postData = {
        name: this.name,
        description: this.description,
        category: this.type,
        image: this.image,
        department: this.department,
        university: this.university,
        start_date: this.startDate,
        end_date: this.endDate,
        start_time: this.startTime,
        end_time: this.endTime,
        recurrent: this.recurrent,
        location: this.location,
        cost: this.cost,
        pre_event: this.preEvent,
        presenter: this.presenter,
        image_url: this.imageUrl
      }
      this.$axios
        .post('/courses', postData)
        .then(response => {
          if (response.status === 201) {
            this.snackbar.success('Course created successfully')
          }
        })
        .catch(() => {
          this.snackbar.error('Error while creating course')
        })
    }
  }
}
</script>


<style scoped>
.main-button {
  margin-left: -10px;
}
.add-card {
  margin: 0 auto;
}
.rounded-card {
  border-radius: 15px;
}
.header-text {
  font-size: 1.3em;
  text-align: left !important;
  color: dimgrey;
}
</style>
