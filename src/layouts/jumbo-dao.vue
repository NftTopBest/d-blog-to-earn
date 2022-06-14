<script setup lang="ts">
const route = useRoute()
const isProjectListPage = computed(() => route.path === '/jumbo-dao/project')
</script>
<template>
  <div class="bg-black flex flex-col min-h-screen text-white">
    <JumboDaoTopNav />
    <JumboDaoSubmitProjectBanner v-if="isProjectListPage" />
    <main class="flex flex-1 justify-center">
      <div class="w-300">
        <router-view />
      </div>
    </main>
    <JumboDaoFooter />
  </div>
</template>
