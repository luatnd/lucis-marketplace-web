import { TPaginateParams } from "src/@types/services"
import { apiClient } from "./ApiClient"

type TGetNftsParams = TPaginateParams & {
  owner_address?: string
}

type TGetNftParams = {
  nft_item_id: number
}

type TGetHotAuctions = TPaginateParams

class NftService {
  async getNfts(params?: TGetNftsParams) {
    const res = await apiClient.req({
      method: "GET",
      url: "/nft-item/list",
      params,
    })
    if (res?.data?.error_code === "") {
      return res?.data?.data?.data
    }
    return null
  }

  async getNft(params: TGetNftParams) {
    const res = await apiClient.req({
      method: "GET",
      url: "/nft-item/get",
      params,
    })
    if (res?.data?.error_code === "") {
      return res?.data?.data
    }
    return null
  }

  async getHotAuctions(params?: TGetHotAuctions) {
    const res = await apiClient.req({
      method: "GET",
      url: "/nft-item/hot-auction",
      params,
    })
    if (res?.data?.error_code === "") {
      return res?.data?.data?.data
    }
    return null
  }
}

export const nftService = new NftService()
