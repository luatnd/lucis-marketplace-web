import { ethers, providers } from "ethers"
import { makeAutoObservable } from "mobx"
import { strToHex } from "src/utils/Number"
import Swal from "sweetalert2"
import Web3Modal from "web3modal"
import { isJwtValid, providerOptions } from "../lib/auth"
import erc20ABI from "../lib/erc20ABI.json"
import { apiClient } from "../services/ApiClient"
import { authService } from "../services/AuthService"

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
  public loading = false
  public isReady: boolean = false

  resetStates() {
    this.provider = null
    this.web3Provider = null
    this.signer = null
    this.address = null
    this.isReady = false
    this.loading = false
  }

  setListeners(disconnect?: () => void) {
    if (this.provider?.on) {
      const handleChainChanged = (_hexChainId: string) => {
        window.location.reload()
      }
      const handleAccountsChanged = async (accounts: string[]) => {
        const result = await Swal.fire({
          title: "PLease sign Metamask to re-login",
          icon: "question",
          showCancelButton: true,
        })
        if (result.isConfirmed) {
          this.address = accounts[0]
          console.log("{handleAccountsChanged} account: ", accounts[0])
          apiClient.applyAuth(null)
          localStorage.removeItem("token")
          await this.login()
        } else window.location.reload()
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
      this.signer = this.web3Provider.getSigner()
      this.address = await this.signer.getAddress()
      const res = await this.login()
      if (res) {
        this.loading = false
        this.isReady = true
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
      erc20ABI,
      this.signer
    )
    return contract.balanceOf(address)
  }
}
