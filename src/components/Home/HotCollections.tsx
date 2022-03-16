import { CollectionItem } from "./CollectionItem"
import { HomeSection } from "./HomeSection"

export const HotCollections = (props) => {
  const { data } = props

  return (
    <div className="hot-collections">
      <HomeSection
        heading="HOT COLLECTIONS"
        rows={2}
        defaultNumber={3}
        onViewAll="/nft-ranking"
      >
        {data?.map((collection) => (
          <CollectionItem key={collection.id} info={collection} />
        ))}
      </HomeSection>
    </div>
  )
}
