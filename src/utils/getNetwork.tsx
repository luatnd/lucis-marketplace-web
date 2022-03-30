import { ReactNode } from "react"
import BSC from "@static/networks/bsc.svg"
import NetworkAll from "@static/networks/network-all.svg"
import BSCTestnet from "@static/networks/bsc-testnet.svg"
import Polygon from "@static/networks/polygon-matic.svg"
import Ethereum from "@static/networks/ethereum-eth.svg"

type TNetwork = {
  id?: number
  name?: string
  icon?: ReactNode
  symbol?: string
}

export const networks: TNetwork[] = [
  {
    id: 0,
    name: "All",
    icon: <NetworkAll />,
    symbol: 'All'
  },
  {
    id: 1,
    name: "BSC Testnet",
    icon: <BSCTestnet />,
    symbol: 'TBNB'
  },
  {
    id: 2,
    name: "BSC Mainnet",
    icon: <BSC />,
    symbol: 'BNB'
  },
  {
    id: 3,
    name: "Polygon Testnet",
    icon: <Polygon />,
    symbol: 'TMATIC'
  },
  {
    id: 4,
    name: "Ethereum Testnet",
    icon: <Ethereum />,
    symbol: 'TETH'
  },
]

export const getNetwork = (id: number | string) => {
  return id ? networks.find((network) => network.id === +id)??networks[0] : networks[0]
}
