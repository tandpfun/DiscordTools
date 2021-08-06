<template>
  <div class="sm:pt-8 lg:pt-10 sm:pb-12 md:pb-16 lg:pb-24 xl:pb-40 bg-dark-darker mt-5 mb-5">
    <div class="align-center mx-5 text-center">
      <div class="sm:my-auto max-w-2xl mx-auto my-10">
        <h1 class="md:text-5xl mb-2 text-3xl font-bold text-gray-900">
          <span class="text-discord-blurple block">Invite Information</span>
        </h1>
        <p class="sm:text-xl text-md text-gray-200">Get information on an invite or vanity url.</p>
      </div>
      <div class="bg-dark-dark max-w-6xl px-10 py-10 mx-auto mt-8 text-left rounded">
        <div>
          <h1 class="mb-1 text-3xl font-bold text-center text-white">Invite:</h1>
          <div class="relative text-gray-600 focus-within:text-gray-400 transition duration-250">
            <div class="w-full lg:w-4/12 mx-auto">
              <span class="absolute inset-y-0 items-center pl-3 pt-1.5 text-gray-200">
                <font-awesome-icon :icon="['fas', 'link']" />
              </span>
              <input
                name="invite"
                class="py-2 text-sm text-white bg-gray-900 rounded-md pl-10 transition duration-250 focus:outline-none focus:bg-white focus:text-gray-900 w-full"
                placeholder="discord.gg/invite"
                v-model="invite"
                autocomplete="off"
              />
            </div>
          </div>
          <transition name="height">
            <div v-if="invite" class="mt-5">
              <h1 class="mb-1 text-3xl font-bold text-center text-white">Info:</h1>
              <transition name="height">
                <div v-if="invite == 'discord'">
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
                <p v-else-if="!validateInvite(invite)" class="text-md text-gray-200 text-center">That doesn't look like a valid invite!</p>
                <div v-else class="text-center text-white">
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
                  <div class="mt-2 p-5 max-w-xl mx-auto bg-dark-darker rounded-md text-white" v-else-if="dataFetched">
                    <div class="flex flex-row items-center justify-center">
                      <img
                        v-if="data.guild.icon"
                        :src="
                          data.guild.icon
                            ? 'https://cdn.discordapp.com/icons/' + data.guild.id + '/' + data.guild.icon + '?size=256'
                            : 'https://cdn.discordapp.com/embed/avatars/0.png'
                        "
                        class="rounded-full m-1"
                        style="width: 75px; height: 75px"
                      />
                      <div class="text-white text-left ml-4 my-2 flex flex-col">
                        <p class="text-xl font-semibold text-gray-200">{{ data.guild.name }}</p>
                        <p class="text-md text-gray-200">{{ addCommas(data.approximate_presence_count) }} Online - {{ addCommas(data.approximate_member_count) }} Members</p>
                      </div>
                    </div>
                    <div class="text-center w-5/6 mx-auto mt-2 pt-2 border-t border-gray-500">
                      <p class="text-lg text-gray-200 text-center" v-if="data.guild.description">{{ data.guild.description }}</p>
                    </div>
                    <div class="text-center w-5/6 mx-auto mt-2 pt-2 border-t border-gray-500" v-if="data.guild.features[0]">
                      <b>Features:</b>
                      <p>
                        {{ data.guild.features.map((f) => sentanceCap(f)).join(', ') }}
                      </p>
                    </div>
                    <div class="text-center w-5/6 mx-auto mt-2 pt-2 border-t border-gray-500">
                      <p class="text-lg text-gray-200 text-center" v-if="data.expires_at"><b>Invite Expires:</b> {{ inviteExpires(data.expires_at).toLocaleString() }}</p>
                      <p class="text-lg text-gray-200 text-center" v-if="data.code">
                        <b>Invite:</b> <a class="text-blue-400" :href="'https://discord.gg/' + data.code">{{ 'https://discord.gg/' + data.code }}</a>
                      </p>
                    </div>
                  </div>
                  <div class="text-2xl font-bold text-center text-white mt-2" v-else-if="fetchError.error">
                    <template v-if="fetchError.type == 'invalid'"> <font-awesome-icon :icon="['fas', 'exclamation-triangle']" /> Not Found </template>
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
                          @click="fetchInvite"
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
                      @click="fetchInvite"
                    >
                      Fetch
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
import axios from 'axios';

