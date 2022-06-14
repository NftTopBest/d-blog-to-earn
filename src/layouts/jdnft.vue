<script setup lang="ts">
useHead({
  link: [
    { rel: 'icon', href: '/site-icon-cryptotoys.club/pwa-192x192.png', type: 'image/png' },
    { rel: 'apple-touch-icon', href: '/site-icon-cryptotoys.club/pwa-192x192.png' },
    { rel: 'mask-icon', href: '/site-icon-cryptotoys.club/pwa-192x192.png', color: '#00aba9' },
  ],
})
</script>
<template>
  <div class="bg-black flex flex-col min-w-sm text-white relative overflow-hidden">
    <JdnftTopNav />
    <main class="flex flex-col mx-auto flex-1 w-full justify-center items-center">
      <router-view />
    </main>
    <div class="border-b border-b-blue-400">
      <JdnftFooter />
    </div>
    <div class="mb-50px" />
  </div>
</template>

<style scoped>

</style>
