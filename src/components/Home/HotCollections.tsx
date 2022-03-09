import axios from "axios"
import { useEffect, useState } from "react"
import { CollectionItem } from "./CollectionItem"
import { HomeSection } from "./HomeSection"

export const HotCollections = () => {
  const [collections, setCollections] = useState<any[]>()

  const fetchCollections = async () => {
    const { data: collections } = await axios.get(
      process.env.NEXT_PUBLIC_API_TEST + "/collections"
    )
    setCollections(collections)
  }

  useEffect(() => {
    fetchCollections()
  }, [])

  return (
    <div className="hot-collections">
      <HomeSection
        heading="HOT COLLECTIONS"
        rows={2}
        defaultNumber={3}
        onViewAll="/nft-ranking"
      >
        {collections?.map((collection) => (
          <CollectionItem
            key={collection.id}
            name={collection.name}
            image={collection.logo}
          />
        ))}
      </HomeSection>
    </div>
  )
}
