import axios from "axios"
import dayjs from "dayjs"
import { TEST_API_URL } from "src/configs"

const BASE_URL = TEST_API_URL

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
  const { data } = await axios.get(BASE_URL + "/nft", {
    params: {
      aucPrice_gte: 0,
      _limit: 10,
    },
  })
  return data
}

export const getDiscovers = async () => {
  const { data } = await axios.get(BASE_URL + "/nft")
  const res = data.filter((item) => item.price || item.aucPrice)
  return res
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
  const { data, headers } = await axios.get(BASE_URL + `/nft`, {
    params: {
      "collection.id": id,
      _page: Math.ceil(offset / pageSize),
      _limit: pageSize,
      _sort: "price",
      _order: sort,
    },
  })
  return {
    data,
    total: +headers["x-total-count"],
  }
}

export const getNfts = async (params) => {
  const { data, headers } = await axios.get(BASE_URL + "/nft", {
    params,
  })
  return { data, total: +headers["x-total-count"] }
}

export const mineActivitiUser = async (userAddress, blockchain_id) => {
  try {
    const { data } = await axios({
      method: "POST",
      url: "https://lucis-api-testnet.lucis.pro" + "/nft-event/mine",
      data: {
        address: String(userAddress),
        blockchain_id: blockchain_id,
      },
    })
    return data.data
  } catch (error) {
    return { data: [], total: 0 }
  }
}

export const favoriteActivitiUser = async (userAddress, blockchain_id) => {
  try {
    const { data } = await axios({
      method: "POST",
      url: "https://lucis-api-testnet.lucis.pro" + "/nft-event/my-favorite",
      data: {
        address: String(userAddress),
        blockchain_id: blockchain_id,
      },
    })
    return data.data
  } catch (error) {
    return { data: [], total: 0 }
  }
}

export const favoriteUser = async (userAddress, blockchain_id) => {
  try {
    const { data } = await axios({
      method: "POST",
      url: "https://lucis-api-testnet.lucis.pro" + "/nft-item/favorite/get",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        address: String(userAddress),
        blockchain_id: blockchain_id,
      },
    })
    return data.data
  } catch (error) {
    return { data: [], total: 0 }
  }
}

export const collectedUser = async (
  userAddress,
  limit,
  offset,
  blockchain_id
) => {
  try {
    const { data } = await axios({
      method: "GET",
      url: "https://lucis-api-testnet.lucis.pro" + "/nft-item/list",
      params: {
        owner_address: String(userAddress),
        limit: limit,
        offset: offset,
        blockchain_id: blockchain_id,
      },
    })
    return data.data
  } catch (error) {
    return { data: [], total: 0 }
  }
}

export const onsaleUser = async (
  limit,
  offset,
  reverse,
  order_by,
  userAddress,
  kind
) => {
  try {
    const { data } = await axios({
      method: "GET",
      url: "https://lucis-api-testnet.lucis.pro" + "/nft-item/onsale",
      params: {
        limit: limit,
        offset: offset,
        reverse: reverse,
        order_by: order_by,
        seller: userAddress,
        kind: kind,
      },
    })
    return data.data
  } catch (error) {
    return { data: [], total: 0 }
  }
}

export const offeringUser = async (kind, limit, offset,userAddress,reverse,order_by) => {
  try {
    const { data } = await axios({
      method: "GET",
      url: "https://lucis-api-testnet.lucis.pro" + "/nft-item/offering",
      params: {
        limit: limit,
        offset: offset,
        reverse: reverse,
        order_by: order_by,
        buyer: String(userAddress),
        kind: kind,
      },
    })
    return data.data
  } catch (error) {
    return { data: [], total: 0 }
  }
}

export const getNft = async (id: number, params?: any) => {
  const { data } = await axios.get(BASE_URL + "/nft/" + id, {
    params,
  })
  return data
}

export const buyNft = async (address: string, id: number) => {
  await axios.patch(BASE_URL + "/nft/" + id, {
    owner: address,
    price: null,
    aucPrice: null,
    topAuc: null,
  })
}

export const aucNft = async (price: number, id: number) => {
  await axios.patch(BASE_URL + "/nft/" + id, {
    topAuc: price,
  })
}

export const likeNft = async (id: number, address: string, lastLike: any) => {
  await axios.patch(BASE_URL + "/nft/" + id, {
    liked: [...lastLike, address],
  })
}

export const unLikeNft = async (id: number, address: string, lastLike: any) => {
  const newList = lastLike.filter((item) => item !== address)
  await axios.patch(BASE_URL + "/nft/" + id, {
    liked: newList,
  })
}

export const cancelPrice = async (id: number) => {
  await axios.patch(BASE_URL + "/nft/" + id, {
    price: null,
    aucPrice: null,
    topAuc: null,
    aucTime: null,
  })
}

export const fixPrice = async (price: number, id: number) => {
  await axios.patch(BASE_URL + "/nft/" + id, {
    price,
  })
}

export const auctionNft = async (
  id: number,
  aucPrice: number,
  time: number
) => {
  await axios.patch(BASE_URL + "/nft/" + id, {
    aucPrice,
    endTime: dayjs().add(time, "days").format("YYYY-MM-DDTHH:mm:ss"),
  })
}

export const sendNft = async (id: number, owner: string) => {
  await axios.patch(BASE_URL + "/nft/" + id, {
    owner,
  })
}
