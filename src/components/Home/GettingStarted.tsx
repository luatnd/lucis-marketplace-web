import { title } from "process"
import { HomeSection } from "./HomeSection"

export const GettingStarted = () => {
  const items = [
    {
      id: "1",
      title: `Seamlessly Migrating Guide, from SCV to tofuNFT`,
      image: "/home/getting-started/getting-started1.png",
    },
    {
      id: "2",
      title: `Seamlessly Migrating Guide, from SCV to tofuNFT`,
      image: "/home/getting-started/getting-started2.png",
    },
    {
      id: "3",
      title: `Seamlessly Migrating Guide, from SCV to tofuNFT`,
      image: "/home/getting-started/getting-started3.png",
    },
    {
      id: "4",
      title: `Seamlessly Migrating Guide, from SCV to tofuNFT`,
      image: "/home/getting-started/getting-started4.png",
    },
    {
      id: "5",
      title: `Seamlessly Migrating Guide, from SCV to tofuNFT`,
      image: "/home/getting-started/getting-started1.png",
    },
    {
      id: "6",
      title: `Seamlessly Migrating Guide, from SCV to tofuNFT`,
      image: "/home/getting-started/getting-started2.png",
    },
    {
      id: "7",
      title: `Seamlessly Migrating Guide, from SCV to tofuNFT`,
      image: "/home/getting-started/getting-started3.png",
    },
    {
      id: "8",
      title: `Seamlessly Migrating Guide, from SCV to tofuNFT`,
      image: "/home/getting-started/getting-started4.png",
    },
  ]

  return (
    <div className="getting-started">
      <HomeSection heading="GETTING STARTED">
        {items.map((item) => (
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
