import axios from "axios"
import Link from "next/link"
import { useEffect, useState } from "react"
import Marquee from "react-fast-marquee"

type TBanner = {
  id?: string
  banner?: string
}

export const Banners = () => {
  const [banners, setBanners] = useState<TBanner[]>()

  const fetchBanner = async () => {
    const { data: banners } = await axios.get(
      process.env.NEXT_PUBLIC_API_TEST + "/collections"
    )
    setBanners(banners)
  }

  useEffect(() => {
    fetchBanner()
  }, [])

  return (
    <div className="banner-wrapper">
      <div className="banners">
        <Marquee
          speed={25}
          gradientWidth={70}
          gradientColor={[1, 1, 62]}
          pauseOnHover={true}
        >
          {banners?.map((item) => (
            <Link key={item.id} href={"/collection/" + item.id}>
              <div className="banner-border">
                <div key={item.id} className="banner">
                  <img src={item.banner} className="banner-image" />
                </div>
              </div>
            </Link>
          ))}
        </Marquee>
      </div>
    </div>
  )
}
