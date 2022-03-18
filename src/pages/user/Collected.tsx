import { Icon, Input, InputGroup, InputRightElement } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import * as Icons from "react-feather"
import { useStore } from "src/hooks/useStore"
import { collectedUser, getNfts } from "src/services/nft"
import { NftItem } from "../../components/NftItem"
import { AppSelect } from "src/components/AppSelect"
import { networkType } from "../data/networkType"
import { observer } from "mobx-react-lite"
import { AppPagination } from "src/components/AppPagination"
import { useRouter } from "next/router"

const Collected = observer(() => {
  const WalletController = useStore("WalletController")
  const { address } = WalletController

  const [data, setData] = useState([])
  const [pageSize, setPageSize] = useState(20)
  const [totalData, setTotalData] = useState(0)
  const [offset, setOffset] = useState(0)

  const router = useRouter()
  const { id } = router.query

  const getdata = async () => {
    if (id) {
      const res = await collectedUser(id, pageSize, offset,null)
      setData(res.data)
      setTotalData(res.total)
    }
  }
  useEffect(() => {
    getdata()
  }, [pageSize, offset,id])

  const typeSort = [
    {
      value: "",
      label: "All",
    },
    {
      value: "",
      label: "Selling",
    },
    {
      value: "asc",
      label: "Auction",
    },
    {
      value: "desc",
      label: "Not sold",
    },
  ]

  return (
    <div className="tab-collected">
      <div className="sort">
        <InputGroup className="group-search">
          <Input size="md" placeholder="" />
          <InputRightElement>
            <Icon as={Icons.Search} />
          </InputRightElement>
        </InputGroup>
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
        <AppSelect isSearchable={false} options={typeSort} placeholder="All" />
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
                  <NftItem info={auction} />
                </div>
              ))}
            </div>
          </div>
          <AppPagination
            total={totalData}
            offset={offset}
            pageSize={pageSize}
            onChangPageSize={(pageSize) => setPageSize(pageSize)}
            onChangeOffset={(offset) => setOffset(offset)}
          />
        </>
      )}
    </div>
  )
})

export default Collected
