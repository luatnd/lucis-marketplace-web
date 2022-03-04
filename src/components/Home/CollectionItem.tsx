import Link from "next/link"

interface IProps {
  name?: string
  image?: string
}

export const CollectionItem = (props: IProps) => {
  const { name, image } = props

  return (
    <Link href={"collection/1"}>
      <div className="collection-item">
        <div className="collection-image">
          <div className="image-content">
            <img src={image} />
          </div>
        </div>
        <span>{name}</span>
      </div>
    </Link>
  )
}
