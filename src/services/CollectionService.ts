import { apiClient } from "./ApiClient"

type TGetCollectionsParams = {
  listIds?: number[]
}

type TGetCollectionParams = {
  id: number
}

class CollectionService {
  async getCollections(params: TGetCollectionsParams) {
    const res = await apiClient.req({
      method: "POST",
      url: "/collection/get-list",
      params,
    })
    if (res?.data?.error_code === "") {
      return res?.data?.data
    }
    return null
  }

  async getCollection(params: TGetCollectionParams) {
    const res = await apiClient.req({
      method: "GET",
      url: "/collection/get",
      params,
    })
    if (res?.data?.error_code === "") {
      return res?.data?.data
    }
    return null
  }

  async getHotCollections() {
    const res = await apiClient.req({
      method: "GET",
      url: "/collection/hot-collection",
    })
    if (res?.data?.error_code === "") {
      return res?.data?.data
    }
    return null
  }

  async searchCollections(data) {
    const res = await apiClient.req({
      method: "POST",
      url: "/collection/search",
      data,
    })
    if (res?.data?.error_code === "") {
      return res?.data?.data?.data
    }
    return null
  }
}

export const collectionService = new CollectionService()
