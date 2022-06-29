<script setup lang="ts">
import RelationshipList from '~/components/web3/nft/dialog/relationshipList.vue'
import { chatLink, shortAddress } from '~/helpers/web3'

const { isOwner } = $(web3Store())
const route = useRoute()
const userWalletAddress = $computed(() => route.params.userWalletAddress)

watch(
  () => route.params.userWalletAddress,
  async(address) => {
    console.log('====> address :', address)
    // userData.value = await fetchUser(newId)
  },
)

const { followers, followings, execute } = $(useIdentity($$(userWalletAddress)))
// const { profile } = $(useCeramic($$(userWalletAddress)))

const profile = $computed(() => {
  const index = parseInt(userWalletAddress.substr(-2), 16) % 8 + 1
  const banner = `/tmp/banners/cover-${index}.jpg`
  return {
    banner,
  }
})
// use data
const isMyself = $computed(() => {
  return isOwner(userWalletAddress)
})

const isShowFollowers = $ref(false)
const isShowFollowings = $ref(false)

const doUpdate = async() => {
  await execute({ cachePolicy: 'network-only' })
}

const descMap = {
  '0xc6e58fb4affb6ab8a392b7cc23cd3fef74517f6c': 'Web3Hacker Ninja: A group of Web3 Hacker who is working solo(with full-stack skills), Building all the good things for humans and expanding To the Mars',
}
const desc = $computed(() => {
  return descMap[userWalletAddress] || 'user is lazy, say nothing here yet'
})
</script>

<template>
  <div class="w-full">
    <div>
      <div class="mt-2">
        <img class="rounded-lg object-cover h-80 w-full" :src="profile.banner" alt="">
      </div>
      <div class="mx-auto  px-10">
        <div class="-mt-12 sm:flex sm:space-x-5 sm:-mt-16 sm:items-center">
          <div class="flex">
            <!-- <img class="rounded-full h-60 ring-white ring-4 w-60 sm:h-60 sm:w-60" :src="profile.avatar" alt=""> -->
            <EthAvatar :address="userWalletAddress" class="rounded-full h-80 ring-white ring-4 w-80 sm:h-80 sm:w-80" />
          </div>
          <div class="mt-6 sm:flex sm:space-x-6 sm:flex-1 sm:min-w-0 sm:pb-1 sm:items-center sm:justify-end">
            <div class="flex flex-row flex-1 mt-6 min-w-0 justify-between sm:hidden md:block">
              <h1 class="flex font-bold pt-10 text-2xl text-gray-900 truncate justify-start items-center">
                <span class="flex-1 mr-4">{{ shortAddress(userWalletAddress) }}</span>
                <div class="flex font-normal h-10 text-base py-2 justify-between items-center ">
                  <div class="hover:(cursor-pointer underline) " @click="isShowFollowers = true">
                    <strong>{{ followers.length }}</strong> followers
                  </div>
                  <div class="mx-4 hover:(cursor-pointer underline) " @click="isShowFollowings = true">
                    <strong>{{ followings.length }}</strong> followings
                  </div>
                  <Web3NftBtnFollow :address="userWalletAddress" @update="doUpdate" />
                  <a :href="chatLink(userWalletAddress)" target="_blank" class="bg-white border rounded-md font-medium border-gray-300 shadow-sm text-sm ml-2 py-2 px-4 text-gray-700 items-center inline-flex justify-center hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500">
                    <bi:chat class="h-5 mr-2 -ml-1 text-gray-400 w-5" aria-hidden="true" />
                    <span>Chat</span>
                  </a>
                </div>
                <router-link v-if="isMyself" to="/settings/Web3Home" class="bg-white border rounded-md font-medium border-gray-300 shadow-sm text-sm ml-2 py-2 px-4 text-gray-700 inline-flex justify-center hover:bg-gray-50 focus:outline-none ">
                  <ci:edit class="h-5 mr-2 -ml-1 text-gray-400 w-5" aria-hidden="true" />
                  <span>Edit</span>
                </router-link>
              </h1>
              <div class="py-8 pr-10 desc">
                {{ desc }}
              </div>
              <div v-if="true" class="flex flex-row space-y-3  mt-6 justify-start items-center sm:flex-row sm:space-y-0 sm:space-x-4">
                <Web3NftBtnMintNFT :address="userWalletAddress" />
                <Web3NftBtnVoteUpDown :address="userWalletAddress" />
                <Web3NftBtnSubscribe :address="userWalletAddress" />
              </div>
            </div>
          </div>
        </div>
        <div class="flex-1 mt-6 min-w-0 hidden sm:block md:hidden">
          <h1 class="font-bold text-2xl text-gray-900 truncate">
            {{ profile.name }}
          </h1>
        </div>
      </div>
    </div>

    <div class="flex w-full pt-10">
      <div class="pr-8 w-3/4">
        <!-- <Web3NftNftList :address="userWalletAddress" /> -->
        <Web3NftNftListBlockDaemon :address="userWalletAddress" />
        <!-- <Web3NftBlogList :address="userWalletAddress" />
        <Web3NftCommentList :address="userWalletAddress" /> -->
      </div>
      <Web3NftLinkTree :address="userWalletAddress" class="w-1/4" />
    </div>

    <RelationshipList :show="isShowFollowers" :items="followers" @close="isShowFollowers = false" />
    <RelationshipList :show="isShowFollowings" :items="followings" @close="isShowFollowings = false" />
  </div>
</template>

<route lang="yaml">
meta:
  layout: web3nft.social
</route>
