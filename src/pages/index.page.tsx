import { useEffect } from "react"
import { Discover } from "src/components/Home/Discover"
import { GettingStarted } from "src/components/Home/GettingStarted"
import { addAnimationOnScroll } from "src/utils/AnimationOnScroll"
import { Banners } from "../components/Home/Banners"
import { HotAuctions } from "../components/Home/HotAuctions"
import { HotCollections } from "../components/Home/HotCollections"
import { Launchpad } from "../components/Home/Launchpad"
import { ListingBar } from "../components/Home/ListingBar"

const Home = () => {
  useEffect(() => {
    addAnimationOnScroll()
  }, [])

  return (
    <div className="home-page">
      <Banners />
      <ListingBar />
      <Launchpad />
      <HotCollections />
      <HotAuctions />
      <Discover />
      <GettingStarted />
    </div>
  )
}

export default Home
