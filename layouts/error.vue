<template>
  <div class="sm:mt-12 md:mt-16 lg:mt-24 xl:mt-40 sm:mb-12 md:mb-16 lg:mb-24 xl:mb-40 content-center mt-10 mb-10">
    <div class="mx-auto my-10 text-center">
      <h1 class="text-white text-center text-8xl font-extrabold" v-if="error.statusCode === 404">404</h1>
      <h1 class="text-8xl font-extrabold text-center text-white" v-else>Error</h1>

      <h3 class="my-2 text-2xl font-bold text-center text-white" v-if="error.statusCode === 404">The requested URL was not found.</h3>
      <h3 class="my-2 text-2xl font-bold text-center text-white" v-else>An unknown error occurred.</h3>

      <NuxtLink class="flex justify-center" to="/">
        <button class="bg-discord-blurple transform hover:-translate-y-0.5 hover:shadow-md text-white font-bold mt-3 py-2 px-5 rounded transition duration-250">
          Home Page
        </button>
      </NuxtLink>
    </div>
    <noscript><img src="https://sa.channelbot.xyz/noscript.gif" alt="" /></noscript>
  </div>
</template>

<script>
export default {
  props: ['error'],
  layout: 'error', // you can set a custom layout for the error page
}
</script>

<style>
html {
  /* font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";*/
  font-family: 'Rubik', sans-serif;
  background: #1d1e22;
}
</style>
