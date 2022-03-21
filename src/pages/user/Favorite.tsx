import { useEffect, useState } from "react"
import { favoriteUser } from "src/services/nft"
import { NftItem } from "../../components/NftItem"
import { observer } from "mobx-react-lite"
import { AppPagination } from "src/components/AppPagination"
import { AppSelect } from "src/components/AppSelect"
import { networkType } from "../data/networkType"
import { useRouter } from "next/router"

const Favorite = observer(() => {
  const router = useRouter()
  const [data, setData] = useState([])
  const [offset, setOffset] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  const [totalData, setTotalData] = useState(0)
  const { id } = router.query
  const getdata = async () => {
    if (id) {
      const res = await favoriteUser(id, 2)
      setData(res.data)
      setTotalData(res.total)
    }
  }
  useEffect(() => {
    getdata()
  }, [pageSize, offset, id])

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
      {!totalData ? (
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
