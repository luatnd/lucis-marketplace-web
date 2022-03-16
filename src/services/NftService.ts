import { apiClient } from "./ApiClient"

type TGetNftsParams = {
  owner_address?: string
  limit?: number
  offset?: number
  reverse?: boolean
  order_by?: string
}

type TGetNftParams = {
  nft_item_id: number
}

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
}

export const nftService = new NftService()
