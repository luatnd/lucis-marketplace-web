import { Button } from "@chakra-ui/react"
import BNBSymbol from "@static/icons/bnb-symbol.svg"
import Verified from "@static/icons/verified.svg"
import dayjs from "dayjs"
import { observer } from "mobx-react-lite"
import Link from "next/link"
import { useRouter } from "next/router"
import { TNftItem } from "src/@types/nft"
import { getNetwork } from "src/utils/getNetwork"
import { useStore } from "src/hooks/useStore"
import { isVideo } from "src/utils/format"
import { formatNftPrice } from "src/utils/Number"

interface IProps {
  info: TNftItem
}

export const NftItem = observer((props: IProps) => {
  const { info } = props
  const WalletController = useStore("WalletController")
  const { address } = WalletController
  const router = useRouter()

  const { icon: Network } = getNetwork(info.blockchain_id)

  return (
    <div className="nft-item">
      <div className="nft-image" onClick={() => router.push("/nft/" + info.id)}>
        {isVideo(info.photo) ? (
          <video autoPlay muted loop>
            <source src={info.photo} />
          </video>
        ) : (
          <img src={info.photo} />
        )}
      </div>
      <div className="network">{Network}</div>
      <div className="nft-body">
        <div className="provider">
          <div
            className="algin-center"
            onClick={() => router.push("/collection/" + info.id)}
          >
            <Link href={"/collection/" + info.collection_id}>
              <a>{info.contract_name}</a>
            </Link>
            {info.is_verified ? <Verified /> : null}
          </div>
          <div>
            {info.inventory_status === 2 ? (
              <img src="/icons/auction.png" alt="" />
            ) : info.inventory_status === 1 ? (
              <img src="/icons/dollar.png" alt="" />
            ) : null}
          </div>
        </div>
        <span className="name" onClick={() => router.push("/nft/" + info.id)}>
          {info.name}
        </span>
        <div className="end-in">
          {info.inventory_status === 2 ? (
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
            <BNBSymbol /> {formatNftPrice(info.price ?? null)} BNB
          </span>
          {info.owner === address ? null : info.inventory_status === 2 ? (
            <Button>AUC</Button>
          ) : info.inventory_status === 1 ? (
            <Button>BUY</Button>
          ) : null}
        </div>
      </div>
    </div>
  )
})
