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
  ModalHeader,
  ModalOverlay,
  NumberInput,
  NumberInputField,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react"
import Verified from "@static/icons/verified.svg"
import Success from "@static/icons/success.svg"
import { observer } from "mobx-react-lite"
import { GetServerSidePropsContext } from "next"
import { useRouter } from "next/router"
import React, { ReactNode, useRef, useState } from "react"
import { ExternalLink, Eye, Heart } from "react-feather"
import { useStore } from "src/hooks/useStore"
import {
  aucNft,
  auctionNft,
  buyNft,
  cancelPrice,
  fixPrice,
  getNft,
  likeNft,
  sendNft,
  unLikeNft,
} from "src/services/nft"
import { currency } from "src/utils/Number"
import Activities from "./Activities"
import ReceivedOffer from "./ReceivedOffer"

const DetailsPage = observer((props: any) => {
  const { data } = props
  const WalletController = useStore("WalletController")
  const { address } = WalletController

  const [info, setInfo] = useState(data)
  const [modalVisible, setModalVisible] = useState(false)
  const [modalContent, setModalContent] = useState<ReactNode>()
  const priceToAuc = useRef<any>()
  const priceToFix = useRef<any>()
  const priceToAuction = useRef<any>()
  const addressToSend = useRef<any>()

  const router = useRouter()
  const fetchData = async () => {
    const { id } = router.query
    const res = await getNft(+id)
    setInfo(res)
  }

  const handleLike = async () => {
    if (info.liked.includes(address)) {
      await unLikeNft(info.id, address, info.liked)
      fetchData()
    } else {
      await likeNft(info.id, address, info.liked)
      fetchData()
    }
  }

  const handleBuy = async () => {
    setModalContent(buyModalContent)
    setModalVisible(true)
  }

  const handleOffer = async () => {
    setModalContent(offerModalContent)
    setModalVisible(true)
  }

  const handleAuc = async () => {
    setModalContent(aucModalContent)
    setModalVisible(true)
  }

  const handleFixedPrice = async () => {
    setModalContent(fixedPriceModalContent)
    setModalVisible(true)
  }

  const handleAuction = async () => {
    setModalContent(auctionModalContent)
    setModalVisible(true)
  }

  const handleSend = async () => {
    setModalContent(sendModalContent)
    setModalVisible(true)
  }

  const handleCancelPrice = async () => {
    await cancelPrice(info.id)
    fetchData()
  }

  const handleChangePrice = async () => {
    setModalContent(fixedPriceModalContent)
    setModalVisible(true)
  }

  const _renderOwnerTray = () => {
    const normalTray = (
      <div className="actions">
        <Button onClick={handleFixedPrice}>Fixed Price</Button>
        <Button onClick={handleAuction}>Auction</Button>
        <Button onClick={handleSend}>Send</Button>
      </div>
    )

    const aucAction = (
      <div className="auc-action">
        <div className="auc-action-body">
          <div className="price">
            <span>Top auc</span>
            <span>{currency(info.topAuc)} BNB</span>
            <span>(${currency(info.topAuc * 376)})</span>
          </div>
          <div className="price-nav">
            <div className="cancel">
              <Button onClick={handleCancelPrice}>Cancel</Button>
            </div>
          </div>
        </div>
      </div>
    )
    const fixedPriceAction = (
      <div className="change-price">
        <div className="change-price-body">
          <div className="price">
            <span>Price</span>
            <span>{currency(info.price)} BNB</span>
            <span>(${currency(info.price * 376)})</span>
          </div>
          <div className="price-nav">
            <Button className="change-price-btn" onClick={handleChangePrice}>
              Change Price
            </Button>
            <div className="cancel">
              <Button onClick={handleCancelPrice}>Cancel</Button>
            </div>
          </div>
        </div>
      </div>
    )

    return (
      <div className="owner-tray">
        {info.aucPrice ? aucAction : info.price ? fixedPriceAction : normalTray}
      </div>
    )
  }

  const _renderBuyTray = () => {
    return (
      <div className="buy-tray">
        <div className="buy-tray-body">
          <div className="price">
            <span>Price</span>
            <span>{info.price ? currency(info.price) + " BNB" : "-"} </span>
            <span>
              {info.price
                ? `(${currency(info.price * 376)})`
                : "Waiting first offer"}
            </span>
          </div>
          <div className="buy-nav">
            <Button onClick={handleBuy} isDisabled={!info.price}>
              BUY
            </Button>
            <span onClick={handleOffer}>Or make offer other price</span>
          </div>
        </div>
      </div>
    )
  }

  const _renderAucTray = () => {
    return (
      <div className="auc-tray">
        <div className="auc-tray-body">
          <div className="price">
            <span>Top auc</span>
            <span>{currency(info.topAuc)} BNB</span>
            <span>(${currency(info.topAuc * 376)})</span>
          </div>
          <div className="auc-nav">
            <Button onClick={handleAuc}>AUCTION</Button>
          </div>
        </div>
      </div>
    )
  }

  const _renderDetails = () => {
    return (
      <div className="details">
        <div className="details-card">
          <div className="details-image">
            <img src={data?.image} />
            <Icon
              as={Heart}
              className={`heart ${
                info.liked.includes(address) ? "heart-liked" : ""
              }`}
              onClick={handleLike}
            />
          </div>

          <div className="nft-description">{info.description}</div>
        </div>
        <div className="details-content">
          <div className="collection">
            <img src="/nft-details/provider.png" />
            <span>{data?.collection?.name}</span>
          </div>
          <h1 className="name">
            {data?.name} #{data?.id}
          </h1>
          <div className="owner">
            {address === info.owner ? (
              <span>Preserved by Me</span>
            ) : (
              <span>
                Preserved by{" "}
                <a href="/user/1" target={"_blank"} rel="noreferrer">
                  Hlyman
                </a>
              </span>
            )}
            <div className="owner-stat">
              <span>{info.liked.length}</span> <Icon as={Heart} />
              <span>{info.views}</span> <Icon as={Eye} />
            </div>
          </div>
          {info.owner === address
            ? _renderOwnerTray()
            : info.aucPrice
            ? _renderAucTray()
            : _renderBuyTray()}
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
  }

  const _renderTables = () => (
    <div className="tables">
      <Tabs>
        <TabList>
          <Tab className="tab-item">ACTIVITIES</Tab>
          <Tab className="tab-item">{"RECEIVED OFFER"}</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Activities />
          </TabPanel>
          <TabPanel>{<ReceivedOffer />}</TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  )

  const buyModalContent = () => {
    const buy = async () => {
      await buyNft(address, +info.id)
      await fetchData()
      setModalContent(resultModalContent)
    }
    return (
      <ModalContent>
        <ModalHeader>Buy</ModalHeader>
        <ModalCloseButton />
        <ModalBody className="buy-modal">
          <div className="price">
            <span>Price:</span>
            <div className="price-col">
              <h1>{currency(info.price)}</h1>
              <span>(${currency(info.price * 376)})</span>
            </div>
          </div>
          <Button onClick={() => buy()}>Apply</Button>
        </ModalBody>
      </ModalContent>
    )
  }

  const aucModalContent = () => {
    const auc = async () => {
      await aucNft(priceToAuc.current.value, info.id)
      await fetchData()
      setModalContent(resultModalContent)
    }
    return (
      <ModalContent>
        <ModalHeader>Auction</ModalHeader>
        <ModalCloseButton />
        <ModalBody className="auc-modal">
          <label>Price</label>
          <InputGroup>
            <NumberInput>
              <NumberInputField
                placeholder="Price"
                ref={priceToAuc}
                name="price"
              />
            </NumberInput>
            <InputRightAddon>BNB</InputRightAddon>
          </InputGroup>
          <p>The minium auc price is {info.aucPrice} BNB</p>
          <Button onClick={auc}>Apply</Button>
        </ModalBody>
      </ModalContent>
    )
  }

  const resultModalContent = () => {
    return (
      <ModalContent>
        <ModalCloseButton />
        <ModalBody className="result-modal">
          <Icon as={Success} className="success-icon" />
          <h1>Successful !</h1>
          <p>You have successful transaction</p>
          <Button onClick={() => setModalVisible(false)}>OK</Button>
        </ModalBody>
      </ModalContent>
    )
  }

  const fixedPriceModalContent = () => {
    const fix = async () => {
      await fixPrice(priceToFix.current.value, info.id)
      await fetchData()
      setModalContent(resultModalContent)
    }
    return (
      <div>
        <ModalContent>
          <ModalHeader>Fixed Price</ModalHeader>
          <ModalCloseButton />
          <ModalBody className="fixed-price-modal">
            <div className="modal-head">
              <div className="info-img">
                <img src={info.image} />
              </div>
              <div className="info-text">
                <p>
                  {info.collection.name} <Icon as={Verified} />
                </p>
                <h1>{info.name}</h1>
              </div>
            </div>
            <label>Price</label>
            <InputGroup>
              <NumberInput>
                <NumberInputField
                  placeholder="Price"
                  ref={priceToFix}
                  name="price"
                />
              </NumberInput>
              <InputRightAddon>BNB</InputRightAddon>
            </InputGroup>
            <p>0 BNB = $0</p>
            <p>
              The floor price is 0.0055 BNB. The item will be on sale until you
              cancelled.
            </p>
            <h1>FEES</h1>
            <p>
              Listing is FREE! When the sale succeeds, the following fees will
              occour.
            </p>
            <div className="fee-box">
              <span>
                <p>To Lucis</p>
                <p>2.5%</p>
              </span>
              <span>
                <p>To {info.collection.name}</p>
                <p>2.5%</p>
              </span>
            </div>
            <Button onClick={fix}>Apply</Button>
          </ModalBody>
        </ModalContent>
      </div>
    )
  }

  const auctionModalContent = () => {
    let duration = 1
    const fix = async () => {
      await auctionNft(info.id, +priceToAuction.current.value, duration)
      await fetchData()
      setModalContent(resultModalContent)
    }
    return (
      <div>
        <ModalContent>
          <ModalHeader>Auction</ModalHeader>
          <ModalCloseButton />
          <ModalBody className="auction-modal">
            <div className="modal-head">
              <div className="info-img">
                <img src={info.image} />
              </div>
              <div className="info-text">
                <p>
                  {info.collection.name} <Icon as={Verified} />
                </p>
                <h1>{info.name}</h1>
              </div>
            </div>
            <label>Price</label>
            <InputGroup>
              <NumberInput>
                <NumberInputField
                  placeholder="Price"
                  ref={priceToAuction}
                  name="price"
                />
              </NumberInput>
              <InputRightAddon>BNB</InputRightAddon>
            </InputGroup>
            <p>0 BNB = $0</p>
            <p>
              The floor price is 0.0055 BNB. The item will be on sale until you
              cancelled.
            </p>
            <h1>FEES</h1>
            <p>
              Listing is FREE! When the sale succeeds, the following fees will
              occour.
            </p>
            <label>Duration</label>
            <div className="duration">
              <Button autoFocus onClick={() => (duration = 1)}>
                1 Day
              </Button>
              <Button onClick={() => (duration = 3)}>3 Days</Button>
              <Button onClick={() => (duration = 5)}>5 Days</Button>
            </div>
            <div className="fee-box">
              <span>
                <p>To Lucis</p>
                <p>2.5%</p>
              </span>
              <span>
                <p>To {info.collection.name}</p>
                <p>2.5%</p>
              </span>
              <span>
                <p>Bidder to bidder</p>
                <p>5%</p>
              </span>
            </div>
            <Button onClick={fix}>Apply</Button>
          </ModalBody>
        </ModalContent>
      </div>
    )
  }

  const sendModalContent = () => {
    const send = async () => {
      await sendNft(info.id, addressToSend.current.value)
      await fetchData()
      setModalContent(resultModalContent)
    }

    return (
      <ModalContent>
        <ModalHeader>Send</ModalHeader>
        <ModalCloseButton />
        <ModalBody className="send-modal">
          <div className="modal-head">
            <div className="info-img">
              <img src={info.image} />
            </div>
            <div className="info-text">
              <p>
                {info.collection.name} <Icon as={Verified} />
              </p>
              <h1>{info.name}</h1>
            </div>
          </div>
          <label>Target wallet address</label>
          <InputGroup>
            <Input ref={addressToSend} placeholder="0xadabc..." />
            <InputRightAddon>BNB</InputRightAddon>
          </InputGroup>
          <label>
            {"You won't be able to take back the NFT after the transaction."}
          </label>
          <Button onClick={send}>Apply</Button>
        </ModalBody>
      </ModalContent>
    )
  }

  const offerModalContent = () => {
    const offer = async () => {
      setModalContent(resultModalContent)
    }
    return (
      <ModalContent>
        <ModalHeader>Offer</ModalHeader>
        <ModalCloseButton />
        <ModalBody className="offer-modal">
          <label>Price</label>
          <InputGroup>
            <NumberInput>
              <NumberInputField />
            </NumberInput>
            <InputRightAddon>BNB</InputRightAddon>
          </InputGroup>
          <Button onClick={offer}>Apply</Button>
        </ModalBody>
      </ModalContent>
    )
  }

  return (
    <div className="nft-details">
      {_renderDetails()}
      {_renderTables()}
      <Modal
        isOpen={modalVisible}
        onClose={() => setModalVisible(false)}
        isCentered
      >
        <ModalOverlay />
        {modalContent}
      </Modal>
    </div>
  )
})

export default DetailsPage

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { id } = ctx.query
  const data = await getNft(+id)
  return {
    props: {
      data,
    },
  }
}

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
