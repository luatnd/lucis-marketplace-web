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
import { formatNftPrice } from "src/utils/Number"

const Activities = () => {
  const router = useRouter()
  const { id } = router.query
  const [data, setData] = useState([])
  const [offset, setOffset] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [total, setTotal] = useState()
  // const [type, setType] = useState({
  //   kind: 0,
  //   status: 0,
  // })

  const getData = async () => {
    if (id) {
      const res = await getActivitiesItem(
        id,
        pageSize,
        offset - 1,
        // type.kind,
        // type.status
      )
      setTotal(res.total)
      setData(
        res.data.map((el) => {
          return {
            type:
              el.kind == 1
                ? el.status
                  ? "Sale"
                  : "Listing"
                : el.kind == 2
                ? "Offer"
                : "Auction",
            item: "Animverse",
            price: el.price,
            from: "Dong Van Cuong",
            to: el.currency,
            date: formatTime(el.created_time, false),
            transaction_id: el.transaction_id,
            seller: el.seller,
            currency: el.currency,
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
      render: ({ price }) => formatNftPrice(price)
    },
    {
      title: "From",
      dataIndex: "from",
      render: ({ seller, type, buyer, currency }) => (
        <a
          href={"/user/1"}
          target={"_blank"}
          rel="noreferrer"
          className="date-column"
        >
          {type == "Offer" && formatAddress(currency, 6, 4)}
          {type == "Auction" && formatAddress(currency, 6, 4)}
          {type == "Sale" && formatAddress(seller, 6, 4)}
          {type == "Listing" && formatAddress(seller, 6, 4)}
        </a>
      ),
    },
    {
      title: "To",
      dataIndex: "buyer",
      render: ({ buyer, type, seller }) =>
        type != "Listing" ? (
          <a
            href={"/user/1" + buyer}
            target={"_blank"}
            rel="noreferrer"
            className="date-column"
            style={{ color: "#0BEBD6" }}
          >
            {type == "Offer" && formatAddress(seller, 6, 4)}
            {type == "Auction" && formatAddress(seller, 6, 4)}
            {type == "Sale" && formatAddress(buyer, 6, 4)}
            {type == "Listing" && formatAddress(buyer, 6, 4)}
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
            {
              value: {
                kind: 0,
                status: 0,
              },
              label: "All",
            },
            {
              value: {
                kind: 1,
                status: 0,
              },
              label: "Listing",
            },
            {
              value: {
                kind: 2,
                status: 0,
              },
              label: "Offer",
            },
            {
              value: {
                kind: 3,
                status: 0,
              },
              label: "Auction",
            },
            {
              value: {
                kind: 1,
                status: 1,
              },
              label: "Sale",
            },
          ]}
        />
      </div>
      <AppTable className="data-table" columns={columns} data={data} />
      <AppPagination total={total} offset={offset} limit={pageSize} />
    </>
  )
}

export default Activities
