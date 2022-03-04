import Pagination from "src/components/Pagination"
import Sort from "../Sort"
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
} from "@chakra-ui/react"
import { useState } from "react"
export const RankingList = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  const [time, setTime] = useState("All")
  const [price, setPrice] = useState("All")
  const priceSort = [
    { img: "/common/bnb.png", name: "BNB chain" },
    { img: "/common/walletConnect.png", name: "WalletConnect" },
    { img: "/common/ethereum.png", name: "Ethereum" },
    { img: "/common/celo.png", name: "Celo" },
    { img: "/common/aurora.png", name: "Aurora" },
    { img: "/common/arbitrum.png", name: "Arbitrum" },
    { img: "/common/fantom.png", name: "Fantom" },
  ]
  const timeSort=[
    {img: "", name: "7 days" },
    {img: "", name: "30 days" },
  ]
  const columns = [
    {
      title: "STT",
      dataIndex: "key",
      className: "left",
      width: "5%",
    },
    {
      title: "Collection",
      dataIndex: "collection",
      className: "collection",
      width: "30%",
      render: (text, record, index) => (
        <>
          <img src={"/common/nft/item" + index + ".png"} alt="" /> <p>{text}</p>
        </>
      ),
    },
    {
      title: "Vol",
      dataIndex: "vol",
      className: "left",
    },
    {
      title: "24h",
      dataIndex: "day",
      className: "left",
    },
    {
      title: "7day",
      dataIndex: "week",
      className: "left",
    },
    {
      title: "Floor Price",
      dataIndex: "price",
      className: "left",
    },
    {
      title: "Player",
      dataIndex: "player",
      className: "left",
    },
    {
      title: "Item",
      dataIndex: "item",
      className: "left",
    },
  ]
  const dataSource = [
    {
      key: 1,
      collection: "Animverse",
      vol: "100.00 BNB ",
      day: "10%",
      week: "10%",
      price: "100.00 BNB",
      player: "100",
      item: "100",
    },
    {
      key: 2,
      collection: "Soul Reborn",
      vol: "100.00 BNB ",
      day: "10%",
      week: "10%",
      price: "100.00 BNB",
      player: "100",
      item: "100",
    },
    {
      key: 3,
      collection: "AstarDegens",
      vol: "100.00 BNB ",
      day: "10%",
      week: "10%",
      price: "100.00 BNB",
      player: "100",
      item: "100",
    },
    {
      key: 4,
      collection: "Tales of Ragnarok",
      vol: "100.00 BNB ",
      day: "10%",
      week: "10%",
      price: "100.00 BNB",
      player: "100",
      item: "100",
    },
    {
      key: 5,
      collection: "Metaverse PFP NFT",
      vol: "100.00 BNB ",
      day: "10%",
      week: "10%",
      price: "100.00 BNB",
      player: "100",
      item: "100",
    },
    {
      key: 6,
      collection: "Wolf Town - Animal",
      vol: "100.00 BNB ",
      day: "10%",
      week: "10%",
      price: "100.00 BNB",
      player: "100",
      item: "100",
    },
    {
      key: 7,
      collection: "Polychain Monsters",
      vol: "100.00 BNB ",
      day: "10%",
      week: "10%",
      price: "100.00 BNB",
      player: "100",
      item: "100",
    },
    {
      key: 8,
      collection: "ELEMON",
      vol: "100.00 BNB ",
      day: "10%",
      week: "10%",
      price: "100.00 BNB",
      player: "100",
      item: "100",
    },
    {
      key: 9,
      collection: "Dracoo",
      vol: "100.00 BNB ",
      day: "10%",
      week: "10%",
      price: "100.00 BNB",
      player: "100",
      item: "100",
    },
    {
      key: 10,
      collection: "Axes Metaverse",
      vol: "100.00 BNB ",
      day: "10%",
      week: "10%",
      price: "100.00 BNB",
      player: "100",
      item: "100",
    },
  ]
  return (
    <div className="ranking-list">
      <h1>nft ranking</h1>
      <div className="nft-search">
        <Sort
          customClassName="price-sort"
          options={priceSort}
          onSelectOption={(price) => setPrice(price)}
        />
        <Sort
          customClassName="type-sort"
          options={timeSort}
          onSelectOption={(time) => setTime(time)}
        />
      </div>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>STT</Th>
            <Th>Collection</Th>
            <Th isNumeric>Vol</Th>
            <Th>24h</Th>
            <Th>7day</Th>
            <Th isNumeric>Floor Price</Th>
            <Th>Player</Th>
            <Th>Item</Th>
          </Tr>
        </Thead>
        <Tbody>
          {dataSource.map((data) => (
            <Tr key={data.key}>
              <Td>{data.key}</Td>
              <Td className="collection">
                <img
                  src={"/common/nft/item" + (data.key - 1) + ".png"}
                  alt=""
                />{" "}
                <span>{data.collection}</span>
              </Td>
              <Td isNumeric>{data.vol}</Td>
              <Td>{data.day}</Td>
              <Td>{data.week}</Td>
              <Td isNumeric>{data.price}</Td>
              <Td>{data.player}</Td>
              <Td>{data.item}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={500}
        pageSize={10}
        onPageChange={(page) => setCurrentPage(page)}
        onPageSizeChange={(pageSize) => setPageSize(pageSize)}
      />
    </div>
  )
}
