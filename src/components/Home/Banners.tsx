import Link from "next/link"
import Marquee from "react-fast-marquee"
import { getNetwork } from "src/utils/getNetwork"
import { Img } from "../Img"

export const Banners = (props) => {
  const { data } = props

  return (
    <div className="banner-wrapper">
      <div className="banners">
        <Marquee speed={25} gradientWidth={70} gradientColor={[1, 1, 62]}>
          {data?.map((item) => (
            <Link key={item.id} href={"/collection/" + item.id}>
              <div className="banner-border">
                <Img
                  src={item.cover_photo}
                  className="banner-image"
                  objectFit="cover"
                />
                <div className="network">
                  {getNetwork(item.blockchain_id).icon}
                </div>
              </div>
            </Link>
          ))}
        </Marquee>
      </div>
    </div>
  )
}
