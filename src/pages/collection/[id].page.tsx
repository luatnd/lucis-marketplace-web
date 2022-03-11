import {
  Button,
  Icon,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react"
import BoxIcon from "@static/icons/item-box.svg"
import VerifiedIcon from "@static/icons/verified.svg"
import axios from "axios"
import { GetServerSidePropsContext } from "next"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { ChevronDown, ChevronUp, ExternalLink } from "react-feather"
import { AppPagination } from "src/components/AppPagination"
import { AppSelect } from "src/components/AppSelect"
import { AppTable } from "src/components/AppTable"
import { ListingBar } from "src/components/Home/ListingBar"
import { NftItem } from "src/components/NftItem"
import { getCollection, getCollectionItems } from "src/services/nft"

const CollectionDetails = (props) => {
  const { data } = props

  const [isExpanded, setIsExpanded] = useState(false)

  const router = useRouter()

  const [items, setItems] = useState<any[]>()
  const [itemTotal, setItemTotal] = useState(0)
  const [offset, setOffset] = useState(0)
  const [itemType, setItemType] = useState(null)
  const [itemSort, setItemSort] = useState("asc")
  const [pageSize, setPageSize] = useState(10)

  const [total, setTotal] = useState(2000)

  const [itemOffset, setItemOffset] = useState(0)
  const [itemPageSize, setItemPageSize] = useState(20)

  const fetchItems = async () => {
    const id = await router.query.id
    if (id) {
      const { data, total } = await getCollectionItems(
        +id,
        itemOffset,
        itemPageSize,
        itemType,
        itemSort
      )
      setItems(data)
      setItemTotal(total)
    }
  }

  useEffect(() => {
    fetchItems()
  }, [router.query.id])

  useEffect(() => {
    fetchItems()
  }, [router.query.id, itemOffset, itemPageSize, itemType, itemSort])

  const handleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  const providerSocials = [
    {
      key: "facebook",
      image: "/common/footer/nav2.png",
    },
    {
      key: "telegram",
      image: "/common/footer/nav4.png",
    },
    {
      key: "twitter",
      image: "/common/footer/nav5.png",
    },
    {
      key: "discord",
      image: "/common/footer/nav6.png",
    },
  ]

  const stats = [
    {
      key: "Traded",
      value: data?.stats?.traded,
    },
    {
      key: "Player",
      value: data?.stats?.player,
    },
    {
      key: "Listed",
      value: data?.stats?.listed,
    },
    {
      key: "Volume",
      value: data?.stats?.volume,
    },
    {
      key: "Floor Price",
      value: data?.stats?.floorPrice,
    },
    {
      key: "Max Price",
      value: data?.stats?.maxPrice,
    },
  ]

  const _renderItemList = () => (
    <div className="collection-item-list">
      <div className="filter-row">
        <div className="total">{itemTotal} items listed</div>
        <div className="filter">
          <AppSelect
            // value={itemType}
            placeholder="Type"
            isSearchable={false}
            onChange={({ value }) => setItemType(value as boolean)}
            options={[
              {
                label: "Type",
                value: null,
              },
              {
                label: "Fix price",
                value: false,
              },
              {
                label: "Auction",
                value: true,
              },
            ]}
          />
          <AppSelect
            placeholder="Price: Min to Max"
            isSearchable={false}
            // value={itemSort}
            onChange={({ value }) => setItemSort(value)}
            options={[
              {
                label: "Price: Min to Max",
                value: "asc",
              },
              {
                label: "Price: Max to Min",
                value: "desc",
              },
            ]}
          />
        </div>
      </div>
      <div className="item-list">
        {items?.map((item) => (
          <NftItem
            id={item.id}
            key={item.id}
            name={item.name}
            image={item.image}
            collection={item.collection}
            endTime={item.endTime}
            price={item.price}
            isAuction={item.isAuction}
          />
        ))}
      </div>
      <AppPagination
        total={itemTotal}
        offset={itemOffset}
        pageSize={itemPageSize}
        onChangeOffset={(value) => setItemOffset(value)}
        onChangPageSize={(value) => setItemPageSize(value)}
      />
    </div>
  )

  const _renderActivities = () => (
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
      <AppTable className="data-table" data={tableData} columns={columns} />
      <AppPagination
        total={total}
        offset={offset}
        pageSize={pageSize}
        onChangeOffset={(value) => setOffset(value)}
        onChangPageSize={(value) => setPageSize(value)}
      />
    </div>
  )

  return (
    <div className="collection-details-page">
      <div className="provider-name">
        {data?.name}
        <VerifiedIcon />
      </div>
      <div className="provider-socials">
        {providerSocials.map((item) => (
          <img key={item.key} src={item.image} />
        ))}
      </div>
      <div className="collection-stats">
        {stats?.map((stat) => (
          <div key={stat.key} className="stat">
            <p className="stat-key">{stat.key}</p>
            <p className="stat-value">{stat.value}</p>
          </div>
        ))}
      </div>
      <div className={`collection-description ${isExpanded ? "expanded" : ""}`}>
        {data?.description}
      </div>
      <Button className="expand-button" onClick={handleExpand}>
        <Icon as={isExpanded ? ChevronUp : ChevronDown} />
      </Button>
      <img className="collection-banner" src={data?.banner} />
      <ListingBar />
      <div className="collection-content">
        <Tabs>
          <TabList>
            <Tab className="tab-item">ITEMS</Tab>
            <Tab className="tab-item">ACTIVITIES</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>{_renderItemList()}</TabPanel>
            <TabPanel>{_renderActivities()}</TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </div>
  )
}

export default CollectionDetails

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { id } = ctx.query

  const [data] = await Promise.all([getCollection(+id)])

  return {
    props: {
      data,
    },
  }
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
  },
  {
    title: "From",
    dataIndex: "from",
  },
  {
    title: "To",
    dataIndex: "to",
    render: ({ to }) => `${to?.slice(0, 5)}...${to?.slice(-4)}`,
  },
  {
    title: "Date",
    dataIndex: "date",
    render: ({ date, to }) => (
      <a
        className="date-column"
        href={process.env.NEXT_PUBLIC_BSC_SCAN_TX + to}
        rel="noreferrer"
        target="_blank"
      >
        {date} <Icon as={ExternalLink} />
      </a>
    ),
  },
]

