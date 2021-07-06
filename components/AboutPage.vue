<template>
  <div class="sm:pt-8 lg:pt-10 sm:pb-12 md:pb-16 lg:pb-24 xl:pb-40 bg-dark-darker mt-5 mb-5">
    <div class="align-center mx-5 text-center">
      <div class="sm:my-auto max-w-2xl mx-auto my-10">
        <h1 class="md:text-5xl mb-2 text-3xl font-bold text-gray-900">
          <span class="text-discord-blurple block">About DiscordTools</span>
        </h1>
        <p class="sm:text-xl text-md text-gray-200">DiscordTools is an open-source Discord utilities website.</p>
      </div>
      <div class="bg-dark-dark max-w-6xl px-10 py-10 mx-auto mt-8 text-left rounded text-white">
        <p class="sm:text-xl font-semibold text-gray-200">Privacy Policy:</p>
        <p class="sm:text-md text-gray-200 mt-1">
          DiscordTools stores no user data. When authorizing DiscordTools' access to your account, we are given basic user information and a list of the servers you are in. None of
          this data is stored or logged. We log ratelimits to prevent abuse, and errors to help fix bugs, but that's all. Our entire source code is available on GitHub.
        </p>
        <p class="sm:text-md text-gray-200 mt-2">
          We run public analytics on our website provided by SimpleAnalytics. SimpleAnalytics is GDPA compliant and DOES NOT store or use IP addresses, cookies, or any other user
          data.
        </p>
        <p class="sm:text-xl font-semibold text-gray-200 mt-5">Links:</p>
        <ul class="list-disc ml-10 mb-5">
          <li>
            <font-awesome-icon :icon="['fab', 'github']" />
            <a class="text-blue-500 hover:text-blue-600 transition duration-250" href="https://github.com/tandpfun/DiscordTools" target="_blank"> Github</a>
          </li>
          <li>
            <font-awesome-icon :icon="['fab', 'discord']" />
            <a class="text-blue-500 hover:text-blue-600 transition duration-250" href="https://discord.gg/GFsA2x7j4F" target="_blank"> Discord Server</a>
          </li>
          <li>
            <font-awesome-icon :icon="['fas', 'chart-area']" />
            <a class="text-blue-500 hover:text-blue-600 transition duration-250" href="https://simpleanalytics.com/discordtools.io" target="_blank"> Analytics</a>
          </li>
        </ul>

        <p class="sm:text-xl font-semibold text-gray-200">Contributors:</p>
        <ul class="list-disc ml-10">
          <li>
            Lead Developer:
            <a v-for="c in contributors.lead" class="text-blue-500 hover:text-blue-600 transition duration-250" :key="c[1]" :href="c[1]" target="_blank">{{ c[0] }} </a>
          </li>
          <li>
            Major Contributor:
            <a v-for="c in contributors.major" class="text-blue-500 hover:text-blue-600 transition duration-250" :key="c[1]" :href="c[1]" target="_blank">{{ c[0] }} </a>
          </li>
          <li>
            Minor Contributors:
            <a v-for="c in contributors.minor" class="text-blue-500 hover:text-blue-600 transition duration-250" :key="c[1]" :href="c[1]" target="_blank">{{ c[0] }} </a>
          </li>
        </ul>
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
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
  },
  data() {
    return {
      contributors: {
        lead: [['Coding', 'https://github.com/tandpfun']],
        major: [['Megumin', 'https://github.com/meguminsama']],
        minor: [
          ['Polar', 'https://github.com/xPolar'],
          ['Commandtechno', 'https://github.com/Commandtechno'],
          ['Toasty', 'https://github.com/toastythetoaster'],
          ['Techy', 'https://github.com/Techy'],
        ],
      },
    };
  },
};
</script>
