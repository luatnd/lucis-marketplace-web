interface IProps {
  name?: string
  image?: string
}

export const CollectionItem = (props: IProps) => {
  const { name, image } = props

  return (
    <div className="collection-item">
      <img src={image} />
      <span>{name}</span>
    </div>
  )
}
