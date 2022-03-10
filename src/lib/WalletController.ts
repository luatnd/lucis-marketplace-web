import { IClientMeta } from "@walletconnect/types"
import WalletConnectProvider from "@walletconnect/web3-provider"
import { ethers, providers } from "ethers"
import { makeAutoObservable } from "mobx"
import { strToHex } from "src/utils/Number"
import Swal from "sweetalert2"
import Web3Modal from "web3modal"
import { apiClient } from "../services/ApiClient"
import AnimTokenAbi from "./AnimTokenABI.json"
import { supportedChainsIndexed } from "./chains"
import { convertIChainData2ChainParameter } from "./types"

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

export type TNetwork = {
  name: string
  chainId: number
  ensAddress?: string
  _defaultProvider?: (providers: any, options?: any) => any
}

export class WalletController {
  constructor() {
    makeAutoObservable(this)
  }

  public web3Modal =
    typeof window !== "undefined"
      ? new Web3Modal({
          network: "binance",
          cacheProvider: true,
          providerOptions,
        })
      : null

  public provider = null
  public web3Provider = null
  public signer: any = null
  public address: string = null
  public network: any = null
  public balance: string = null
  public token: string = null
  public loading = false

  resetStates() {
    this.provider = null
    this.web3Provider = null
    this.signer = null
    this.address = null
    this.network = null
    this.balance = null
    this.token = null
    this.loading = false
  }

  async switchNetwork(chain_id: number, provider: any): Promise<boolean> {
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

  getWalletMeta(provider): IClientMeta {
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

  setListeners(disconnect?: () => void) {
    if (this.provider?.on) {
      const handleChainChanged = (_hexChainId: string) => {
        window.location.reload()
      }
      const handleAccountsChanged = async (accounts: string[]) => {
        console.log("{handleAccountsChanged} account: ", accounts[0])
        this.address = accounts[0]
        this.network = await this.web3Provider.getNetwork()
        const animTokenContractAddress =
          process.env.NEXT_PUBLIC_FT_CONTRACT_ADDR
        const balance = await this.balanceOf(
          this.address,
          animTokenContractAddress
        )
        this.balance = ethers.utils.formatEther(balance)
        await this.login()
        disconnect()
      }
      const handleDisconnect = (error: { code: number; message: string }) => {
        console.log("{handleDisconnect} error: ", error)
        disconnect()
      }

      this.provider.on("accountsChanged", handleAccountsChanged)
      this.provider.on("chainChanged", handleChainChanged)
      this.provider.on("disconnect", handleDisconnect)
      return () => {
        if (this.provider.removeListener) {
          this.provider.removeListener("accountsChanged", handleAccountsChanged)
          this.provider.removeListener("chainChanged", handleChainChanged)
          this.provider.removeListener("disconnect", handleDisconnect)
        }
      }
    }
  }

  getAuth() {
    return localStorage.getItem("token")
  }

  setAuth(token: string) {
    localStorage.setItem("token", token)
  }

  async login() {
    const token = this.getAuth()
    if (token) {
      this.token = token
      apiClient.applyAuth(token)
      return true
    } else {
      const message = "Animverse sign"
      const account = this.address
      const nonceData = await apiClient.req({
        method: "GET",
        url: "/auth/get_nonce?address=" + account,
      })
      const nonce = nonceData?.data?.data?.nonce
      const msg = `0x${strToHex([message, nonce].join(" "))}`
      const params = [msg, account, nonce]
      const signed_hash = await this.web3Provider.send("personal_sign", params)
      const res = await apiClient.req({
        method: "POST",
        url: "/auth/login",
        data: { address: account, sign: signed_hash },
      })
      if (res?.data?.error_code === "") {
        const token = res?.data?.data?.token
        this.token = token
        this.setAuth(token)
        apiClient.applyAuth(token)
        return true
      }
      return false
    }
  }

  logout() {
    apiClient.applyAuth(null)
    localStorage.removeItem("token")
    this.resetStates()
  }

  async connect() {
    this.loading = true
    try {
      this.provider = await this.web3Modal.connect()
      this.web3Provider = new providers.Web3Provider(this.provider, "any")
      const isRightNetwork = await this.switchNetwork(
        requiredChainId,
        this.provider
      )
      if (!isRightNetwork) {
        const network = supportedChainsIndexed[requiredChainId]
        const walletMeta = this.getWalletMeta(this.provider)
        const walletName = walletMeta?.name
        Swal.fire({
          icon: "error",
          title: "Blockchain Network required",
          text: `Animverse support ${network.name} network only
          Please open ${
            walletName ?? "your wallet"
          } and check if Animverse is using ${
            network.name
          } network then press OK to reload`,
        }).then(async () => {
          await this.disconnect()
          window && window.location.reload()
          return true
        })
        this.loading = false
        return false
      }

      this.signer = this.web3Provider.getSigner()
      this.address = await this.signer.getAddress()
      this.network = await this.web3Provider.getNetwork()
      const animTokenContractAddress = process.env.NEXT_PUBLIC_FT_CONTRACT_ADDR
      const balance = await this.balanceOf(
        this.address,
        animTokenContractAddress
      )
      this.balance = ethers.utils.formatEther(balance)
      const res = await this.login()
      if (res) {
        this.loading = false
        return true
      }
      return false
    } catch (err) {
      console.log("{connectWallet} e: ", err)
      this.loading = false
      if (`${err}` === "Modal closed by user") {
        console.log("{connectWallet} disconnect on user close the web3 modal: ")
        this.disconnect()
      }
      if (err === undefined) {
        console.log(
          "{connectWallet} disconnect on user close the wallet connect modal: "
        )
        this.disconnect()
      }
      return false
    }
  }

  async disconnect() {
    this.web3Modal.clearCachedProvider()
    if (
      this.provider?.disconnect &&
      typeof this.provider.disconnect === "function"
    ) {
      await this.provider.disconnect()
    } else {
      console.warn("{disconnectWallet} cannot trigger disconnect: ")
    }
    this.logout()
  }

  async balanceOf(address: string, tokenAdress: string): Promise<number> {
    const contract = await new ethers.Contract(
      tokenAdress,
      AnimTokenAbi.abi,
      this.signer
    )
    return contract.balanceOf(address)
  }
}
