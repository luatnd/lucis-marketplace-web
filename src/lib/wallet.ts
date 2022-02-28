import WalletConnectProvider from "@walletconnect/web3-provider"

const web3modalChainId2Network = (chainId: number): string => {
  switch (chainId) {
    case 1:
      return "mainnet"
    case 56:
      return "binance"
    case 97:
      return "binance_testnet"
    default:
      throw new Error(
        "web3modal__chainId2network: Not supported chain id: " + chainId
      )
  }
}
export const requiredChainId = +process.env.NEXT_PUBLIC_REQUIRED_CHAIN_ID

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
      network: web3modalChainId2Network(requiredChainId),

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
