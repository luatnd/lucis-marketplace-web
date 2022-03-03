import Verified from "@static/icons/verified.svg"
import BNBSymbol from "@static/icons/bnb-symbol.svg"
import { Button } from "@chakra-ui/react"
import moment from "moment"

interface IProps {
  name?: string
  image?: string
  provider?: string
  endTime?: string
  price?: number
}

export const AuctionItem = (props: IProps) => {
  const { name, image, provider, endTime, price } = props

  return (
    <div className="auction-item">
      <div className="auction-image">
        <img src={image} />
      </div>
      <div className="auction-body">
        <div className="provider">
          <span>{provider}</span>
          <Verified />
        </div>
        <span className="name">{name}</span>
        <div className="end-in">
          <span>END IN</span> {moment(endTime).format("HH:mm:ss")}
        </div>

        <div className="price">
          <span>
            <BNBSymbol /> {price}
          </span>
          <Button size="sm">AUC</Button>
        </div>
      </div>
    </div>
  )
}
