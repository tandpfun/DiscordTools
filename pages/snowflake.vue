<template>
  <div class="sm:pt-8 lg:pt-10 sm:pb-12 md:pb-16 lg:pb-24 xl:pb-40 bg-dark-darker mt-5 mb-5">
    <div class="align-center mx-5 text-center">
      <div class="sm:my-auto max-w-2xl mx-auto my-10">
        <h1 class="md:text-5xl mb-2 text-3xl font-bold text-gray-900">
          <span class="text-discord-blurple block">Snowflake Decoder</span>
        </h1>
        <p class="sm:text-xl text-md text-gray-200">Get the creation date of any snowflake ID, and search Discord for it.</p>
      </div>
      <div class="bg-dark-dark max-w-6xl px-10 py-10 mx-auto mt-8 text-left rounded">
        <div>
          <h1 class="mb-1 text-3xl font-bold text-center text-white">Snowflake:</h1>
          <div class="relative text-gray-600 focus-within:text-gray-400 transition duration-250">
            <div class="w-full lg:w-3/12 mx-auto">
              <span class="absolute inset-y-0 items-center pl-3 pt-1.5 text-gray-200">
                <font-awesome-icon :icon="['fas', 'snowflake']" />
              </span>
              <input
                name="snowflake"
                class="py-2 text-sm text-white bg-gray-900 rounded-md pl-10 transition duration-250 focus:outline-none focus:bg-white focus:text-gray-900 w-full"
                placeholder="276544649148235776"
                v-model="snowflake"
                maxlength="19"
                autocomplete="off"
              />
            </div>
          </div>
          <transition name="height">
            <div v-if="snowflake" class="mt-5">
              <h1 class="mb-1 text-3xl font-bold text-center text-white">Info:</h1>
              <transition name="height">
                <div v-if="snowflake == '❄️' || snowflake == '❄' || snowflake.toLowerCase() == 'snowflake'">
                  <iframe
                    width="560"
                    height="315"
                    class="mx-auto"
                    src="https://www.youtube.com/embed/a3Z7zEc7AXQ?controls=0&autoplay=1"
                    title="I'm gonna give you up"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                  ></iframe>
                </div>
                <p v-else-if="!validateSnowflake(snowflake)" class="text-md text-gray-200 text-center">That doesn't look like a valid snowflake!</p>
                <div v-else class="text-center text-white">
                  <p class="text-xl text-gray-200 text-center">
                    <b>{{ (new Date().toString().split('(')[1] || '').slice(0, -1) }}:</b> {{ fetchTimestamp(snowflake).toLocaleString() }}
                  </p>
                  <p class="text-xl text-gray-200 text-center"><b>UNIX:</b> {{ fetchTimestamp(snowflake).getTime() / 1000 }}</p>
                  <h1 class="mb-1 text-3xl font-bold text-center text-white mt-8">Discord Info:</h1>
                  <div class="text-3xl font-bold text-center text-white mt-2" v-if="loading">
                    <svg class="animate-spin w-8 h-8 mx-auto" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path
                        class="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  </div>
                  <div class="text-3xl text-center text-white mt-2 max-w-xl mx-auto" v-else-if="dataFetched">
                    <template v-if="data.type == 'user'">
                      <img
                        :src="data.avatar ? 'https://cdn.discordapp.com/avatars/' + data.id + '/' + data.avatar + '?size=256' : 'https://cdn.discordapp.com/embed/avatars/0.png'"
                        class="rounded-full m-1 mx-auto"
                        style="width: 75px; height: 75px"
                      />
                      <p class="text-xl text-gray-200 text-center"><b>Type:</b> {{ data.bot ? 'Bot' : 'User' }}</p>
                      <p class="text-xl text-gray-200 text-center"><b>Username:</b> {{ data.username }}#{{ data.discriminator }}</p>
                      <!-- <p class="text-xl text-gray-200 text-center"><b>Badges:</b> Coming Soon</p> -->
                      <p class="text-xl text-gray-200 text-center"><b>Created:</b> {{ fetchTimestamp(snowflake).toLocaleString() }}</p>
                      <p class="text-xl text-gray-200 text-center"><b>Bot:</b> {{ data.bot || 'false' }}</p>
                    </template>
                    <template v-else-if="data.type == 'guild'">
                      <img
                        v-if="!data.disabled && data.guild.icon"
                        :src="
                          data.guild.icon
                            ? 'https://cdn.discordapp.com/icons/' + data.guild.id + '/' + data.guild.icon + '?size=256'
                            : 'https://cdn.discordapp.com/embed/avatars/0.png'
                        "
                        class="rounded-full m-1 mx-auto"
                        style="width: 75px; height: 75px"
                      />
                      <p class="text-xl text-gray-200 text-center"><b>Type:</b> Server</p>
                      <div v-if="data.disabled">
                        <p class="text-xl text-gray-200 text-center">Widget is Disabled</p>
                      </div>
                      <div v-else class="text-center">
                        <p class="text-xl text-gray-200 text-center"><b>Name:</b> {{ data.guild.name }}</p>
                        <p class="text-xl text-gray-200 text-center">
                          <b>Members:</b>
                          {{
                            data.guild.approximate_member_count
                              ? addCommas(data.guild.approximate_member_count)
                              : null || (data.guild.members.length == 100 ? 'More than 100' : data.guild.members.length) || 'Unknown'
                          }}
                        </p>
                        <p class="text-xl text-gray-200 text-center" v-if="data.guild.emojis ? data.guild.emojis.length : null"><b>Emojis:</b> {{ data.guild.emojis.length }}</p>
                        <p class="text-xl text-gray-200 text-center" v-if="data.guild.description"><b>Description:</b> {{ data.guild.description }}</p>
                        <p class="text-xl text-gray-200 text-center" v-if="data.guild.instant_invite">
                          <b>Invite:</b> <a class="text-blue-400" :href="data.guild.instant_invite">Click Here</a>
                        </p>
                      </div>
                    </template>
                  </div>
                  <div class="text-2xl font-bold text-center text-white mt-2" v-else-if="fetchError.error">
                    <template v-if="fetchError.type == 'login'">
                      <font-awesome-icon :icon="['fas', 'exclamation-triangle']" /> Please Log In
                      <div class="text-lg mt-4">
                        <a
                          class="transform hover:-translate-y-0.5 hover:shadow-md text-white font-bold py-2 px-5 rounded-md transition duration-250 bg-discord-blurple text-lg"
                          :href="`/login?backUrl=/snowflake${snowflake ? `?s=${snowflake}` : ''}`"
                        >
                          Log In
                        </a>
                      </div>
                    </template>
                    <template v-else-if="fetchError.type == 'invalid'"> <font-awesome-icon :icon="['fas', 'exclamation-triangle']" /> Nothing Found </template>
                    <template v-else-if="fetchError.type == 'ratelimit'">
                      <font-awesome-icon :icon="['fas', 'exclamation-triangle']" /> You're Being Ratelimited
                      <div class="sm:flex justify-center mt-2 text-center">
                        <a
                          class="
                            cursor-pointer
                            transform
                            hover:-translate-y-0.5 hover:shadow-md
                            text-white
                            font-bold
                            py-2
                            px-5
                            rounded-md
                            transition
                            duration-250
                            bg-discord-blurple
                          "
                          @click="fetchFromDiscord"
                        >
                          Try Again
                        </a>
                      </div>
                    </template>
                    <template v-else><font-awesome-icon :icon="['fas', 'exclamation-triangle']" /> Error Fetching</template>
                  </div>
                  <div class="sm:flex justify-center mt-2 text-center" v-else>
                    <a
                      class="cursor-pointer transform hover:-translate-y-0.5 hover:shadow-md text-white font-bold py-2 px-5 rounded-md transition duration-250 bg-discord-blurple"
                      @click="fetchFromDiscord"
                    >
                      Fetch From Discord
                    </a>
                  </div>
                </div>
              </transition>
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
    validateSnowflake(snowflake) {
      const epoch = 1420070400000

      if (!snowflake) return false
      if (isNaN(snowflake)) return false
      if (snowflake < 4194304) return false

      const timestamp = new Date(snowflake / 4194304 + epoch)
      if (isNaN(timestamp.getTime())) return false

      return true
    },
    fetchTimestamp(snowflake) {
      const epoch = 1420070400000
      const timestamp = new Date(snowflake / 4194304 + epoch)
      if (isNaN(timestamp.getTime())) return 0
      else return timestamp
    },
    parseURLParams(url) {
      var queryStart = url.indexOf('?') + 1,
        queryEnd = url.indexOf('#') + 1 || url.length + 1,
        query = url.slice(queryStart, queryEnd - 1),
        pairs = query.replace(/\+/g, ' ').split('&'),
        parms = {},
        i,
        n,
        v,
        nv

      if (query === url || query === '') return

      for (i = 0; i < pairs.length; i++) {
        nv = pairs[i].split('=', 2)
        n = decodeURIComponent(nv[0])
        v = decodeURIComponent(nv[1])

        if (!parms.hasOwnProperty(n)) parms[n] = []
        parms[n].push(nv.length === 2 ? v : null)
      }
      return parms
    },
    fetchFromDiscord() {
      this.loading = true

      axios
        .get(`/api/fetch/snowflake/${this.snowflake}`)
        .then((res) => {
          let data = res.data
          if (!data) {
            this.fetchError.error = true
            this.loading = false
            this.dataFetched = true
            return
          }

          this.data = data
          this.loading = false
          this.dataFetched = true
          console.log(data)
        })
        .catch((err) => {
          console.log(err)
          if (process.client) {
            console.log('FETCH ERROR')
            if (err.response?.status === 401) this.fetchError.type = 'login'
            if (err.response?.status === 400) this.fetchError.type = 'invalid'
            if (err.response?.status === 429) this.fetchError.type = 'ratelimit'

            this.loading = false
            this.fetchError.error = true
          }
        })
    },
  },
  data() {
    return {
      snowflake: '',
      loading: false,
      dataFetched: false,
      fetchError: {
        error: false,
        type: '',
      },
      data: {},
    }
  },
  watch: {
    snowflake: function (val, oldVal) {
      this.loading = false
      this.dataFetched = false
      this.fetchError = {
        error: false,
        type: '',
      }
      this.data = {}

      if (val) window.history.replaceState(null, null, `?s=${this.snowflake}`)
      else {
        const url = new URL(location)
        url.searchParams.delete('s')
        history.replaceState(null, null, url)
      }
    },
  },
  async mounted() {
    if (process.client) {
      let urlParams = this.parseURLParams(location.href)
      if (!urlParams) return
      if (urlParams.s?.[0] && typeof urlParams.s?.[0] === 'string') {
        this.snowflake = urlParams.s[0]
        console.log(urlParams.s[0])
      }
    }
  },
  head() {
    return {
      meta: [
        { hid: 'og:title', name: 'og:title', content: 'Snowflake Info' },
        {
          hid: 'og:description',
          name: 'og:description',
          content: this.snowflake
            ? `Snowflake: ${this.snowflake}\n${
                this.validateSnowflake(this.snowflake)
                  ? `Timestamp: ${this.fetchTimestamp(this.snowflake).getTime()}\nUnix: ${this.fetchTimestamp(this.snowflake).getTime() / 1000}\n${(
                      new Date().toString().split('(')[1] || ''
                    ).slice(0, -1)}: ${this.fetchTimestamp(this.snowflake).toLocaleString()}`
                  : 'Invalid Snowflake'
              }`
            : 'Get info on a discord snowflake!',
        },
      ],
    }
  },
}
</script>
