<script setup lang="ts">
import axios from 'axios'
//
const openseaTokenLink = item => `https://opensea.io/assets/${item.contract_address}/${item.token_id}`
interface Props {
  address: string
}
const {
  address,
} = defineProps<Props>()

let isLoading = $ref(true)
const apiKey = 'bd1bcJumoki064u81lJOJA3Cr6K5sdLx4WKDWAXV9RE0G1v'
const apiKeyParamStr = `&apiKey=${apiKey}`
const pageSize = 12
const url = $computed(() => `https://ubiquity.api.blockdaemon.com/v1/nft/ethereum/mainnet/assets?page_size=${pageSize}&wallet_address=${address}${apiKeyParamStr}`)
const { isFetching, error, data, execute } = useFetch($$(url), { refetch: true, immediate: false }).get().json()

let items = $ref([])
const total = $computed(() => get(data, 'value.data.total', 0))

watch(isFetching, (val) => {
  isLoading = val
})

watchEffect(() => {
  if (!address) return
  execute()
})

const jwtHeader = {
  headers: { Authorization: `Bearer ${apiKey}` },
}

watchEffect(async() => {
  let validateNfts = get(data, 'value.data', [])
  if (validateNfts.length === 0) {
    items = []
    return
  }

  validateNfts = await Promise.all(validateNfts.map(async(item) => {
    const imgUrl = item.image_url
    if (!imgUrl)
      return item

    const r = await axios.get(imgUrl, { ...jwtHeader, responseType: 'arraybuffer' })
    const d = Buffer.from(r.data).toString('base64')
    const src = `data:image/png;base64, ${d}`
    item.image_url = src
    return item
  }))

  items = validateNfts
})

const openseaUserHome = $computed(() => `https://opensea.io/${address}`)
const placeHolderImg = 'https://storage.googleapis.com/opensea-static/Logomark/Logomark-Transparent%20White.png'
</script>
<template>
  <div class="pb-10">
    <div v-if="isLoading" class="flex p-10 justify-center items-center">
      <eos-icons:loading class="h-10 w-10" />
    </div>
    <div v-else-if="error" class="flex p-10 justify-center items-center">
      {{ error }}
    </div>
    <div v-else-if="items.length">
      <!-- <div class="border border-gray-200 mb-5 p-5">
        <a class="font-medium  text-lg text-right text-gray-900 leading-6 block hover:underline" :href="openseaUserHome" target="_blank">
          All My NFTs ({{ total }})
        </a>
      </div> -->
      <ul role="list" class="grid gap-x-4 gap-y-8 grid-cols-1 sm:gap-x-6 sm:grid-cols-3 lg:grid-cols-4 xl:gap-x-8">
        <li v-for="item in items" :key="item.source" class="relative">
          <div class="rounded-lg bg-gray-100 w-full group block overflow-hidden aspect-w-5 aspect-h-7 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500">
            <img :src="item.image_url || placeHolderImg" alt="" class="object-cover pointer-events-none group-hover:opacity-75">
            <a :href="openseaTokenLink(item)" target="_blank" class="inset-0 absolute focus:outline-none">
              <span class="sr-only">View details for {{ item.name }}# {{ item.token_id }}</span>
            </a>
          </div>
          <p class="font-medium mt-2 text-sm text-gray-900 block truncate pointer-events-none">
            {{ item.title }}
          </p>
          <p class="font-medium text-sm text-gray-500 block pointer-events-none">
            {{ item.size }}
          </p>
        </li>
      </ul>
    </div>
    <div v-else class="flex border-1 p-10 justify-center items-center">
      <h2 class="font-bold">
        User don't have any NFT yet.
      </h2>
    </div>
  </div>
</template>
