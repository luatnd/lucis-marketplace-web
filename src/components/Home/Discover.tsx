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
        {data?.map((item) => (
          <NftItem key={item.id} info={item} />
        ))}
      </HomeSection>
    </div>
  )
}
