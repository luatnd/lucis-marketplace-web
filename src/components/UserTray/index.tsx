import { Button, Col, Dropdown, Menu, Row } from "antd"
import { ethers, providers } from "ethers"
import { observer } from "mobx-react-lite"
import { useCallback, useEffect, useState } from "react"
import Web3Modal from "web3modal"
import { contract } from "../../contracts"
import { supportedChainsIndexed } from "../../lib/chains"
import { providerOptions, requiredChainId } from "../../lib/wallet"
import { useStore } from "../../stores/useStore"
import { AppAlert } from "../../utils/AppAlert"
import { iOS } from "../../utils/Device"
import { currency } from "../../utils/Number"
import { getLoyaltyInfo } from "../../utils/User"

let balanceInterval
let connectCountdownInterval

const isClient = typeof window !== "undefined"

export const web3Modal = isClient
  ? new Web3Modal({
      network: "binance",
      cacheProvider: true,
      providerOptions,
    })
  : null

// MAIN ----------------------------------------------------------------------------------
export const UserTray = observer(() => {
  const AuthStore = useStore("AuthStore")
  const {
    provider,
    balance,
    address,
    loading,
    loyalty,
    isLoggedIn: userLoggedIn,
  } = AuthStore

  // We will show cancel button if the connect button is spinning to long
  const [cancelBtnVisible, setCancelBtnVisible] = useState(false)

  const connectWallet = async () => {
    AuthStore.setLoading(true)

    let provider
    try {
      /*
      NOTE:
      Cannot catch the error if chain_id=97 in non-"metamask installed" browser
      Please install metamask for development purpose
       */
      provider = await web3Modal?.connect()
    } catch (err) {
      // Wallet connect QR modal error might be here:
      console.log("{connectWallet} e: ", err)
      AuthStore.setLoading(false)

      if ("" + err === "Modal closed by user") {
        console.log("{connectWallet} disconnect on user close the web3 modal: ")
        disconnect()
      }

      if (err === undefined) {
        console.log(
          "{connectWallet} disconnect on user close the wallet connect modal: "
        )
        disconnect()
      }

      return false
    }

    const web3Provider = new providers.Web3Provider(provider, "any")
    AuthStore.setProvider(provider)
    AuthStore.setWeb3Provider(web3Provider)

    const rightTargetChain = await AuthStore.isRightTargetChain(
      requiredChainId,
      provider
    )
    if (!rightTargetChain) {
      const network = supportedChainsIndexed[requiredChainId]
      const walletMeta = AuthStore.getWalletMeta(provider)
      const walletName = walletMeta?.name
      AppAlert.error({
        title: "Blockchain Network required",
        content: `Animverse support ${network.name} network only
        Please open ${walletName ?? "your wallet"} and 
        check if Animverse is using ${
          network.name
        } network then press OK to reload`,
        onOk: async () => {
          await disconnect()
          window && window.location.reload()
          return true
        },
      })

      AuthStore.setLoading(false)
      return false
    }

    const signer = web3Provider.getSigner()
    const address = await signer.getAddress()
    const network = await web3Provider.getNetwork()
    await contract.bridgeContract(web3Provider)
    const balance = await contract.getAnimTokenBalanceOf(address)

    const loggedin = await AuthStore.login(address, network)
    if (loggedin) {
      // Do not set setProvider & web3Provider here
      // because if logged in operation failed => You need to refer it to reset connection state
      AuthStore.setChainId(network.chainId)
      AuthStore.setBalance(parseFloat(ethers.utils.formatEther(balance)))
    } else disconnectWallet()
    AuthStore.setLoading(false)

    return true
  }

  const disconnectWallet = async () => {
    console.log("{disconnectWallet} provider: ", provider)

    console.log(
      "{disconnectWallet} clear cachedProvider: ",
      web3Modal.cachedProvider
    )
    await web3Modal.clearCachedProvider()

    if (provider?.disconnect && typeof provider.disconnect === "function") {
      await provider.disconnect()
    } else {
      console.warn("{disconnectWallet} cannot trigger disconnect: ")
    }
    AuthStore.logout()
    AuthStore.resetStates()
    setCancelBtnVisible(false)
  }

  const connect = useCallback(async () => {
    console.log("{connect} : ")

    // User can click cancel to stop connect the wallet
    // This behavior handle the case: User terminate the connection on mobile app
    // so the dApp cannot personal_sign anymore, causing forever loading
    let timeLeft = 60
    // let timeLeft = 15 // to debug
    clearInterval(connectCountdownInterval)
    connectCountdownInterval = setInterval(() => {
      timeLeft -= 1
      if (timeLeft <= 0) {
        clearInterval(connectCountdownInterval)
        setCancelBtnVisible(true)
      }
    }, 1000)

    connectWallet().then((success) => {
      console.log(
        "{UserTray.connect} wallet " + (success ? "" : "NOT") + " connected"
      )
      clearInterval(connectCountdownInterval)
    })
  }, [])

  const disconnect = useCallback(async () => {
    await disconnectWallet()
    AuthStore.logout()
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

    // TODO: Show "Please install MetaMask extension" dialog to a user guide dialog on PC or mobile
    // if (!web3Modal) {
    // AppAlert.confirm({
    //   title: 'Warning',
    //   content: (
    //     <div>
    //       <span>
    //         Please install MetaMask extension on your browser to connect to
    //         the market
    //       </span>
    //     </div>
    //   ),
    //   okText: 'Install',
    //   cancelText: 'Cancel',
    //   onOk: () => window.open('https://metamask.io/', '_blank'),
    // })
    // }
  }, [connect])

  useEffect(() => {
    if (provider?.on) {
      const handleChainChanged = (_hexChainId: string) => {
        window.location.reload()
      }
      const handleAccountsChanged = async (accounts: string[]) => {
        // const currentAccount = accounts[0]
        // console.log('{handleAccountsChanged} account: ', currentAccount)

        // AuthStore.setAddress(currentAccount)
        // AuthStore.fetchBalance()

        // const web3Provider = new providers.Web3Provider(provider, 'any')
        // const network = await web3Provider.getNetwork()
        // await AuthStore.login(currentAccount, network)
        disconnect()
        AppAlert.confirm({
          title: "Re-connect wallet ?",
          okText: "CONNECT",
          onOk: connect,
        })
      }
      const handleDisconnect = (error: { code: number; message: string }) => {
        console.log("{handleDisconnect} error: ", error)
        disconnect()
      }

      provider.on("accountsChanged", handleAccountsChanged)
      provider.on("chainChanged", handleChainChanged)
      provider.on("disconnect", handleDisconnect)
      return () => {
        if (provider.removeListener) {
          provider.removeListener("accountsChanged", handleAccountsChanged)
          provider.removeListener("chainChanged", handleChainChanged)
          provider.removeListener("disconnect", handleDisconnect)
        }
      }
    }
  }, [provider, disconnect])

  useEffect(() => {
    balanceInterval = setInterval(() => {
      if (userLoggedIn) AuthStore.fetchBalance()
    }, 3000)
  }, [])

  /**
   * Hack to prevent iOS redirect to: https://link.trustwallet.com/wc
   * when sending/signing request
   */
  useEffect(() => {
    const isIos = iOS()
    if (isIos) {
      const onVisiChange = function () {
        if (document.visibilityState === "hidden") {
          window.localStorage.removeItem("WALLETCONNECT_DEEPLINK_CHOICE")
        }
      }
      document.addEventListener("visibilitychange", onVisiChange)

      return () => {
        document.removeEventListener("visibilitychange", onVisiChange)
      }
    }
  }, [])

  const _renderTray = () => (
    <Dropdown
      trigger={["click", "hover"]}
      overlay={
        <Menu>
          <Menu.Item onClick={disconnect}>Disconnect</Menu.Item>
        </Menu>
      }
      placement="bottomCenter"
    >
      <Row
        gutter={12}
        className="user-panel"
        justify="space-between"
        align="middle"
      >
        <Col className="user-balance">{`${currency(balance)} ANM`}</Col>
        <Col className="user-loyalty">
          <img src={getLoyaltyInfo(loyalty.level).image} />
        </Col>
        <Col className="user-address">
          <span>{address?.slice(0, 4) + "..." + address?.slice(-4)}</span>
        </Col>
      </Row>
    </Dropdown>
  )

  const _renderConnectButton = () => (
    <Button id="wallet-connect" type="text" onClick={connect} loading={loading}>
      {cancelBtnVisible ? (
        <span onClick={disconnect} className="cancel-btn">
          Cancel
        </span>
      ) : null}
      CONNECT
    </Button>
  )

  return (
    <div className="user-tray">
      {userLoggedIn ? _renderTray() : _renderConnectButton()}
    </div>
  )
})
