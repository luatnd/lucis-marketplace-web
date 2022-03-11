import { NftItem } from "../NftItem"
import { HomeSection } from "./HomeSection"

export const Discover = (props) => {
  const { data } = props

  return (
    <div className="discover">
      <HomeSection
        heading="DISCOVER"
        defaultNumber={5}
        rows={2}
        onViewAll="/discover"
      >
        {data?.map((auction) => (
          <NftItem key={auction.id} info={auction} />
        ))}
      </HomeSection>
    </div>
  )
}
