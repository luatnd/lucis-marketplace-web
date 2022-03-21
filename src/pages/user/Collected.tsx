import {
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import * as Icons from "react-feather"
import { useStore } from "src/hooks/useStore"
import { collectedUser } from "src/services/nft"
import { NftItem } from "../../components/NftItem"
import { AppSelect } from "src/components/AppSelect"
import { networkType } from "../data/networkType"
import { observer } from "mobx-react-lite"
import { AppPagination } from "src/components/AppPagination"
import { useRouter } from "next/router"

let searchTimer

const Collected = observer(() => {
  const WalletController = useStore("WalletController")
  const { address } = WalletController

  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(false)

  const [data, setData] = useState([])
  const [pageSize, setPageSize] = useState(20)
  const [totalData, setTotalData] = useState(0)
  const [offset, setOffset] = useState(1)
  const [order, setOrder] = useState(null)
  const [blockchain_id, setBlockchain_id] = useState(0)

  const router = useRouter()
  const { id } = router.query

  const getdata = async () => {
    if (id && !loading) {
      const res = await collectedUser(
        id,
        pageSize,
        offset - 1,
        blockchain_id,
        order,
        search
      )
      setData(res.data)
      setTotalData(res.total)
    }
  }
  useEffect(() => {
    getdata()
  }, [pageSize, offset, id, order, blockchain_id, loading])

  const typeSort = [
    {
      value: null,
      label: "All",
    },
    {
      value: 1,
      label: "Selling",
    },
    {
      value: 2,
      label: "Auction",
    },
    {
      value: 0,
      label: "Not sold",
    },
  ]

  const handleBlockchain_id = (el) => {
    setBlockchain_id(el.value)
  }

  const handleChange = (el) => {
    setOrder(el.value)
  }

  const onSearch = async ({ target: { value } }) => {
    setLoading(true)
    setSearch(value)
    clearTimeout(searchTimer)
    searchTimer = setTimeout(() => {
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="tab-collected">
      <div className="sort">
        <InputGroup className="group-search">
          <Input size="md" placeholder="" value={search} onChange={onSearch} />
          <InputRightElement>
            <Icon as={loading ? Spinner : Icons.Search} />
          </InputRightElement>
        </InputGroup>
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
        <AppSelect
          isSearchable={false}
          options={typeSort}
          placeholder="All"
          onChange={(el) => handleChange(el)}
        />
      </div>
      {data.length == 0 ? (
        <img className="nodata" src="/common/my-nft/nodata.png" alt="" />
      ) : (
        <>
          {" "}
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
                      contract_name: auction.contract_name,
                      collection_id: auction.collection_id,
                      blockchain_id: auction.blockchain_id,
                      inventory_status: auction.inventory_status,
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
          <AppPagination
            total={totalData}
            offset={offset}
            limit={pageSize}
            onChangeLimit={(pageSize) => setPageSize(pageSize)}
            onChangeOffset={(offset) => setOffset(offset)}
          />
        </>
      )}
    </div>
  )
})

export default Collected
