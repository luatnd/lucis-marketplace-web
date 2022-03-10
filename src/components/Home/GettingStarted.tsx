import axios from "axios"
import { useEffect, useState } from "react"
import { HomeSection } from "./HomeSection"

export const GettingStarted = () => {
  const [data, setData] = useState<any[]>()

  const fetchData = async () => {
    const { data } = await axios.get(
      process.env.NEXT_PUBLIC_API_TEST + "/gettingStarted"
    )
    setData(data)
  }

  useEffect(() => {
    fetchData()
  }, [])

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
