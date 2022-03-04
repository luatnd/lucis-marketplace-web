import { Button, Icon } from "@chakra-ui/react"
import { ChevronLeft, ChevronRight } from "react-feather"
import Slider from "react-slick"
import Marquee from "react-fast-marquee"
import Link from "next/link"

export const Banners = () => {
  const items = [
    {
      key: "1",
      image: "/home/banners/banner1.png",
    },
    {
      key: "2",
      image: "/home/banners/banner2.png",
    },
    {
      key: "3",
      image: "/home/banners/banner3.png",
    },
    {
      key: "4",
      image: "/home/banners/banner4.png",
    },
  ]

  return (
    <div className="banners">
      <Marquee speed={100} gradient={false}>
        {items.map((item, index) => (
          <Link key={item.key} href={"/nft/" + item.key}>
            <div
              className={`banner-border ${
                index % 2 !== 0 ? "even-banner" : ""
              }`}
            >
              <div key={item.key} className="banner">
                <img src={item.image} className="banner-image" />
              </div>
            </div>
          </Link>
        ))}
      </Marquee>
    </div>
  )
}
