<template>
  <div class="sm:pt-8 lg:pt-10 sm:pb-12 md:pb-16 lg:pb-24 xl:pb-40 bg-dark-darker mt-5 mb-5">
    <div class="align-center mx-5 text-center">
      <div class="sm:my-auto max-w-2xl mx-auto my-10">
        <h1 class="md:text-5xl mb-2 text-3xl font-bold text-gray-900">
          <span class="text-discord-blurple block">About DiscordTools</span>
        </h1>
        <p class="sm:text-xl text-md text-gray-200">DiscordTools is an open-sourced Discord utilities website.</p>
      </div>
      <div class="bg-dark-dark max-w-6xl px-10 py-10 mx-auto mt-8 text-left rounded text-white">
        <p class="sm:text-xl font-semibold text-gray-200">Contributors:</p>
        <ul class="list-disc ml-10">
          <li>Lead Developer: Coding#0001</li>
          <li>Major Contributor: Megumin</li>
          <li>Etc etc</li>
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
      
    }
  },
}
</script>
