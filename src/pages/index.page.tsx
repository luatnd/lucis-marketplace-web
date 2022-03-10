import { GetServerSidePropsContext } from "next"
import { useEffect } from "react"
import { Discover } from "src/components/Home/Discover"
import { GettingStarted } from "src/components/Home/GettingStarted"
import {
  getBanners,
  getCollections,
  getDiscovers,
  getGettingStarted,
  getHotAuctions,
  getLaunchpads,
} from "src/services/nft"
import { addAnimationOnScroll } from "src/utils/AnimationOnScroll"
import { Banners } from "../components/Home/Banners"
import { HotAuctions } from "../components/Home/HotAuctions"
import { HotCollections } from "../components/Home/HotCollections"
import { Launchpad } from "../components/Home/Launchpad"
import { ListingBar } from "../components/Home/ListingBar"

const Home = (props) => {
  const {
    banners,
    launchpads,
    collections,
    hotAuctions,
    discovers,
    gettingStarted,
  } = props

  useEffect(() => {
    addAnimationOnScroll()
  }, [])

  return (
    <div className="home-page">
      <Banners data={banners} />
      <ListingBar />
      <Launchpad data={launchpads} />
      <HotCollections data={collections} />
      <HotAuctions data={hotAuctions} />
      <Discover data={discovers} />
      <GettingStarted data={gettingStarted} />
    </div>
  )
}

export default Home

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const [
    banners,
    launchpads,
    collections,
    hotAuctions,
    discovers,
    gettingStarted,
  ] = await Promise.all([
    getBanners(),
    getLaunchpads(),
    getCollections(),
    getHotAuctions(),
    getDiscovers(),
    getGettingStarted(),
  ])

  return {
    props: {
      banners,
      launchpads,
      collections,
      hotAuctions,
      discovers,
      gettingStarted,
    },
  }
}
