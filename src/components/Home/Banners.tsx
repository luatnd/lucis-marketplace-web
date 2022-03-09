import Link from "next/link"
import Marquee from "react-fast-marquee"

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
    {
      key: "5",
      image: "/home/banners/banner5.png",
    },
    {
      key: "6",
      image: "/home/banners/banner6.png",
    },
    {
      key: "7",
      image: "/home/banners/banner7.png",
    },
  ]

  return (
    <div className="banner-wrapper">
      <div className="banners">
        <Marquee
          speed={25}
          gradientWidth={70}
          gradientColor={[1, 1, 62]}
          pauseOnHover={true}
        >
          {items.map((item) => (
            <Link key={item.key} href={"/collection/" + item.key}>
              <div className="banner-border">
                <div key={item.key} className="banner">
                  <img src={item.image} className="banner-image" />
                </div>
              </div>
            </Link>
          ))}
        </Marquee>
      </div>
    </div>
  )
}
