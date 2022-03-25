import {
  Button,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react"
import Success from "@static/icons/success.svg"
import { observer } from "mobx-react-lite"
import { GetServerSidePropsContext } from "next"
import Link from "next/link"
import React, { useState } from "react"
import { ExternalLink, Eye, Heart } from "react-feather"
import { useStore } from "src/hooks/useStore"
import { nftService } from "src/services/NftService"
import Activities from "./Activities"
import Auction from "./Auction"
import { AucTray } from "./AucTray"
import { BuyTray } from "./BuyTray"
import { OwnerTray } from "./OwnerTray"
import ReceivedOffer from "./ReceivedOffer"

const DetailsPage = observer((props: any) => {
  const { data } = props
  const WalletController = useStore("WalletController")
  const { address } = WalletController
  const [info, setInfo] = useState(data)

  console.log(info)

  const [resultVisible, setResultVisible] = useState(false)

  const _renderDetails = () => {
    return (
      <div className="details">
        <div className="details-card">
          <div className="details-image">
            {info?.metadata?.extendInfo?.videoUrl ? (
              <video autoPlay loop>
                <source src={info.metadata.extendInfo.videoUrl} />
              </video>
            ) : (
              <img src={data?.photo} />
            )}
            <Icon
              as={Heart}
              className={`heart ${info.liked ? "heart-liked" : ""}`}
            />
          </div>

          <div className="nft-description">{info.metadata?.description}</div>
        </div>
        <div className="details-content">
          <div className="collection">
            <div className="collection-logo">
              <img src={data?.collection?.logo} />
            </div>
            <Link href={"/collection/" + data?.collection?.id}>
              <a>{data?.contract_name}</a>
            </Link>
          </div>
          <h1 className="name">{data?.name}</h1>
          <div className="owner">
            {address === info.owner ? (
              <span>
                Preserved by{" "}
                <a href="/user/1" target={"_blank"} rel="noreferrer">
                  Me
                </a>
              </span>
            ) : (
              <span>
                Preserved by{" "}
                <a href="/user/1" target={"_blank"} rel="noreferrer">
                  Hlyman
                </a>
              </span>
            )}
            <div className="owner-stat">
              <span>{info.liked}</span> <Icon as={Heart} />
              <span>{info.views}</span> <Icon as={Eye} />
            </div>
          </div>
          {info.owner === address ? (
            <OwnerTray info={info} />
          ) : info.inventory_status === 2 ? (
            <AucTray info={info} />
          ) : (
            <BuyTray info={info} />
          )}
          <div className="details-stats">
            <h1>Detail</h1>
            {info?.metadata?.attributes?.map((stat) => (
              <div className="stat" key={stat.key}>
                <span>{stat.trait_type}</span>
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
      <Tabs align="center">
        <TabList>
          <Tab className="tab-item">ACTIVITIES</Tab>
          <Tab className="tab-item">
            {info.aucPrice ? "AUCTION" : "RECEIVED OFFER"}
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Activities />
          </TabPanel>
          <TabPanel>
            {info.aucPrice ? <Auction /> : <ReceivedOffer info={info} />}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  )

  const _renderResultModal = () => {
    return (
      <Modal
        isCentered
        isOpen={resultVisible}
        onClose={() => setResultVisible(false)}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody className="result-modal">
            <Icon as={Success} className="success-icon" />
            <h1>Successful !</h1>
            <p>You have successful transaction</p>
            <Button>OK</Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    )
  }

  return (
    <div className="nft-details">
      {_renderDetails()}
      {_renderTables()}
      {_renderResultModal()}
    </div>
  )
})

export default DetailsPage

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { id } = ctx.query
  const data = await nftService.getNft({
    nft_item_id: +id,
  })
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
