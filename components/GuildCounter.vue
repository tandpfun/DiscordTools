<template>
  <div class="sm:pt-8 lg:pt-10 sm:pb-12 md:pb-16 lg:pb-24 xl:pb-40 bg-dark-darker mt-5 mb-5">
    <div class="align-center mx-5 text-center">
      <div class="sm:my-auto max-w-2xl mx-auto my-10">
        <h1 class="md:text-5xl mb-2 text-3xl font-bold text-gray-900">
          <span class="text-discord-blurple block">Guild Count</span>
        </h1>
        <p class="sm:text-xl text-md text-gray-200">Below are some statistics on the guilds your account is in.</p>
      </div>
      <div class="bg-dark-dark max-w-6xl px-10 py-10 mx-auto mt-8 text-left rounded">
        <div class="text-3xl font-bold text-center text-white" v-if="loading">
          <svg class="animate-spin w-8 h-8 mx-auto" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
        <div class="text-3xl font-bold text-center text-gray-400" v-else-if="fetchError"><font-awesome-icon :icon="['fas', 'exclamation-triangle']" /> Error Fetching Guilds</div>
        <div v-else>
          <h1 class="mb-1 text-3xl font-bold text-center text-gray-900">
            <span class="block text-white"
              >You are in
              <span class="text-discord-blurple">{{ guilds.all.length }}</span>
              Servers.</span
            >
          </h1>
          <h1 class="mt-10 mb-1 text-3xl font-bold text-center text-gray-900">
            <span class="block text-white">Statistics</span>
          </h1>
          <div class="flex flex-wrap justify-center">
            <div class="bg-dark-darker relative flex flex-col flex-wrap flex-1 mx-1 my-1 text-center text-white rounded cursor-pointer" @click="showPopup('owned')">
              <div class="align-center box-border flex flex-auto px-5 py-2 ml-0 mr-0 text-center">
                <div class="mx-auto">
                  <div class="text-discord-blurple text-sm font-bold uppercase">You Own</div>
                  <div class="text-3xl font-bold">
                    {{ guilds.owned.length }}
                  </div>
                </div>
              </div>
            </div>
            <div class="bg-dark-darker relative flex flex-col flex-wrap flex-1 mx-1 my-1 text-center text-white rounded cursor-pointer" @click="showPopup('mod')">
              <div class="align-center box-border flex flex-auto px-5 py-2 ml-0 mr-0 text-center">
                <div class="mx-auto">
                  <div class="text-discord-blurple text-sm font-bold uppercase">You Moderate</div>
                  <div class="text-3xl font-bold">
                    {{ guilds.mod.length }}
                  </div>
                </div>
              </div>
            </div>
            <div class="bg-dark-darker relative flex flex-col flex-wrap flex-1 mx-1 my-1 text-center text-white rounded cursor-pointer" @click="showPopup('community')">
              <div class="align-center box-border flex flex-auto px-5 py-2 ml-0 mr-0 text-center">
                <div class="mx-auto">
                  <div class="text-discord-blurple text-sm font-bold uppercase">Community Enabled</div>
                  <div class="text-3xl font-bold">
                    {{ guilds.community.length }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="flex flex-wrap justify-center">
            <div class="bg-dark-darker relative flex flex-col flex-wrap flex-1 mx-1 my-1 text-center text-white rounded cursor-pointer" @click="showPopup('verified')">
              <div class="align-center box-border flex flex-auto px-5 py-2 ml-0 mr-0 text-center">
                <div class="mx-auto">
                  <div class="text-discord-blurple text-sm font-bold uppercase">Verified</div>
                  <div class="text-3xl font-bold">
                    {{ guilds.verified.length }}
                  </div>
                </div>
              </div>
            </div>

            <div class="bg-dark-darker relative flex flex-col flex-wrap flex-1 mx-1 my-1 text-center text-white rounded cursor-pointer" @click="showPopup('partnered')">
              <div class="align-center box-border flex flex-auto px-5 py-2 ml-0 mr-0 text-center">
                <div class="mx-auto">
                  <div class="text-discord-blurple text-sm font-bold uppercase">Partnered</div>
                  <div class="text-3xl font-bold">
                    {{ guilds.partnered.length }}
                  </div>
                </div>
              </div>
            </div>
            <div class="bg-dark-darker relative flex flex-col flex-wrap flex-1 mx-1 my-1 text-center text-white rounded cursor-pointer" @click="showPopup('discovery')">
              <div class="align-center box-border flex flex-auto px-5 py-2 ml-0 mr-0 text-center">
                <div class="mx-auto">
                  <div class="text-discord-blurple text-sm font-bold uppercase">Discovery Enabled</div>
                  <div class="text-3xl font-bold">
                    {{ guilds.discovery.length }}
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
              <div v-for="guild in guilds.all" :key="guild.id" class="flex items-center justify-center overflow-hidden text-left text-white">
                <div class="h-10 leading-10 w-full bg-light-lighter">
                  <img
                    :src="guild.icon ?
                    'https://cdn.discordapp.com/icons/' + guild.id + '/' + guild.icon + '.jpg?size=32'
                    : 'https://cdn.discordapp.com/embed/avatars/0.png'"
                    class="inline rounded-full float-left mt-1"
                    style="width: 32px; height: 32px;"
                  />
                  <span class="ml-2">{{ guild.name }}</span>
                  <img v-if="guild.owner" src="~/assets/img/owner.png" class="inline w-4 h-4 ml-1" />
                  <img v-if="guild.permissions & (1 << 13) && !guild.owner" src="~/assets/img/moderator.svg" class="inline w-4 h-4 ml-1" />
                  <img v-if="guild.features.includes('PARTNERED')" src="~/assets/img/partner.png" class="inline w-4 h-4 ml-1" />
                  <img v-if="guild.features.includes('VERIFIED')" src="~/assets/img/verified.png" class="inline w-4 h-4 ml-1" />
                </div>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
    <transition name="fade">
      <div class="fixed z-10 inset-0 overflow-y-auto" v-if="popup.visible">
        <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <!-- Background -->
          <div class="fixed inset-0 transition-opacity" aria-hidden="true">
            <div class="absolute inset-0 bg-gray-700 opacity-75"></div>
          </div>

          <!-- This element is to trick the browser into centering the modal contents. -->
          <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

          <div
            class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline"
          >
            <div class="bg-dark-dark px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div class="sm:flex sm:items-start">
                <div class="mt-3 sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 class="text-lg leading-6 font-medium text-gray-100" id="modal-headline">
                    <p v-if="popup.type === 'owned'">You Own</p>
                    <p v-if="popup.type === 'mod'">You Moderate</p>
                    <p v-if="popup.type === 'community'">Community Enabled</p>
                    <p v-if="popup.type === 'verified'">Verified</p>
                    <p v-if="popup.type === 'partnered'">Partnered</p>
                    <p v-if="popup.type === 'discovery'">Discovery Enabled</p>
                  </h3>
                  <div class="mt-2">
                    <div v-for="guild in guilds[popup.type]" :key="guild.id" class="flex items-center overflow-hidden text-white text-left">
                      <img v-if="guild.owner" src="~/assets/img/owner.png" class="inline w-4 h-4 ml-1" />
                      <img v-if="guild.permissions & (1 << 13) && !guild.owner" src="~/assets/img/moderator.svg" class="inline w-4 h-4 ml-1" />
                      <img v-if="guild.features.includes('PARTNERED')" src="~/assets/img/partner.png" class="inline w-4 h-4 ml-1" />
                      <img v-if="guild.features.includes('VERIFIED')" src="~/assets/img/verified.png" class="inline w-4 h-4 ml-1" />
                      <span class="ml-1">{{ guild.name }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="bg-dark-darker px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                class="
                  mt-3
                  w-full
                  inline-flex
                  bg-discord-blurple
                  justify-center
                  rounded
                  shadow-sm
                  px-4
                  py-2
                  bg-white
                  text-base
                  font-medium
                  text-white
                  transform
                  hover:-translate-y-0.5
                  transition
                  duration-250
                  focus:ring-offset-2 focus:ring-indigo-500
                  sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm
                "
                @click="popup.visible = false"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
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
    showPopup(type) {
      this.popup.visible = true
      this.popup.type = type
    },
    async fetchStats() {
      axios
        .get(process.env.baseUrl + '/api/users/@me/guilds')
        .then((req) => {
          let data = req.data
          if (!data) return (this.fetchError = true)

          this.guilds.all = data
          this.guilds.owned = data.filter((g) => g.owner)
          this.guilds.mod = data.filter((g) => g.permissions & (1 << 13) && !g.owner)
          this.guilds.community = data.filter((g) => g.features.includes('COMMUNITY'))
          this.guilds.partnered = data.filter((g) => g.features.includes('PARTNERED'))
          this.guilds.verified = data.filter((g) => g.features.includes('VERIFIED'))
          this.guilds.discovery = data.filter((g) => g.features.includes('DISCOVERABLE'))
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
      guilds: {
        all: [],
        owned: [],
        mod: [],
        community: [],
        verified: [],
        partnered: [],
        discovery: [],
      },
      loading: true,
      fetchError: false,
      showList: false,
      popup: {
        visible: false,
        title: '',
        type: '',
      },
    }
  },
  async created() {
    if (process.client) this.fetchStats()
  },
}
</script>
