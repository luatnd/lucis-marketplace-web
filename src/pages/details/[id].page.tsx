import {
  Button,
  Tab,
  Table,
  TabList,
  Tabs,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react"
import { ExternalLinkIcon } from "@chakra-ui/icons"

const DetailsPage = () => {
  const stats = [
    {
      name: "Staking Score",
      stat: "58",
      percent: 3.1,
      hasLink: true,
    },
    {
      name: "Type",
      stat: "Uniaqua",
      percent: 15.3,
      hasLink: true,
    },
    {
      name: "Horn",
      stat: "Golden horn",
      percent: 100,
      hasLink: true,
    },
    {
      name: "Color",
      stat: "Black",
      percent: 22.7,
      hasLink: true,
    },
    {
      name: "Background",
      stat: "Summer land",
      percent: 15.4,
      hasLink: true,
    },
    {
      name: "Opening Network",
      stat: "Binance smart chain",
      percent: 100,
      hasLink: true,
    },
    {
      name: "Glitter",
      stat: "No",
      percent: 100,
      hasLink: true,
    },
    {
      name: "Specical",
      stat: "No",
      percent: 100,
      hasLink: true,
    },
    {
      name: "Birthday",
      stat: "8 December 2021 17:00",
      hasLink: false,
    },
    {
      name: "Booster",
      stat: "1001000100034534",
      hasLink: false,
    },
  ]

  const exampleData = [
    {
      item: <img src="/common/example-item.png" />,
      name: "Animverse",
      price: "2 ETH",
      to: "NguyenDucLinh",
      expiration: "In  2 days",
      offerAt: "1 days ago",
    },
    {
      item: <img src="/common/example-item.png" />,
      name: "Animverse",
      price: "2 ETH",
      to: "NguyenDucLinh",
      expiration: "In  2 days",
      offerAt: "1 days ago",
    },
    {
      item: <img src="/common/example-item.png" />,
      name: "Animverse",
      price: "2 ETH",
      to: "NguyenDucLinh",
      expiration: "In  2 days",
      offerAt: "1 days ago",
    },
    {
      item: <img src="/common/example-item.png" />,
      name: "Animverse",
      price: "2 ETH",
      to: "NguyenDucLinh",
      expiration: "In  2 days",
      offerAt: "1 days ago",
    },
    {
      item: <img src="/common/example-item.png" />,
      name: "Animverse",
      price: "2 ETH",
      to: "NguyenDucLinh",
      expiration: "In  2 days",
      offerAt: "1 days ago",
    },
    {
      item: <img src="/common/example-item.png" />,
      name: "Animverse",
      price: "2 ETH",
      to: "NguyenDucLinh",
      expiration: "In  2 days",
      offerAt: "1 days ago",
    },
  ]

  const _renderNft = () => (
    <div className="nft-wrapper">
      <img className="nft-background" src="/common/example-nft.png" />
      <img className="nft-border-line" src="/common/nft-border-line.png" />
      <div className="nft-info">
        <h1>Animveser - Nft</h1>
        <div className="nft-stats">
          <span>10.48 ETH</span>
          <Button>Buy now</Button>
        </div>
        <div className="nft-stats">
          <h1>8,25 USD</h1>
          <p>Or make offer other price</p>
        </div>
      </div>
    </div>
  )

  const _renderDetails = () => (
    <div className="details">
      <div className="main-stats">
        <h1>Detail</h1>
        {stats.map((stat) => (
          <div className="stat-row">
            <span className="name">{stat.name}</span>
            <div>
              <span className="stat">{stat.stat}</span>
              <span className="percents">
                {stat.percent ? `(${stat.percent}%)` : null}
              </span>
              {stat.hasLink ? <ExternalLinkIcon className="icon" /> : null}
            </div>
          </div>
        ))}
      </div>
      <div className="tables">
        <Tabs>
          <TabList>
            <Tab>Activities</Tab>
            <Tab>Received offered</Tab>
          </TabList>
          <Table size="sm">
            <Thead>
              <Tr>
                <Th>Item</Th>
                <Th>Name</Th>
                <Th>Price</Th>
                <Th>To</Th>
                <Th>Expiration</Th>
                <Th>Offer at</Th>
              </Tr>
            </Thead>
            <Tbody>
              {exampleData.map((item, index) => (
                <Tr key={index}>
                  <Td>{item.item}</Td>
                  <Td>{item.name}</Td>
                  <Td>{item.price}</Td>
                  <Td>{item.to}</Td>
                  <Td>{item.expiration}</Td>
                  <Td>{item.offerAt}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Tabs>
      </div>
    </div>
  )

  return (
    <div className="details-page">
      {_renderNft()}
      {_renderDetails()}
    </div>
  )
}

export default DetailsPage
