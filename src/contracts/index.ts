import { BigNumber, ethers, providers } from "ethers"
import AnimTokenABI from "./AnimTokenABI.json"
import boxNFTABI from "./BoxNftABI.json"
import erc721ABI from "./erc721ABI.json"
import marketPlaceABI from "./MarketPlaceABI.json"

class Contract {
  private ready: boolean
  private web3Provider: any
  private signer: any
  private AnimTokenWriteContract: any
  private address: any

  constructor() {
    this.ready = false
    this.web3Provider = null
    this.signer = null
    this.AnimTokenWriteContract = null
    this.address = {
      token: "",
    }
  }

  async bridgeContract(web3Provider: providers.Web3Provider): Promise<void> {
    this.web3Provider = web3Provider
    const animTokenContractAddress = process.env.NEXT_PUBLIC_FT_CONTRACT_ADDR
    this.address.token = animTokenContractAddress
    if (!animTokenContractAddress) {
      throw new Error("Cannot read animTokenContractAddress from config")
    }
    const signer = this.web3Provider.getSigner()
    this.signer = signer
    this.AnimTokenWriteContract = new ethers.Contract(
      animTokenContractAddress,
      AnimTokenABI.abi,
      signer
    )
    this.ready = true
  }

  getSigner(): ethers.providers.JsonRpcSigner {
    return this.signer
  }

  getERC20Contract(ERC20Address: string): any {
    return new ethers.Contract(ERC20Address, AnimTokenABI.abi, this.signer)
  }

  getERC721Contract(ERC20Address: string): any {
    return new ethers.Contract(ERC20Address, erc721ABI, this.signer)
  }

  async getAnimTokenBalanceOf(address: string): Promise<number> {
    return this.AnimTokenWriteContract.balanceOf(address)
  }

  async balanceOf(address: string, tokenAdress: string): Promise<number> {
    const contract = await this.getERC20Contract(tokenAdress)
    return contract.balanceOf(address)
  }

  async allowance(
    address: string,
    tokenAddress: string
  ): Promise<number | null> {
    const myAddress = await this.signer.getAddress()
    const contract = await this.getERC20Contract(tokenAddress)
    const res = await contract.allowance(myAddress, address).catch((e) => {
      console.error("{allowance} catch e: ", e)
      return null
    })
    return res === null ? res : ethers.utils.formatEther(res)
  }

  async approve(address: string, tokenAddress: string): Promise<boolean> {
    const contract = await this.getERC20Contract(tokenAddress)
    const res = await contract
      .approve(address, ethers.constants.MaxUint256)
      .catch((e) => {
        console.error("{getAnimTokenApprovalForAnimNft} catch e: ", e)
        return false
      })
    return res
  }

  async transferBox(
    toAddress: string,
    boxContractAddress: string,
    tokenId: number
  ) {
    try {
      const signer = this.web3Provider.getSigner()
      const account = await signer.getAddress()
      const boxContractSigner = new ethers.Contract(
        boxContractAddress,
        erc721ABI,
        signer
      )

      const transaction = await boxContractSigner.transferFrom(
        account,
        toAddress,
        tokenId
      )
      return transaction.wait()
    } catch (error) {
      console.log("{transferBox} error: ", error)
      return false
    }
  }

  // Open box call to blockchain
  async summonItem(tokenId, contractAddress) {
    try {
      const signer = this.web3Provider.getSigner()

      const boxContractSigner = new ethers.Contract(
        contractAddress,
        boxNFTABI,
        signer
      )
      const tx2 = await boxContractSigner.summonItem(tokenId)

      return tx2.wait()
    } catch (error) {
      console.log("{summonItem} error: ", error)
      return false
    }
  }

  async isApprovedForAll(tokenAddress: string, walletAddress: string) {
    try {
      const contract = new ethers.Contract(tokenAddress, boxNFTABI, this.signer)
      return await contract.isApprovedForAll(
        walletAddress,
        process.env.NEXT_PUBLIC_LUCIS_CONTRACT_ADDRESS
      )
    } catch (err) {
      console.log("{check is approved for all} error: ", err)
      return false
    }
  }

  async setApprovalForAll(tokenAddress: string) {
    try {
      const contract = new ethers.Contract(tokenAddress, boxNFTABI, this.signer)
      await contract.setApprovalForAll(
        process.env.NEXT_PUBLIC_LUCIS_CONTRACT_ADDRESS,
        true
      )
    } catch (err) {
      console.log("{set approval for all} error: ", err)
      return false
    }
  }

  async createTrade(tokenAddress: string, tokenId: string, amount: number) {
    try {
      const contract = new ethers.Contract(
        process.env.NEXT_PUBLIC_LUCIS_CONTRACT_ADDRESS,
        marketPlaceABI,
        this.signer
      )
      const newAmount = ethers.BigNumber.from(10).pow(18).mul(amount).toString()

      const setPrice = await contract.createTrade(
        tokenAddress,
        tokenId,
        newAmount
      )
      return setPrice.wait()
    } catch (err) {
      console.log("{createTrade} error: ", err)
    }
  }

  async cancelTrade(tokenAddress: string, tokenId: string) {
    try {
      const contract = new ethers.Contract(
        process.env.NEXT_PUBLIC_LUCIS_CONTRACT_ADDRESS,
        marketPlaceABI,
        this.signer
      )
      await contract.cancelTrade(tokenAddress, tokenId)
    } catch (err) {
      console.log("{cancel trade} error: ", err)
    }
  }

  async buyNft(tokenAddress: string, tokenId: string, amount: number) {
    try {
      const contract = new ethers.Contract(
        process.env.NEXT_PUBLIC_LUCIS_CONTRACT_ADDRESS,
        marketPlaceABI,
        this.signer
      )

      const nAmount = ((amount / 1e18) * 1000).toString() + "000000000000000"

      const tx2 = await contract.buyNFT(tokenAddress, tokenId, {
        value: nAmount,
      })

      return tx2.wait()
    } catch (err) {
      console.log("{cancel trade} error: ", err)
    }
  }
}

export const contract = new Contract()
