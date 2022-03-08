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
import React, { useEffect, useState } from "react"
import { ExternalLink, Eye, Heart } from "react-feather"
import { AppPagination } from "src/components/AppPagination"
import { AppSelect } from "src/components/AppSelect"
import { AppTable } from "src/components/AppTable"
import { useStore } from "src/hooks/useStore"

const DetailsPage = () => {
  const NftStore = useStore("NftStore")
  const [contentModal, setContentModal] = useState(null)
  const [contentAlert, setContentAlert] = useState(null)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const alert = useDisclosure()

  const btnModal = React.useRef()
  const btnAlert = React.useRef()

  // useEffect(() => {
  //   setNft(NftStore.nft)
  // }, [])

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
    },
    {
      title: "Date",
      dataIndex: "date",
      render: ({ date }) => (
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

  const handleOpenModal = (typeModal) => {
    let data = null
    switch (typeModal) {
      case "auction":
        data = {
          header: "Auction",
          body: (
            <>
              <Text className="price">Price</Text>
              <InputGroup>
                <Input type="tel" placeholder="Price" colorScheme="#D7D7D7" />
                <InputRightAddon>BNB</InputRightAddon>
              </InputGroup>
              <Text className="desc">The minium auc price is 0.1785 BNB</Text>
            </>
          ),
        }
        break
      case "buy":
        data = {
          header: "Buy",
          body: (
            <div className="form-buy">
              <p className="label-price">Price:</p>
              <Text className="price">
                {NftStore?.nft?.price}
                <p>($8.8)</p>
              </Text>
            </div>
          ),
        }
        break
      case "offer":
        data = {
          header: "Offer",
          body: (
            <>
              <Text className="price">Price</Text>
              <InputGroup>
                <Input type="tel" placeholder="Price" colorScheme="#D7D7D7" />
                <InputRightAddon>BNB</InputRightAddon>
              </InputGroup>
            </>
          ),
        }
        break

      case "fixedPrice":
        data = {
          size: "lg",
          header: "Fixed Price",
          body: (
            <div className="fixed-price">
              <div>
                <img src="/icons/owner.png" alt="" />
                <p>
                  <p>
                    Animverse
                    <img src="/common/my-nft/check.png" alt="" />
                  </p>
                  CUONG DOLLA NFT
                </p>
              </div>
              <Text className="price">Price</Text>
              <InputGroup>
                <Input type="tel" placeholder="Price" colorScheme="#D7D7D7" />
                <InputRightAddon>BNB</InputRightAddon>
              </InputGroup>
              <p>0 BNB = $0</p>
              <p>
                The floor price is 0.0055 BNB. The item will be on sale until
                you cancelled.
              </p>
              <p>FEES</p>
              <p>
                Listing is FREE! When the sale succeeds, the following fees will
                occour.
              </p>
              <div>
                <p>
                  <span>To Lucis</span>
                  <span>2.5%</span>
                </p>
                <p>
                  <span>To Polychain Monsters</span>
                  <span>2.5%</span>
                </p>
              </div>
            </div>
          ),
        }
        break

      case "ownerAuction":
        data = {
          size: "lg",
          header: "Auction",
          body: (
            <>
              <div>
                <img src="/icons/owner.png" alt="" />
                <p>
                  <p>
                    Animverse
                    <img src="/common/my-nft/check.png" alt="" />
                  </p>
                  CUONG DOLLA NFT
                </p>
              </div>
              <Text className="price">Price</Text>
              <InputGroup>
                <Input type="tel" placeholder="Price" colorScheme="#D7D7D7" />
                <InputRightAddon>BNB</InputRightAddon>
              </InputGroup>
              <p>0 BNB = $0</p>
              <p>
                The floor price is 0.0055 BNB. The item will be on sale until
                you cancelled.
              </p>
              <p>FEES</p>
              <p>
                Listing is FREE! When the sale succeeds, the following fees will
                occour.
              </p>
              <div>
                <p>
                  <span>To Lucis</span>
                  <span>2.5%</span>
                </p>
                <p>
                  <span>To Polychain Monsters</span>
                  <span>2.5%</span>
                </p>
              </div>
            </>
          ),
        }
        break

      case "ownerSend":
        data = {
          size: "lg",
          header: "Send",
          body: (
            <>
              <Text className="price">Price</Text>
              <InputGroup>
                <Input type="tel" placeholder="Price" colorScheme="#D7D7D7" />
                <InputRightAddon>BNB</InputRightAddon>
              </InputGroup>
            </>
          ),
        }
        break

      default:
        break
    }
    setContentModal(data)
    onOpen()
  }

  const handleApply = () => {
    onClose()
    if (Math.random() < 0.5) {
      setContentAlert({
        body: (
          <div className="alert-content">
            <img src="/icons/congratulation.png" alt="" />
            <p className="title">Congratulation!</p>
            <p className="desc">You have successfully offer!</p>
          </div>
        ),
      })
    } else {
      setContentAlert({
        body: (
          <div className="alert-content">
            <img src="/icons/sorry.png" alt="" />
            <p className="title">Error!</p>
            <p className="desc">Opp! something went wrong.</p>
          </div>
        ),
      })
    }
    alert.onOpen()
  }

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
        <span className="name">{NftStore?.nft?.name}</span>
        <div className="owner">
          {!NftStore?.nft?.owner ? (
            <span>Preserved by Hlyman</span>
          ) : (
            <span>Preserved by Me</span>
          )}
          <div className="owner-stat">
            <span>100</span> <Icon as={Heart} />
            <span>100</span> <Icon as={Eye} />
          </div>
        </div>
        {!NftStore?.nft?.owner ? (
          <div className="buy-tray">
            <div className="buy-tray-body">
              <div className="price">
                {!NftStore?.nft?.hidePrice ? (
                  <>
                    <span>Price</span>
                    <span>{NftStore?.nft?.price} BNB</span>
                    <span>($8.8)</span>
                  </>
                ) : (
                  <>
                    <span>Price</span>
                    <span>-</span>
                    <span>Waiting first offer</span>
                  </>
                )}
              </div>
              <div className="buy-nav">
                {NftStore?.nft?.auction ? (
                  <Button
                    ref={btnModal}
                    onClick={() => handleOpenModal("auction")}
                  >
                    AUC
                  </Button>
                ) : (
                  <>
                    <Button
                      ref={btnModal}
                      onClick={() => handleOpenModal("buy")}
                      isDisabled={NftStore?.nft?.hidePrice}
                    >
                      BUY
                    </Button>
                  </>
                )}
                {!NftStore?.nft?.auction ? (
                  <span ref={btnModal} onClick={() => handleOpenModal("offer")}>
                    Or make offer other price
                  </span>
                ) : null}
              </div>
            </div>
          </div>
        ) : (
          <div className="buy-tray-owner">
            <Button
              ref={btnModal}
              onClick={() => handleOpenModal("fixedPrice")}
            >
              Fixed Price
            </Button>
            <Button
              ref={btnModal}
              onClick={() => handleOpenModal("ownerAuction")}
            >
              Auction
            </Button>
            <Button ref={btnModal} onClick={() => handleOpenModal("ownerSend")}>
              Send
            </Button>
          </div>
        )}
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

  const _renderModalConfirm = () => (
    <Modal
      size={contentModal?.size != undefined ? contentModal.size : "sm"}
      finalFocusRef={btnModal}
      isOpen={isOpen}
      onClose={onClose}
      isCentered={false}
    >
      <ModalOverlay />
      <ModalContent className="dialog-confirm">
        <ModalHeader>{contentModal?.header}</ModalHeader>
        <ModalCloseButton>
          <img src="/icons/close.png" />
        </ModalCloseButton>
        <ModalBody className="form-auction">{contentModal?.body}</ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleApply}>
            Apply
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )

  const _renderModalAlert = () => (
    <Modal
      finalFocusRef={btnAlert}
      isOpen={alert.isOpen}
      onClose={alert.onClose}
      isCentered
    >
      <ModalOverlay />
      <ModalContent className="dialog-confirm dialog-alert">
        <ModalHeader> </ModalHeader>
        <ModalCloseButton>
          <img src="/icons/close.png" />
        </ModalCloseButton>
        <ModalBody className="form-auction">{contentAlert?.body}</ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={alert.onClose}>
            OK
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )

  const [offset, setOffset] = useState(0)
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
      {_renderModalConfirm()}
      {_renderModalAlert()}
    </div>
  )
}

export default DetailsPage
