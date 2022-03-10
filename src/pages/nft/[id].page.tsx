import {
  Button,
  Icon,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react"
import { observer } from "mobx-react-lite"
import { GetServerSidePropsContext } from "next"
import { useRouter } from "next/router"
import React, { useState } from "react"
import { ExternalLink, Eye, Heart } from "react-feather"
import { useStore } from "src/hooks/useStore"
import { buyNft, getNft } from "src/services/nft"
import { currency } from "src/utils/Number"
import Activities from "./Activities"
import ReceivedOffer from "./ReceivedOffer"

const DetailsPage = observer((props: any) => {
  const { data } = props
  const WalletController = useStore("WalletController")
  const { address } = WalletController

  const [info, setInfo] = useState(data)
  const router = useRouter()
  const fetchData = async () => {
    const { id } = router.query
    const res = await getNft(+id)
    setInfo(res)
  }

  const _renderBuyTray = () => {
    const [buyVisible, setBuyVisible] = useState(false)
    const [resultVisible, setResultVisible] = useState(false)
    const handleBuy = async () => {
      setBuyVisible(false)
      await buyNft(address, +info.id)
      fetchData()
      setResultVisible(true)
    }
    return (
      <div className="buy-tray">
        <div className="buy-tray-body">
          <div className="price">
            <span>Price</span>
            <span>{currency(info.price)} BNB</span>
            <span>($8.8)</span>
          </div>
          <div className="buy-nav">
            <Button onClick={() => setBuyVisible(true)}>
              {info.isAuction ? "AUC" : "BUY"}
            </Button>
            <span>Or make offer other price</span>
          </div>
        </div>
        <Modal
          isOpen={buyVisible}
          onClose={() => setBuyVisible(false)}
          isCentered
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Buy</ModalHeader>
            <ModalBody className="buy-modal">
              <div className="price">
                <span>Price:</span>
                <div className="price-col">
                  <h1>1000 BNB</h1>
                  <span>($3995333.67)</span>
                </div>
              </div>
              <Button onClick={() => handleBuy()}>Apply</Button>
            </ModalBody>
          </ModalContent>
        </Modal>
        <Modal
          isOpen={resultVisible}
          onClose={() => setResultVisible(false)}
          isCentered
        >
          <ModalContent>
            <ModalBody className="result-modal">
              <h1>Successful !</h1>
              <p>You have successful transaction</p>
              <Button onClick={() => setResultVisible(false)}>OK</Button>
            </ModalBody>
          </ModalContent>
        </Modal>
      </div>
    )
  }

  const _renderDetails = () => {
    return (
      <div className="details">
        <div className="details-card">
          <div className="details-image">
            <img src={data?.image} />
            <Icon as={Heart} className="heart" />
          </div>

          <div className="nft-description">{info.description}</div>
        </div>
        <div className="details-content">
          <div className="collection">
            <img src="/nft-details/provider.png" />
            <span>{data?.collection?.name}</span>
          </div>
          <span className="name">
            {data?.name} #{data?.id}
          </span>
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
          {_renderBuyTray()}
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

  return (
    <div className="nft-details">
      {_renderDetails()}
      {_renderTables()}
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
