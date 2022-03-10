import axios from "axios"
import { useEffect, useState } from "react"
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
          <NftItem
            id={auction.id}
            key={auction.id}
            name={auction.name}
            image={auction.image}
            collection={auction.collection}
            endTime={auction.endTime}
            price={auction.price}
            isAuction={auction.isAuction}
          />
        ))}
      </HomeSection>
    </div>
  )
}
