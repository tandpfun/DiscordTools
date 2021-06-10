<template>
  <nav
    class="navbar-expand-lg lg:bg-dark-darker relative flex flex-wrap items-center justify-between px-2 py-5 mb-3 transition duration-500"
    :class="showMenu ? ' bg-dark-darkest' : ''"
  >
    <div class="max-w-7xl mobilenav container flex flex-wrap items-center justify-between px-4 mx-auto">
      <div class="lg:w-auto lg:static lg:block lg:justify-start relative flex justify-between w-full">
        <NuxtLink to="/"
          ><span class="flex items-center px-3 py-2 text-5xl font-bold leading-snug text-white"><font-awesome-icon class="h-11 logo-icon px-2" :icon="['fas', 'wrench']" /></span
        ></NuxtLink>
        <button
          class="
            lg:hidden
            focus:outline-none
            block
            px-3
            py-1
            text-xl
            leading-none
            text-white
            bg-transparent
            border border-transparent border-solid
            rounded
            outline-none
            cursor-pointer
          "
          type="button"
          v-on:click="toggleNavbar()"
        >
          <font-awesome-icon :icon="['fas', 'bars']" />
        </button>
      </div>
      <div class="navbar-container lg:flex items-center flex-grow hidden">
        <div class="flex flex-row">
          <div class="nav-item px-2 py-2 ml-2">
            <NuxtLink to="/">
              <span
                v-bind:class="
                  ($nuxt.$route.name === 'index' ? 'nav-link-active opactity-100' : 'nav-link opacity-80 hover:opacity-100') +
                  ' flex items-center font-medium text-base leading-snug text-white relative transition tracking-wide'
                "
                >Home</span
              >
            </NuxtLink>
          </div>
          <div class="nav-item px-2 py-2 ml-2">
            <NuxtLink to="/tools">
              <span
                v-bind:class="
                  ($nuxt.$route.name === 'tools' ? 'nav-link-active opactity-100' : 'nav-link opacity-80 hover:opacity-100') +
                  ' flex items-center font-medium text-base leading-snug text-white relative transition tracking-wide'
                "
                >Tools</span
              >
            </NuxtLink>
          </div>
          <div class="nav-item px-2 py-2 ml-2">
            <NuxtLink to="/guildcount">
              <span
                v-bind:class="
                  ($nuxt.$route.name === 'guildcount' ? 'nav-link-active opactity-100' : 'nav-link opacity-80 hover:opacity-100') +
                  ' flex items-center font-medium text-base leading-snug text-white relative transition tracking-wide'
                "
                >Guild Count</span
              >
            </NuxtLink>
          </div>
          <div class="nav-item px-2 py-2 ml-2">
            <NuxtLink to="/snowflake">
              <span
                v-bind:class="
                  ($nuxt.$route.name === 'snowflake' ? 'nav-link-active opactity-100' : 'nav-link opacity-80 hover:opacity-100') +
                  ' flex items-center font-medium text-base leading-snug text-white relative transition tracking-wide'
                "
                >Snowflake</span
              >
            </NuxtLink>
          </div>
          <div class="nav-item px-2 py-2 ml-2">
            <NuxtLink to="/status">
              <span
                v-bind:class="
                  ($nuxt.$route.name === 'status' ? 'nav-link-active opactity-100' : 'nav-link opacity-80 hover:opacity-100') +
                  ' flex items-center font-medium text-base leading-snug text-white relative transition tracking-wide'
                "
                >Status</span
              >
            </NuxtLink>
          </div>
          <div class="nav-item px-2 py-2 ml-2">
            <NuxtLink to="/about">
              <span
                v-bind:class="
                  ($nuxt.$route.name === 'about' ? 'nav-link-active opactity-100' : 'nav-link opacity-80 hover:opacity-100') +
                  ' flex items-center font-medium text-base leading-snug text-white relative transition tracking-wide'
                "
                >About</span
              >
            </NuxtLink>
          </div>
        </div>
        <div v-if="!loggedIn" class="nav-item ml-auto">
          <a href="/login">
            <div class="bg-discord-blurple transform hover:-translate-y-0.5 hover:shadow-xl text-white font-bold py-3 px-7 rounded-md transition duration-250">Log In</div>
          </a>
        </div>
        <div v-else class="nav-item relative inline-block ml-auto" ref="dropdown">
          <a class="hover:opacity-80 px-7 duration-250 font-semibold text-white transition transform rounded opacity-100 cursor-pointer" @click="toggleDropdown">
            {{ user.username }}#{{ user.discriminator }}
            <font-awesome-icon class="ml-1" :icon="['fas', 'chevron-down']" />
          </a>
          <transition name="menu-fade">
            <div
              v-if="showDropdown"
              class="bg-dark-darkest ring-1 ring-white ring-opacity-5 focus:outline-none absolute right-0 w-56 mt-2 origin-top-right divide-y divide-gray-700 rounded-md shadow-lg"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
              tabindex="-1"
            >
              <div class="py-1" role="none">
                <NuxtLink to="/guildcount"
                  ><span
                    @click="toggleDropdown"
                    class="hover:bg-dark-darker hover:text-gray-100 duration-250 block px-4 py-2 text-sm text-gray-200 transition"
                    role="menuitem"
                    tabindex="-1"
                    id="menu-item-0"
                    >Guild Count</span
                  ></NuxtLink
                >
              </div>
              <div class="py-1" role="none">
                <a
                  href="/logout"
                  class="hover:bg-dark-darker hover:text-red-500 duration-250 block px-4 py-2 text-sm font-semibold text-red-400 transition"
                  role="menuitem"
                  tabindex="-1"
                  id="menu-item-6"
                  >Log Out</a
                >
              </div>
            </div>
          </transition>
        </div>
      </div>
      <transition name="height">
        <div v-if="showMenu" class="navbar-expanded lg:hidden flex items-center block w-full overflow-hidden" ref="mobileNav">
          <div class="flex flex-col">
            <div class="nav-item px-2 py-2 ml-2">
              <NuxtLink to="/">
                <span
                  v-bind:class="
                    ($nuxt.$route.name === 'index' ? 'nav-link-active opactity-100' : 'nav-link opacity-80 hover:opacity-100') +
                    ' flex items-center font-medium text-base leading-snug text-white relative transition'
                  "
                  >Home</span
                >
              </NuxtLink>
            </div>
            <div class="nav-item px-2 py-2 ml-2">
              <NuxtLink to="/tools">
                <span
                  v-bind:class="
                    ($nuxt.$route.name === 'tools' ? 'nav-link-active opactity-100' : 'nav-link opacity-80 hover:opacity-100') +
                    ' flex items-center font-medium text-base leading-snug text-white relative transition'
                  "
                  >Tools</span
                >
              </NuxtLink>
            </div>
            <div class="nav-item px-2 py-2 ml-2">
              <NuxtLink to="/guildcount">
                <span
                  v-bind:class="
                    ($nuxt.$route.name === 'guildcount' ? 'nav-link-active opactity-100' : 'nav-link opacity-80 hover:opacity-100') +
                    ' flex items-center font-medium text-base leading-snug text-white relative transition'
                  "
                  >Guild Count</span
                >
              </NuxtLink>
            </div>
            <div class="nav-item px-2 py-2 ml-2">
              <NuxtLink to="/snowflake">
                <span
                  v-bind:class="
                    ($nuxt.$route.name === 'snowflake' ? 'nav-link-active opactity-100' : 'nav-link opacity-80 hover:opacity-100') +
                    ' flex items-center font-medium text-base leading-snug text-white relative transition'
                  "
                  >Snowflake</span
                >
              </NuxtLink>
            </div>
            <div class="nav-item px-2 py-2 ml-2">
              <NuxtLink to="/status">
                <span
                  v-bind:class="
                    ($nuxt.$route.name === 'status' ? 'nav-link-active opactity-100' : 'nav-link opacity-80 hover:opacity-100') +
                    ' flex items-center font-medium text-base leading-snug text-white relative transition'
                  "
                  >Status</span
                >
              </NuxtLink>
            </div>
            <div class="nav-item px-2 py-2 ml-2">
              <NuxtLink to="/about">
                <span
                  v-bind:class="
                    ($nuxt.$route.name === 'about' ? 'nav-link-active opactity-100' : 'nav-link opacity-80 hover:opacity-100') +
                    ' flex items-center font-medium text-base leading-snug text-white relative transition'
                  "
                  >About</span
                >
              </NuxtLink>
            </div>
          </div>
          <div v-if="!loggedIn" class="nav-item ml-auto">
            <a href="/login">
              <div class="bg-discord-blurple transform hover:-translate-y-0.5 hover:shadow-xl text-white font-bold py-3 px-7 rounded-md transition duration-250">Log In</div>
            </a>
          </div>
          <div v-else class="nav-item relative inline-block ml-auto" ref="mobiledropdown">
            <a class="opacity-80 px-7 duration-250 font-semibold text-white transition transform rounded cursor-pointer" @click="toggleMobileDropdown">
              {{ user.username }}#{{ user.discriminator }}
              <font-awesome-icon class="ml-1" :icon="['fas', 'chevron-down']" />
            </a>
            <transition name="menu-fade">
              <div
                v-if="showMobileDropdown"
                class="
                  bg-dark-darkest
                  ring-1 ring-white ring-opacity-5
                  focus:outline-none
                  absolute
                  right-0
                  w-48
                  mt-2
                  origin-top-right
                  divide-y divide-gray-700
                  rounded-md
                  shadow-lg
                "
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
                tabindex="-1"
              >
                <div class="py-1" role="none">
                  <NuxtLink to="/guildcount"
                    ><span
                      @click="toggleMobileDropdown"
                      class="hover:bg-dark-darker hover:text-gray-100 duration-250 block px-4 py-2 text-sm text-gray-200 transition"
                      role="menuitem"
                      tabindex="-1"
                      id="menu-item-0"
                      >Guild Count</span
                    ></NuxtLink
                  >
                  <a
                    href="/logout"
                    class="hover:bg-dark-darker hover:text-red-500 duration-250 block px-4 py-2 text-sm font-semibold text-red-400 transition"
                    role="menuitem"
                    tabindex="-1"
                    id="menu-item-6"
                    >Log Out</a
                  >
                </div>
              </div>
            </transition>
          </div>
        </div>
      </transition>
    </div>
  </nav>
