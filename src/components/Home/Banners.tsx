import { Button, Icon } from "@chakra-ui/react"
import { ChevronLeft, ChevronRight } from "react-feather"
import Slider from "react-slick"

const PrevArrow = (props) => {
  const { onClick } = props
  return (
    <Button className="arrow-button arrow-prev">
      <Icon as={ChevronLeft} onClick={onClick} />
    </Button>
  )
}
const NextArrow = (props) => {
  const { onClick } = props
  return (
    <Button className="arrow-button arrow-next">
      <Icon as={ChevronRight} onClick={onClick} />
    </Button>
  )
}

export const Banners = () => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    swipeToSlide: true,
    autoplay: true,
    autoplaySpeed: 1000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 855,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  }

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
      image: "/home/banners/banner4.png",
    },
  ]

  return (
    <div className="banners">
      <Slider {...settings}>
        {items.map((item) => (
          <div key={item.key} className="banner">
            <img src={item.image} className="banner-image" />
          </div>
        ))}
      </Slider>
    </div>
  )
}
