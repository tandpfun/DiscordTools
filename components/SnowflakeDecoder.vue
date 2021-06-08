<template>
  <div class="sm:pt-8 lg:pt-10 sm:pb-12 md:pb-16 lg:pb-24 xl:pb-40 bg-dark-darker mt-5 mb-5">
    <div class="align-center mx-5 text-center">
      <div class="sm:my-auto max-w-2xl mx-auto my-10">
        <h1 class="md:text-5xl mb-2 text-3xl font-bold text-gray-900">
          <span class="text-discord-blurple block">Snowflake Decoder</span>
        </h1>
        <p class="sm:text-xl text-md text-gray-200">Get the creation date of any snowflake ID.</p>
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
                <p v-if="!validateSnowflake(snowflake)" class="text-md text-gray-200 text-center">That doesn't look like a valid snowflake!</p>
                <div v-else class="text-center text-white">
                  <p class="text-xl text-gray-200 text-center">
                    <b>{{ (new Date().toString().split('(')[1] || '').slice(0, -1) }}:</b> {{ fetchTimestamp(snowflake).toLocaleString() }}
                  </p>
                  <p class="text-xl text-gray-200 text-center"><b>UNIX:</b> {{ fetchTimestamp(snowflake).getTime() / 1000 }}</p>
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
  },
  data() {
    return {
      snowflake: '',
    }
  },
}
</script>
