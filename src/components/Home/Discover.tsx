import axios from "axios"
import { useEffect, useState } from "react"
import { NftItem } from "../NftItem"
import { HomeSection } from "./HomeSection"

export const Discover = () => {
  const [nfts, setNfts] = useState<any[]>()

  const fetchNfts = async () => {
    const { data: discovers } = await axios.get(
      process.env.NEXT_PUBLIC_API_TEST + "/nft"
    )
    setNfts(discovers)
  }

  useEffect(() => {
    fetchNfts()
  }, [])

  return (
    <div className="discover">
      <HomeSection
        heading="DISCOVER"
        defaultNumber={5}
        rows={2}
        onViewAll="/discover"
      >
        {nfts?.map((auction) => (
          <NftItem
            key={auction.id}
            name={auction.name}
            image={auction.image}
            collection={auction.collection}
            endTime={auction.endTime}
            price={auction.price}
            isAuction={auction.isAuction}
          />
        ))}
      </HomeSection>
    </div>
  )
}
