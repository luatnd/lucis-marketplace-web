import { HomeSection } from "./HomeSection"

export const GettingStarted = (props) => {
  const { data } = props

  return (
    <div className="getting-started">
      <HomeSection heading="GETTING STARTED">
        {data?.map((item) => (
          <div key={item.id} className="getting-started-item">
            <div className="item-image">
              <img src={item.image} />
            </div>
            <h1 className="item-title">{item.title}</h1>
          </div>
        ))}
      </HomeSection>
    </div>
  )
}
