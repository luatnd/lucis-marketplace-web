import Link from "next/link"
import Marquee from "react-fast-marquee"

export const Banners = (props) => {
  const { data } = props

  return (
    <div className="banner-wrapper">
      <div className="banners">
        <Marquee
          speed={25}
          gradientWidth={70}
          gradientColor={[1, 1, 62]}
          pauseOnHover={true}
        >
          {data?.map((item) => (
            <Link key={item.id} href={"/collection/" + item.id}>
              <div className="banner-border">
                <div key={item.id} className="banner">
                  <img src={item.banner} className="banner-image" />
                </div>
                <div className="network">
                  <img src={item.network} />
                </div>
              </div>
            </Link>
          ))}
        </Marquee>
      </div>
    </div>
  )
}
