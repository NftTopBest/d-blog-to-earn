<template>
  <div class="bg-gray-50 px-4 pt-16 pb-20 relative sm:px-6 lg:px-8 lg:pt-24 lg:pb-28">
    <div class="inset-0 absolute">
      <div class="bg-white h-1/3 sm:h-2/3" />
    </div>
    <div class="mx-auto max-w-7xl relative">
      <button class="rounded-full bg-red-500 border-1 text-white py-4 px-10 -top-20 right-1 absolute" @click="isShowPostNew = true">
        Post New
      </button>
      <div class="text-center">
        <h2 class="font-extrabold tracking-tight text-3xl text-gray-900 sm:text-4xl">
          From the blog
        </h2>
        <p class="mx-auto mt-3 text-xl max-w-2xl text-gray-500 sm:mt-4">
          All the thoughts for the Web3.
        </p>
      </div>
      <div class="mx-auto max-w-lg mt-12 grid gap-5 lg:max-w-none lg:grid-cols-3">
        <div v-for="post in posts" :key="post.title" class="rounded-lg flex flex-col shadow-lg overflow-hidden">
          <div class="flex-shrink-0 hidden">
            <img class="object-cover h-48 w-full" :src="post.imageUrl" alt="">
          </div>
          <div class="bg-white flex flex-col flex-1 p-6 justify-between">
            <div class="flex-1">
              <!-- <p class="font-medium text-sm text-indigo-600">
                <a :href="post.category.href" class="hover:underline">
                  {{ post.category.name }}
                </a>
              </p> -->
              <router-link :to="articleLink(post)" class="mt-2 block">
                <p class="font-semibold text-xl text-gray-900">
                  {{ post.title }}
                </p>
                <p class="mt-3 text-base text-gray-500">
                  {{ post.excerpt }}
                </p>
              </router-link>
            </div>
            <!-- <div class="flex mt-6 items-center hidden">
              <div class="flex-shrink-0">
                <a :href="post.author.href">
                  <span class="sr-only">{{ post.author.name }}</span>
                  <img class="rounded-full h-10 w-10" :src="post.author.imageUrl" alt="">
                </a>
              </div>
              <div class="ml-3">
                <p class="font-medium text-sm text-gray-900">
                  <a :href="post.author.href" class="hover:underline">
                    {{ post.author.name }}
                  </a>
                </p>
                <div class="flex space-x-1 text-sm text-gray-500">
                  <time :datetime="post.datetime">
                    {{ post.date }}
                  </time>
                  <span aria-hidden="true"> &middot; </span>
                  <span> {{ post.readingTime }} read </span>
                </div>
              </div>
            </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
  <Web3NftArticleForm :show="isShowPostNew" @close="formClose" />
</template>

<script setup lang="ts">
import axios from 'axios'

const route = useRoute()
const userWalletAddress = $computed(() => route.params.userWalletAddress)

