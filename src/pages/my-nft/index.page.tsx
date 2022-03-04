import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react"
import Pagination from "src/components/Pagination"
import { AuctionItem } from "src/components/Home/AuctionItem"
import Sort from "src/components/Sort"
import { useState } from "react"
import Collected from "./Collected"

const MyNft = () => {
  const [showSort, setShowSort] = useState([false])
  const [money, setMoney] = useState("All")
  const [price, setPrice] = useState("All")
  const [sell, setSell] = useState("All")
  const [made, setMade] = useState("All")
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  const moneySort = [
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
  const priceSort = [
    { img: "/common/bnb.png", name: "BNB chain" },
    { img: "/common/walletConnect.png", name: "WalletConnect" },
    { img: "/common/ethereum.png", name: "Ethereum" },
    { img: "/common/celo.png", name: "Celo" },
    { img: "/common/aurora.png", name: "Aurora" },
    { img: "/common/arbitrum.png", name: "Arbitrum" },
    { img: "/common/fantom.png", name: "Fantom" },
  ]
  const sellSort = [
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
      name: "Received Offer",
    },
  ]
  const madeSort = [
    {
      img: "",
      name: "Recently Made",
    },
    {
      img: "",
      name: "Recently",
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
    <div className="my-nft">
      <div className="account">
        <img className="left" src="/common/my-nft/account.png" alt="" />
        <div className="right">
          <div className="top">
            <h2>DONG CUONG</h2>
            <img src="/common/my-nft/account-rank.png" alt="" />
          </div>
          <div
            className="bottom"
            onClick={() => {
              navigator.clipboard.writeText("0X123466...X452")
            }}
          >
            <span>0X123466...X452</span>
            <img src="/common/my-nft/copy.png" alt="" />
          </div>
        </div>
      </div>
      <div className="container">
        <Tabs>
          <TabList>
            <Tab>Offering</Tab>
            <Tab>On sale</Tab>
            <Tab>Collected</Tab>
            <Tab>Favorite</Tab>
            <Tab>Activities</Tab>
          </TabList>
          <h3>My NFT</h3>
          <TabPanels>
            <TabPanel>
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
                      />
                      <Sort
                        customClassName="price-sort"
                        options={moneySort}
                      />
                      <Sort
                        customClassName="type-sort"
                        options={madeSort}
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
                    <TabPanel>
                      <div className="offering-make">
                        <div className="list">
                          <div className="title item">Item</div>
                          <div className="title price">Price</div>
                          <div className="title">To</div>
                          <div className="title">Expiration</div>
                          <div className="title">Offered</div>
                          <div className="title">Action</div>
                          {/* {
                            auctions.slice(0,10).map(auction=><>
                            </>)
                          } */}
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
                  </TabPanels>
                </Tabs>
              </div>
            </TabPanel>
            <TabPanel>
              <p>two!</p>
            </TabPanel>
            <TabPanel>
              <Collected />
            </TabPanel>
            <TabPanel>
              <p>four!</p>
            </TabPanel>
            <TabPanel>
              <p>five!</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </div>
  )
}
export default MyNft
