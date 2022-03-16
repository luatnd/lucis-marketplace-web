import { GetServerSidePropsContext } from "next"
import { useEffect } from "react"
import { Discover } from "src/components/Home/Discover"
import { GettingStarted } from "src/components/Home/GettingStarted"
import { collectionService } from "src/services/CollectionService"
import {
  getGettingStarted,
  getHotAuctions,
  getLaunchpads,
} from "src/services/nft"
import { nftService } from "src/services/NftService"
import { addAnimationOnScroll } from "src/utils/AnimationOnScroll"
import { Banners } from "../components/Home/Banners"
import { HotAuctions } from "../components/Home/HotAuctions"
import { HotCollections } from "../components/Home/HotCollections"
import { Launchpad } from "../components/Home/Launchpad"
import { ListingBar } from "../components/Home/ListingBar"

const Home = (props) => {
  const { launchpads, hotCollections, hotAuctions, discovers, gettingStarted } =
    props

  useEffect(() => {
    addAnimationOnScroll()
  }, [])

  return (
    <div className="home-page">
      <Banners data={hotCollections} />
      <ListingBar />
      <Launchpad data={launchpads} />
      <HotCollections data={hotCollections} />
      <HotAuctions data={hotAuctions} />
      <Discover data={discovers} />
      <GettingStarted data={gettingStarted} />
    </div>
  )
}

export default Home

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const [launchpads, hotCollections, hotAuctions, discovers, gettingStarted] =
    await Promise.all([
      getLaunchpads(),
      collectionService.getHotCollections(),
      getHotAuctions(),
      nftService.getNfts(),
      getGettingStarted(),
    ])

  return {
    props: {
      launchpads,
      hotCollections,
      hotAuctions,
      discovers,
      gettingStarted,
    },
  }
}
