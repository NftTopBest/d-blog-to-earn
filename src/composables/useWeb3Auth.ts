import { ethers } from 'ethers'
import MetaMaskOnboarding from '@metamask/onboarding'
import detectEthereumProvider from '@metamask/detect-provider'
import * as ls from '~/helpers/ls'

const chainId = '0x89'
const chainMap = {
  '0x4': {
    chainId: '0x4',
    chainName: 'Rinkeby Test Network',
    blockExplorerUrls: ['https://rinkeby.etherscan.io'],
    nativeCurrency: { name: 'Rinkeby Ether', symbol: 'RIN', decimals: 18 },
    rpcUrls: ['https://rinkeby.infura.io/v3/'],
  },
  '0x89': {
    chainId: '0x89',
    chainName: 'Polygon Mainnet',
    blockExplorerUrls: ['https://polygonscan.com'],
    nativeCurrency: { name: 'MATIC', symbol: 'MATIC', decimals: 18 },
    rpcUrls: ['https://polygon-rpc.com/', 'https://rpc-mainnet.maticvigil.com/'],
  },
  '0x13881': {
    chainId: '0x13881',
    chainName: 'Polygon Testnet Mumbai',
    blockExplorerUrls: [
      'https://mumbai.polygonscan.com',
    ],
    nativeCurrency: { name: 'MATIC', symbol: 'MATIC', decimals: 18 },
    rpcUrls: [
      'https://matic-mumbai.chainstacklabs.com',
      'https://rpc-mumbai.maticvigil.com',
      'https://matic-testnet-archive-rpc.bwarelabs.com',
    ],
  },
}

let onboarding: MetaMaskOnboarding = null

export const useWeb3Auth = () => {
  const { addSuccess } = $(notificationStore())

  let error = $ref('')
  let isLoading = $ref(false)

  const doOnboard = async() => {
    onboarding.startOnboarding()
  }

  const forceChainSwitch = async(provider) => {
    if (provider.chainId === chainId) return true

    try {
      await provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId }],
      })
      return true
    }
    catch (switchError) {
      // This error code indicates that the chain has not been added to MetaMask.
      if (switchError.code === 4902) {
        try {
          const rz = await provider.request({
            method: 'wallet_addEthereumChain',
            params: [chainMap[chainId]],
          })
          return true
        }
        catch (addError) {
          error = addError.message
          return false
        }
      }
      error = switchError.message
    }

    return false
  }

  const initContract = () => {
    // contractWriter = new ethers.Contract(contractAddress, contractAbi, signer)
  }

  // new version
  let accounts = $ref([])
  const walletAddress = $computed(() => accounts[0])
  let isShowOnboardModal = $ref(false)
  let rawProvider = $ref(null)
  let web3Provider = $ref(null)
  let signer = $ref(null)

  const handleAccountsChanged = (newAccounts) => {
    const oldAccounts = ls.getItem('accounts', [])

    // means user do not login yet, should notify user about login success
    if (oldAccounts.length === 0)
      addSuccess('Login Success!')

    accounts = newAccounts
    ls.setItem('accounts', newAccounts)

    // means user click on logout btn
    if (newAccounts.length === 0)
      addSuccess('Logout Success!')
  }

  const doRequestAccounts = async() => {
    const provider = await detectEthereumProvider()
    if (!provider) return false

    rawProvider = provider

    const isSuccess = await forceChainSwitch(provider)
    if (!isSuccess) return

    try {
      const rz = await provider.request({ method: 'eth_requestAccounts' })
      handleAccountsChanged(rz)
    }
    catch (err) {
      error = err.message
      return false
    }

    provider.on('message', (msg) => {
      console.log('====> msg :', msg)
    })
    provider.on('accountsChanged', handleAccountsChanged)
    provider.on('chainChanged', () => {
      window.location.reload()
    })

    web3Provider = new ethers.providers.Web3Provider(provider)
    signer = web3Provider.getSigner()

    return provider
  }

  const doLogin = async() => {
    if (!MetaMaskOnboarding.isMetaMaskInstalled()) {
      isShowOnboardModal = true
      return
    }
    isLoading = true
    await doRequestAccounts()
    isLoading = false
  }

  const doLogout = async() => {
    handleAccountsChanged([])
  }

  watchEffect(() => {
    if (!MetaMaskOnboarding.isMetaMaskInstalled()) return
    if (accounts.length > 0)
      onboarding.stopOnboarding()
  })

  onMounted(async() => {
    onboarding = new MetaMaskOnboarding()
    if (!MetaMaskOnboarding.isMetaMaskInstalled()) return

    accounts = ls.getItem('accounts', [])
    if (accounts.length === 0) return
    await doRequestAccounts()
  })
  onUnmounted(async() => {
    const provider = await detectEthereumProvider()
    if (!provider) return

    provider.off('accountsChanged', handleAccountsChanged)
  })

  return $$({
    initContract,
    error,
    rawProvider,
    isLoading,
    doOnboard,
    doLogin,
    doLogout,
    isShowOnboardModal,
    web3Provider,
    signer,
    walletAddress,
  })
}
