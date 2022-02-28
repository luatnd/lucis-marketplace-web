import { IClientMeta } from "@walletconnect/types"
import { ethers } from "ethers"
import { makeAutoObservable } from "mobx"
import Router from "next/router"
import { contract } from "../contracts"
import { supportedChainsIndexed } from "../lib/chains"
import { convertIChainData2ChainParameter } from "../lib/types"
import { apiClient } from "../services/ApiClient"
import { appLogger } from "../utils/Logger"
import { strToHex } from "../utils/Number"

export type TAuthInfo = {
  id?: number
  address?: string
  chainId?: number
  token?: string
  email?: string

  provider?: any
  web3Provider?: any
  networkChainId?: number
  balance?: number
  loading?: boolean
  network?: TNetwork
}

export type TNetwork = {
  name: string
  chainId: number
  ensAddress?: string
  _defaultProvider?: (providers: any, options?: any) => any
}

type AuthUser = {
  id: number
  email: string
  token: string

  address: string
  networkChainId: number
}

type TLoyalty = {
  level: number
  totalVolume: number
}

export class AuthStore {
  public id: number = null
  public referralCode: string = null
  public address: string = null
  public chainId: number = null
  public token: string = null
  public email: string = null
  public showVerify = false
  public loyalty: TLoyalty = {
    level: null,
    totalVolume: null,
  }

  public provider: any = null
  public web3Provider: any = null
  public networkChainId: number = null
  public balance: number = null
  public loading = false
  public network: TNetwork = null

  public setId(id: number): void {
    this.id = id
  }

  public setReferralCode(referralCode: string): void {
    this.referralCode = referralCode
  }

  public setAddress(address: string): void {
    this.address = address
  }

  public setChainId(chainId: number): void {
    this.chainId = chainId
  }

  public setToken(token: string): void {
    this.token = token
  }

  public setEmail(email: string): void {
    this.email = email
  }

  public setLoyalty(loyalty: TLoyalty): void {
    this.loyalty = loyalty
  }

  public setShowVerify(showVerify: boolean) {
    this.showVerify = showVerify
  }

  public setProvider(provider: any): void {
    this.provider = provider
  }

  public setWeb3Provider(web3Provider: ethers.providers.Web3Provider): void {
    this.web3Provider = web3Provider
  }

  public setNetworkChainId(networkChainId: number): void {
    this.networkChainId = networkChainId
  }

  public setBalance(balance: number): void {
    this.balance = balance
  }

  public setLoading(loading: boolean): void {
    this.loading = loading
  }

  public setNetwork(network: TNetwork): void {
    this.network = network
  }

  public get isLoggedIn(): boolean {
    return !!this.token
  }

  constructor() {
    makeAutoObservable(this)
  }

  resetStates() {
    this.id = null
    this.referralCode = null
    this.address = null
    this.networkChainId = null
    this.token = null
    this.email = null
    this.showVerify = false
    this.loyalty = {
      level: null,
      totalVolume: null,
    }

    this.provider = null
    this.web3Provider = null
    this.network = null
    this.balance = null
    this.loading = false
  }

  async fetchBalance() {
    const balance = await contract.getAnimTokenBalanceOf(this.address)
    this.balance = parseFloat(ethers.utils.formatEther(balance))
  }

  setAuthInfo(user: AuthUser): void {
    localStorage.setItem("user", window.btoa(JSON.stringify(user)))
  }

  getAuthInfo(): AuthUser | null {
    try {
      const user_encoded = localStorage.getItem("user")
      const user_plaintext = window.atob(user_encoded)
      return JSON.parse(user_plaintext)
    } catch (e) {
      return null
    }
  }

  clearAuthInfo(): void {
    localStorage.setItem("user", null)
  }

  async fetchUserData(): Promise<any> {
    const res = await apiClient.req({
      method: "GET",
      url: "/user/get",
    })
    const u = res?.data?.data
    const user = {
      id: u.id,
      address: u.address,
      networkChainId: this.network.chainId,
      token: res.data.token,
      email: u.email,
      referralCode: u.referral_code,
      loyalty: {
        level: u.loyalty_level,
        totalVolume: u.total_volume,
      },
    }
    return user
  }

  async loginByAddress() {
    const referral_code = Router.query.referralCode
    const exampleMessage = "Animverse sign"
    const signer = contract.getSigner()
    const account = await signer.getAddress()
    const nonceRes = await apiClient.req({
      method: "GET",
      url: "/auth/get_nonce?address=" + account,
    })
    const nonce = nonceRes?.data?.data?.nonce
    const msg = `0x${strToHex([exampleMessage, nonce].join(" "))}`
    const params = [msg, account, nonce]

    /**
     * window.ethereum is for web3 injected like metamask only
     * IF you wanna support multiple wallet (including mobile wallet),
     * you need to use a universal abstract provider from web3provider
     */
    const signed_hash = await this.web3Provider.send("personal_sign", params)
    const loginRes = await apiClient.req({
      method: "POST",
      url: "/auth/login",
      data: { address: account, sign: signed_hash, referral_code },
    })
    const u = loginRes?.data?.data?.user_info
    const user = {
      id: u.id,
      address: u.address,
      networkChainId: this.network.chainId,
      token: loginRes?.data?.data?.token,
      email: u.email,
      referralCode: u.referral_code,
      loyalty: {
        level: u.loyalty_level,
        totalVolume: u.total_volume,
      },
    }
    return user
  }

  async login(address: string, network: TNetwork) {
    try {
      // NOTE: Change internal state without reactive
      this.network = network
      this.address = address

      const token = this.getAuthInfo()?.token
      if (token) {
        // re-login
        apiClient.applyAuth(token)
        const user = await this.fetchUserData()
        user.token = token // NOTE: Api do not have token returned
        this.setAuthInfo(user)
        this.email = user.email
        this.referralCode = user.referralCode
        this.showVerify = !user.email
        this.loyalty = user.loyalty
        this.setToken(token)
        return true
      } else {
        // new-login
        const user = await this.loginByAddress()
        apiClient.applyAuth(user?.token)
        this.setAuthInfo(user)
        this.email = user.email
        this.referralCode = user.referralCode
        this.showVerify = !user.email
        this.loyalty = user.loyalty
        this.setToken(user?.token)
        return true
      }
    } catch (err) {
      console.log("{login} err: ", err)
      return false
    }
  }

  logout() {
    apiClient.applyAuth(null)
    this.clearAuthInfo()
    this.resetStates()
  }

  // Web3

  getWalletMeta(provider): IClientMeta {
    let walletMeta: IClientMeta = null
    if (provider.isMetaMask) {
      walletMeta = provider.walletMeta
    } else if (provider.isWalletConnect) {
      walletMeta = provider.walletMeta
    } else {
      appLogger.log("{ensureTargetChainActive} Wallet is not supported => SKIP")
      return null
    }
    return walletMeta
  }

  async switchNetwork(ethereum, chain_id, chainIdHex) {
    try {
      const r = await ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: chainIdHex }],
      })
    } catch (switchError) {
      if (switchError.code === 4902) {
        const network = supportedChainsIndexed[chain_id]
        const networkConfig = convertIChainData2ChainParameter(network)
        try {
          await ethereum.request({
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
  }

  async isRightTargetChain(chain_id: number, provider: any): Promise<boolean> {
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
      return this.switchNetwork(provider, chain_id, chainIdHex)
    } else {
      // TODO: support other web3 wallet that's compatible with wallet_switchEthereumChain: Okex, blockto, ...
      // on the Ethereum/BSC/Polygon/Avalanche injected at window.ethereum, follows eip-3326.
    }

    return false
  }
}
