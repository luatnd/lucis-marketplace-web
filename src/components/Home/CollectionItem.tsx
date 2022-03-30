import Router from "next/router"
import { getNetwork } from "src/utils/getNetwork"
import { Img } from "../Img"

interface IProps {
  info?: any
  key?: any
}

export const CollectionItem = (props: IProps) => {
  const { info, key } = props

  const handleClick = () => {
    Router.push("/collection/" + info.id)
  }

  return (
    <div className="collection-item" onClick={() => handleClick()}>
      <div className="collection-image">
        <Img src={info.photo} />
      </div>
      <span>{info.name}</span>
      {info.id}
      <div className="network">{getNetwork(info.blockchain_id)?.icon}</div>
    </div>
  )
}
