import { Button, Icon } from "@chakra-ui/react"
import BoxIcon from "@static/icons/item-box.svg"
import { useState } from "react"
import { ExternalLink } from "react-feather"
import { AppPagination } from "src/components/AppPagination"
import { AppSelect } from "src/components/AppSelect"
import { AppTable } from "src/components/AppTable"
import { nftService } from "src/services/NftService"
import { formatNftPrice } from "src/utils/Number"

interface IProps {
  id?: number
  preData?: any
}

const Activities = (props: IProps) => {
  const { preData, id } = props

  const [data, setData] = useState<any>(preData.data)
  const [offset, setOffset] = useState(0)
  const [limit, setLimit] = useState(5)
  const [total, setTotal] = useState(preData.total)

  const fetchData = async () => {
    const activities = await nftService.getNftActivities({
      nft_item_id: +id,
      offset,
      limit,
    })
    setData(activities?.data)
    setTotal(activities?.total)
  }

  const handleChangeOffset = (value) => {
    setOffset(value)
    fetchData()
  }

  const handleChangeLimit = (value) => {
    setLimit(value)
    fetchData()
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
          {item}
        </span>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      render: ({ price }) => formatNftPrice(price) + " BNB",
    },
    {
      title: "From",
      dataIndex: "seller",
      render: ({ seller }) => (
        <a
          href="/user/1"
          target={"_blank"}
          rel="noreferrer"
          className="date-column"
        >
          {seller?.slice(0, 2)}...{seller?.slice(-4)}
        </a>
      ),
    },
    {
      title: "To",
      dataIndex: "buyer",
      render: ({ buyer, type }) =>
        type != "Listing" ? (
          <a
            href="/user/1"
            target={"_blank"}
            rel="noreferrer"
            className="date-column"
            style={{ color: "#0BEBD6" }}
          >
            {buyer?.slice(0, 2)}...{buyer?.slice(-4)}
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
        limit={limit}
        onChangeOffset={handleChangeOffset}
        onChangeLimit={handleChangeLimit}
      />
    </>
  )
}

export default Activities
