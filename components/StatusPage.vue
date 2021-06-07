<template>
  <div class="sm:pt-8 lg:pt-10 sm:pb-12 md:pb-16 lg:pb-24 xl:pb-40 bg-dark-darker mt-5 mb-5">
    <div class="align-center mx-5 text-center">
      <div class="sm:my-auto max-w-2xl mx-auto my-10">
        <h1 class="md:text-5xl mb-2 text-3xl font-bold text-gray-900">
          <span class="text-discord-blurple block">Discord Status</span>
        </h1>
        <p class="sm:text-xl text-md text-gray-200">Below is the status of Discord as well as other information</p>
      </div>
      <div class="bg-dark-dark max-w-6xl px-10 py-10 mx-auto mt-8 text-left rounded">
        <div class="text-3xl font-bold text-center text-white" v-if="loading">
          <svg class="animate-spin w-8 h-8 mx-auto" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
        <div class="text-3xl font-bold text-center text-gray-400" v-else-if="fetchError"><font-awesome-icon :icon="['fas', 'exclamation-triangle']" /> Error Fetching Status</div>
        <div v-else>
          <h1 class="mb-1 text-3xl font-bold text-center text-gray-900">
            <span class="block text-white"
              >Discord is
              <span :class="status.discord.online ? 'text-discord-green' : 'text-discord-red'">{{ status.discord.online ? 'Online' : 'Experiencing Issues' }}</span>
              with an API ping of <span class="text-discord-blurple">{{ status.discord.ping }}ms</span></span
            >
          </h1>
          <h1 class="mb-1 text-3xl font-bold text-center text-gray-900">
            <span class="block text-white"
              >Discord Staging is <span :class="status.discord.open ? 'text-discord-green' : 'text-discord-red'">{{ status.discord.open ? 'Open' : 'Closed' }}</span> with an API ping of
              <span class="text-discord-blurple">{{ status.staging.ping }}ms</span></span
            >
          </h1>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.height-enter-active,
.height-leave-active {
  transition: all 0.2s;
  max-height: 230px;
  overflow: hidden;
}

.height-enter, .height-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  max-height: 0px;
}
</style>

<script>
import axios from 'axios'

export default {
  methods: {
    abbNum: (val) => {
      let newValue = val
      const suffixes = ['', 'k', 'm', 'b', 't']
      let suffixNum = 0
      while (newValue >= 1000) {
        newValue /= 1000
        suffixNum++
      }

      newValue = newValue.toPrecision(3)

      newValue += suffixes[suffixNum]
      return newValue
    },
    addCommas(x) {
      x = x.toString()
      let pattern = /(-?\d+)(\d{3})/
      while (pattern.test(x)) x = x.replace(pattern, '$1,$2')
      return x
    },
    async fetchStatus() {
      axios
        .get(process.env.baseUrl + '/api/discordstatus')
        .then((req) => {
          let data = req.data
          if (!data) return (this.fetchError = true)

          this.status = data
          this.loading = false
          this.fetchError = false
        })
        .catch((err) => {
          console.log(err)
          if (process.client) {
            console.log('FETCH ERROR')
            if (err.response?.status === 401) return (document.location.href = '/login')
            else {
              this.loading = false
              this.fetchError = true
            }
          }
        })
    },
    toggleList() {
      this.showList = !this.showList
    },
  },
  data() {
    return {
      status: [],
      loading: true,
      fetchError: false,
    }
  },
  async created() {
    if (process.client) this.fetchStatus()
  },
}
</script>
