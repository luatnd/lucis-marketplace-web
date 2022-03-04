import Verified from "@static/icons/verified.svg"
import BNBSymbol from "@static/icons/bnb-symbol.svg"
import { Button } from "@chakra-ui/react"
import moment from "moment"
import { useCountdown } from "src/hooks/useCountdown"

interface IProps {
  name?: string
  image?: string
  provider?: string
  endTime?: string
  price?: number,
  auction?: boolean,
  activeBtn?: boolean
}

export const AuctionItem = (props: IProps) => {
  const { name, image, provider, endTime, price, auction, activeBtn } = props

  const { days, hours, seconds, minutes } = useCountdown("2022-03-20T00:00:00")
  console.log(days, hours, minutes, seconds)

  return (
    <div className="auction-item">
      <div className="auction-image">
        <img src={image} />
      </div>
      <div className="auction-body">
        <div className="provider">
          <div className="algin-center">
            <span>{provider}</span>
            <Verified />
          </div>
          <div>
            {
              auction != undefined && auction ? (
                <img src="/icons/auction.png" alt="" />
              ) : (
                <img src="/icons/dollar.png" alt="" />
              )
            }
          </div>
        </div>
        <span className="name">{name}</span>
        <div className="end-in">
          <span>END IN</span> {moment(endTime).format("HH:mm:ss")}
        </div>

        <div className="price">
          <span>
            <BNBSymbol /> {price}
          </span>
          {
            (!activeBtn) && (
              <Button size="sm">AUC</Button>
            )
          }
        </div>
      </div>
    </div>
  )
}
