<script setup lang="ts">
import logoImg from './assets/logo.png'
import twitterImg from './assets/twitter.png'
import telegramImg from './assets/telegram.png'
import discordImg from './assets/discord.png'
import bottomBgImg from './assets/bottomBg.png'

</script>

<template>
  <div class="mx-auto mt-120px p-40px pb-200px w-640px relative" lg="w-1024px mt-40px pb-60px">
    <div class="w-full px-27px">
      <div class="w-205px">
        <img :src="logoImg">
      </div>
      <div class="flex mt-45px w-320px justify-start">
        <a href="https://twitter.com/J_DCLUB" target="_blank"><img :src="twitterImg" class="h-60px mr-60px w-60px"></a>
        <!-- <a href="#" target="_blank"><img :src="telegramImg" class="h-60px mr-60px w-60px"></a> -->
        <a href="https://discord.com/invite/UEnKSYFk9B" target="_blank"><img :src="discordImg" class="h-60px mr-60px w-60px"></a>
      </div>
    </div>
    <img :src="bottomBgImg" class="h-190px right-0 bottom-[-7px] w-755px absolute">
  </div>
</template>
