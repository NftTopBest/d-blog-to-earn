<script setup lang="ts">
// https://developers.ceramic.network/build/javascript/http/
import { CeramicClient } from '@ceramicnetwork/http-client'
import { EthereumAuthProvider, SelfID } from '@self.id/web'
import { Core, PublicID } from '@self.id/core'

import KeyDidResolver from 'key-did-resolver'
import ThreeIdResolver from '@ceramicnetwork/3id-did-resolver'
import { Caip10Link } from '@ceramicnetwork/stream-caip10-link'
import { TileDocument } from '@ceramicnetwork/stream-tile'

import { DID } from 'dids'
// https://developers.ceramic.network/run/nodes/community-nodes/
// https://gateway-clay.ceramic.network
const API_URL = 'https://ceramic-clay.3boxlabs.com'

const ceramic = new CeramicClient(API_URL)
const resolver = {
  ...KeyDidResolver.getResolver(),
  ...ThreeIdResolver.getResolver(ceramic),
}

const did = new DID({ resolver })
ceramic.did = did

async function getLinkedDID(walletAddress) {
  // Using the Ceramic client instance, we can load the link for a given CAIP-10 account
  const link = await Caip10Link.fromAccount(
    ceramic,
    // `${walletAddress}@eip155:1`, // did:3:kjzl6cwe1jw147e2y2st5560czpzy05m71wmecw2209l2fsqla9p7zac227ab3b

    // account_id: chain_id + ":" + account_address
    // chain_id: [-a - z0 - 9]{ 3, 8}: [-a - zA - Z0 - 9]{ 1, 32}
    // account_address: [a - zA - Z0 - 9]{ 1, 64}
    // eth-mainnet
    `eip155:1:${walletAddress}`, // did:3:kjzl6cwe1jw147e2y2st5560czpzy05m71wmecw2209l2fsqla9p7zac227ab3b
  )
  // The `did` property of the loaded link will contain the DID string value if set
  return link.did
}

const { walletAddress, rawProvider } = $(web3Store())

async function createDocument(content) {
  // The following call will fail if the Ceramic instance does not have an authenticated DID
  const doc = await TileDocument.create(ceramic, content)
  // The stream ID of the created document can then be accessed as the `id` property
  return doc.id
}

watchEffect(async() => {
  if (!walletAddress) return
  console.log('====> walletAddress :', walletAddress)
  const theDid = await getLinkedDID(walletAddress)
  console.log('====> theDid :', theDid)

  // https://developers.ceramic.network/reference/stream-programs/caip10-link/
  const authProvider = new EthereumAuthProvider(rawProvider, walletAddress)
  const accountId = await authProvider.accountId()
  console.log('====> accountId :', accountId)
  const accountLink = await Caip10Link.fromAccount(
    ceramic,
    accountId.toString(),
  )
  // console.log('====> accountLink :', accountLink)
  // await accountLink.setDid(
  //   `${theDid}abc`,
  //   authProvider,
  // )
  // Finally, unlink the DID from the account using the EthereumAuthProvider instance
  // await accountLink.clearDid(authProvider)
})

</script>
<template>
  <div class="flex flex-col h-full  w-full justify-center items-center">
    <div>
      <button @click="createSelfID">
        createSelfID
      </button>
      {{ selfID }}
    </div>
    <div>
      <button @click="setBasicProfile">
        setBasicProfile
      </button>
    </div>
  </div>
</template>
