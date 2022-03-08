import {
  Button,
  Icon,
  Input,
  InputGroup,
  InputRightAddon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tab,
  TabList,
  Tabs,
  Text,
  useDisclosure,
} from "@chakra-ui/react"
import BoxIcon from "@static/icons/item-box.svg"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { ExternalLink, Eye, Heart } from "react-feather"
import { AppPagination } from "src/components/AppPagination"
import { AppSelect } from "src/components/AppSelect"
import { AppTable } from "src/components/AppTable"
import { useStore } from "src/hooks/useStore"

const DetailsPage = () => {
  const NftStore = useStore("NftStore")
  const [nft, setNft] = useState(null)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const btnAuction = React.useRef()
  const btnBuy = React.useRef()

  useEffect(() => {
    setNft(NftStore.nft)
  })

  const detailsStats = [
    {
      key: "Staking Score",
      value: "Staking Score",
    },
    {
      key: "Type",
      value: "Type",
    },
    {
      key: "Horn",
      value: "Horn",
    },
    {
      key: "Color",
      value: "Color",
    },
    {
      key: "Background",
      value: "Background",
    },
    {
      key: "Opening Network",
      value: "Opening Network",
    },
    {
      key: "Specical",
      value: "Specical",
    },
    {
      key: "Glitter",
      value: "Glitter",
    },
    {
      key: "Birthday",
      value: "Birthday",
    },
    {
      key: "Booster",
      value: "Booster",
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

  const _renderDetails = () => (
    <div className="details">
      <div className="details-card">
        <div className="details-image">
          <img src="/nft-details/nft-details.png" />
          <Icon as={Heart} className="heart" />
        </div>

        <div className="nft-description">
          8888 NFT Astar Punks derivatives from CryptoPunks built on the Astar
          Network. It focuses on being a gateway and support for artists who
          wish to build their NFT collections on the Astar Network. It will
          build a DAO where the community will drive t
        </div>
      </div>
      <div className="details-content">
        <div className="provider">
          <img src="/nft-details/provider.png" />
          <span>Animverse</span>
        </div>
        <span className="name">{nft?.name}</span>
        <div className="owner">
          <span>Preserved by Hlyman</span>
          <div className="owner-stat">
            <span>100</span> <Icon as={Heart} />
            <span>100</span> <Icon as={Eye} />
          </div>
        </div>
        <div className="buy-tray">
          <div className="buy-tray-body">
            <div className="price">
              <span>Price</span>
              <span>{nft?.price} BNB</span>
              <span>($8.8)</span>
            </div>
            <div className="buy-nav">
              {nft?.auction ? (
                <Button ref={btnAuction} onClick={onOpen}>AUC</Button>
              ) : (
                <>
                  <Button ref={btnBuy} onClick={onOpen}>BUY</Button>
                </>
              )}
              <span style={nft?.auction && { visibility: "hidden" }}>
                {" "}
                Or make offer other price
              </span>
            </div>
          </div>
        </div>
        <div className="details-stats">
          <h1>Detail</h1>
          {detailsStats.map((stat) => (
            <div className="stat" key={stat.key}>
              <span>{stat.key}</span>
              <span>
                {stat.value}
                <Icon as={ExternalLink} />
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const _renderAuc = () => (
    <Modal finalFocusRef={btnAuction} isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent className="dialog-confirm">
        <ModalHeader>Auction</ModalHeader>
        <ModalCloseButton>
          <img src="/icons/close.png" />
        </ModalCloseButton>
        <ModalBody className="form-auction">
          <Text className="price">Price</Text>
          <InputGroup>
            <Input type="tel" placeholder="Price" colorScheme="#D7D7D7" />
            <InputRightAddon>BNB</InputRightAddon>
          </InputGroup>
          <Text className="desc">The minium auc price is 0.1785 BNB</Text>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Apply
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )

  const _renderBuy = () => (
    <Modal finalFocusRef={btnBuy} isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent className="dialog-confirm dialog-buy">
        <ModalHeader>Buy</ModalHeader>
        <ModalCloseButton>
          <img src="/icons/close.png" />
        </ModalCloseButton>
        <ModalBody className="form-auction">
          <Text className="price">Price:</Text>
          <Text className="price">{nft?.price}</Text>
          <Text className="price">($8.8)</Text>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Apply
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )

  const [offset, setOffset] = useState(10)
  const [pageSize, setPageSize] = useState(5)
  const [total, setTotal] = useState(21)

  const fetchData = () => {
    console.log(offset, pageSize)
  }

  useEffect(() => {
    fetchData()
  }, [offset, pageSize])

  const _renderTables = () => (
    <div className="tables">
      <Tabs>
        <TabList>
          <Tab className="tab-item">ACTIVITIES</Tab>
          <Tab className="tab-item">RECEIVED OFFERED</Tab>
        </TabList>
      </Tabs>
      <div className="filter-row">
        <AppSelect
          className="filter"
          defaultValue={"1"}
          placeholder="All"
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
        pageSize={pageSize}
        onChangeOffset={(value) => setOffset(value)}
        onChangPageSize={(value) => setPageSize(value)}
      />
    </div>
  )

  return (
    <div className="nft-details">
      {_renderDetails()}
      {_renderTables()}
      {_renderAuc()}
      {_renderBuy()}
    </div>
  )
}

export default DetailsPage
