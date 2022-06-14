<script setup lang="ts">
import logoImg from './assets/logo.png'
import menuImg from './assets/menu.png'
import * as ls from '~/helpers/ls'

const { availableLocales, locale } = useI18n()
const showMenu = ref(false)
const toggleLocales = () => {
  // change to some real logic
  const locales = availableLocales
  locale.value = locales[(locales.indexOf(locale.value) + 1) % locales.length]
  ls.setItem('locale', locale.value)
}
</script>

<template>
  <header class="flex mx-auto  w-full p-40px z-1 justify-between items-center relative" lg="w-1280px">
    <router-link to="/" class="cursor-pointer flex h-48px w-205px items-center">
      <img :src="logoImg">
    </router-link>
    <div class="bg-black flex-column w-full p-40px top-122px left-0 text-28px absolute" :class="showMenu ? '' : 'hidden'" lg="flex py-0 px-120px flex-1 justify-between relative top-auto left-auto bg-transparent text-18px mr-100px">
      <router-link to="/#" class="flex py-10px items-center" lg="py-0">
        <span class="ml-20px" lg="ml-10px">{{ $t('topNav.Designer') }}</span>
      </router-link>
      <router-link to="/#" class="flex py-10px items-center" lg="py-0">
        <span class="ml-20px" lg="ml-10px">{{ $t('topNav.Series') }}</span>
      </router-link>
      <router-link to="/#" class="flex py-10px items-center" lg="py-0">
        <span class="ml-20px" lg="ml-10px">J·D DAO</span>
      </router-link>
      <a href="https://docs-en.cryptotoys.club" target="_blank" class="flex py-10px items-center" lg="py-0">
        <span class="ml-20px" lg="ml-10px">{{ $t('topNav.White Paper') }}</span>
      </a>
      <a
        class="bg-white rounded-full cursor-pointer h-7 text-black text-center leading-7 w-7 items-center"
        lg="py-0" @click="toggleLocales"
      >{{ locale }}</a>
    </div>
    <div class="h-48px w-48px" lg="hidden" @click="showMenu = !showMenu">
      <img :src="menuImg">
    </div>
  </header>
</template>
