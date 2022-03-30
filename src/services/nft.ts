import { border } from "@chakra-ui/react"
import axios from "axios"
import dayjs from "dayjs"
import { TEST_API_URL, API_URL } from "src/configs"

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

export const getGettingStarted = async () => {
  const { data } = await axios.get(BASE_URL + "/gettingStarted")
  return data
}

export const getCollection = async (id: number) => {
  const { data } = await axios.get(BASE_URL + "/collections/" + id)
  return data
}

// export const getCollectionItems = async (
//   id: number,
//   offset: number,
//   pageSize: number,
//   type: boolean,
//   sort: string
// ) => {
//   const { data, headers } = await axios.get(BASE_URL + `/nft`, {
//     params: {
//       "collection.id": id,
//       _page: Math.ceil(offset / pageSize),
//       _limit: pageSize,
//       _sort: "price",
//       _order: sort,
//     },
//   })
//   return {
//     data,
//     total: +headers["x-total-count"],
//   }
// }

export const mineActivitiUser = async (
  userAddress,
  blockchain_id,
  limit,
  offset,
  reverse,
  order_by
) => {
  try {
    const { data } = await axios({
      method: "POST",
      url: API_URL + "nft-event/mine",
      data: {
        address: String(userAddress),
        blockchain_id: blockchain_id,
        limit: limit,
        offset: offset,
        reverse: reverse,
        order_by: order_by,
      },
    })
    return data.data
  } catch (error) {
    return { data: [], total: 0 }
  }
}

export const favoriteActivitiUser = async (
  userAddress,
  blockchain_id,
  limit,
  offset,
  reverse,
  order_by
) => {
  try {
    const { data } = await axios({
      method: "POST",
      url: API_URL + "nft-event/my-favorite",
      data: {
        address: String(userAddress),
        blockchain_id: blockchain_id,
        limit: limit,
        offset: offset,
        reverse: reverse,
        order_by: order_by,
      },
    })
    return data.data
  } catch (error) {
    return { data: [], total: 0 }
  }
}

