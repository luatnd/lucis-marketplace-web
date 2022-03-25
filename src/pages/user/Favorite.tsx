import { useEffect, useState } from "react"
import { favoriteUser } from "src/services/nft"
import { NftItem } from "../../components/NftItem"
import { observer } from "mobx-react-lite"
import { AppPagination } from "src/components/AppPagination"
import { AppSelect } from "src/components/AppSelect"
import { useRouter } from "next/router"
import { useStore } from "src/hooks/useStore"

const Favorite = observer(() => {
  const BlockchainStore = useStore("BlockchainStore")
  const { blockchain_Array, blockchain_id } = BlockchainStore
  const router = useRouter()
  const [data, setData] = useState([])
  const [offset, setOffset] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  const [totalData, setTotalData] = useState(0)
  const [blockchain_id1, setBlockchain_id1] = useState(0)
  const { id } = router.query
  const getdata = async () => {
    if (id) {
      const chainID = blockchain_id ? blockchain_id : blockchain_id1
      const res = await favoriteUser(id, chainID, pageSize, offset - 1)
      setData(res.data)
      setTotalData(res.total)
    }
  }
  useEffect(() => {
    getdata()
  }, [pageSize, offset, id, blockchain_id, blockchain_id1])

  const handleBlockchain_id = (el) => {
    setBlockchain_id1(el.value)
  }

  return (
    <div className="tab-favorite">
      <div className="sort">
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
                      owner: auction.owner_address,
                      contract_name: auction.collection_name,
                      collection_id: auction.collection_id,
                      blockchain_id: auction.blockchain_id,
                      is_verified: auction.is_verified,
                      inventory_status: auction.inventory_status,
                      symbol: blockchain_Array[auction.blockchain_id].symbol,
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
