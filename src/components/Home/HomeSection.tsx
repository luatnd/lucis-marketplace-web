import { Button, Icon } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { ReactNode } from "react"
import { ChevronLeft, ChevronRight } from "react-feather"
import ViewAllIcon from "../../../public/icons/view-all.svg"
import Slider from "react-slick"
interface IProps {
  heading: string
  children?: ReactNode
  onViewAll?: () => void | string
  defaultNumber?: number
  rows?: number
}

const PrevArrow = (props) => {
  const { onClick } = props
  return (
    <Button
      className="arrow-btn arrow-prev scroll-animation"
      size="lg"
      onClick={onClick}
    >
      <Icon as={ChevronLeft} />
    </Button>
  )
}

const NextArrow = (props) => {
  const { onClick } = props
  return (
    <Button
      className="arrow-btn arrow-next scroll-animation"
      size="lg"
      onClick={onClick}
    >
      <Icon as={ChevronRight} />
    </Button>
  )
}

export const HomeSection = (props: IProps) => {
  const { heading, onViewAll, children, defaultNumber, rows } = props

  const router = useRouter()

  const handleViewAll = () => {
    if (typeof onViewAll === "string") {
      router.push(onViewAll)
    } else if (typeof onViewAll === "function") {
      onViewAll()
    }
  }

  const settings = {
    className: "scroll-animation",
    infinite: false,
    speed: 500,
    slidesToShow: defaultNumber ?? 4,
    slidesToScroll: 1,
    initialSlide: 0,
    swipeToSlide: true,
    rows: rows ?? 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: defaultNumber ? defaultNumber - 1 : 3,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  }

  return (
    <div className="home-section">
      <h1 className="section-heading scroll-animation">{heading}</h1>
      <div className="section-nav">
        <span className="view-all scroll-animation" onClick={handleViewAll}>
          <ViewAllIcon />
          VIEW ALL
        </span>
      </div>
      <Slider {...settings}>{children}</Slider>
    </div>
  )
}
