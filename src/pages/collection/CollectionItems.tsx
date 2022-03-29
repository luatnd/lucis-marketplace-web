import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { AppPagination } from "src/components/AppPagination"
import { AppSelect } from "src/components/AppSelect"
import { NftItem } from "src/components/NftItem"
import { useStore } from "src/hooks/useStore"
import { getCollectionItems } from "src/services/nft"

export const CollectionItems = () => {
  const BlockchainStore = useStore("BlockchainStore")
  const { blockchain_Array } = BlockchainStore

  const router = useRouter()
  const { id } = router.query

  const [data, setData] = useState<any>()
  const [total, setTotal] = useState(0)
  const [offset, setOffset] = useState(1)
  const [limit, setLimit] = useState(20)
  const [inventory_status, setInventory_status] = useState(0)
  const [order, setOrder] = useState({
    reverse: true,
    order_by: "created_time",
  })

  const getData = async () => {
    if (id) {
      const res = await getCollectionItems(
        id,
        limit,
        offset - 1,
        inventory_status,
        order.order_by,
        order.reverse
      )
      setData(res.data)
      setTotal(res.total)
    }
  }
  useEffect(() => {
    getData()
  }, [id, limit, offset, inventory_status, order])

  const handleChangeType = (el) => {
    setInventory_status(el.value)
  }
  const handleChange = (el) => {
    setOrder(el.value)
  }
  return (
    <div className="collection-item-list">
      <div className="filter-row">
        <div className="total">{total ? total + " items listed" : ""}</div>
        <div className="filter">
          <AppSelect
            placeholder="Type"
            isSearchable={false}
            onChange={(el) => handleChangeType(el)}
            options={[
              {
                label: "Type",
                value: 0,
              },
              {
                label: "Fixed price",
                value: 1,
              },
              {
                label: "Auction",
                value: 2,
              },
            ]}
          />
          <AppSelect
            placeholder="Recently listed"
            isSearchable={false}
            onChange={(el) => handleChange(el)}
            options={[
              {
                value: {
                  reverse: true,
                  order_by: "created_time",
                },
                label: "Recently listed",
              },
              {
                value: {
                  reverse: false,
                  order_by: "price",
                },
                label: "Price: Min to Max",
              },
              {
                value: {
                  reverse: true,
                  order_by: "price",
                },
                label: "Price: Max to Min",
              },
            ]}
          />
        </div>
      </div>
      <div className="item-list">
        {data?.map((item) => (
          <NftItem
            info={{
              id: item.id,
              name: item.name,
              price: item.price,
              photo: item.photo,
              owner: item.owner_address,
              contract_name: item.contract_name,
              collection_id: item.collection_id,
              blockchain_id: item.blockchain_id,
              is_verified: item.is_verified,
              inventory_status: item.inventory_status,
              endTime: item.deadline,
              symbol: blockchain_Array[item.blockchain_id]?.symbol,
            }}
            key={item.id}
          />
        ))}
      </div>
      <AppPagination
        total={total}
        offset={offset}
        limit={limit}
        onChangeOffset={(value) => setOffset(value)}
        onChangeLimit={(value) => setLimit(value)}
      />
    </div>
  )
}
