import { AuctionItem } from "./AuctionItem"
import { HomeSection } from "./HomeSection"

export const HotAuctions = () => {
  const auctions = [
    {
      id: "1",
      name: "CUONG DOLLA NFT",
      image: "/home/auctions/auction1.png",
      provider: "Animverse",
      endTime: "2022-03-15T00:00:00",
      price: 0.99,
    },
    {
      id: "2",
      name: "CUONG DOLLA NFT",
      image: "/home/auctions/auction2.png",
      provider: "Animverse",
      endTime: "2022-03-15T00:00:00",
      price: 0.99,
    },
    {
      id: "3",
      name: "CUONG DOLLA NFT",
      image: "/home/auctions/auction3.png",
      provider: "Animverse",
      endTime: "2022-03-15T00:00:00",
      price: 0.99,
    },
    {
      id: "4",
      name: "CUONG DOLLA NFT",
      image: "/home/auctions/auction4.png",
      provider: "Animverse",
      endTime: "2022-03-15T00:00:00",
      price: 0.99,
    },
    {
      id: "5",
      name: "CUONG DOLLA NFT",
      image: "/home/auctions/auction5.png",
      provider: "Animverse",
      endTime: "2022-03-15T00:00:00",
      price: 0.99,
    },
    {
      id: "6",
      name: "CUONG DOLLA NFT",
      image: "/home/auctions/auction1.png",
      provider: "Animverse",
      endTime: "2022-03-15T00:00:00",
      price: 0.99,
    },
    {
      id: "7",
      name: "CUONG DOLLA NFT",
      image: "/home/auctions/auction2.png",
      provider: "Animverse",
      endTime: "2022-03-15T00:00:00",
      price: 0.99,
    },
    {
      id: "8",
      name: "CUONG DOLLA NFT",
      image: "/home/auctions/auction3.png",
      provider: "Animverse",
      endTime: "2022-03-15T00:00:00",
      price: 0.99,
    },
    {
      id: "9",
      name: "CUONG DOLLA NFT",
      image: "/home/auctions/auction4.png",
      provider: "Animverse",
      endTime: "2022-03-15T00:00:00",
      price: 0.99,
    },
    {
      id: "10",
      name: "CUONG DOLLA NFT",
      image: "/home/auctions/auction5.png",
      provider: "Animverse",
      endTime: "2022-03-15T00:00:00",
      price: 0.99,
    },
  ]

  return (
    <div className="hot-auctions">
      <HomeSection
        heading="HOT AUCTIONS"
        defaultNumber={5}
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
