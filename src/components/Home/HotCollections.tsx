import { CollectionItem } from "./CollectionItem"
import { HomeSection } from "./HomeSection"

export const HotCollections = () => {
  const collections = [
    {
      id: "1",
      name: "Animvese",
      image: "/home/collections/collection1.png",
    },
    {
      id: "2",
      name: "League of ki...",
      image: "/home/collections/collection2.png",
    },
    {
      id: "3",
      name: "Kart Racing...",
      image: "/home/collections/collection3.png",
    },
    {
      id: "4",
      name: "PhoneyX",
      image: "/home/collections/collection4.png",
    },
    {
      id: "5",
      name: "Axie",
      image: "/home/collections/collection5.png",
    },
    {
      id: "6",
      name: "Moniwar",
      image: "/home/collections/collection6.png",
    },
    {
      id: "1",
      name: "Animvese",
      image: "/home/collections/collection1.png",
    },
    {
      id: "2",
      name: "League of ki...",
      image: "/home/collections/collection2.png",
    },
    {
      id: "3",
      name: "Kart Racing...",
      image: "/home/collections/collection3.png",
    },
    {
      id: "4",
      name: "PhoneyX",
      image: "/home/collections/collection4.png",
    },
    {
      id: "5",
      name: "Axie",
      image: "/home/collections/collection5.png",
    },
    {
      id: "6",
      name: "Moniwar",
      image: "/home/collections/collection6.png",
    },
  ]

  return (
    <div className="hot-collections">
      <HomeSection
        heading="HOT COLLECTIONS"
        rows={2}
        defaultNumber={3}
        onViewAll="/nft-ranking"
      >
        {collections.map((collection) => (
          <CollectionItem
            key={collection.id}
            name={collection.name}
            image={collection.image}
          />
        ))}
      </HomeSection>
    </div>
  )
}
