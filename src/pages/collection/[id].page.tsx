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
import { GetServerSidePropsContext } from "next"
import { useState } from "react"
import { ChevronDown, ChevronUp } from "react-feather"
import { TCollection } from "src/@types/collection"
import { ListingBar } from "src/components/Home/ListingBar"
import { collectionService } from "src/services/CollectionService"
import { CollectionActivities } from "./CollectionActivities"
import { CollectionItems } from "./CollectionItems"

interface IProps {
  data: TCollection
}

const CollectionDetails = (props: IProps) => {
  const { data } = props
  const [isExpanded, setIsExpanded] = useState(false)

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
      <img className="collection-banner" src={data?.cover_photo} />
      <ListingBar />
      <div className="collection-content">
        <Tabs align="center">
          <TabList>
            <Tab className="tab-item">ITEMS</Tab>
            <Tab className="tab-item">ACTIVITIES</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>{<CollectionItems />}</TabPanel>
            <TabPanel>{<CollectionActivities />}</TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </div>
  )
}

export default CollectionDetails

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { id } = ctx.query

  const data = await collectionService.getCollection({
    id: +id,
  })

  return {
    props: {
      data,
    },
  }
}
