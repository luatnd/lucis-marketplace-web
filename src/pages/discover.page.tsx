import { Center, Grid, SimpleGrid, Wrap, WrapItem } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { AuctionItem } from "../components/Home/AuctionItem"
import { HomeSection } from "../components/Home/HomeSection"
import { Listing } from "../components/Home/Listing"
import Pagination from "../components/Pagination"
import Sort from "../components/Sort"
import auctions from './data/auctions.json'

const DiscoverPage = () => {

  const priceSort = [
    {
      'img': '/common/bnb-logo.png',
      'name': 'BNB Chain'
    },
    {
      'img': '/common/walletConnect.png',
      'name': 'WalletConnect'
    },
    {
      'img': '/common/ethereum.png',
      'name': 'Ethereum'
    },
    {
      'img': '/common/celo.png',
      'name': 'Celo'
    },
    {
      'img': '/common/aurora.png',
      'name': 'Aurora'
    },
    {
      'img': '/common/arbitrum.png',
      'name': 'Arbitrum'
    },
    {
      'img': '/common/fantom.png',
      'name': 'Fantom'
    }
  ]
  const typeSort = [
    {
      'img': '',
      'name': 'Type',
    },
    {
      'img': '',
      'name': 'Fixed',
    },
    {
      'img': '',
      'name': 'Auction',
    }
  ]
  const priceTo = [
    {
      'img': '',
      'name': 'Price'
    },
    {
      'img': '',
      'name': 'Price: Min to Max'
    },
    {
      'img': '',
      'name': 'Price: Max to Min'
    }
  ]

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [data, setData] = useState([]);
  const [sort, setSort] = useState("All");
  const [totalData, setTotalData] = useState(Number(auctions.length));

  useEffect(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    setData(auctions.slice(firstPageIndex, lastPageIndex));
  }, [currentPage, pageSize, sort]);

  return <div className="discover-page">
    <Listing />
    <h1 className="discover">Discover</h1>
    <div className="discover-sort">
      <p>{auctions.length} items listed</p>
      <div className="sorts">
        <Sort
          customClassName="price-sort"
          options={priceSort}
          onSelectOption={() => {}}
        />
        <Sort
          customClassName="type-sort"
          options={typeSort}
          onSelectOption={sort => setSort(sort)}
        />
        <Sort
          customClassName="price-to-sort"
          options={priceTo}
          onSelectOption={() => {}}
        />
      </div>
    </div>
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
            />
        </div>
        ))}
    </div>
    <Pagination
      className="pagination-bar"
      currentPage={currentPage}
      totalCount={totalData}
      pageSize={pageSize}
      onPageChange={page => setCurrentPage(page)}
      onPageSizeChange={pageSize => setPageSize(pageSize)}
    />
  </div>
}

export default DiscoverPage
