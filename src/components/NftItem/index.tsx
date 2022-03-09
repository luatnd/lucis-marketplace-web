import { Button } from "@chakra-ui/react"
import BNBSymbol from "@static/icons/bnb-symbol.svg"
import Verified from "@static/icons/verified.svg"
import moment from "moment"
import Router from "next/router"
import { useCountdown } from "src/hooks/useCountdown"
import { useStore } from "src/hooks/useStore"

interface IProps {
  name?: string
  image?: string
  provider?: string
  endTime?: string
  price?: number
  auction?: boolean
  activeBtn?: boolean
  hidePrice?: boolean
  owner?: boolean
}

export const NftItem = (props: IProps) => {
  const {
    name,
    image,
    provider,
    endTime,
    price,
    auction,
    activeBtn,
    hidePrice,
    owner,
  } = props

  const { days, hours, seconds, minutes } = useCountdown("2022-03-20T00:00:00")

  const NftStore = useStore("NftStore")

  const _renderAction = () => {
    if (!activeBtn) {
      if (auction != undefined && auction) {
        return <Button size="sm">AUC</Button>
      } else {
        return <Button size="sm">BUY</Button>
      }
      return <Button size="sm">BUY</Button>
    }
  }

  const handleRedirect = () => {
    Router.push("/nft/1")
    NftStore.setNft({
      name,
      image,
      provider,
      endTime,
      price,
      auction,
      activeBtn,
      hidePrice,
      owner,
    })
  }

  return (
    <div className="nft-item" onClick={handleRedirect}>
      <div className="nft-image">
        <img src={image} />
      </div>
      <div className="nft-body">
        <div className="provider">
          <div className="algin-center">
            <span>{provider}</span>
            <Verified />
          </div>
          <div>
            {auction != undefined && auction ? (
              <img src="/icons/auction.png" alt="" />
            ) : (
              <img src="/icons/dollar.png" alt="" />
            )}
          </div>
        </div>
        <span className="name">{name}</span>
        <div className="end-in">
          {auction ? (
            <div>
              <span>END IN</span> {moment(endTime).format("HH:mm:ss")}
            </div>
          ) : null}
        </div>
        <div className={`price ${hidePrice && "hidden"}`}>
          <span>
            <BNBSymbol /> {price} BNB
          </span>
          {_renderAction()}
        </div>
      </div>
    </div>
  )
}
