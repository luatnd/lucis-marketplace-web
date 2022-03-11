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
import Link from "next/link"
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
      item: "Animverse",
      price: "26.94 BNB",
      from: "Dong Van Cuong",
      to: "0x531b…fFf8",
      date: "41 seconds ago",
    },
    {
      key: 2,
      type: "Listing",
      item: "ExtensionPunks #5715",
      price: "0.05 BNB",
      from: "Nguyen Yen Nhi",
      to: "",
      date: "3 minutes ago",
    },
    {
      key: 3,
      type: "Offer",
      item: "GoatApes Club #1367",
      price: "0.4 BNB",
      from: "Dong Van Cuong",
      to: "0x567b…fFf8",
      date: "12 minutes ago",
    },
    {
      key: 4,
      type: "Auction",
      item: "ExtensionPunks #547",
      price: "0.0289 BNB",
      from: "Phan Van Vu",
      to: "0x6c1b…fFf8",
      date: "11 minutes ago",
    },
    {
      key: 5,
      type: "Sale",
      item: "SamuraiRising - Samurai",
      price: "0.28 BNB",
      from: "Mai Anh Tai",
      to: "0x321c…fFf8",
      date: "12 minutes ago",
    },
    {
      key: 6,
      type: "Auction",
      item: "Alpha Cat",
      price: "0.13 BNB",
      from: "Nguyen Duc Trung",
      to: "0x905d…fFf8",
      date: "14 minutes ago",
    },
    {
      key: 7,
      type: "Offer",
      item: "Meme Lordz Limited",
      price: "0.5 BNB",
      from: "Dong Van Cuong",
      to: "0x869y…fFf8",
      date: "14 minutes ago",
    },
    {
      key: 8,
      type: "Listing",
      item: "Freeport Metaverse Assets",
      price: "0.8 BNB",
      from: "Tran Duc Thang",
      to: "",
      date: "15 minutes ago",
    },
    {
      key: 9,
      type: "Sale",
      item: "XWorld - DC Equipment",
      price: "0.035 BNB",
      from: "Nguyen Van Anh",
      to: "0x999e…fFf8",
      date: "16 minutes ago",
    },
    {
      key: 10,
      type: "Sale",
      item: "Helium-3 - MASK BABY",
      price: "0.03 BNB",
      from: "Dong Van Cuong",
      to: "0x814q…fFf8",
      date: "16 minutes ago",
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
                        <Link href={"/nft/" + data.key}>
                          <a>
                            <img src="/icons/item.png" alt="" /> {data.item}
                          </a>
                        </Link>
                      </Td>
                      <Td isNumeric>{data.price}</Td>
                      <Td>
                        <Link href={"/user/" + data.from}>
                          <a>{data.from}</a>
                        </Link>
                      </Td>
                      <Td className="to">
                        <Link href={"/user/1"}>
                          <a>{data.to}</a>
                        </Link>
                      </Td>
                      <Td className="date">
                        {data.date}{" "}
                        {data.to.length ? (
                          <a
                            href="https://testnet.bscscan.com/tx/0x138be73463337df5d12e2a4106c48a501f8c6589bcb62b0affa4e5333ec04b6a"
                            target={"_blank"}
                            rel="noreferrer"
                          >
                            <img src="/icons/open-new.png" alt="" />
                          </a>
                        ) : null}
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
                totalCount={10}
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
                        <Link href={"/nft/" + data.key}>
                          <a>
                            <img src="/icons/item.png" alt="" /> {data.item}
                          </a>
                        </Link>
                      </Td>
                      <Td isNumeric>{data.price}</Td>
                      <Td>
                        <Link href={"/user/" + data.from}>
                          <a>{data.from}</a>
                        </Link>
                      </Td>
                      <Td className="to">
                        <Link href={"/user/1"}>
                          <a>{data.to}</a>
                        </Link>
                      </Td>
                      <Td className="date">
                        {data.date}{" "}
                        {data.to.length ? (
                          <a
                            href="https://testnet.bscscan.com/tx/0x138be73463337df5d12e2a4106c48a501f8c6589bcb62b0affa4e5333ec04b6a"
                            target={"_blank"}
                            rel="noreferrer"
                          >
                            <img src="/icons/open-new.png" alt="" />
                          </a>
                        ) : null}
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
                totalCount={10}
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
