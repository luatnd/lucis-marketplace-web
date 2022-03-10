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
