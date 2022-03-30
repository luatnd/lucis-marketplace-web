import { observer } from "mobx-react-lite"
import { useEffect, useState } from "react"
import { AppPagination } from "src/components/AppPagination"
import { AppSelect } from "src/components/AppSelect"
import { useStore } from "src/hooks/useStore"
import { getDisvover } from "src/services/nft"
import { ListingBar } from "../components/Home/ListingBar"
import { NftItem } from "../components/NftItem"

const DiscoverPage = observer(() => {
  const BlockchainStore = useStore("BlockchainStore")
  const { blockchain_Array, blockchain_id } = BlockchainStore

  const [data, setData] = useState([])
  const [total, setTotal] = useState(0)
  const [limit, setLimit] = useState(20)
  const [offset, setOffset] = useState(1)
  const [blockchain_id0, setBlockchain_id0] = useState(0)
  const [inventory_status, setInventory_status] = useState(-1)
  const [order, setOrder] = useState({
    reverse: true,
    order_by: "id",
  })

  const getData = async () => {
    const chainID = blockchain_id ? blockchain_id : blockchain_id0
    const res = await getDisvover(
      limit,
      offset - 1,
      chainID,
      inventory_status,
      order.reverse,
      order.order_by
    )
    setData(res.data)
    setTotal(res.total)
  }
  useEffect(() => {
    getData()
  }, [limit, offset, blockchain_id, blockchain_id0, inventory_status, order])

  const handleBlockchain_id = (el) => {
    setBlockchain_id0(el.value)
  }
  const handleType = (el) => {
    setInventory_status(el.value)
  }
  const handleOrder = (el) => {
    setOrder(el.value)
  }

  return (
    <div className="discover-page">
      <ListingBar />
      <h1 className="discover">Discover</h1>
      <div className="discover-sort">
        <p>{total} items listed</p>
        <div className="sorts">
          <AppSelect
            options={blockchain_Array}
            isSearchable={false}
            className={blockchain_id ? "network hidden" : "network"}
            onChange={(el) => handleBlockchain_id(el)}
            placeholder={
              <div className="placeholder">
                <img src="/common/all-network.png" alt="" />
                All network
              </div>
            }
          />
          <AppSelect
            placeholder="Type"
            isSearchable={false}
            options={[
              { value: -1, label: "Type" },
              { value: 1, label: "Price Fixed" },
              { value: 2, label: "Auction" },
            ]}
            onChange={(el) => handleType(el)}
          />
          <AppSelect
            placeholder="Price"
            isSearchable={false}
            onChange={(el) => handleOrder(el)}
            options={[
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
      <div className="grid-custom">
        {data.map((el, index) => (
          <div className="grid-item" key={index}>
            <NftItem
              info={{
                id: el.id,
                name: el.name,
                price: el.price,
                photo: el.photo,
                owner: el.owner_address,
                contract_name: el.contract_name,
                collection_id: el.collection_id,
                blockchain_id: el.blockchain_id,
                is_verified: el.is_verified,
                inventory_status:el.inventory_status,
                endTime:el.endTime,
                symbol:blockchain_Array[el.blockchain_id]?.symbol
              }}
            />
          </div>
        ))}
      </div>
      <AppPagination
        total={total}
        limit={limit}
        offset={offset}
        onChangeLimit={(limit) => setLimit(limit)}
        onChangeOffset={(offset) => setOffset(offset)}
      />
    </div>
  )
})

export default DiscoverPage
