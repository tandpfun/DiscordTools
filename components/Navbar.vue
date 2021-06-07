<template>
  <nav class="relative flex flex-wrap items-center justify-between px-2 py-5 navbar-expand-lg lg:bg-dark-darker mb-3 transition duration-500" :class="showMenu ? ' bg-dark-darkest' : ''">
      <div class="max-w-7xl container px-4 mx-auto flex flex-wrap items-center justify-between mobilenav">
        <div class="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <NuxtLink to="/"><span class="px-3 py-2 flex items-center text-sm leading-snug font-bold text-white"><font-awesome-icon class="h-11 px-2 logo-icon" :icon="['fas', 'crown']"/></span></NuxtLink>
            <button class="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none" type="button" v-on:click="toggleNavbar()">
                <font-awesome-icon :icon="['fas', 'bars']"/>
            </button>
        </div>
        <div class="navbar-container hidden lg:flex flex-grow items-center">
            <div class="flex flex-row">
                <div class="nav-item ml-2 px-2 py-2">
                    <NuxtLink to="/">
                        <span v-bind:class="($nuxt.$route.name==='index'?'nav-link-active opactity-100':'nav-link opacity-80 hover:opacity-100')+' flex items-center font-medium text-base leading-snug text-white relative transition tracking-wide'">Home</span>
                    </NuxtLink>
                </div>
                <div class="nav-item ml-2 px-2 py-2">
                    <NuxtLink to="/commands">
                        <span v-bind:class="($nuxt.$route.name==='commands'?'nav-link-active opactity-100':'nav-link opacity-80 hover:opacity-100')+' flex items-center font-medium text-base leading-snug text-white relative transition tracking-wide'">Commands</span>
                    </NuxtLink>
                </div>
                <div class="nav-item ml-2 px-2 py-2">
                    <a href="/support" target="_blank">
                        <span v-bind:class="($nuxt.$route.name==='support'?'nav-link-active opactity-100':'nav-link opacity-80 hover:opacity-100')+' flex items-center font-medium text-base leading-snug text-white relative transition tracking-wide'">Support</span>
                    </a>
                </div>
                <div class="nav-item ml-2 px-2 py-2">
                    <NuxtLink to="/premium">
                        <span v-bind:class="($nuxt.$route.name==='premium'?'nav-link-active opactity-100':'nav-link opacity-80 hover:opacity-100')+' flex items-center font-medium text-base leading-snug text-white relative transition tracking-wide'">Premium</span>
                    </NuxtLink>
                </div>
                <div class="nav-item ml-2 px-2 py-2">
                    <NuxtLink to="/status">
                        <span v-bind:class="($nuxt.$route.name==='status'?'nav-link-active opactity-100':'nav-link opacity-80 hover:opacity-100')+' flex items-center font-medium text-base leading-snug text-white relative transition tracking-wide'">Status</span>
                    </NuxtLink>
                </div>
                <div class="nav-item ml-2 px-2 py-2">
                    <a href="https://docs.channelbot.xyz" target="_blank">
                        <span v-bind:class="($nuxt.$route.name==='docs'?'nav-link-active opactity-100':'nav-link opacity-80 hover:opacity-100')+' flex items-center font-medium text-base leading-snug text-white relative transition tracking-wide'">Docs</span>
                    </a>
                </div>
            </div>
            <div v-if="!loggedIn" class="nav-item ml-auto">
                <NuxtLink to="/dash">
                    <div class="bg-indigo-500 transform hover:-translate-y-0.5 hover:shadow-md text-white font-bold py-3 px-7 rounded transition duration-250 border-b-4 border-indigo-600">
                        Dashboard
                    </div>
                </NuxtLink>
            </div>
            <div v-else class="nav-item ml-auto relative inline-block" ref="dropdown">
                <a class="transform hover:opacity-80 opacity-100 text-white font-semibold px-7 rounded transition duration-250 cursor-pointer" @click="toggleDropdown">
                    {{ user.username }}#{{ user.discriminator }} <font-awesome-icon class="ml-1" :icon="['fas', 'chevron-down']"/>
                </a>
                <transition name="menu-fade">
                    <div v-if="showDropdown" class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-dark-darkest ring-1 ring-white ring-opacity-5 divide-y divide-gray-700 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                        <div class="py-1" role="none">
                            <NuxtLink to="/dash"><span @click="toggleDropdown" class="text-gray-200 block px-4 py-2 text-sm hover:bg-dark-darker hover:text-gray-100 transition duration-250" role="menuitem" tabindex="-1" id="menu-item-0">Dashboard</span></NuxtLink>
                            <a href="/support" target="_blank" @click="toggleDropdown" class="text-gray-200 block px-4 py-2 text-sm hover:bg-dark-darker hover:text-gray-100 transition duration-250" role="menuitem" tabindex="-1" id="menu-item-1">Support</a>
                        </div>
                        <div class="py-1" role="none">
                            <a href="/logout" class="text-red-400 font-semibold block px-4 py-2 text-sm hover:bg-dark-darker hover:text-red-500 transition duration-250" role="menuitem" tabindex="-1" id="menu-item-6">Log Out</a>
                        </div>
                    </div>
                </transition>
            </div>
        </div>
        <transition name="height">
            <div v-if="showMenu" class="flex items-center overflow-hidden navbar-expanded w-full block lg:hidden" ref="mobileNav">
                <div class="flex flex-col">
                    <div class="nav-item ml-2 px-2 py-2">
                        <NuxtLink to="/">
                            <span v-bind:class="($nuxt.$route.name==='index'?'nav-link-active opactity-100':'nav-link opacity-80 hover:opacity-100')+' flex items-center font-medium text-base leading-snug text-white relative transition'">Home</span>
                        </NuxtLink>
                    </div>
                    <div class="nav-item ml-2 px-2 py-2">
                        <NuxtLink to="/commands">
                            <span v-bind:class="($nuxt.$route.name==='commands'?'nav-link-active opactity-100':'nav-link opacity-80 hover:opacity-100')+' flex items-center font-medium text-base leading-snug text-white relative transition'">Commands</span>
                        </NuxtLink>
                    </div>
                    <div class="nav-item ml-2 px-2 py-2">
                        <a href="/support" target="_blank">
                            <span v-bind:class="($nuxt.$route.name==='support'?'nav-link-active opactity-100':'nav-link opacity-80 hover:opacity-100')+' flex items-center font-medium text-base leading-snug text-white relative transition'">Support</span>
                        </a>
                    </div>
                    <div class="nav-item ml-2 px-2 py-2">
                        <NuxtLink to="/premium">
                            <span v-bind:class="($nuxt.$route.name==='premium'?'nav-link-active opactity-100':'nav-link opacity-80 hover:opacity-100')+' flex items-center font-medium text-base leading-snug text-white relative transition'">Premium</span>
                        </NuxtLink>
                    </div>
                    <div class="nav-item ml-2 px-2 py-2">
                        <NuxtLink to="/status">
                            <span v-bind:class="($nuxt.$route.name==='status'?'nav-link-active opactity-100':'nav-link opacity-80 hover:opacity-100')+' flex items-center font-medium text-base leading-snug text-white relative transition'">Status</span>
                        </NuxtLink>
                    </div>
                    <div class="nav-item ml-2 px-2 py-2">
                        <a href="https://docs.channelbot.xyz" target="_blank">
                            <span v-bind:class="($nuxt.$route.name==='docs'?'nav-link-active opactity-100':'nav-link opacity-80 hover:opacity-100')+' flex items-center font-medium text-base leading-snug text-white relative transition'">Docs</span>
                        </a>
                    </div>
                </div>
                <div v-if="!loggedIn" class="nav-item ml-auto">
                    <NuxtLink to="/dash">
                        <div class="bg-indigo-500 transform hover:-translate-y-0.5 hover:shadow-md text-white font-bold py-3 px-7 rounded transition duration-250 border-b-4 border-indigo-600">
                            Dashboard
                        </div>
                    </NuxtLink>
                </div>
                <div v-else class="nav-item ml-auto relative inline-block" ref="mobiledropdown">
                    <a class="transform opacity-80 text-white font-semibold px-7 rounded transition duration-250 cursor-pointer" @click="toggleMobileDropdown">
                        {{ user.username }}#{{ user.discriminator }} <font-awesome-icon class="ml-1" :icon="['fas', 'chevron-down']"/>
                    </a>
                    <transition name="menu-fade">
                        <div v-if="showMobileDropdown" class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-dark-darkest ring-1 ring-white ring-opacity-5 divide-y divide-gray-700 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                            <div class="py-1" role="none">
                                <NuxtLink to="/dash"><span @click="toggleMobileDropdown" class="text-gray-200 block px-4 py-2 text-sm hover:bg-dark-darker hover:text-gray-100 transition duration-250" role="menuitem" tabindex="-1" id="menu-item-0">Dashboard</span></NuxtLink>
                                <a href="/logout" class="text-red-400 font-semibold block px-4 py-2 text-sm hover:bg-dark-darker hover:text-red-500 transition duration-250" role="menuitem" tabindex="-1" id="menu-item-6">Log Out</a>
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
      content: "";
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
        content: "";
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

