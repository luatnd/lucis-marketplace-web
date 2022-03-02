import { Banners } from "../components/Home/Banners"
import { HotCollections } from "../components/Home/HotCollections"
import { Launchpad } from "../components/Home/Launchpad"
import { Listing } from "../components/Home/Listing"

const Home = () => {
  return (
    <div className="home-page">
      <Banners />
      <Listing />
      <Launchpad />
      <HotCollections />
    </div>
  )
}

export default Home
