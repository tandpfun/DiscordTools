<template>
  <div class="main">
    <Navbar />
    <div class="content">
      <Nuxt />
    </div>
    <client-only>
      <script async defer src="https://sa.discordtools.io/latest.js"></script>
      <noscript><img src="https://sa.discordtools.io/noscript.gif" alt="" referrerpolicy="no-referrer-when-downgrade" /></noscript>
    </client-only>
  </div>
</template>

<style>
html {
  /* font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";*/
  font-family: 'Rubik', sans-serif;
  background: #1d1e22;
}
body::-webkit-scrollbar {
  width: 0.5em;
}

body::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgb(29, 29, 29);
}

body::-webkit-scrollbar-thumb {
  background-color: #131416;
  border-radius: 10px;
}

.main {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

.content {
  flex: 1;
}
</style>
