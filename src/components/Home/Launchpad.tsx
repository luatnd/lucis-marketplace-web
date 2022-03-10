import axios from "axios"
import { useEffect, useState } from "react"
import { HomeSection } from "./HomeSection"
import { LaunchpadItem } from "./LaunchpadItem"

type TLauchPad = {
  id: number
  name: string
  image: string
  isOnGoing: boolean
  boxs: number
  items: number
  startTime: string
}

export const Launchpad = () => {
  const [launchpads, setLaunchpads] = useState<TLauchPad[]>()

  const fetchLaunchpads = async () => {
    const res = await axios.get(
      process.env.NEXT_PUBLIC_API_TEST + "/launchpads"
    )
    setLaunchpads(res.data)
  }

  useEffect(() => {
    fetchLaunchpads()
  }, [])

  return (
    <div className="launchpad">
      <HomeSection heading="LAUNCHPAD">
        {launchpads?.map((launchpad) => (
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
