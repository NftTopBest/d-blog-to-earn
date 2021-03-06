## W3NS - Web3 NFT Social Platform

<img src="./screenshot.png" />

* GitHub: [https://github.com/NftTopBest/d-blog-to-earn](https://github.com/NftTopBest/d-blog-to-earn)
* demo: [click to see demo](https://owf.web3nft.social/0xC6E58fb4aFFB6aB8A392b7CC23CD3feF74517F6C/blog)
* Keynote(pdf version): [Web3BloggingToEarn.pdf](./Web3BloggingToEarn.pdf)

Web3 NFT Open Platform For Novice Web3 Users.

## Application Features

* User NFT list by [blockdaemon](https://blockdaemon.com/documentation/ubiquity-api/nft-api/get-nft-assets/) api: [source code](https://github.com/NftTopBest/d-blog-to-earn/blob/main/src/components/web3/nft/NftListBlockDaemon.vue)
* Blog: user creation for sale [source code](https://github.com/NftTopBest/d-blog-to-earn/blob/main/src/components/web3/nft/article/Form.vue)
  * list/create blog posts, save in IPFS
  * With LIT to have content permission control (user must mint poster's NFT to have access to the article)
  * blog content can add token gating logic (only user have special NFT can read the blog content) [source code](https://github.com/NftTopBest/d-blog-to-earn/blob/main/src/pages/web3nft.social/%5BuserWalletAddress%5D/blog/%5Bid%5D.vue)
* Social relations: CyberConnect
  * Follow/unfollow actions [source code](https://github.com/NftTopBest/d-blog-to-earn/blob/main/src/components/web3/nft/btn/Follow.vue)
  * Followers list  [source code](https://github.com/NftTopBest/d-blog-to-earn/blob/main/src/components/web3/nft/dialog/relationshipList.vue)
  * Followings list [source code](https://github.com/NftTopBest/d-blog-to-earn/blob/main/src/components/web3/nft/dialog/relationshipList.vue)
* Web3 LinkTree  [source code](https://github.com/NftTopBest/d-blog-to-earn/blob/main/src/pages/web3nft.social/settings/Web3Home.vue)
  * User can add many social platform link to their W3NS home page
  * Data store on IPFS
  * Data permission control by LIT
* Search any address to show the Web3 things

## 应用功能

* Blog: 用户创作经济 [source code](https://github.com/NftTopBest/d-blog-to-earn/blob/main/src/components/web3/nft/article/Form.vue)
  * 列出/创建博客内容，保存到 IPFS
  * 结合 LIT 来可以让内容具有链上权限控制功能(用户必须购买作者指定的 NFT 才能看到博客内容）
  * 博客内容添加了 token 网关功能逻辑（只有用户用特定的 NFT 才能阅读博客内容）[source code](https://github.com/NftTopBest/d-blog-to-earn/blob/main/src/pages/web3nft.social/%5BuserWalletAddress%5D/blog/%5Bid%5D.vue)
* 社交关系：CyberConnect
  * 关注/取关功能 [source code](https://github.com/NftTopBest/d-blog-to-earn/blob/main/src/components/web3/nft/btn/Follow.vue)
  * 用户粉丝列表 [source code](https://github.com/NftTopBest/d-blog-to-earn/blob/main/src/components/web3/nft/dialog/relationshipList.vue)
  * 用户关注列表 [source code](https://github.com/NftTopBest/d-blog-to-earn/blob/main/src/components/web3/nft/dialog/relationshipList.vue)
* Web3 LinkTree [source code](https://github.com/NftTopBest/d-blog-to-earn/blob/main/src/pages/web3nft.social/settings/Web3Home.vue)
  * 用户可以添加多个社交平台链接到他们的主页
  * 数据存储在 IPFS
  * 数据读取权限可以用 LIT 控制
* 搜索任何地址显示 web3 相关内容

## Technologies used

* BlockChain Network
  * [x] Polygon Mumbai testnet
  * [x] Rinkeby
* Smart Contract Dev Env
  * [x] Hardhat
* RPC endpoints
  * [x] Infura
* Front-end hosting && image assets && CDN
  * [x] Vercel
  * [x] IPFS
* User profiles / Blog posts store / Albumn Store / Permission Control
  * [x] Ceramic
  * [x] Self.ID
  * [x] LIT
* Social Graph
  * [x] CyberConnect
* Chat
  * [x] XMTP
* Application Tech Stack
  * [x] TailwindCSS
  * [x] Vue3
  * [x] Pinia (state store)
  * [x] PWA
  * [x] Vue-i18n
  * [x] Villus (gql && pinia binding lib)
  * [x] Vite2

<img src="./screenshot-2.png" />
