interface IProps {
  name?: string
  image?: string
}

export const CollectionItem = (props: IProps) => {
  const { name, image } = props

  return (
    <div className="collection-item">
      <div className="collection-image">
        <img src={image} />
      </div>
      <span>{name}</span>
    </div>
  )
}
