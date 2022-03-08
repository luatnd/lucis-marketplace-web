import { useEffect, useState } from "react"
import { NftItem } from "../../components/NftItem"
import Pagination from "../../components/Pagination"
import Sort from "../../components/Sort"
import auctions from "../data/auctions.json"
import network from "../data/network.json"

const Favorite = () => {
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
    <div className="tab-favorite">
      <div className="sort">
        <Sort customClassName="price-sort" options={network} />
      </div>
      <div className="">
        <div className="grid-custom">
          {data.map((auction, index) => (
            <div className="grid-item" key={index}>
              <NftItem
                key={auction.id}
                name={auction.name}
                image={auction.image}
                provider={auction.provider}
                endTime={auction.endTime}
                price={auction.price}
                auction={auction.auction}
                activeBtn={Math.random() < 0.9}
                hidePrice={auction?.hidePrice}
                owner={auction?.owner}
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

export default Favorite
