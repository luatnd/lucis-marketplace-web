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
          <CollectionItem
            id={collection.id}
            key={collection.id}
            name={collection.name}
            image={collection.logo}
          />
        ))}
      </HomeSection>
    </div>
  )
}
