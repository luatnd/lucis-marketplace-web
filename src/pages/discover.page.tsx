import { GetServerSidePropsContext } from "next"
import { useEffect, useState } from "react"
import { getDiscovers } from "src/services/nft"
import { ListingBar } from "../components/Home/ListingBar"
import { NftItem } from "../components/NftItem"
import Pagination from "../components/Pagination"
import Sort from "../components/Sort"

const DiscoverPage = (props) => {
  const {
    discovers
  } = props
  const priceSort = [
    {
      img: "/common/bnb-logo.png",
      name: "BNB Chain",
    },
    {
      img: "/common/walletConnect.png",
      name: "WalletConnect",
    },
    {
      img: "/common/ethereum.png",
      name: "Ethereum",
    },
    {
      img: "/common/celo.png",
      name: "Celo",
    },
    {
      img: "/common/aurora.png",
      name: "Aurora",
    },
    {
      img: "/common/arbitrum.png",
      name: "Arbitrum",
    },
    {
      img: "/common/fantom.png",
      name: "Fantom",
    },
  ]
  const typeSort = [
    {
      img: "",
      name: "Type",
    },
    {
      img: "",
      name: "Fixed Price",
    },
    {
      img: "",
      name: "Auction",
    },
  ]
  const priceTo = [
    {
      img: "",
      name: "Price",
    },
    {
      img: "",
      name: "Price: Min to Max",
    },
    {
      img: "",
      name: "Price: Max to Min",
    },
  ]

  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [data, setData] = useState([])
  const [sort, setSort] = useState("All")
  const [totalData, setTotalData] = useState(Number(discovers.length))

  useEffect(() => {
    const firstPageIndex = (currentPage - 1) * pageSize
    const lastPageIndex = firstPageIndex + pageSize
    setData(discovers.slice(firstPageIndex, lastPageIndex))
  }, [currentPage, pageSize, sort])

  return (
    <div className="discover-page">
      <ListingBar />
      <h1 className="discover">Discover</h1>
      <div className="discover-sort">
        <p>{discovers.length} items listed</p>
        <div className="sorts">
          <Sort customClassName="price-sort" options={priceSort} />
          <Sort customClassName="type-sort" options={typeSort} />
          <Sort customClassName="price-to-sort" options={priceTo} />
        </div>
      </div>
      <div className="grid-custom">
        {data.map((el, index) => (
          <div className="grid-item" key={index}>
            <NftItem
              id={el.id}
              key={el.id}
              name={el.name}
              image={el.image}
              collection={el.collection}
              endTime={el.endTime}
              price={el.price}
              isAuction={el.isAuction}
            />
          </div>
        ))}
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

export default DiscoverPage

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const [
    discovers
  ] = await Promise.all([
    getDiscovers(),
  ])

  return {
    props: {
      discovers
    },
  }
}