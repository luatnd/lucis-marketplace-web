import { HomeSection } from "./HomeSection"
import { LaunchpadItem } from "./LaunchpadItem"

export const Launchpad = () => {
  const launchpads = [
    {
      id: "1",
      name: "Fadogo",
      image: "/home/launchpads/launchpad1.png",
      isOnGoing: true,
      boxs: 1500,
      items: 1500,
      startTime: "2022-03-15T00:00:00",
    },
    {
      id: "2",
      name: "Elemon",
      image: "/home/launchpads/launchpad2.png",
      isOnGoing: false,
      boxs: 1500,
      items: 1500,
      startTime: "2022-03-15T00:00:00",
    },
    {
      id: "3",
      name: "CryptoSpells",
      image: "/home/launchpads/launchpad3.png",
      isOnGoing: true,
      boxs: 1500,
      items: 1500,
      startTime: "2022-03-15T00:00:00",
    },
    {
      id: "4",
      name: "Fadogo2",
      image: "/home/launchpads/launchpad4.png",
      isOnGoing: true,
      boxs: 1500,
      items: 1500,
      startTime: "2022-03-15T00:00:00",
    },
    {
      id: "5",
      name: "Fadogo2",
      image: "/home/launchpads/launchpad4.png",
      isOnGoing: true,
      boxs: 1500,
      items: 1500,
      startTime: "2022-03-15T00:00:00",
    },
  ]

  return (
    <div className="launchpad">
      <HomeSection heading="LAUNCHPAD">
        {launchpads.map((launchpad) => (
          <LaunchpadItem
            key={launchpad.id}
            name={launchpad.name}
            image={launchpad.image}
            isOnGoing={launchpad.isOnGoing}
            boxs={launchpad.boxs}
            items={launchpad.items}
            startTime={launchpad.startTime}
          />
        ))}
      </HomeSection>
    </div>
  )
}
