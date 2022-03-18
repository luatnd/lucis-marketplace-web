import Link from "next/link"
import { Img } from "../Img"

interface IProps {
  info?: any
}

export const CollectionItem = (props: IProps) => {
  const { info } = props

  return (
    <Link href={"/collection/" + info.id}>
      <div className="collection-item">
        <div className="collection-image">
          <Img src={info.photo} />
        </div>
        <span>{info.name}</span>
        <div className="network">
          <img src={info.network} />
        </div>
      </div>
    </Link>
  )
}
