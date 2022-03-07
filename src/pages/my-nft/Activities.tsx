import Pagination from "src/components/Pagination"
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
import Sort from "src/components/Sort"
import { useState } from "react"
const Activities = () => {
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
      name: "Recently listed",
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
  return (
    <div className="tab">
      <Tabs>
        <div className="tab-sort">
          <TabList>
            <Tab>Favorites</Tab>
            <Tab>mine</Tab>
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
          <TabPanel className="tab-activities">
            {dataSoure.length > 0 ? (
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Type</Th>
                    <Th>Item</Th>
                    <Th isNumeric>Price</Th>
                    <Th>From</Th>
                    <Th>To</Th>
                    <Th>Date</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {dataSoure.map((data) => (
                    <Tr key={data.key}>
                      <Td>{data.type}</Td>
                      <Td className="item">
                        <img src="/icons/item.png" alt="" /> Animverse
                      </Td>
                      <Td isNumeric>26.94 BNB</Td>
                      <Td>Dong Van Cuong</Td>
                      <Td>0x531b…fFf8</Td>
                      <Td className="date">
                        1 days ago <img src="/icons/open-new.png" alt="" />
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            ) : (
              <img className="nodata" src="/common/my-nft/nodata.png" alt="" />
            )}
            {dataSoure.length > 0 ? (
              <Pagination
                className="pagination-bar"
                currentPage={currentPage}
                totalCount={500}
                pageSize={10}
                onPageChange={(page) => setCurrentPage(page)}
                onPageSizeChange={(pageSize) => setPageSize(pageSize)}
              />
            ) : null}
          </TabPanel>
          <TabPanel className="tab-activities">
            {dataSoure.length > 0 ? (
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Type</Th>
                    <Th>Item</Th>
                    <Th isNumeric>Price</Th>
                    <Th>From</Th>
                    <Th>To</Th>
                    <Th>Date</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {dataSoure.map((data) => (
                    <Tr key={data.key}>
                      <Td>{data.type}</Td>
                      <Td className="item">
                        <img src="/icons/item.png" alt="" /> Animverse
                      </Td>
                      <Td isNumeric>26.94 BNB</Td>
                      <Td>Dong Van Cuong</Td>
                      <Td>0x531b…fFf8</Td>
                      <Td className="date">
                        1 days ago <img src="/icons/open-new.png" alt="" />
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            ) : (
              <img className="nodata" src="/common/my-nft/nodata.png" alt="" />
            )}
            {dataSoure.length > 0 ? (
              <Pagination
                className="pagination-bar"
                currentPage={currentPage}
                totalCount={500}
                pageSize={10}
                onPageChange={(page) => setCurrentPage(page)}
                onPageSizeChange={(pageSize) => setPageSize(pageSize)}
              />
            ) : null}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  )
}
export default Activities
