import { NftItem } from "../NftItem"
import { HomeSection } from "./HomeSection"

export const HotAuctions = (props) => {
  const { data } = props

  return (
    <div className="hot-auctions">
      <HomeSection
        heading="HOT AUCTIONS"
        defaultNumber={5}
        onViewAll="/discover"
      >
        {data?.map((auction) => (
          <NftItem key={auction.id} info={auction} />
        ))}
      </HomeSection>
    </div>
  )
}
