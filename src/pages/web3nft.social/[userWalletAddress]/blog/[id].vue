
<script setup lang="ts">
import axios from 'axios'
import { openseaContractLink } from '~/helpers/opensea'
import { litHelper } from '~/helpers/litHelper'
const litNodeClient = inject('litNodeClient')

const route = useRoute()
const { walletAddress } = $(web3Store())
let error = $ref('')

const id = $computed(() => route.params.id)
let isUnlocking = $ref(false)
const post = $ref({
  title: '',
  excerpt: '',
  content: '',
  nftContractAddress: '',
  isGating: false,
})

watchEffect(async() => {
  if (!id) return
  const rz = await axios.get(`https://gateway.pinata.cloud/ipfs/${id}`)
  post = rz.data
})

const doUnlock = async() => {
  isUnlocking = true
  const chain = 'rinkeby'

  const { encryptedSymmetricKey, encryptedString } = post.content
  const nftContractAddress = post.nftContractAddress
  const { doDecryptString } = await litHelper({ chain, walletAddress, litNodeClient })
  const { decryptedString, err } = await doDecryptString(encryptedSymmetricKey, encryptedString, nftContractAddress)
  if (err) {
    console.log('====> err :', err)
    error = err
    isUnlocking = false
    return
  }
  post.content = decryptedString
  isUnlocking = false
  post.isGating = false
  // console.log('====> decryptedString :', decryptedString)
}
</script>

<template>
  <div class="bg-white mt-4 py-16 pt-0 relative overflow-hidden">
    <figure>
      <img class="rounded-lg object-cover w-full max-h-100" :src="post.coverImg">
    </figure>
    <div class="px-4 pt-10 relative sm:px-6 lg:px-8">
      <div class="mx-auto max-w-prose text-lg">
        <h1>
          <span class="font-extrabold mt-2 text-center tracking-tight text-3xl text-gray-900 leading-8 block sm:text-4xl">{{ post.title }}</span>
        </h1>
        <p class="mt-8 text-xl text-gray-500 leading-8">
          {{ post.excerpt }}
        </p>
      </div>
      <div class="mx-auto mt-6 text-gray-500 prose prose-indigo prose-lg">
        <div v-if="post.isGating">
          <h3>The content is locked,<br>click to unlock it if you have the NFT: <a :href="openseaContractLink(post.nftContractAddress)" target="_blank">{{ post.nftContractAddress }}</a></h3>
          <btn-black class="py-10 text-2xl" :is-loading="isUnlocking" @click="doUnlock">
            Click Here to Unlocked
          </btn-black>
        </div>
        <div v-else v-html="post.content" />
      </div>
    </div>
    <DialogDefault :show="error != ''" @close="error=''">
      <p class="text-center text-xl py-6">
        {{ error.message || error }}
      </p>
      <btn-black :is-loading="false" @click="error=''">
        OK
      </btn-black>
    </DialogDefault>
  </div>
</template>
<route lang="yaml">
meta:
  layout: web3nft.social
</route>
