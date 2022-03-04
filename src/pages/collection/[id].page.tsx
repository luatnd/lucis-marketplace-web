import {
  Button,
  Icon,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react"
import VerifiedIcon from "@static/icons/verified.svg"
import { useEffect, useState } from "react"
import { ChevronDown, ChevronUp, ExternalLink } from "react-feather"
import { AppPagination } from "src/components/AppPagination"
import { AppSelect } from "src/components/AppSelect"
import { AppTable } from "src/components/AppTable"
import { AuctionItem } from "src/components/Home/AuctionItem"
import { Listing } from "src/components/Home/Listing"
import BoxIcon from "@static/icons/item-box.svg"

const CollectionDetails = () => {
  const [isExpanded, setIsExpanded] = useState(false)

  const [offset, setOffset] = useState(10)
  const [pageSize, setPageSize] = useState(5)
  const [total, setTotal] = useState(2000)

  const fetchData = () => {
    console.log(offset, pageSize)
  }

  useEffect(() => {
    fetchData()
  }, [offset, pageSize])

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
      value: "100+",
    },
    {
      key: "Player",
      value: "100+",
    },
    {
      key: "Listed",
      value: "100+",
    },
    {
      key: "Volume",
      value: "100+",
    },
    {
      key: "Floor Price",
      value: "100+",
    },
    {
      key: "Max Price",
      value: "1000",
    },
  ]

  const _renderItemList = () => (
    <div className="collection-item-list">
      <div className="filter-row">
        <div className="total">137335 items listed</div>
        <div className="filter">
          <AppSelect
            placeholder="Type"
            options={[
              {
                label: "Type",
                value: "1",
              },
            ]}
          />
          <AppSelect
            placeholder="Price: Min to Max"
            options={[
              {
                label: "Price: Min to Max",
                value: "1",
              },
            ]}
          />
        </div>
      </div>
      <div className="item-list">
        {itemList.map((item) => (
          <AuctionItem
            key={item.id}
            name={item.name}
            image={item.image}
            provider={item.provider}
            endTime={item.endTime}
            price={item.price}
          />
        ))}
      </div>
      <AppPagination
        total={total}
        offset={offset}
        pageSize={pageSize}
        onChangeOffset={(value) => setOffset(value)}
        onChangPageSize={(value) => setPageSize(value)}
      />
    </div>
  )

  const _renderActivities = () => (
    <div className="collection-activities">
      <div className="filter-row">
        <AppSelect
          placeholder="All"
          options={[
            {
              label: "All",
              value: "1",
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
        Animverse
        <VerifiedIcon />
      </div>
      <div className="provider-socials">
        {providerSocials.map((item) => (
          <img key={item.key} src={item.image} />
        ))}
      </div>
      <div className="collection-stats">
        {stats.map((stat) => (
          <div key={stat.key} className="stat">
            <p className="stat-key">{stat.key}</p>
            <p className="stat-value">{stat.value}</p>
          </div>
        ))}
      </div>
      <div className={`collection-description ${isExpanded ? "expanded" : ""}`}>
        8888 NFT Astar Punks derivatives from CryptoPunks built on the Astar
        Network. It focuses on being a gateway and support for artists who wish
        to build their NFT collections on the Astar Network. It will build a DAO
        where the community will drive the project. Among its future plans is
        also to build a staking dApp to8888 NFT Astar Punks derivatives from
        CryptoPunks built on the Astar Network. It focuses on being a gateway
        and support for artists who wish to build their NFT collections on the
        Astar Network. It will build a DAO where the community will drive the
        project. Among its future plans is also to build a staking dApp to8888
        NFT Astar Punks derivatives from CryptoPunks built on the Astar Network.
        It focuses on being a gateway and support for artists who wish to build
        their NFT collections on the Astar Network. It will build a DAO where
        the community will drive the project. Among its future plans is also to
        build a staking dApp to 8888 NFT Astar Punks derivatives from
        CryptoPunks built on the Astar Network. It focuses on being a gateway
        and support for artists who wish to build their NFT collections on the
        Astar Network. It will build a DAO where the community will drive the
        project. Among its future plans is also to build a staking dApp to...
      </div>
      <Button className="expand-button" onClick={handleExpand}>
        <Icon as={isExpanded ? ChevronUp : ChevronDown} />
      </Button>
      <img
        className="collection-banner"
        src="/common/example-collection-banner.png"
      />
      <Listing />
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

const itemList = [
  {
    id: "1",
    name: "CUONG DOLLA NFT",
    image: "/home/auctions/auction1.png",
    provider: "Animverse",
    endTime: "2022-03-15T00:00:00",
    price: 0.99,
  },
  {
    id: "2",
    name: "CUONG DOLLA NFT",
    image: "/home/auctions/auction2.png",
    provider: "Animverse",
    endTime: "2022-03-15T00:00:00",
    price: 0.99,
  },
  {
    id: "3",
    name: "CUONG DOLLA NFT",
    image: "/home/auctions/auction3.png",
    provider: "Animverse",
    endTime: "2022-03-15T00:00:00",
    price: 0.99,
  },
  {
    id: "4",
    name: "CUONG DOLLA NFT",
    image: "/home/auctions/auction4.png",
    provider: "Animverse",
    endTime: "2022-03-15T00:00:00",
    price: 0.99,
  },
  {
    id: "5",
    name: "CUONG DOLLA NFT",
    image: "/home/auctions/auction5.png",
    provider: "Animverse",
    endTime: "2022-03-15T00:00:00",
    price: 0.99,
  },
  {
    id: "6",
    name: "CUONG DOLLA NFT",
    image: "/home/auctions/auction1.png",
    provider: "Animverse",
    endTime: "2022-03-15T00:00:00",
    price: 0.99,
  },
  {
    id: "7",
    name: "CUONG DOLLA NFT",
    image: "/home/auctions/auction2.png",
    provider: "Animverse",
    endTime: "2022-03-15T00:00:00",
    price: 0.99,
  },
  {
    id: "8",
    name: "CUONG DOLLA NFT",
    image: "/home/auctions/auction3.png",
    provider: "Animverse",
    endTime: "2022-03-15T00:00:00",
    price: 0.99,
  },
  {
    id: "9",
    name: "CUONG DOLLA NFT",
    image: "/home/auctions/auction4.png",
    provider: "Animverse",
    endTime: "2022-03-15T00:00:00",
    price: 0.99,
  },
  {
    id: "10",
    name: "CUONG DOLLA NFT",
    image: "/home/auctions/auction5.png",
    provider: "Animverse",
    endTime: "2022-03-15T00:00:00",
    price: 0.99,
  },
  {
    id: "11",
    name: "CUONG DOLLA NFT",
    image: "/home/auctions/auction1.png",
    provider: "Animverse",
    endTime: "2022-03-15T00:00:00",
    price: 0.99,
  },
  {
    id: "12",
    name: "CUONG DOLLA NFT",
    image: "/home/auctions/auction2.png",
    provider: "Animverse",
    endTime: "2022-03-15T00:00:00",
    price: 0.99,
  },
  {
    id: "13",
    name: "CUONG DOLLA NFT",
    image: "/home/auctions/auction3.png",
    provider: "Animverse",
    endTime: "2022-03-15T00:00:00",
    price: 0.99,
  },
  {
    id: "14",
    name: "CUONG DOLLA NFT",
    image: "/home/auctions/auction4.png",
    provider: "Animverse",
    endTime: "2022-03-15T00:00:00",
    price: 0.99,
  },
  {
    id: "15",
    name: "CUONG DOLLA NFT",
    image: "/home/auctions/auction5.png",
    provider: "Animverse",
    endTime: "2022-03-15T00:00:00",
    price: 0.99,
  },
  {
    id: "16",
    name: "CUONG DOLLA NFT",
    image: "/home/auctions/auction1.png",
    provider: "Animverse",
    endTime: "2022-03-15T00:00:00",
    price: 0.99,
  },
  {
    id: "17",
    name: "CUONG DOLLA NFT",
    image: "/home/auctions/auction2.png",
    provider: "Animverse",
    endTime: "2022-03-15T00:00:00",
    price: 0.99,
  },
  {
    id: "18",
    name: "CUONG DOLLA NFT",
    image: "/home/auctions/auction3.png",
    provider: "Animverse",
    endTime: "2022-03-15T00:00:00",
    price: 0.99,
  },
  {
    id: "19",
    name: "CUONG DOLLA NFT",
    image: "/home/auctions/auction4.png",
    provider: "Animverse",
    endTime: "2022-03-15T00:00:00",
    price: 0.99,
  },
  {
    id: "20",
    name: "CUONG DOLLA NFT",
    image: "/home/auctions/auction5.png",
    provider: "Animverse",
    endTime: "2022-03-15T00:00:00",
    price: 0.99,
  },
]

const columns = [
  {
    title: "Type",
    dataIndex: "type",
  },
  {
    title: "Item",
    dataIndex: "item",
    render: (item) => (
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
  },
  {
    title: "Date",
    dataIndex: "date",
    render: (date) => (
      <span className="date-column">
        {date} <Icon as={ExternalLink} />
      </span>
    ),
  },
]

const tableData = [
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
