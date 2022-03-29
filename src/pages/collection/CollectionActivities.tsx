import { Button, Icon } from "@chakra-ui/react"
import BoxIcon from "@static/icons/item-box.svg"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { ExternalLink } from "react-feather"
import { AppPagination } from "src/components/AppPagination"
import { AppSelect } from "src/components/AppSelect"
import { AppTable } from "src/components/AppTable"
import { BSC_SCAN_TRANSACTION } from "src/configs"
import { formatTime } from "src/hooks/useCountdown"
import { getActivitiesCollection } from "src/services/nft"
import { formatAddress } from "../user/FormatAddress"

export const CollectionActivities = () => {
  const router = useRouter()
  const { id } = router.query
  const [data, setData] = useState<any>()
  const [total, setTotal] = useState(0)
  const [offset, setOffset] = useState(1)
  const [limit, setLimit] = useState(10)

  const getData = async () => {
    if (id) {
      const res = await getActivitiesCollection(id, limit, offset - 1)
      setData(res.data)
      setTotal(res.total)
    }
  }
  useEffect(() => {
    getData()
  }, [limit, offset])
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
    dataIndex: "kind",
    render: ({ kind, status }) => (
      <>
        {kind == 1
          ? status
            ? "Sale"
            : "Listing"
          : kind == 2
          ? "Offer"
          : "Auction"}
      </>
    ),
  },
  {
    title: "Item",
    dataIndex: "item",
    render: ({ item, nft_item_id }) => (
      <span className="item-column">
        <Button>
          <BoxIcon />
        </Button>
        <a href={"/nft/" + nft_item_id} rel="noreferrer" target={"_blank"}>
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
    render: ({ kind, currency }) =>
      kind != 4 ? (
        <a
          href={"/user/" + currency}
          target={"_blank"}
          rel="noreferrer"
          className="date-column"
          style={{ color: "#0BEBD6" }}
        >
          {formatAddress(currency, 6, 4)}
        </a>
      ) : (
        ""
      ),
  },
  {
    title: "Date",
    dataIndex: "date",
    render: ({ kind, transaction_id, created_time }) =>
      kind != 4 ? (
        <a
          href={BSC_SCAN_TRANSACTION + transaction_id}
          target={"_blank"}
          rel="noreferrer"
          className="date-column"
        >
          {formatTime(created_time, false)} <Icon as={ExternalLink} />
        </a>
      ) : (
        <span className="date-column">{formatTime(created_time, false)}</span>
      ),
  },
]
