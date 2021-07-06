<template>
  <main class="hero max-w-7xl sm:px-6 lg:px-8 box flex content-center px-4 mx-auto">
    <div class="m-auto text-center">
      <h1 class="text-discord-blurple md:text-8xl mx-auto mt-5 text-5xl font-semibold">DiscordTools</h1>
      <h1 class="xl:text-4xl mt-2 text-3xl font-medium text-gray-100">Utilities for Power Users</h1>
      <div class="sm:mt-8 sm:flex justify-center mt-5">
        <div>
          <NuxtLink to="/tools">
            <button class="bg-discord-blurple transform hover:-translate-y-0.5 hover:shadow-md text-white font-bold py-3 px-7 rounded-lg transition duration-250">Tools</button>
          </NuxtLink>
        </div>
        <div class="sm:mt-0 sm:ml-3 mt-3">
          <a href="/login">
            <button class="bg-white transform hover:-translate-y-0.5 hover:shadow-md text-black font-bold py-3 px-7 rounded-lg transition duration-250">Log In</button>
          </a>
        </div>
      </div>
    </div>
  </main>
</template>

<style>
.hero {
  min-height: 70vh;
}
</style>

<script>
export default {
  methods: {},
}
</script>
