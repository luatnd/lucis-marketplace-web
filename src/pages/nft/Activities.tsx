import { Button, Icon } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { AppPagination } from "src/components/AppPagination"
import { AppSelect } from "src/components/AppSelect"
import { AppTable } from "src/components/AppTable"
import BoxIcon from "@static/icons/item-box.svg"
import { ExternalLink } from "react-feather"

const Activities = () => {
  const [offset, setOffset] = useState(0)
  const [pageSize, setPageSize] = useState(5)
  const [total, setTotal] = useState(21)

  const fetchData = () => {
    console.log(offset, pageSize)
  }

  useEffect(() => {
    fetchData()
  }, [offset, pageSize])

  const columns = [
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Item",
      dataIndex: "item",
      render: ({ item }) => (
        <span className="item-column">
          <Button>
            <BoxIcon />
          </Button>
          {item}
        </span>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "From",
      dataIndex: "from",
      render: ({ from }) => (
        <a
          href="/user/1"
          target={"_blank"}
          rel="noreferrer"
          className="date-column"
        >
          {from}
        </a>
      ),
    },
    {
      title: "To",
      dataIndex: "to",
      render: ({ to, type }) =>
        type != "Listing" ? (
          <a
            href="/user/1"
            target={"_blank"}
            rel="noreferrer"
            className="date-column"
            style={{ color: "#0BEBD6" }}
          >
            {to}
          </a>
        ) : (
          ""
        ),
    },
    {
      title: "Date",
      dataIndex: "date",
      render: ({ date, type }) =>
        type != "Listing" ? (
          <a
            href="https://testnet.bscscan.com/tx/0x138be73463337df5d12e2a4106c48a501f8c6589bcb62b0affa4e5333ec04b6a"
            target={"_blank"}
            rel="noreferrer"
            className="date-column"
          >
            {date} <Icon as={ExternalLink} />
          </a>
        ) : (
          <span className="date-column">{date}</span>
        ),
    },
  ]

  const data = [
    {
      type: "Sale",
      item: "Animverse",
      price: "26.94 BNB",
      from: "Dong Van Cuong",
      to: "0x531b…fFf8",
      date: "1 days ago",
    },
    {
      type: "Listing",
      item: "Animverse",
      price: "26.94 BNB",
      from: "Dong Van Cuong",
      to: "0x531b…fFf8",
      date: "1 days ago",
    },
    {
      type: "Offer",
      item: "Animverse",
      price: "26.94 BNB",
      from: "Dong Van Cuong",
      to: "0x531b…fFf8",
      date: "1 days ago",
    },
    {
      type: "Auction",
      item: "Animverse",
      price: "26.94 BNB",
      from: "Dong Van Cuong",
      to: "0x531b…fFf8",
      date: "1 days ago",
    },
    {
      type: "Sale",
      item: "Animverse",
      price: "26.94 BNB",
      from: "Dong Van Cuong",
      to: "0x531b…fFf8",
      date: "1 days ago",
    },
    {
      type: "Auction",
      item: "Animverse",
      price: "26.94 BNB",
      from: "Dong Van Cuong",
      to: "0x531b…fFf8",
      date: "1 days ago",
    },
    {
      type: "Offer",
      item: "Animverse",
      price: "26.94 BNB",
      from: "Dong Van Cuong",
      to: "0x531b…fFf8",
      date: "1 days ago",
    },
    {
      type: "Listing",
      item: "Animverse",
      price: "26.94 BNB",
      from: "Dong Van Cuong",
      to: "0x531b…fFf8",
      date: "1 days ago",
    },
    {
      type: "Sale",
      item: "Animverse",
      price: "26.94 BNB",
      from: "Dong Van Cuong",
      to: "0x531b…fFf8",
      date: "1 days ago",
    },
    {
      type: "Sale",
      item: "Animverse",
      price: "26.94 BNB",
      from: "Dong Van Cuong",
      to: "0x531b…fFf8",
      date: "1 days ago",
    },
  ]
  return (
    <>
      <div className="filter-row">
        <AppSelect
          className="filter"
          defaultValue={"1"}
          placeholder="All"
          isSearchable={false}
          options={[
            { label: "All", value: "1" },
            { label: "Listing", value: "2" },
            { label: "Offer", value: "3" },
            { label: "Auction", value: "4" },
            { label: "Sale", value: "5" },
          ]}
        />
      </div>
      <AppTable className="data-table" columns={columns} data={data} />
      <AppPagination
        total={total}
        offset={offset}
        limit={pageSize}
        onChangeOffset={(value) => setOffset(value)}
        onChangeLimit={(value) => setPageSize(value)}
      />
    </>
  )
}

export default Activities
