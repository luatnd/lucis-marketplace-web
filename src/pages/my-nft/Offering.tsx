import Pagination from "src/components/Pagination"
import { AuctionItem } from "src/components/Home/AuctionItem"
import Sort from "src/components/Sort"
import { useState } from "react"
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react"
const Offering = () => {
  const [price, setPrice] = useState("All")
  const [made, setMade] = useState("All")
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  const priceSort = [
    { img: "/common/bnb.png", name: "BNB chain" },
    { img: "/common/walletConnect.png", name: "WalletConnect" },
    { img: "/common/ethereum.png", name: "Ethereum" },
    { img: "/common/celo.png", name: "Celo" },
    { img: "/common/aurora.png", name: "Aurora" },
    { img: "/common/arbitrum.png", name: "Arbitrum" },
    { img: "/common/fantom.png", name: "Fantom" },
  ]
  const madeSort = [
    {
      img: "",
      name: "Newest",
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
  const dataSoure = [
    {
      key: 1,
      type: "Sale",
    },
    {
      key: 2,
      type: "Listing",
    },
    {
      key: 3,
      type: "Offer",
    },
    {
      key: 4,
      type: "Auction",
    },
    {
      key: 5,
      type: "Sale",
    },
    {
      key: 6,
      type: "Auction",
    },
    {
      key: 7,
      type: "Offer",
    },
    {
      key: 8,
      type: "Listing",
    },
    {
      key: 9,
      type: "Sale",
    },
    {
      key: 10,
      type: "Sale",
    },
  ]
  const auctions = [
    {
      id: "1",
      name: "CUONG DOLLA NFT",
      image: "/home/discovers/discover1.png",
      provider: "Animverse",
      endTime: "2022-03-15T00:00:00",
      price: 0.99,
    },
    {
      id: "2",
      name: "CUONG DOLLA NFT",
      image: "/home/discovers/discover2.png",
      provider: "Animverse",
      endTime: "2022-03-15T00:00:00",
      price: 0.99,
    },
    {
      id: "3",
      name: "CUONG DOLLA NFT",
      image: "/home/discovers/discover3.png",
      provider: "Animverse",
      endTime: "2022-03-15T00:00:00",
      price: 0.99,
    },
    {
      id: "4",
      name: "CUONG DOLLA NFT",
      image: "/home/discovers/discover4.png",
      provider: "Animverse",
      endTime: "2022-03-15T00:00:00",
      price: 0.99,
    },
    {
      id: "5",
      name: "CUONG DOLLA NFT",
      image: "/home/discovers/discover5.png",
      provider: "Animverse",
      endTime: "2022-03-15T00:00:00",
      price: 0.99,
    },
    {
      id: "6",
      name: "CUONG DOLLA NFT",
      image: "/home/discovers/discover1.png",
      provider: "Animverse",
      endTime: "2022-03-15T00:00:00",
      price: 0.99,
    },
    {
      id: "7",
      name: "CUONG DOLLA NFT",
      image: "/home/discovers/discover2.png",
      provider: "Animverse",
      endTime: "2022-03-15T00:00:00",
      price: 0.99,
    },
    {
      id: "8",
      name: "CUONG DOLLA NFT",
      image: "/home/discovers/discover3.png",
      provider: "Animverse",
      endTime: "2022-03-15T00:00:00",
      price: 0.99,
    },
    {
      id: "9",
      name: "CUONG DOLLA NFT",
      image: "/home/discovers/discover4.png",
      provider: "Animverse",
      endTime: "2022-03-15T00:00:00",
      price: 0.99,
    },
    {
      id: "10",
      name: "CUONG DOLLA NFT",
      image: "/home/discovers/discover5.png",
      provider: "Animverse",
      endTime: "2022-03-15T00:00:00",
      price: 0.99,
    },
    {
      id: "11",
      name: "CUONG DOLLA NFT",
      image: "/home/discovers/discover1.png",
      provider: "Animverse",
      endTime: "2022-03-15T00:00:00",
      price: 0.99,
    },
    {
      id: "12",
      name: "CUONG DOLLA NFT",
      image: "/home/discovers/discover2.png",
      provider: "Animverse",
      endTime: "2022-03-15T00:00:00",
      price: 0.99,
    },
    {
      id: "13",
      name: "CUONG DOLLA NFT",
      image: "/home/discovers/discover3.png",
      provider: "Animverse",
      endTime: "2022-03-15T00:00:00",
      price: 0.99,
    },
    {
      id: "14",
      name: "CUONG DOLLA NFT",
      image: "/home/discovers/discover4.png",
      provider: "Animverse",
      endTime: "2022-03-15T00:00:00",
      price: 0.99,
    },
    {
      id: "15",
      name: "CUONG DOLLA NFT",
      image: "/home/discovers/discover5.png",
      provider: "Animverse",
      endTime: "2022-03-15T00:00:00",
      price: 0.99,
    },
    {
      id: "16",
      name: "CUONG DOLLA NFT",
      image: "/home/discovers/discover1.png",
      provider: "Animverse",
      endTime: "2022-03-15T00:00:00",
      price: 0.99,
    },
    {
      id: "17",
      name: "CUONG DOLLA NFT",
      image: "/home/discovers/discover2.png",
      provider: "Animverse",
      endTime: "2022-03-15T00:00:00",
      price: 0.99,
    },
    {
      id: "18",
      name: "CUONG DOLLA NFT",
      image: "/home/discovers/discover3.png",
      provider: "Animverse",
      endTime: "2022-03-15T00:00:00",
      price: 0.99,
    },
    {
      id: "19",
      name: "CUONG DOLLA NFT",
      image: "/home/discovers/discover4.png",
      provider: "Animverse",
      endTime: "2022-03-15T00:00:00",
      price: 0.99,
    },
    {
      id: "20",
      name: "CUONG DOLLA NFT",
      image: "/home/discovers/discover5.png",
      provider: "Animverse",
      endTime: "2022-03-15T00:00:00",
      price: 0.99,
    },
  ]
  return (
    <div className="tab">
      <Tabs>
        <div className="tab-sort">
          <TabList>
            <Tab>auction</Tab>
            <Tab>Make Offer</Tab>
          </TabList>
          <div className="right">
            <Sort
              customClassName="price-sort"
              options={priceSort}
              onSelectOption={(price) => setPrice(price)}
            />
            <Sort
              customClassName="type-sort"
              options={madeSort}
              onSelectOption={(made) => setMade(price)}
            />
          </div>
        </div>
        <TabPanels>
          <TabPanel>
            <div className="offering-auction">
              <div className="list">
                {auctions.map((auction) => (
                  <AuctionItem
                    key={auction.id}
                    name={auction.name}
                    image={auction.image}
                    provider={auction.provider}
                    endTime={auction.endTime}
                    price={auction.price}
                    activeBtn={true}
                  />
                ))}
              </div>
              <Pagination
                className="pagination-bar"
                currentPage={currentPage}
                totalCount={500}
                pageSize={10}
                onPageChange={(page) => setCurrentPage(page)}
                onPageSizeChange={(pageSize) => setPageSize(pageSize)}
              />
            </div>
          </TabPanel>
          <TabPanel className="offering-make">
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Item</Th>
                  <Th isNumeric>Price</Th>
                  <Th>To</Th>
                  <Th>Expiration</Th>
                  <Th>Offered</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {dataSoure.map((data) => (
                  <Tr key={data.key}>
                    <Td className="item">
                      <img src="/icons/item.png" alt="" />
                      <div>
                        <p>
                          Animverse{" "}
                          <img src="/common/my-nft/check.png" alt="" />
                        </p>
                        <p>CUONG DOLLA NFT</p>
                      </div>
                    </Td>
                    <Td isNumeric>26.94 BNB</Td>
                    <Td>Nhi</Td>
                    <Td>in 2 days</Td>
                    <Td>1 days ago</Td>
                    <Td className="button">
                      <button>Cancel</button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  )
}
export default Offering
