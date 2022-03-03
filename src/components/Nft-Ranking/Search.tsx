import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react"
import { useState } from "react"

const Search = () => {
  const [coin, setCoin] = useState({ url: "bnb.png", name: "BNB chain" })
  const [time, setTime] = useState("7 days")
  const coinArray = [
    { url: "bnb.png", name: "BNB chain" },
    { url: "walletConnect.png", name: "WalletConnect" },
    { url: "ethereum.png", name: "Ethereum" },
    { url: "celo.png", name: "Celo" },
    { url: "aurora.png", name: "Aurora" },
    { url: "arbitrum.png", name: "Arbitrum" },
    { url: "fantom.png", name: "Fantom" },
  ]
  const timeArray = ["7 days", "30 days"]
  return (
    <div className="nft-search">
      <div className="search-item">
        <Menu>
          <MenuButton>
            <div className="left">
              <img className="logo" src={"/common/" + coin.url} alt="" />
              <span>{coin.name}</span>
            </div>
            <img className="right" src="/common/arrow-down.png" alt="" />
          </MenuButton>
          <MenuList>
            <img className="top-right" src="/common/menu-corner.png" alt="" />
            {coinArray.map((c) =>
              c.name != coin.name ? (
                <MenuItem
                  key={c.name}
                  onClick={() => {
                    setCoin(c)
                  }}
                >
                  <img className="logo" src={"/common/" + c.url} alt="" />
                  <span>{c.name}</span>
                </MenuItem>
              ) : null
            )}
          </MenuList>
        </Menu>
      </div>
      <div className="search-item">
        <Menu>
          <MenuButton>
            <div className="left">
              <span>{time}</span>
            </div>
            <img className="right" src="/common/arrow-down.png" alt="" />
          </MenuButton>
          <MenuList>
            <img className="top-right" src="/common/menu-corner.png" alt="" />
            {timeArray.map((t) =>
              t != time ? (
                <MenuItem onClick={() => setTime(t)} key={t}>
                  <span>{t}</span>
                </MenuItem>
              ) : null
            )}
          </MenuList>
        </Menu>
      </div>
    </div>
  )
}
export { Search }
