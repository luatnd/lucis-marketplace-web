import { Icon, Input, InputGroup, InputRightElement } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import * as Icons from "react-feather"
import { useStore } from "src/hooks/useStore"
import { getNfts } from "src/services/nft"
import { NftItem } from "../../components/NftItem"
import Pagination from "../../components/Pagination"
import Sort from "../../components/Sort"
import network from "../data/network.json"
import { observer } from "mobx-react-lite"

const Collected = observer(() => {
  const WalletController = useStore("WalletController")
  const { address } = WalletController
  const [data, setData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  const [totalData, setTotalData] = useState(0)
  const [offset, setOffset] = useState(1)
  const getdata = async () => {
    if (address) {
      const res = await getNfts({
        owner: address,
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
  }, [currentPage])
  useEffect(() => {
    setOffset(Number(pageSize * currentPage - pageSize + 1))
  }, [currentPage])

  useEffect(() => {
    setCurrentPage(Math.ceil(offset / pageSize))
  }, [pageSize])
  const typeSort = [
    {
      img: "",
      name: "All",
    },
    {
      img: "",
      name: "Selling",
    },
    {
      img: "",
      name: "Auction",
    },
    {
      img: "",
      name: "Not sold",
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
        <Sort customClassName="price-sort" options={network} />
        <Sort customClassName="type-sort" options={typeSort} />
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

export default Collected