</template>

<style>
@media screen and (min-width: 1024px) {
  .nav-link::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: #fff;
    visibility: hidden;
    transform: scaleX(0);
    transition: all 0.3s ease-in-out 0s;
  }

  .nav-link:hover::before {
    visibility: visible;
    transform: scaleX(1);
  }

  .nav-link-active::before {
    visibility: visible;
    transform: scaleX(1);
    content: '';
    position: absolute;
    width: 100%;
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: #fff;
    transition: all 0.3s ease-in-out 0s;
  }
}

.mobilenav {
  transition: height 1.5s ease;
}

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

.menu-fade-enter-active,
.menu-fade-leave-active {
  transition: opacity 0.2s;
}
.menu-fade-enter, .menu-fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.logo-icon {
  transition: transform 0.7s ease-in-out;
}

.logo-icon:hover {
  transform: rotate(360deg);
}
</style>

<script>
import axios from 'axios'
export default {
  name: 'navbar',
  data() {
    return {
      showMenu: false,
      showDropdown: false,
      showMobileDropdown: false,
      loggedIn: false,
      user: {},
    }
  },
  methods: {
    toggleNavbar: function () {
      this.showMenu = !this.showMenu
    },
    toggleDropdown: function () {
      this.showDropdown = !this.showDropdown
    },
    toggleMobileDropdown: function () {
      this.showMobileDropdown = !this.showMobileDropdown
    },
    closeDropdown: function (e) {
      if (this.$refs.dropdown) {
        if (!this.$refs.dropdown.contains(e.target)) {
          this.showDropdown = false
        }
      }
    },
    async fetchUser() {
      await axios
        .get(process.env.baseUrl + '/api/users/@me')
        .then((req) => {
          this.user = req.data
          this.loggedIn = true
        })
        .catch((h) => h)
    },
  },
  async mounted() {
    if (process.client) {
      this.$nextTick(async () => {
        await this.fetchUser()
        document.addEventListener('click', this.closeDropdown)
      })
    }
  },
  beforeDestroy() {
    document.removeEventListener('click', this.closeDropdown)
  },
}
</script>
