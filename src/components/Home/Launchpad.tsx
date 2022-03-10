import { HomeSection } from "./HomeSection"
import { LaunchpadItem } from "./LaunchpadItem"

export const Launchpad = (props) => {
  const { data } = props

  return (
    <div className="launchpad">
      <HomeSection heading="LAUNCHPAD">
        {data?.map((launchpad) => (
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
