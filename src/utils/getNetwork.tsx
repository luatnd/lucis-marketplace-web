import { ReactNode } from "react"
import BSC from "@static/networks/bsc.svg"
import NetworkAll from "@static/networks/network-all.svg"
import BSCTestnet from "@static/networks/bsc-testnet.svg"

type TNetwork = {
  id?: number
  name?: string
  icon?: ReactNode
}

export const networks: TNetwork[] = [
  {
    id: null,
    name: "All",
    icon: <NetworkAll />,
  },
  {
    id: 1,
    name: "BSC Testnet",
    icon: <BSCTestnet />,
  },
  {
    id: 2,
    name: "BSC Mainnet",
    icon: <BSC />,
  },
]

export const getNetwork = (id: number | string) => {
  return id ? networks.find((network) => network.id === +id)??networks[0] : networks[0]
}
