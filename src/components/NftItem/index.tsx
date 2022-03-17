import { Button } from "@chakra-ui/react"
import BNBSymbol from "@static/icons/bnb-symbol.svg"
import Verified from "@static/icons/verified.svg"
import dayjs from "dayjs"
import { observer } from "mobx-react-lite"
import Router, { useRouter } from "next/router"
import { useStore } from "src/hooks/useStore"
import { currency } from "src/utils/Number"

interface IProps {
  info: any
}

export const NftItem = observer((props: IProps) => {
  const { info } = props
  const WalletController = useStore("WalletController")
  const { address } = WalletController

  const router = useRouter()

  return (
    <div className="nft-item">
      <div className="nft-image" onClick={() => router.push("/nft/" + info.id)}>
        <img src={info.photo} />
      </div>
      <div className="network">
        <img src={info.network} />
      </div>
      <div className="nft-body">
        <div className="provider">
          <div
            className="algin-center"
            onClick={() => router.push("/collection/" + info.id)}
          >
            <span>{info.collection?.name}</span>
            {info.is_verified ? <Verified /> : null}
          </div>
          <div>
            {info.aucPrice ? (
              <img src="/icons/auction.png" alt="" />
            ) : (
              <img src="/icons/dollar.png" alt="" />
            )}
          </div>
        </div>
        <span className="name" onClick={() => router.push("/nft/" + info.id)}>
          {info.name}
        </span>
        <div className="end-in">
          {info.aucPrice ? (
            <div>
              <span>END IN</span> {dayjs(info.endTime).format("HH:mm:ss")}
            </div>
          ) : null}
        </div>
        <div
          className={`price ${info.hidePrice && "hidden"}`}
          onClick={() => router.push("/nft/" + info.id)}
        >
          <span>
            <BNBSymbol />{" "}
            {currency(info.topAuc ?? info.aucPrice ?? info.price ?? null)} BNB
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
