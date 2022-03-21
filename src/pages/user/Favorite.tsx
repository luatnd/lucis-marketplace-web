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
  const [blockchain_id, setBlockchain_id] = useState(0)
  const { id } = router.query
  const getdata = async () => {
    if (id) {
      const res = await favoriteUser(id, blockchain_id, pageSize, offset - 1)
      setData(res.data)
      setTotalData(res.total)
    }
  }
  useEffect(() => {
    getdata()
  }, [pageSize, offset, id, blockchain_id])

  const handleBlockchain_id = (el) => {
    setBlockchain_id(el.value)
  }

  return (
    <div className="tab-favorite">
      <div className="sort">
        <AppSelect
          options={networkType}
          isSearchable={false}
          className="network"
          onChange={(el) => handleBlockchain_id(el)}
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
                  <NftItem
                    info={{
                      id: auction.token_id,
                      name: auction.name,
                      price: auction.price,
                      photo: auction.photo,
                      owner:auction.owner_address,
                      contract_name: auction.collection_name,
                      collection_id:auction.collection_id,
                      blockchain_id: auction.blockchain_id,
                      is_verified:auction.is_verified,
                      inventory_status:auction.inventory_status,
                    }}
                  />
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