.height-enter-active, .height-leave-active {
    transition: all 0.2s;
    max-height: 230px;
    overflow: hidden;
}

.height-enter, .height-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
    max-height: 0px;
}

.menu-fade-enter-active, .menu-fade-leave-active {
  transition: opacity .2s;
}
.menu-fade-enter, .menu-fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.logo-icon {
    transition: transform .7s ease-in-out;
}

.logo-icon:hover {
  transform: rotate(360deg);
}
</style>

<script>
import axios from 'axios'
export default {
  name: "navbar",
  data() {
    return {
      showMenu: false,
      showDropdown: false,
      showMobileDropdown: false,
      loggedIn: false,
      user: {}
    }
  },
  methods: {
    toggleNavbar: function(){
      this.showMenu = !this.showMenu;
    },
    toggleDropdown: function(){
      this.showDropdown = !this.showDropdown;
    },
    toggleMobileDropdown: function(){
      this.showMobileDropdown = !this.showMobileDropdown;
    },
    closeDropdown: function(e) {
        if (this.$refs.dropdown) {
            if (!this.$refs.dropdown.contains(e.target)) {
                this.showDropdown = false
            }
        }
    },
    async fetchUser () {
        await axios.get(process.env.baseUrl + '/api/users/@me').then(req => {
            this.user = req.data
            this.loggedIn = true
        }).catch(h => h)
        }
    },
    async mounted() {
        if (process.client) {
            this.$nextTick(async () => {
                await this.fetchUser()
                document.addEventListener('click', this.closeDropdown)
            })
        }
    },
    beforeDestroy () {
        document.removeEventListener('click', this.closeDropdown)
    }
}
</script>