export const favoriteUser = async (
  userAddress,
  blockchain_id,
  limit,
  offset
) => {
  try {
    const { data } = await axios({
      method: "POST",
      url: API_URL + "nft-item/favorite/get",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        address: String(userAddress),
        blockchain_id: blockchain_id,
        limit: limit,
        offset: offset,
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
  blockchain_id,
  inventory_status,
  search
) => {
  try {
    const { data } = await axios({
      method: "GET",
      url: API_URL + "nft-item/list",
      params: search
        ? {
            owner_address: String(userAddress),
            limit: limit,
            offset: offset,
            blockchain_id: blockchain_id,
            inventory_status: inventory_status,
            search: search,
          }
        : {
            owner_address: String(userAddress),
            limit: limit,
            offset: offset,
            blockchain_id: blockchain_id,
            inventory_status: inventory_status,
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
  kind,
  blockchain_id
) => {
  try {
    const { data } = await axios({
      method: "GET",
      url: API_URL + "nft-item/onsale",
      params: {
        limit: limit,
        offset: offset,
        reverse: reverse,
        order_by: order_by,
        seller: userAddress,
        kind: kind,
        blockchain_id: blockchain_id,
      },
    })
    return data.data
  } catch (error) {
    return { data: [], total: 0 }
  }
}

export const offeringUser = async (
  kind,
  limit,
  offset,
  userAddress,
  reverse,
  order_by,
  blockchain_id
) => {
  try {
    const { data } = await axios({
      method: "GET",
      url: API_URL + "nft-item/offering",
      params: {
        limit: limit,
        offset: offset,
        reverse: reverse,
        order_by: order_by,
        buyer: userAddress,
        kind: kind,
        blockchain_id: blockchain_id,
      },
    })
    return data.data
  } catch (error) {
    return { data: [], total: 0 }
  }
}

export const getProfileOther = async (userAddress) => {
  try {
    const { data } = await axios({
      method: "GET",
      url: API_URL + "user/get-user-by-address",
      params: {
        address: userAddress,
      },
    })
    return data.data
  } catch (error) {
    return null
  }
}

export const nftRanking = async (blockchain_id, time, limit, offset) => {
  try {
    const { data } = await axios({
      method: "POST",
      url: API_URL + "nft-event/nft-ranking",
      data: {
        blockchain_id: blockchain_id,
        time: time,
        limit: limit,
        offset: offset,
      },
    })
    return data.data
  } catch (error) {
    return { data: [], total: 0 }
  }
}

export const getBlockchain = async () => {
  try {
    const { data } = await axios({
      method: "GET",
      url: API_URL + "blockchain/get",
    })
    return data.data
  } catch (error) {
    return []
  }
}

export const updateUserInfo = async (
  token,
  name,
  avatar,
  youtube,
  facebook
) => {
  try {
    const { data } = await axios({
      method: "POST",
      url: API_URL + "user/update",
      headers: {
        "Content-Type": "application/json",
        token: String(token),
      },
      data: {
        name: name,
        avatar: avatar,
        social_network: {
          youtube: youtube,
          facebook: facebook,
        },
      },
    })
    if (data) {
      return true
    }
    return false
  } catch (error) {
    return false
  }
}

export const getActivitiesItem = async (
  nft_item_id,
  limit,
  offset,
  kind,
  status
) => {
  try {
    const { data } = await axios({
      method: "GET",
      url: API_URL + "nft-item/detail/activity",
      params: {
        nft_item_id: nft_item_id,
        limit: limit,
        offset: offset,
        kind,
        status,
      },
    })

    return data.data
  } catch (error) {
    return { data: [], total: 0 }
  }
}

export const getAuctionItem = async (nft_item_id, limit, offset) => {
  try {
    const { data } = await axios({
      method: "GET",
      url: API_URL + "nft-item/detail/auction",
      params: {
        nft_item_id: nft_item_id,
        limit: limit,
        offset: offset,
      },
    })
    return data.data
  } catch (error) {
    return { data: [], total: 0 }
  }
}

export const getReceivedOfferItem = async (nft_item_id, limit, offset) => {
  try {
    const { data } = await axios({
      method: "GET",
      url: API_URL + "nft-event/get-received-offer",
      params: {
        nft_item_id: nft_item_id,
        limit: limit,
        offset: offset,
      },
    })
    return data.data
  } catch (error) {
    return { data: [], total: 0 }
  }
}

export const getCollectionItems = async (
  collection_id,
  limit,
  offset,
  inventory_status,
  order_by,
  reverse
) => {
  try {
    const { data } = await axios({
      method: "GET",
      url: API_URL + "nft-item/list",
      params: {
        collection_id: collection_id,
        limit: limit,
        offset: offset,
        inventory_status: inventory_status,
        order_by: order_by,
        reverse: reverse,
      },
    })
    return data.data
  } catch (error) {
    return { data: [], total: 0 }
  }
}

export const getActivitiesCollection = async (id, limit, offset) => {
  try {
    const { data } = await axios({
      method: "GET",
      url: API_URL + "nft-event/get-activity-by-collection",
      params: {
        id: id,
        limit: limit,
        offset: offset,
      },
    })
    return data.data
  } catch (error) {
    return { data: [], total: 0 }
  }
}

export const getNftEventList = async (
  nft_item_id,
  chainID,
  type,
  pageSize,
  offset,
  status
) => {
  try {
    const { data } = await axios({
      method: "GET",
      url: API_URL + "nft-event/list",
      params: {
        nft_item_id,
        blockchain_id: chainID,
        kind: type,
        limit: pageSize,
        offset,
        status,
      },
    })
    return data.data
  } catch (error) {
    return { data: [], total: 0 }
  }
}

export const nftItemGetLike = async (nft_item_id, address) => {
  try {
    const { data } = await axios({
      method: "POST",
      url: API_URL + "nft-item/favorite/get-like",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        nft_item_id: +nft_item_id,
        address: address,
      },
    })
    return data.data
  } catch (error) {
    return {
      getlike: 0,
      islike: false,
    }
  }
}

export const nftItemUnlike = async (nft_item_id, address) => {
  try {
    const { data } = await axios({
      method: "POST",
      url: API_URL + "nft-item/unfavorite",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        nft_item_id: +nft_item_id,
        address: address,
      },
    })
    return data.data
  } catch (error) {
    return null
  }
}

export const nftItemLike = async (nft_item_id, address) => {
  try {
    const { data } = await axios({
      method: "POST",
      url: API_URL + "nft-item/favorite",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        nft_item_id: +nft_item_id,
        address: address,
      },
    })
    return data.data
  } catch (error) {
    return null
  }
}

export const getDisvover = async (
  limit,
  offset,
  blockchain_id,
  inventory_status,
  reverse,
  order_by
) => {
  try {
    const { data } = await axios({
      method: "GET",
      url: API_URL + "nft-item/list",
      params:
        inventory_status < 0
          ? {
              limit,
              offset,
              blockchain_id,
              reverse,
              order_by,
            }
          : {
              limit,
              offset,
              blockchain_id,
              inventory_status,
              reverse,
              order_by,
            },
    })
    return data.data
  } catch (error) {}
  return { data: [], total: 0 }
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
