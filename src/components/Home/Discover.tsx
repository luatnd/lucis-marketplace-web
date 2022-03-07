import { AuctionItem } from "./AuctionItem"
import { HomeSection } from "./HomeSection"

export const Discover = () => {
  const auctions = [
    {
      id: "1",
      name: "CUONG DOLLA NFT",
      image: "/home/discovers/discover1.png",
      provider: "Animverse",
      endTime: "2022-03-15T00:00:00",
      price: 0.99,
    },
    {
      id: "2",
      name: "CUONG DOLLA NFT",
      image: "/home/discovers/discover2.png",
      provider: "Animverse",
      endTime: "2022-03-15T00:00:00",
      price: 0.99,
    },
    {
      id: "3",
      name: "CUONG DOLLA NFT",
      image: "/home/discovers/discover3.png",
      provider: "Animverse",
      endTime: "2022-03-15T00:00:00",
      price: 0.99,
    },
    {
      id: "4",
      name: "CUONG DOLLA NFT",
      image: "/home/discovers/discover4.png",
      provider: "Animverse",
      endTime: "2022-03-15T00:00:00",
      price: 0.99,
    },
    {
      id: "5",
      name: "CUONG DOLLA NFT",
      image: "/home/discovers/discover5.png",
      provider: "Animverse",
      endTime: "2022-03-15T00:00:00",
      price: 0.99,
    },
    {
      id: "6",
      name: "CUONG DOLLA NFT",
      image: "/home/discovers/discover1.png",
      provider: "Animverse",
      endTime: "2022-03-15T00:00:00",
      price: 0.99,
    },
    {
      id: "7",
      name: "CUONG DOLLA NFT",
      image: "/home/discovers/discover2.png",
      provider: "Animverse",
      endTime: "2022-03-15T00:00:00",
      price: 0.99,
    },
    {
      id: "8",
      name: "CUONG DOLLA NFT",
      image: "/home/discovers/discover3.png",
      provider: "Animverse",
      endTime: "2022-03-15T00:00:00",
      price: 0.99,
    },
    {
      id: "9",
      name: "CUONG DOLLA NFT",
      image: "/home/discovers/discover4.png",
      provider: "Animverse",
      endTime: "2022-03-15T00:00:00",
      price: 0.99,
    },
    {
      id: "10",
      name: "CUONG DOLLA NFT",
      image: "/home/discovers/discover5.png",
      provider: "Animverse",
      endTime: "2022-03-15T00:00:00",
      price: 0.99,
    },
    {
      id: "11",
      name: "CUONG DOLLA NFT",
      image: "/home/discovers/discover1.png",
      provider: "Animverse",
      endTime: "2022-03-15T00:00:00",
      price: 0.99,
    },
    {
      id: "12",
      name: "CUONG DOLLA NFT",
      image: "/home/discovers/discover2.png",
      provider: "Animverse",
      endTime: "2022-03-15T00:00:00",
      price: 0.99,
    },
    {
      id: "13",
      name: "CUONG DOLLA NFT",
      image: "/home/discovers/discover3.png",
      provider: "Animverse",
      endTime: "2022-03-15T00:00:00",
      price: 0.99,
    },
    {
      id: "14",
      name: "CUONG DOLLA NFT",
      image: "/home/discovers/discover4.png",
      provider: "Animverse",
      endTime: "2022-03-15T00:00:00",
      price: 0.99,
    },
    {
      id: "15",
      name: "CUONG DOLLA NFT",
      image: "/home/discovers/discover5.png",
      provider: "Animverse",
      endTime: "2022-03-15T00:00:00",
      price: 0.99,
    },
    {
      id: "16",
      name: "CUONG DOLLA NFT",
      image: "/home/discovers/discover1.png",
      provider: "Animverse",
      endTime: "2022-03-15T00:00:00",
      price: 0.99,
    },
    {
      id: "17",
      name: "CUONG DOLLA NFT",
      image: "/home/discovers/discover2.png",
      provider: "Animverse",
      endTime: "2022-03-15T00:00:00",
      price: 0.99,
    },
    {
      id: "18",
      name: "CUONG DOLLA NFT",
      image: "/home/discovers/discover3.png",
      provider: "Animverse",
      endTime: "2022-03-15T00:00:00",
      price: 0.99,
    },
    {
      id: "19",
      name: "CUONG DOLLA NFT",
      image: "/home/discovers/discover4.png",
      provider: "Animverse",
      endTime: "2022-03-15T00:00:00",
      price: 0.99,
    },
    {
      id: "20",
      name: "CUONG DOLLA NFT",
      image: "/home/discovers/discover5.png",
      provider: "Animverse",
      endTime: "2022-03-15T00:00:00",
      price: 0.99,
    },
  ]

  return (
    <div className="discover">
      <HomeSection
        heading="DISCOVER"
        defaultNumber={5}
        rows={2}
        onViewAll="/discover"
      >
        {auctions.map((auction) => (
          <AuctionItem
            key={auction.id}
            name={auction.name}
            image={auction.image}
            provider={auction.provider}
            endTime={auction.endTime}
            price={auction.price}
          />
        ))}
      </HomeSection>
    </div>
  )
}
