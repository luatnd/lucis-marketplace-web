import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Icon,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
} from "@chakra-ui/react"
import BellIcon from "@static/icons/noti.svg"
import { observer } from "mobx-react-lite"
import Link from "next/link"
import { useEffect, useState } from "react"
import * as Icons from "react-feather"
import { useStore } from "src/hooks/useStore"
import { UserTray } from "../UserTray"
import { SearchBar } from "./SearchBar"
<<<<<<< HEAD
import { getBlockchain } from "src/services/nft"
=======
import { SearchBarMobile } from "./SearchBarMobile"
>>>>>>> 94de0449eecd1968eeddc0f3f5ad545106c6c3a8

export const AppLayout = observer(({ children }) => {
  const WalletController = useStore("WalletController")
  const { isReady, address } = WalletController
  const BlockchainStore = useStore("BlockchainStore")
  const { blockchain_id, blockchain_Array } = BlockchainStore

  const [canScroll, setCanScroll] = useState(false)

  const getBlockchainData = async () => {
    const res = await getBlockchain()
    BlockchainStore.setBlockchain_Array([
      {
        label: (
          <div className="network">
            <img src="/common/all-network.png" alt="" />
            All network
          </div>
        ),
        value: 0,
        name: "All network",
        symbol: "",
        url: "/common/all-network.png",
      },
      ...res.map((el) => {
        return {
          label: (
            <div className="network">
              <img src={el.rpc_url} alt="" />
              {el.name}
            </div>
          ),
          value: el.id,
          symbol: el.symbol,
          url: el.rpc_url,
          name: el.name,
        }
      }),
    ])
  }
  useEffect(() => {
    getBlockchainData()
    window.onscroll = () => {
      setCanScroll(window.pageYOffset > 100)
    }
  }, [])

  const navItems = [
    {
      name: "Marketplace",
      key: "marketplace",
      children: [
        {
          name: "Home",
          isNav: true,
          key: "/",
        },
        {
          name: "Discover",
          isNav: true,
          key: "/discover",
        },
        {
          name: "Activities",
          isNav: true,
          key: "/activities",
        },
        {
          name: "NFT Ranking",
          isNav: true,
          key: "/nft-ranking",
        },
      ],
    },
    {
      name: "Apply",
      key: "apply",
      children: [
        {
          name: "Apply for NFT Verification",
          isNav: false,
          key: "https://forms.gle/s7sD5tCVwdtqR51W6",
        },
        {
          name: "Apply for Launchpad",
          isNav: true,
          key: "/",
        },
      ],
    },
    {
      name: "Resources",
      key: "resources",
      children: [
        {
          name: "Documents",
          isNav: true,
          key: "/documents",
        },
        // {
        //   name: "Trader's Guide",
        //   key: "/trader-guide",
        // },
        // {
        //   name: "Feature",
        //   key: "/feature",
        // },
        // {
        //   name: "FAQ",
        //   key: "Press Kit",
        // },
        // {
        //   name: "NFT Validator",
        //   key: "nft-validator",
        // },
      ],
    },
  ]

  const footerSocials = [
    {
      key: "1",
      image: "/common/footer/nav1.png",
      href: "https://www.tiktok.com/@lucistvv",
    },
    {
      key: "2",
      image: "/common/footer/nav2.png",
      href: "https://www.facebook.com/lucistv.news",
    },
    {
      key: "3",
      image: "/common/footer/nav3.png",
      href: "https://www.youtube.com/c/LucisTVGaming",
    },
    {
      key: "4",
      image: "/common/footer/nav4.png",
      href: null,
    },
    {
      key: "5",
      image: "/common/footer/nav5.png",
      href: "https://twitter.com/Lucis_TV",
    },
    {
      key: "6",
      image: "/common/footer/nav6.png",
      href: "https://discord.com/channels/911921072830574603/926398655093702666",
    },
  ]

  const footerNavs = [
    {
      key: "1",
      name: "Term of service",
      href: null,
    },
    {
      key: "2",
      name: "Privacy",
      href: "/",
    },
    {
      key: "3",
      name: "Copyright",
      href: "/",
    },
    {
      key: "4",
      name: "Help center",
      href: "/",
    },
    {
      key: "5",
      name: "Blog",
      href: "/",
    },
  ]

  const [mobileMenuVisible, setMobileMenuVisible] = useState(false)

  const _renderMobileMenu = () => (
    <Drawer
      isOpen={mobileMenuVisible}
      onClose={() => setMobileMenuVisible(false)}
    >
      <DrawerOverlay />
      <DrawerContent className="mobile-menu">
        <DrawerHeader className="mobile-menu-header">
          <Link href="/">
            <img
              src="/favicon.svg"
              className="logo"
              onClick={() => setMobileMenuVisible(false)}
            />
          </Link>
        </DrawerHeader>
        <DrawerCloseButton />
        <DrawerBody className="mobile-menu-body">
          <SearchBarMobile />
          {navItems.map((nav) => (
            <Stack key={nav.key} className="mobile-menu-stack">
              <Button
                variant="ghost"
                rightIcon={<Icon as={Icons.ChevronDown} />}
                className="mobile-menu-nav"
              >
                {nav.name}
              </Button>
              {nav.children.map((child) =>
                child.isNav ? (
                  <Link key={child.key} href={child.key}>
                    <Button
                      variant="ghost"
                      className="mobile-menu-nav-item"
                      onClick={() => setMobileMenuVisible(false)}
                    >
                      {child.name}
                    </Button>
                  </Link>
                ) : (
                  <a
                    key={child.key}
                    href={child.key}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Button
                      variant="ghost"
                      className="mobile-menu-nav-item"
                      onClick={() => setMobileMenuVisible(false)}
                    >
                      {child.name}
                    </Button>
                  </a>
                )
              )}
            </Stack>
          ))}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )

  const _renderHeader = () => (
    <div className="header">
      <div className="header-container">
        <div className="nav-left">
          <Link href="/">
            <img src="/common/logo.svg" className="logo" />
          </Link>
          <div className="nav-bar">
            {navItems.map((nav) => (
              <Menu key={nav.key}>
                <MenuButton
                  as={Button}
                  rightIcon={<Icon as={Icons.ChevronDown} />}
                  className="nav-item"
                >
                  {nav.name}
                </MenuButton>
                <MenuList>
                  {nav.children.map((child) =>
                    child.isNav ? (
                      <Link key={child.key} href={child.key}>
                        <MenuItem>{child.name}</MenuItem>
                      </Link>
                    ) : (
                      <a
                        key={child.key}
                        href={child.key}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <MenuItem>{child.name}</MenuItem>
                      </a>
                    )
                  )}
                </MenuList>
              </Menu>
            ))}
          </div>
        </div>
        <div className="nav-right">
          <SearchBar />
          <div className="network">
            <Menu>
              <MenuButton
                as={Button}
                rightIcon={<Icon as={Icons.ChevronDown} />}
                className="network-nav"
              >
                {blockchain_Array.map((el)=>el.value==blockchain_id?<img src={el.url} alt="" />:null)}
              </MenuButton>
              <MenuList className="network-list">
                {blockchain_Array.map((el, key) => (
                  <MenuItem
                    key={key}
                    className="network-item"
                    onClick={() => BlockchainStore.setBlockchainId(el.value)}
                  >
                    <img src={el.url} alt="" />
                    {el.name}
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
          </div>
          {isReady ? (
            <Link href={"/user/" + address + "/?tab=4"}>
              <Icon as={BellIcon} className="noti-button" />
            </Link>
          ) : null}
          <UserTray />
          <Icon
            as={Icons.Menu}
            className="menu-button"
            onClick={() => setMobileMenuVisible(true)}
          />
        </div>
      </div>
    </div>
  )

  const _renderContent = () => <div className="content">{children}</div>

  const _renderFooter = () => (
    <div className="footer">
      <div className="footer-body">
        <img src="/common/logo.svg" className="footer-logo" />
        <div className="footer-content">
          <div className="footer-socials">
            {footerSocials.map((nav) => (
              <div key={nav.key} className="footer-socials-item-wrapper">
                <div
                  className={"footer-social-item" + (nav.href ? "" : " none")}
                >
                  <a href={nav.href} target="_blank" rel="noopener noreferrer">
                    <img src={nav.image} />
                  </a>
                </div>
              </div>
            ))}
          </div>
          {/* <div className="footer-navs">
            {footerNavs.map((nav) => (
              <div
                key={nav.key}
                className={"footer-nav-item" + (nav.href ? " " : " none")}
              >
                {nav.name}
              </div>
            ))}
          </div> */}
        </div>
      </div>
    </div>
  )

  const _renderSubFooter = () => (
    <div className="sub-footer">Copyright © 2022, Lucis</div>
  )

  const _renderScrollButton = () => {
    const handleScroll = () => window.scrollTo(0, 0)
    return canScroll ? (
      <Button className="scroll-button" onClick={handleScroll}>
        <Icon as={Icons.ArrowUp} />
      </Button>
    ) : null
  }

  return (
    <div className={"app-layout"}>
      {_renderHeader()}
      {_renderContent()}
      {_renderFooter()}
      {_renderSubFooter()}
      {_renderMobileMenu()}
      {_renderScrollButton()}
    </div>
  )
})
