import { Advertisement } from "../components/Home/Advertisement"
import { Banners } from "../components/Home/Banners"
import { HotCollections } from "../components/Home/HotCollections"
import { Launchpad } from "../components/Home/Launchpad"

const Home = () => {
  return (
    <div className="home-page">
      <Banners />
      <Advertisement />
      <Launchpad />
      <HotCollections />
    </div>
  )
}

export default Home
