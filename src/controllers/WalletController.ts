import { ethers, providers } from "ethers"
import { makeAutoObservable } from "mobx"
import { strToHex } from "src/utils/Number"
import Swal from "sweetalert2"
import Web3Modal from "web3modal"
import { apiClient } from "../services/ApiClient"
import { authService } from "../services/AuthService"
import AnimTokenAbi from "../lib/AnimTokenABI.json"
import {
  getWalletMeta,
  isJwtValid,
  providerOptions,
  requiredChainId,
  switchNetwork,
} from "../lib/auth"
import { supportedChainsIndexed } from "../lib/chains"

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
    if (token && isJwtValid(token)) {
      this.token = token
      apiClient.applyAuth(token)
      return true
    } else {
      const message = "Animverse sign"
      const account = this.address
      const nonce = await authService.getNonce(account)
      const msg = `0x${strToHex([message, nonce].join(" "))}`
      const params = [msg, account, nonce]
      const signed_hash = await this.web3Provider.send("personal_sign", params)
      const token = await authService.login(account, signed_hash)
      if (token) {
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
      const isRightNetwork = await switchNetwork(requiredChainId, this.provider)
      if (!isRightNetwork) {
        const network = supportedChainsIndexed[requiredChainId]
        const walletMeta = getWalletMeta(this.provider)
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