const articleLink = (item) => {
  return `/${userWalletAddress}/blog/${item.id}`
}
const posts = $ref([
  {
    title: 'Boost your conversion rate',
    href: '#',
    category: { name: 'Article', href: '#' },
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto accusantium praesentium eius, ut atque fuga culpa, similique sequi cum eos quis dolorum.',
    date: 'Mar 16, 2020',
    datetime: '2020-03-16',
    imageUrl:
      'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80',
    readingTime: '6 min',
    author: {
      name: 'Roel Aufderehar',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
  {
    title: 'How to use search engine optimization to drive sales',
    href: '#',
    category: { name: 'Video', href: '#' },
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit facilis asperiores porro quaerat doloribus, eveniet dolore. Adipisci tempora aut inventore optio animi., tempore temporibus quo laudantium.',
    date: 'Mar 10, 2020',
    datetime: '2020-03-10',
    imageUrl:
      'https://images.unsplash.com/photo-1547586696-ea22b4d4235d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80',
    readingTime: '4 min',
    author: {
      name: 'Brenna Goyette',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
  {
    title: 'Improve your customer experience',
    href: '#',
    category: { name: 'Case Study', href: '#' },
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint harum rerum voluptatem quo recusandae magni placeat saepe molestiae, sed excepturi cumque corporis perferendis hic.',
    date: 'Feb 12, 2020',
    datetime: '2020-02-12',
    imageUrl:
      'https://images.unsplash.com/photo-1492724441997-5dc865305da7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80',
    readingTime: '11 min',
    author: {
      name: 'Daniela Metz',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
],
)
const isShowPostNew = $ref(false)

function validateAndReturnDate(dateToValidate) {
  const dateParsed = new Date(Date.parse(dateToValidate))

  try {
    if (dateParsed.toISOString() === dateToValidate)
      return dateToValidate

    throw new Error('dates must be in valid ISO_8601 format')
  }
  catch (e) {
    throw new Error('dates must be in valid ISO_8601 format')
  }
}

function queryBuilder(baseUrl, filters) {
  if (!baseUrl)
    throw new Error('no baseUrl provided')

  //  preset filter values
  let filterQuery = '?'

  let metadataQuery = ''

  if (filters) {
    //  now we need to construct the actual URL based on the given filters provided
    if (filters.hashContains) {
      if (typeof filters.hashContains !== 'string')
        throw new Error('hashContains value is not a string')

      filterQuery = `${filterQuery}hashContains=${filters.hashContains}&`
    }
    if (filters.pinStart)
      filterQuery = `${filterQuery}pinStart=${validateAndReturnDate(filters.pinStart)}&`

    if (filters.pinEnd)
      filterQuery = `${filterQuery}pinEnd=${validateAndReturnDate(filters.pinEnd)}&`

    if (filters.unpinStart)
      filterQuery = `${filterQuery}unpinStart=${validateAndReturnDate(filters.unpinStart)}&`

    if (filters.unpinEnd)
      filterQuery = `${filterQuery}unpinEnd=${validateAndReturnDate(filters.unpinEnd)}&`

    if (filters.pinSizeMin) {
      if (isNaN(filters.pinSizeMin) || filters.pinSizeMin < 0)
        throw new Error('Please make sure the pinSizeMin is a valid positive integer')

      filterQuery = `${filterQuery}pinSizeMin=${filters.pinSizeMin}&`
    }
    if (filters.pinSizeMax) {
      if (isNaN(filters.pinSizeMax) || filters.pinSizeMax < 0)
        throw new Error('Please make sure the pinSizeMax is a valid positive integer')

      filterQuery = `${filterQuery}pinSizeMax=${filters.pinSizeMax}&`
    }
    if (filters.status) {
      if (filters.status !== 'all' && filters.status !== 'pinned' && filters.status !== 'unpinned')
        throw new Error('status value must be either: all, pinned, or unpinned')

      filterQuery = `${filterQuery}status=${filters.status}&`
    }
    if (filters.pageLimit) {
      if (isNaN(filters.pageLimit) || filters.pageLimit <= 0 || filters.pageLimit > 1000)
        throw new Error('Please make sure the pageLimit is a valid integer between 1-1000')

      filterQuery = `${filterQuery}pageLimit=${parseInt(filters.pageLimit)}&` // we want to make sure that decimals get rounded to integers
    }

    if (filters.pageOffset) {
      if (isNaN(filters.pageOffset) || filters.pageOffset <= 0)
        throw new Error('Please make sure the pageOffset is a positive integer')

      filterQuery = `${filterQuery}pageOffset=${parseInt(filters.pageOffset)}&` // we want to make sure that decimals get rounded to integers
    }

    if (filters.metadata) {
      if (typeof filters.metadata !== 'object')
        throw new Error('metadata value must be an object')

      if (filters.metadata.name)
        metadataQuery = `metadata[name]=${filters.metadata.name}&`

      if (filters.metadata.keyvalues) {
        metadataQuery = `${metadataQuery}metadata[keyvalues]=`

        if (typeof filters.metadata.keyvalues !== 'object')
          throw new Error('metadata keyvalues must be an object')

        const prunedKeyValues = {} // we want to make sure we're only grabbing the values we want for the query, and nothing extra

        Object.entries(filters.metadata.keyvalues).forEach((keyValue) => {
          const key = keyValue[0]
          const value = keyValue[1]

          if (typeof value !== 'object')
            throw new Error(`keyValue: ${key} is not an object`)

          if (!value || !value.value || !value.op)
            throw new Error(`keyValue: ${key} must have both value and op attributes`)

          if ((typeof value.value !== 'string') && (typeof value.value !== 'boolean') && (typeof value.value !== 'number'))
            throw new Error('Metadata keyvalue values must be strings, booleans, or numbers')

          // Run checks to make sure all of the keyvalues are valid
          switch (value.op) {
            case 'gt':
              prunedKeyValues[key] = {
                value: value.value,
                op: value.op,
              }
              break
            // greater than or equal
            case 'gte':
              prunedKeyValues[key] = {
                value: value.value,
                op: value.op,
              }
              break
            // less than
            case 'lt':
              prunedKeyValues[key] = {
                value: value.value,
                op: value.op,
              }
              break
            // less than or equal
            case 'lte':
              prunedKeyValues[key] = {
                value: value.value,
                op: value.op,
              }
              break
            // not equal to
            case 'ne':
              prunedKeyValues[key] = {
                value: value.value,
                op: value.op,
              }
              break
            // equal to
            case 'eq':
              prunedKeyValues[key] = {
                value: value.value,
                op: value.op,
              }
              break
            // between
            case 'between':
              if (!value.secondValue)
                throw new Error(`Because between op code was passed in, keyValue: ${keyValue[0]} must have both also include a secondValue`)

              if ((typeof value.secondValue !== 'string') && (typeof value.secondValue !== 'boolean') && (typeof value.secondValue !== 'number'))
                throw new Error('Metadata keyvalue secondValue must be a string, boolean, or number')

              prunedKeyValues[key] = {
                value: value.value,
                op: value.op,
                secondValue: value.secondValue,
              }
              break
            // not between
            case 'notBetween':
              if (!value.secondValue)
                throw new Error(`Because notBetween op code was passed in, keyValue: ${keyValue[0]} must have both also include a secondValue`)

              if ((typeof value.secondValue !== 'string') && (typeof value.secondValue !== 'boolean') && (typeof value.secondValue !== 'number'))
                throw new Error('Metadata keyvalue secondValue must be a string, boolean, or number')

              prunedKeyValues[key] = {
                value: value.value,
                op: value.op,
                secondValue: value.secondValue,
              }
              break
            // like
            case 'like':
              prunedKeyValues[key] = {
                value: value.value,
                op: value.op,
              }
              break
            // not like
            case 'notLike':
              prunedKeyValues[key] = {
                value: value.value,
                op: value.op,
              }
              break
            // case insensitive like
            case 'iLike':
              prunedKeyValues[key] = {
                value: value.value,
                op: value.op,
              }
              break
            // case insensitive not like
            case 'notILike':
              prunedKeyValues[key] = {
                value: value.value,
                op: value.op,
              }
              break
            // regex
            case 'regexp':
              prunedKeyValues[key] = {
                value: value.value,
                op: value.op,
              }
              break
            // case insensitive regex
            case 'iRegexp':
              prunedKeyValues[key] = {
                value: value.value,
                op: value.op,
              }
              break
            default:
              throw new Error(`keyValue op: ${value.op} is not a valid op code`)
          }
        })

        metadataQuery = `${metadataQuery}${JSON.stringify(prunedKeyValues)}`
      }
    }
  }
  return `${baseUrl}${filterQuery}${metadataQuery}`
}

const getList = async() => {
  // TODO: content with lit sdk
  const baseUrl = 'https://api.pinata.cloud'
  const pinataApiKey = '289f4a4ede7a9479505b'
  const pinataSecretApiKey = '4610953acd443e9e90fe153bb09b4096f8f1082b9a0032e77db84930fe0306c7'
  const metadataFilter = {
    keyvalues: {
      type: {
        value: 'blog',
        op: 'eq',
      },
    },
  }

  const filters = {
    // status: 'pinned',
    pageLimit: 10,
    pageOffset: 0,
    metadata: metadataFilter,
  }

  const baseEndpoint = `${baseUrl}/data/pinList`
  const endpoint = queryBuilder(baseEndpoint, filters)

  const rz = await axios.get(
    endpoint,
    {
      withCredentials: true,
      headers: {
        pinata_api_key: pinataApiKey,
        pinata_secret_api_key: pinataSecretApiKey,
      },
    })

  const ipfsIds = rz.data.rows.map(({ ipfs_pin_hash }) => ipfs_pin_hash)
  const requestArr = ipfsIds.map(async(id) => {
    const rz = await axios.get(`https://gateway.pinata.cloud/ipfs/${id}`)
    return {
      id,
      ...rz.data,
    }
  })
  const blogPostsArr = await Promise.all(requestArr)
  posts = blogPostsArr
}
getList()

const formClose = async() => {
  isShowPostNew = false
  await getList()
}
</script>
