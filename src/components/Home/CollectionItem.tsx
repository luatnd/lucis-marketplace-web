import Link from "next/link"

interface IProps {
  info?: any
}

export const CollectionItem = (props: IProps) => {
  const { info } = props

  return (
    <Link href={"/collection/" + info.id}>
      <div className="collection-item">
        <div className="collection-image">
          <div className="image-content">
            <img src={info.photo} />
          </div>
        </div>
        <span>{info.name}</span>
        <div className="network">
          <img src={info.network} />
        </div>
      </div>
    </Link>
  )
}
