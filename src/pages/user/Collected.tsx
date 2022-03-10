import { Icon, Input, InputGroup, InputRightElement } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import * as Icons from "react-feather"
import { useStore } from "src/hooks/useStore"
import { getNft, getNfts } from "src/services/nft"
import { NftItem } from "../../components/NftItem"
import Pagination from "../../components/Pagination"
import Sort from "../../components/Sort"
import network from "../data/network.json"

const Collected = () => {
  const WalletController = useStore("WalletController")
  const { address } = WalletController
  const [data, setData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  const [totalData, setTotalData] = useState(0)
  const getdata = async () => {
    const res = await getNfts({
      owner: address,
      _limit: pageSize,
      _page: currentPage,
    })
    setData(res.data)
    setTotalData(res.total)
  }
  useEffect(() => {
    getdata()
  }, [])
  useEffect(() => {
    getdata()
  }, [pageSize, currentPage])
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
      <div className="">
        <div className="grid-custom">
          {data.map((auction) => (
            <div className="grid-item" key={auction.id}>
              <NftItem
                id={auction.id}
                key={auction.id}
                name={auction.name}
                image={auction.image}
                collection={auction.collection}
                endTime={auction.endTime}
                price={auction.price}
                isAuction={auction.isAuction}
                activeBtn={true}
              />
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
    </div>
  )
}

export default Collected
