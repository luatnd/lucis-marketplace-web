import {
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner,
} from "@chakra-ui/react"
import UserIcon from "@static/icons/user.svg"
import { observer } from "mobx-react"
import Link from "next/link"
import { useCallback, useEffect, useState } from "react"
import { useStore } from "src/hooks/useStore"

let connectCountdownInterval
export const UserTray = observer(() => {
  const [cancelVisible, setCancelVisible] = useState(false)
  const WalletController = useStore("WalletController")
  const { provider, web3Modal, loading, token } = WalletController

  const connect = useCallback(async () => {
    let timeLeft = 60
    clearInterval(connectCountdownInterval)
    connectCountdownInterval = setInterval(() => {
      timeLeft -= 1
      if (timeLeft <= 0) {
        clearInterval(connectCountdownInterval)
        setCancelVisible(true)
      }
    }, 1000)

    WalletController.connect().then((success) => {
      console.log(
        "{UserTray.connect} wallet" + (success ? "" : " NOT") + " connected"
      )
      if (!success) disconnect()
      clearInterval(connectCountdownInterval)
    })
  }, [])

  const disconnect = useCallback(async () => {
    await WalletController.disconnect()
    WalletController.logout()
  }, [provider])

  if (typeof window !== "undefined") {
    // @ts-ignored Mount to debug and fix bug
    window.tmp__disconnectWallet = disconnect
  }

  useEffect(() => {
    if (web3Modal?.cachedProvider) {
      connect()
    } else {
      disconnect()
    }
  }, [connect])

  useEffect(() => {
    WalletController.setListeners(disconnect)
  }, [provider, disconnect])

  return token ? (
    <div className="signed-user">
      <Menu>
        <MenuButton className="user-container">
          <img src="/common/my-nft/account.png" />
        </MenuButton>
        <MenuList>
          <Link href="/my-nft">
            <MenuItem>My NFTs</MenuItem>
          </Link>
          <Link href="/setting">
            <MenuItem>Settings</MenuItem>
          </Link>
          <MenuItem onClick={disconnect}>Logout</MenuItem>
        </MenuList>
      </Menu>
    </div>
  ) : (
    <Icon
      as={loading ? Spinner : UserIcon}
      className="user"
      onClick={connect}
    />
  )
})
