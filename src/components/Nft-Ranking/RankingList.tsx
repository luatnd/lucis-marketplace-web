import { Table} from "antd"
import { Search } from "./Search"
export const RankingList = () => {
  const columns = [
    {
      title: "STT",
      dataIndex: "key",
      className: "left",
      width:"5%"
    },
    {
      title: "Collection",
      dataIndex: "collection",
      className: "collection",
      width: "30%",
      render: (text, record, index) => (
        <>
          <img src={"/common/nft/item"+index+".png"} alt="" /> <p>{text}</p>
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
      key: "1",
      collection: "Animverse",
      vol: "100.00 BNB ",
      day: "10%",
      week: "10%",
      price: "100.00 BNB",
      player: "100",
      item: "100",
    },
    {
      key: "2",
      collection: "Soul Reborn",
      vol: "100.00 BNB ",
      day: "10%",
      week: "10%",
      price: "100.00 BNB",
      player: "100",
      item: "100",
    },
    {
      key: "3",
      collection: "AstarDegens",
      vol: "100.00 BNB ",
      day: "10%",
      week: "10%",
      price: "100.00 BNB",
      player: "100",
      item: "100",
    },
    {
      key: "4",
      collection: "Tales of Ragnarok",
      vol: "100.00 BNB ",
      day: "10%",
      week: "10%",
      price: "100.00 BNB",
      player: "100",
      item: "100",
    },
    {
      key: "5",
      collection: "Metaverse PFP NFT",
      vol: "100.00 BNB ",
      day: "10%",
      week: "10%",
      price: "100.00 BNB",
      player: "100",
      item: "100",
    },
    {
      key: "6",
      collection: "Wolf Town - Animal",
      vol: "100.00 BNB ",
      day: "10%",
      week: "10%",
      price: "100.00 BNB",
      player: "100",
      item: "100",
    },
    {
      key: "7",
      collection: "Polychain Monsters",
      vol: "100.00 BNB ",
      day: "10%",
      week: "10%",
      price: "100.00 BNB",
      player: "100",
      item: "100",
    },
    {
      key: "8",
      collection: "ELEMON",
      vol: "100.00 BNB ",
      day: "10%",
      week: "10%",
      price: "100.00 BNB",
      player: "100",
      item: "100",
    },
    {
      key: "9",
      collection: "Dracoo",
      vol: "100.00 BNB ",
      day: "10%",
      week: "10%",
      price: "100.00 BNB",
      player: "100",
      item: "100",
    },
    {
      key: "10",
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
      <Search/>
      <Table
        className="container"
        columns={columns}
        dataSource={dataSource}
        pagination={false}
      />
    </div>
  )
}
