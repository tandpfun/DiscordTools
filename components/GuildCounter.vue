<template>
  <div class="sm:pt-8 lg:pt-10 sm:pb-12 md:pb-16 lg:pb-24 xl:pb-40 bg-dark-darker mt-5 mb-5">
    <div class="align-center mx-5 text-center">
      <div class="sm:my-auto max-w-2xl mx-auto my-10">
        <h1 class="md:text-5xl mb-2 text-3xl font-bold text-gray-900">
          <span class="text-discord-blurple block">GuildCount</span>
        </h1>
        <p class="sm:text-xl text-md text-gray-200">Below are some statistics on the guilds your account is in.</p>
      </div>
      <div class="bg-dark-dark max-w-6xl px-10 py-10 mx-auto mt-8 text-left rounded">
        <div class="text-3xl font-bold text-center text-white" v-if="loading">
          <svg class="animate-spin w-8 h-8 mx-auto" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
        <div class="text-3xl font-bold text-center text-gray-400" v-else-if="fetchError">
          <font-awesome-icon :icon="['fas', 'exclamation-triangle']" /> Error Fetching Guilds
        </div>
        <div v-else>
          <h1 class="mb-1 text-3xl font-bold text-center text-gray-900">
            <span class="block text-white"
              >You are in
              <span class="text-discord-blurple">{{ guilds.length }}</span>
              Servers.</span
            >
          </h1>
          <h1 class="mt-10 mb-1 text-3xl font-bold text-center text-gray-900">
            <span class="block text-white">Statistics</span>
          </h1>
          <div class="flex flex-wrap justify-center">
            <div class="bg-dark-darker relative flex flex-col flex-wrap flex-1 mx-1 my-1 text-center text-white rounded">
              <div class="align-center box-border flex flex-auto px-5 py-2 ml-0 mr-0 text-center">
                <div class="mx-auto">
                  <div class="text-discord-blurple text-sm font-bold uppercase">You Own</div>
                  <div class="text-3xl font-bold">
                    {{ guilds.filter((g) => g.owner).length }}
                  </div>
                </div>
              </div>
            </div>
            <div class="bg-dark-darker relative flex flex-col flex-wrap flex-1 mx-1 my-1 text-center text-white rounded">
              <div class="align-center box-border flex flex-auto px-5 py-2 ml-0 mr-0 text-center">
                <div class="mx-auto">
                  <div class="text-discord-blurple text-sm font-bold uppercase">You Moderate</div>
                  <div class="text-3xl font-bold">
                    {{ guilds.filter((g) => g.permissions & (1 << 13) && !g.owner).length }}
                  </div>
                </div>
              </div>
            </div>
            <div class="bg-dark-darker relative flex flex-col flex-wrap flex-1 mx-1 my-1 text-center text-white rounded">
              <div class="align-center box-border flex flex-auto px-5 py-2 ml-0 mr-0 text-center">
                <div class="mx-auto">
                  <div class="text-discord-blurple text-sm font-bold uppercase">Community Enabled</div>
                  <div class="text-3xl font-bold">
                    {{ guilds.filter((g) => g.features.includes('COMMUNITY')).length }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="flex flex-wrap justify-center">
            <div class="bg-dark-darker relative flex flex-col flex-wrap flex-1 mx-1 my-1 text-center text-white rounded">
              <div class="align-center box-border flex flex-auto px-5 py-2 ml-0 mr-0 text-center">
                <div class="mx-auto">
                  <div class="text-discord-blurple text-sm font-bold uppercase">Verified</div>
                  <div class="text-3xl font-bold">
                    {{ guilds.filter((g) => g.features.includes('VERIFIED')).length }}
                  </div>
                </div>
              </div>
            </div>

            <div class="bg-dark-darker relative flex flex-col flex-wrap flex-1 mx-1 my-1 text-center text-white rounded">
              <div class="align-center box-border flex flex-auto px-5 py-2 ml-0 mr-0 text-center">
                <div class="mx-auto">
                  <div class="text-discord-blurple text-sm font-bold uppercase">Partnered</div>
                  <div class="text-3xl font-bold">
                    {{ guilds.filter((g) => g.features.includes('PARTNERED')).length }}
                  </div>
                </div>
              </div>
            </div>
            <div class="bg-dark-darker relative flex flex-col flex-wrap flex-1 mx-1 my-1 text-center text-white rounded">
              <div class="align-center box-border flex flex-auto px-5 py-2 ml-0 mr-0 text-center">
                <div class="mx-auto">
                  <div class="text-discord-blurple text-sm font-bold uppercase">Discovery Enabled</div>
                  <div class="text-3xl font-bold">
                    {{ guilds.filter((g) => g.features.includes('DISCOVERABLE')).length }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="sm:mt-8 sm:flex justify-center mt-5 text-center">
            <a
              :class="showList ? 'bg-discord-red' : 'bg-discord-blurple'"
              class="cursor-pointer transform hover:-translate-y-0.5 hover:shadow-md text-white font-bold py-2 px-5 rounded-md transition duration-250"
              @click="toggleList"
            >
              {{ showList ? 'Hide List' : 'Show List' }}
            </a>
          </div>
          <transition name="height">
            <div v-if="showList" class="bg-dark-darker rounded-xl max-w-xl p-5 mx-auto mt-5 text-center">
              <div v-for="guild in guilds" :key="guild.id" class="flex items-center justify-center overflow-hidden text-center text-white">
                <img v-if="guild.owner" src="~/assets/img/owner.png" class="inline w-4 h-4" />
                <img v-if="guild.permissions & (1 << 13) && !guild.owner" src="~/assets/img/moderator.svg" class="inline w-4 h-4" />
                <img v-if="guild.features.includes('PARTNERED')" src="~/assets/img/partner.png" class="inline w-4 h-4" />
                <img v-if="guild.features.includes('VERIFIED')" src="~/assets/img/verified.png" class="inline w-4 h-4" />
                <span class="ml-1">{{ guild.name }}</span>
              </div>
            </div>
          </transition>
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
    async fetchStats() {
      axios
        .get(process.env.baseUrl + '/api/users/@me/guilds')
        .then((req) => {
          let data = req.data
          if (!data) return (this.fetchError = true)

          this.guilds = data
          this.loading = false
          this.fetchError = false
        })
        .catch((err) => {
          console.log(err)
          if (process.client) {
            console.log('FETCH ERROR')
            if (err.response?.status === 401) return (document.location.href = '/login')
            else return (this.fetchError = true)
          }
        })
    },
    toggleList() {
      this.showList = !this.showList
    },
  },
  data() {
    return {
      guilds: [],
      loading: true,
      fetchError: false,
      showList: false,
    }
  },
  async created() {
    if (process.client) this.fetchStats()
  },
}
</script>
