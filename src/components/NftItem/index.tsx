import { Button } from "@chakra-ui/react"
import BNBSymbol from "@static/icons/bnb-symbol.svg"
import Verified from "@static/icons/verified.svg"
import { observer } from "mobx-react-lite"
import moment from "moment"
import Router from "next/router"
import { useStore } from "src/hooks/useStore"
import { currency } from "src/utils/Number"

interface IProps {
  info: any
}

export const NftItem = observer((props: IProps) => {
  const WalletController = useStore("WalletController")
  const { address } = WalletController

  const { info } = props

  const handleRedirect = () => {
    Router.push("/nft/" + info.id)
  }

  return (
    <div className="nft-item" onClick={handleRedirect}>
      <div className="nft-image">
        <img src={info.image} />
      </div>
      <div className="nft-body">
        <div className="provider">
          <div className="algin-center">
            <span>{info.collection?.name}</span>
            <Verified />
          </div>
          <div>
            {info.aucPrice ? (
              <img src="/icons/auction.png" alt="" />
            ) : (
              <img src="/icons/dollar.png" alt="" />
            )}
          </div>
        </div>
        <span className="name">{info.name}</span>
        <div className="end-in">
          {info.aucPrice ? (
            <div>
              <span>END IN</span> {moment(info.endTime).format("HH:mm:ss")}
            </div>
          ) : null}
        </div>
        <div className={`price ${info.hidePrice && "hidden"}`}>
          <span>
            <BNBSymbol /> {currency(info.aucPrice ?? info.price ?? null)} BNB
          </span>
          {info.owner === address ? null : info.aucPrice ? (
            <Button>AUC</Button>
          ) : info.price ? (
            <Button>BUY</Button>
          ) : null}
        </div>
      </div>
    </div>
  )
})
