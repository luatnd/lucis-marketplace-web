import axios from "axios"

const BASE_URL = process.env.NEXT_PUBLIC_API_TEST

export const getBanners = async () => {
  const { data } = await axios.get(BASE_URL + "/collections")
  return data
}

export const getLaunchpads = async () => {
  const { data } = await axios.get(BASE_URL + "/launchpads")
  return data
}

export const getCollections = async () => {
  const { data } = await axios.get(BASE_URL + "/collections")
  return data
}

export const getHotAuctions = async () => {
  const { data } = await axios.get(BASE_URL + "/nft/?isAuction=true&&_limit=10")
  return data
}

export const getDiscovers = async () => {
  const { data } = await axios.get(BASE_URL + "/nft")
  return data
}

export const getGettingStarted = async () => {
  const { data } = await axios.get(BASE_URL + "/gettingStarted")
  return data
}

export const getCollection = async (id: number) => {
  const { data } = await axios.get(BASE_URL + "/collections/" + id)
  return data
}

export const getCollectionItems = async (
  id: number,
  offset: number,
  pageSize: number,
  type: boolean,
  sort: string
) => {
  const { data, headers } = await axios.get(
    BASE_URL +
      `/nft/?collection.id=${id}&&_page=${Math.ceil(
        offset / pageSize
      )}&&_limit=${pageSize}&&isAuction=${type}&&_sort=price&&_order=${sort}`
  )
  return {
    data,
    total: +headers["x-total-count"],
  }
}

export const getNft = async (params) => {
  const { data, headers } = await axios.get(BASE_URL + "/nft", {
    params,
  })
  return { data, total: +headers["x-total-count"] }
}
