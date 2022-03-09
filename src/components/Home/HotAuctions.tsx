import axios from "axios"
import { useEffect, useState } from "react"
import { NftItem } from "../NftItem"
import { HomeSection } from "./HomeSection"

export const HotAuctions = () => {
  const [hotAuction, setHotAuction] = useState<any[]>()

  const fetchHotAuctions = async () => {
    const { data: autions } = await axios.get(
      process.env.NEXT_PUBLIC_API_TEST + "/nft/?isAuction=true&&_limit=10"
    )
    setHotAuction(autions)
  }

  useEffect(() => {
    fetchHotAuctions()
  }, [])

  return (
    <div className="hot-auctions">
      <HomeSection
        heading="HOT AUCTIONS"
        defaultNumber={5}
        onViewAll="/discover"
      >
        {hotAuction?.map((auction) => (
          <NftItem
            id={auction.id}
            key={auction.id}
            name={auction.name}
            image={auction.image}
            collection={auction.collection}
            endTime={auction.endTime}
            price={auction.price}
            isAuction={true}
          />
        ))}
      </HomeSection>
    </div>
  )
}
