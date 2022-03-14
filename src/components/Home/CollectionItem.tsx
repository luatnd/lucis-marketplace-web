import Link from "next/link"

interface IProps {
  id?: number
  name?: string
  image?: string
  network?: string
}

export const CollectionItem = (props: IProps) => {
  const { name, image, id, network } = props

  return (
    <Link href={"/collection/" + id}>
      <div className="collection-item">
        <div className="collection-image">
          <div className="image-content">
            <img src={image} />
          </div>
        </div>
        <span>{name}</span>
        <div className="network">
          <img src={network} />
        </div>
      </div>
    </Link>
  )
}
