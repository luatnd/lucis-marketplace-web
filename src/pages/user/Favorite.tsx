import { useEffect, useState } from "react"
import { useStore } from "src/hooks/useStore"
import { getNfts } from "src/services/nft"
import { NftItem } from "../../components/NftItem"
import Pagination from "../../components/Pagination"
import Sort from "../../components/Sort"
import network from "../data/network.json"
import { observer } from "mobx-react-lite"

const Favorite = observer(() => {
  const WalletController = useStore("WalletController")
  const { address } = WalletController
  const [data, setData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  const [totalData, setTotalData] = useState(0)

  const getdata = async () => {
    if (address) {
      const res = await getNfts({
        liked_like: address,
        _limit: pageSize,
        _page: currentPage,
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
  }, [pageSize, currentPage])

  return (
    <div className="tab-favorite">
      <div className="sort">
        <Sort customClassName="price-sort" options={network} />
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
          <Pagination
            className="pagination-bar"
            currentPage={currentPage}
            totalCount={totalData}
            pageSize={pageSize}
            onPageChange={(page) => setCurrentPage(page)}
            onPageSizeChange={(pageSize) => setPageSize(pageSize)}
          />
        </>
      )}
    </div>
  )
})

export default Favorite
