import dayjs from "dayjs"
import { useEffect } from "react"
import { useCountdown } from "src/hooks/useCountdown"
import BoxsIcon from "../../../public/home/boxs.svg"
import ItemsIcon from "../../../public/home/items.svg"
import { Img } from "../Img"

interface IProps {
  name?: string
  image?: string
  isOnGoing?: boolean
  boxs?: number
  items?: number
  startTime?: string
}

export const LaunchpadItem = (props: IProps) => {
  const { name, image, isOnGoing, boxs, items, startTime } = props

  return (
    <div className="launchpad-item">
      <div className="launchpad-image">
        <Img src={image} objectFit="cover" />
      </div>
      <span className={isOnGoing ? "on-going" : "up-coming"}>
        {isOnGoing ? "Ongoing" : "Upcoming"}
      </span>
      <span className="launchpad-name">{name}</span>
      <div className="launchpad-info">
        {isOnGoing ? (
          <div className="launchpad-stats">
            <div className="stat">
              <BoxsIcon />
              <span>{boxs}</span> BOXES
            </div>
            <div className="stat">
              <ItemsIcon />
              <span>{items}</span> ITEMS
            </div>
          </div>
        ) : (
          <div className="start-in">
            <span>START IN</span>
            <span>{dayjs(startTime).format("HH:mm:ss")}</span>
          </div>
        )}
      </div>
    </div>
  )
}
