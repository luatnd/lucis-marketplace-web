import { useEffect, useState } from "react"
import { useStore } from "src/hooks/useStore"
import { getNfts } from "src/services/nft"
import { NftItem } from "../../components/NftItem"
import Pagination from "../../components/Pagination"
import Sort from "../../components/Sort"
import network from "../data/network.json"
import { observer } from "mobx-react-lite"
import { AppPagination } from "src/components/AppPagination"
import { AppSelect } from "src/components/AppSelect"
import { networkType } from "../data/networkType"

const Favorite = observer(() => {
  const WalletController = useStore("WalletController")
  const { address } = WalletController
  const [data, setData] = useState([])
  const [offset, setOffset] = useState(0)
  const [pageSize, setPageSize] = useState(20)
  const [totalData, setTotalData] = useState(0)

  const getdata = async () => {
    if (address) {
      const res = await getNfts({
        liked_like: address,
        _limit: pageSize,
        _page: Math.ceil(offset / pageSize),
      })
      setData(res.data)
      setTotalData(res.total)
    }
  }
  useEffect(() => {
    getdata()
  }, [address])
  useEffect(() => {
    getdata()
  }, [pageSize, offset])

  return (
    <div className="tab-favorite">
      <div className="sort">
        <AppSelect
          options={networkType}
          isSearchable={false}
          className="network"
          placeholder={
            <div className="placeholder">
              <img src="/common/all-network.png" alt="" />
              All network
            </div>
          }
        />
      </div>
      {data.length == 0 ? (
        <img className="nodata" src="/common/my-nft/nodata.png" alt="" />
      ) : (
        <>
          <div className="">
            <div className="grid-custom">
              {data.map((auction) => (
                <div className="grid-item" key={auction.id}>
                  <NftItem info={auction} />
                </div>
              ))}
            </div>
          </div>
          <AppPagination
            total={totalData}
            limit={pageSize}
            offset={offset}
            onChangeLimit={(pageSize) => setPageSize(pageSize)}
            onChangeOffset={(offset) => setOffset(offset)}
          />
        </>
      )}
    </div>
  )
})

export default Favorite