export default {
  methods: {
    abbNum: (val) => {
      let newValue = val;
      const suffixes = ['', 'k', 'm', 'b', 't'];
      let suffixNum = 0;
      while (newValue >= 1000) {
        newValue /= 1000;
        suffixNum++;
      }

      newValue = newValue.toPrecision(3);

      newValue += suffixes[suffixNum];
      return newValue;
    },
    addCommas(x) {
      x = x.toString();
      let pattern = /(-?\d+)(\d{3})/;
      while (pattern.test(x)) x = x.replace(pattern, '$1,$2');
      return x;
    },
    validateInvite(invite) {
      if (!invite) return false;
      if (invite.length < 2) return false;

      return true;
    },
    inviteExpires(expires) {
      const date = new Date(expires);
      console.log(date.getTime());
      return date;
    },
    sentanceCap(str) {
      return str
        .toLowerCase()
        .replace(/_/g, ' ')
        .split(' ')
        .map(function (word) {
          return word[0].toUpperCase() + word.substr(1);
        })
        .join(' ');
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
        nv;

      if (query === url || query === '') return;

      for (i = 0; i < pairs.length; i++) {
        nv = pairs[i].split('=', 2);
        n = decodeURIComponent(nv[0]);
        v = decodeURIComponent(nv[1]);

        if (!parms.hasOwnProperty(n)) parms[n] = [];
        parms[n].push(nv.length === 2 ? v : null);
      }
      return parms;
    },
    fetchInvite() {
      this.loading = true;

      let invite = this.invite;
      let inviteMatch = invite.match(/(?:https?:\/\/)?(?:\w+\.)?discord(?:(?:app)?\.com\/invite|\.gg)\/([A-Za-z0-9-]+)/);

      let inviteDecoded;
      if (!inviteMatch?.[0]) {
        inviteDecoded = invite;
      } else inviteDecoded = inviteMatch[1];

      if (!inviteDecoded) {
        this.loading = false;
        this.fetchError.error = true;
        return (this.fetchError.type = 'invalid');
      }

      axios
        .get(`https://discord.com/api/v8/invites/${inviteDecoded}?with_counts=1&with_expiration=1`)
        .then((res) => {
          let data = res.data;
          if (!data) {
            this.fetchError.error = true;
            this.loading = false;
            this.dataFetched = true;
            return;
          }

          this.data = data;
          this.loading = false;
          this.dataFetched = true;
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
          if (process.client) {
            console.log('FETCH ERROR');
            console.log(err.response.data.message);
            if (err.response?.data?.message === 'Unknown Invite' || err.response?.status === 400) this.fetchError.type = 'invalid';
            if (err.response?.status === 429) this.fetchError.type = 'ratelimit';

            this.loading = false;
            this.fetchError.error = true;
          }
        });
    },
  },
  data() {
    return {
      invite: '',
      loading: false,
      dataFetched: false,
      fetchError: {
        error: false,
        type: '',
      },
      data: {},
    };
  },
  watch: {
    invite: function (val, oldVal) {
      this.loading = false;
      this.dataFetched = false;
      this.fetchError = {
        error: false,
        type: '',
      };
      this.data = {};

      if (val) window.history.replaceState(null, null, `?i=${this.invite}`);
      else {
        const url = new URL(location);
        url.searchParams.delete('i');
        history.replaceState(null, null, url);
      }
    },
  },
  async mounted() {
    this.$nextTick(() => {
      if (process.client) {
        let urlParams = this.parseURLParams(location.href);
        if (!urlParams) return;
        if (urlParams.i?.[0] && typeof urlParams.i?.[0] === 'string') {
          this.invite = urlParams.i[0];
          console.log(urlParams.i[0]);
        }
      }
    });
  },
};
</script>
