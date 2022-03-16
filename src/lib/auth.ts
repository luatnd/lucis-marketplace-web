import { IClientMeta } from "@walletconnect/types"
import jwtDecode from "jwt-decode"
import WalletConnectProvider from "@walletconnect/web3-provider"
import { supportedChainsIndexed } from "./chains"
import { convertIChainData2ChainParameter } from "./types"

type TJwt = {
  user_id?: number
  timestamp?: string
  type?: number
  iat?: number
  exp?: number
}

export const isJwtValid = (token: string): boolean => {
  const jwt = jwtDecode(token) as TJwt
  const res = jwt.exp
  return new Date(res * 1000) > new Date()
}

export const requiredChainId = +process.env.NEXT_PUBLIC_REQUIRED_CHAIN_ID
export const web3modalChainId2Network = (): string => {
  switch (requiredChainId) {
    case 1:
      return "mainnet"
    case 56:
      return "binance"
    case 97:
      return "binance_testnet"
    default:
      throw new Error(
        "web3modal__chainId2network: Not supported chain id: " + requiredChainId
      )
  }
}

export const providerOptions = {
  binancechainwallet: {
    package: true,
  },
  // Auto recognize your injected wallet: Metamask
  // injected: {},
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      rpc: {
        56: "https://bsc-dataseed.binance.org/",
        97: "https://data-seed-prebsc-1-s1.binance.org:8545/",
      },
      // Select BSC work on Trust wallet but dont work on metamask
      // https://github.com/Web3Modal/web3modal/blob/72596699b97d231dfaa5ef04110b61b8dc77d57d/src/providers/connectors/walletconnect.ts#L30
      // https://github.com/Web3Modal/web3modal/blob/72596699b97d231dfaa5ef04110b61b8dc77d57d/src/helpers/utils.ts#L198
      // web3modal has not support BSC testnet yet (because Trust wallet not support it). To support chain 97: // directly add network to this file to tmp test: node_modules/web3modal/dist/index.js
      network: web3modalChainId2Network(),
      // This will turn on only some wallet for mobile
      qrcodeModalOptions: {
        mobileLinks: [
          "trust",
          "rainbow",
          "argent",
          "imtoken",
          "pillar",
          "bitpay",
          "coin98",
          "houbi",
          "safepal",
          // "metamask",
          // "kyberswap",
          // "orange",
          // "krystal",
        ],
      },
    },
  },
}

export const getWalletMeta = (provider): IClientMeta => {
  let walletMeta: IClientMeta = null
  if (provider.isMetaMask) {
    walletMeta = provider.walletMeta
  } else if (provider.isWalletConnect) {
    walletMeta = provider.walletMeta
  } else {
    console.log("{ensureTargetChainActive} Wallet is not supported => SKIP")
    return null
  }
  return walletMeta
}

export const switchNetwork = async (
  chain_id: number,
  provider: any
): Promise<boolean> => {
  const chainIdHex = "0x" + chain_id.toString(16)

  // Metamask chainId is heximal
  if (provider.chainId === chainIdHex) {
    return true
  }
  // Trust wallet chainId is decimal
  if (provider.chainId === chain_id) {
    return true
  }

  if (provider.isMetaMask) {
    try {
      await provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: chainIdHex }],
      })
    } catch (switchError) {
      if (switchError.code === 4902) {
        const network = supportedChainsIndexed[chain_id]
        const networkConfig = convertIChainData2ChainParameter(network)
        try {
          await provider.request({
            method: "wallet_addEthereumChain",
            params: [networkConfig],
          })
          return true
        } catch (addError) {
          console.log(
            "{ensureTargetChainActive} wallet_addEthereumChain ERROR: ",
            addError
          )
          return false
        }
      } else {
        return false
      }
    }
  } else {
    // TODO: support other web3 wallet that's compatible with wallet_switchEthereumChain: Okex, blockto, ...
    // on the Ethereum/BSC/Polygon/Avalanche injected at window.ethereum, follows eip-3326.
  }
  return false
}
