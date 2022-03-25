import { Button, Icon } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { AppPagination } from "src/components/AppPagination"
import { AppSelect } from "src/components/AppSelect"
import { AppTable } from "src/components/AppTable"
import BoxIcon from "@static/icons/item-box.svg"
import { ExternalLink } from "react-feather"
import { getActivitiesItem } from "src/services/nft"
import { formatAddress } from "../user/FormatAddress"
import { formatTime } from "src/hooks/useCountdown"

const Activities = () => {
  const router = useRouter()
  const { id } = router.query
  const [data, setData] = useState([])
  const [offset, setOffset] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [total, setTotal] = useState()

  const getData = async () => {
    if (id) {
      const res = await getActivitiesItem(id, pageSize, offset - 1)
      setTotal(res.total)
      setData(
        res.data.map((el) => {
          return {
            type:
              el.kind == 1
                ? "Sale"
                : el.kind == 2
                ? "Offer"
                : el.kind == 3
                ? "Auction"
                : "Listing",
            item: "Animverse",
            price: el.price,
            from: "Dong Van Cuong",
            to: el.currency,
            date: formatTime(el.created_time, false),
            transaction_id: el.transaction_id,
            seller: el.seller,
          }
        })
      )
    }
  }
  useEffect(() => {
    getData()
  }, [offset, pageSize, id])

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
      render: ({ price }) => price + " BNB",
    },
    {
      title: "From",
      dataIndex: "from",
      render: ({ from, seller }) => (
        <a
          href={"/user/1" + seller}
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
            href={"/user/1" + buyer}
            target={"_blank"}
            rel="noreferrer"
            className="date-column"
            style={{ color: "#0BEBD6" }}
          >
            {formatAddress(buyer, 6, 4)}
          </a>
        ) : (
          ""
        ),
    },
    {
      title: "Date",
      dataIndex: "date",
      render: ({ date, type, transaction_id }) =>
        type != "Listing" ? (
          <a
            href={"https://testnet.bscscan.com/tx/" + transaction_id}
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
      <AppPagination total={total} offset={offset} limit={pageSize} />
    </>
  )
}

export default Activities
