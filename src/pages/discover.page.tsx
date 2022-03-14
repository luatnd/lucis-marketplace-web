import { useEffect, useState } from "react"
import { AppPagination } from "src/components/AppPagination"
import { AppSelect } from "src/components/AppSelect"
import { getNfts } from "src/services/nft"
import { ListingBar } from "../components/Home/ListingBar"
import { NftItem } from "../components/NftItem"

const DiscoverPage = () => {

  const [itemTotal, setItemTotal] = useState(0)
  const [itemOffset, setItemOffset] = useState(0)
  const [itemPageSize, setItemPageSize] = useState(20)
  const [items, setItems] = useState<any[]>()
  const [itemType, setItemType] = useState(null)
  const [itemSort, setItemSort] = useState("asc")

  const fetchItems = async () => {
    const {data, total} = await getNfts({
      _limit: itemPageSize,
      _page: Math.ceil(itemOffset / itemPageSize),
      _sort: itemType,
      _order: itemSort
    })
        
    setItems(data)
    setItemTotal(total)
  }

  useEffect(() => {
    fetchItems()
  }, [])

  useEffect(() => {
    fetchItems()
  }, [itemOffset, itemPageSize, itemType, itemSort])

  return (
    <div className="discover-page">
      <ListingBar />
      <h1 className="discover">Discover</h1>
      <div className="discover-sort">
        <p>{itemTotal} items listed</p>
        <div className="sorts">
          <AppSelect
            placeholder={
              <div className="display-flex">
                <img src="/common/bnb.png" alt="" />
                <span>BNB chain</span>
              </div>
            }
            className="network"
            defaultValue={null}
            isSearchable={false}
            onChange={({ value }) => setItemType(value as boolean)}
            options={[
              {
                label: <div className="display-flex">
                  <img src="/common/bnb.png" alt="" />
                  <span>BNB chain</span>
                </div>,
                value: "bnb",
              },
              {
                label: <div className="display-flex">
                  <img src="/common/walletConnect.png" alt="" />
                  <span>WalletConnect</span>
                </div>,
                value: "WalletConnect",
              },
              {
                label: <div className="display-flex">
                  <img src="/common/ethereum.png" alt="" />
                  <span>Ethereum</span>
                </div>,
                value: "ethereum",
              },
              {
                label: <div className="display-flex">
                  <img src="/common/celo.png" alt="" />
                  <span>Celo</span>
                </div>,
                value: "celo",
              },
              {
                label: <div className="display-flex">
                  <img src="/common/aurora.png" alt="" />
                  <span>Aurora</span>
                </div>,
                value: "aurora",
              },
              {
                label: <div className="display-flex">
                  <img src="/common/arbitrum.png" alt="" />
                  <span>Arbitrum</span>
                </div>,
                value: "arbitrum",
              },
              {
                label: <div className="display-flex">
                  <img src="/common/fantom.png" alt="" />
                  <span>Fantom</span>
                </div>,
                value: "fantom",
              },
            ]} />
          <AppSelect
            placeholder="Type"
            className="type-sort"
            defaultValue={null}
            isSearchable={false}
            onChange={({ value }) => setItemType(value as boolean)}
            options={[
              {
                label: "Type",
                value: null,
              },
              {
                label: "Fixed price",
                value: "price",
              },
              {
                label: "Auction",
                value: "topAuc",
              },
            ]}/>
          <AppSelect
            className="price-to-sort"
            placeholder="Price: Min to Max"
            defaultValue={"asc"}
            isSearchable={false}
            // value={itemSort}
            onChange={({ value }) => setItemSort(value)}
            options={[
              {
                label: "Price: Min to Max",
                value: "asc",
              },
              {
                label: "Price: Max to Min",
                value: "desc",
              },
            ]}
          />
        </div>
      </div>
      <div className="grid-custom">
        {items?.map((el, index) => (
          <div className="grid-item" key={index}>
            <NftItem key={el.id} info={el} />
          </div>
        ))}
      </div>
      <AppPagination
        total={itemTotal}
        offset={itemOffset}
        pageSize={itemPageSize}
        onChangeOffset={(value) => setItemOffset(value)}
        onChangPageSize={(value) => setItemPageSize(value)}
      />
    </div>
  )
}

export default DiscoverPage
