<template>
  <div class="sm:pt-8 lg:pt-10 sm:pb-12 md:pb-16 lg:pb-24 xl:pb-40 bg-dark-darker mt-5 mb-5">
    <div class="align-center mx-5 text-center">
      <div class="sm:my-auto max-w-2xl mx-auto my-10">
        <h1 class="md:text-5xl mb-2 text-3xl font-bold text-gray-900">
          <span class="text-discord-blurple block">Tools List</span>
        </h1>
        <p class="sm:text-xl text-md text-gray-200">This is a full list of all tools on the DiscordTools website!</p>
      </div>
      <div class="bg-dark-dark max-w-6xl px-10 py-10 mx-auto mt-8 text-left rounded text-white flex-row">
        <div class="flex flex-wrap flex-col">
          <NuxtLink
            v-for="tool in tools"
            :key="tool.page"
            class="bg-dark-darker rounded-lg p-4 m-2 flex-grow flex items-center flex-col md:flex-row hover:-translate-y-0.5 hover:shadow-md transform transition duration-250"
            :to="'/' + tool.page"
          >
            <img class="inline w-12 h-12 bg-dark-dark rounded-full" :src="`/icons/${tool.page}.png`" />
            <h2 class="text-white font-semibold text-md ml-3 mt-1 md:mt-0">{{ tool.name }}:</h2>
            <p class="text-white text-md text-center md:text-left mt-1 ml-0 md:mt-0 md:ml-2">{{ tool.desc }}</p>
          </NuxtLink>
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
  },
  data() {
    return {
      tools: [
        { name: 'Guild Count', page: 'guildcount', desc: 'See your guild count, as well as sort through specific guilds like ones you own, moderate, are partnered, etc.' },
        { name: 'Snowflake Decoder', page: 'snowflake', desc: 'Get the creation date of any snowflake ID, and search Discord for users & guilds with it.' },
        { name: 'Discord Status', page: 'status', desc: "See Discord's status and ping, as well as if Staging is open." },
        { name: 'Invite Info', page: 'inviteinfo', desc: 'Get information on any invite link or vanity url.' },
        { name: 'Text to Emoji', page: 'textemoji', desc: 'Convert text to regional indicator emojis!' },
      ],
    }
  },
}
</script>
