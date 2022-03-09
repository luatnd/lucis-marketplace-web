import { Icon, Input, InputGroup, InputRightElement } from "@chakra-ui/react"
import Sort from "../../components/Sort"
import network from "../data/network.json"
import * as Icons from "react-feather"
import { AuctionItem } from "../../components/Home/AuctionItem"
import auctions from "../data/auctions.json"
import { useEffect, useState } from "react"
import Pagination from "../../components/Pagination"

const Collected = () => {
  const [data, setData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  const [totalData, setTotalData] = useState(Number(auctions.length))

  useEffect(() => {
    const firstPageIndex = (currentPage - 1) * pageSize
    const lastPageIndex = firstPageIndex + pageSize
    setData(auctions.slice(firstPageIndex, lastPageIndex))
  }, [currentPage, pageSize])

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
          {data.map((auction, index) => (
            <div className="grid-item" key={index}>
              <AuctionItem
                key={auction.id}
                name={auction.name}
                image={auction.image}
                provider={auction.provider}
                endTime={auction.endTime}
                price={auction.price}
                auction={auction.auction}
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
