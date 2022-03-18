import { Button, Icon } from "@chakra-ui/react"
import BoxIcon from "@static/icons/item-box.svg"
import { useState } from "react"
import { ExternalLink } from "react-feather"
import { AppPagination } from "src/components/AppPagination"
import { AppSelect } from "src/components/AppSelect"
import { AppTable } from "src/components/AppTable"
import { BSC_SCAN_TRANSACTION } from "src/configs"

export const CollectionActivities = () => {
  const [data, setData] = useState<any>()
  const [total, setTotal] = useState(0)
  const [offset, setOffset] = useState(0)
  const [limit, setLimit] = useState(20)

  return (
    <div className="collection-activities">
      <div className="filter-row">
        <AppSelect
          placeholder="All"
          isSearchable={false}
          options={[
            {
              label: "All",
              value: "1",
            },
            {
              label: "Listing",
              value: "2",
            },
            {
              label: "Sale",
              value: "3",
            },
            {
              label: "Auction",
              value: "4",
            },
            {
              label: "Offer",
              value: "5",
            },
          ]}
        />
      </div>
      <AppTable className="data-table" data={data} columns={columns} />
      <AppPagination
        total={total}
        offset={offset}
        limit={limit}
        onChangeOffset={(value) => setOffset(value)}
        onChangeLimit={(value) => setLimit(value)}
      />
    </div>
  )
}

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
        <a href="/nft/53" rel="noreferrer" target={"_blank"}>
          <span>{item}</span>
        </a>
      </span>
    ),
  },
  {
    title: "Price",
    dataIndex: "price",
  },
  {
    title: "From",
    render: ({ from }) => (
      <a href="/user/1" rel="noreferrer" target={"_blank"}>
        <span>{from}</span>
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
          {to?.slice(0, 5)}...${to?.slice(-4)}
        </a>
      ) : (
        ""
      ),
  },
  {
    title: "Date",
    dataIndex: "date",
    render: ({ date, type, to }) =>
      type != "Listing" ? (
        <a
          href={BSC_SCAN_TRANSACTION + to}
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