const tableData = [
  {
    type: "Sale",
    item: "Animverse",
    price: "26.94 BNB",
    from: "Dong Van Cuong",
    to: "0x6fc283166afa80509c9434291c49bcdc4ede4d53d7c049a2306f43ed7121224d",
    date: "1 days ago",
  },
  {
    type: "Listing",
    item: "Animverse",
    price: "26.94 BNB",
    from: "Dong Van Cuong",
    to: "0x6fc283166afa80509c9434291c49bcdc4ede4d53d7c049a2306f43ed7121224d",
    date: "1 days ago",
  },
  {
    type: "Offer",
    item: "Animverse",
    price: "26.94 BNB",
    from: "Dong Van Cuong",
    to: "0x6fc283166afa80509c9434291c49bcdc4ede4d53d7c049a2306f43ed7121224d",
    date: "1 days ago",
  },
  {
    type: "Auction",
    item: "Animverse",
    price: "26.94 BNB",
    from: "Dong Van Cuong",
    to: "0x6fc283166afa80509c9434291c49bcdc4ede4d53d7c049a2306f43ed7121224d",
    date: "1 days ago",
  },
  {
    type: "Sale",
    item: "Animverse",
    price: "26.94 BNB",
    from: "Dong Van Cuong",
    to: "0x6fc283166afa80509c9434291c49bcdc4ede4d53d7c049a2306f43ed7121224d",
    date: "1 days ago",
  },
  {
    type: "Auction",
    item: "Animverse",
    price: "26.94 BNB",
    from: "Dong Van Cuong",
    to: "0x6fc283166afa80509c9434291c49bcdc4ede4d53d7c049a2306f43ed7121224d",
    date: "1 days ago",
  },
  {
    type: "Offer",
    item: "Animverse",
    price: "26.94 BNB",
    from: "Dong Van Cuong",
    to: "0x6fc283166afa80509c9434291c49bcdc4ede4d53d7c049a2306f43ed7121224d",
    date: "1 days ago",
  },
  {
    type: "Listing",
    item: "Animverse",
    price: "26.94 BNB",
    from: "Dong Van Cuong",
    to: "0x6fc283166afa80509c9434291c49bcdc4ede4d53d7c049a2306f43ed7121224d",
    date: "1 days ago",
  },
  {
    type: "Sale",
    item: "Animverse",
    price: "26.94 BNB",
    from: "Dong Van Cuong",
    to: "0x6fc283166afa80509c9434291c49bcdc4ede4d53d7c049a2306f43ed7121224d",
    date: "1 days ago",
  },
  {
    type: "Sale",
    item: "Animverse",
    price: "26.94 BNB",
    from: "Dong Van Cuong",
    to: "0x6fc283166afa80509c9434291c49bcdc4ede4d53d7c049a2306f43ed7121224d",
    date: "1 days ago",
  },
]
