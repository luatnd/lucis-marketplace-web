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
  InputGroup,
  InputRightElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalContent,
  ModalOverlay,
  Stack,
} from "@chakra-ui/react"
import Link from "next/link"
import { useEffect, useState } from "react"
import * as Icons from "react-feather"

export const AppLayout = ({ children }) => {
  const [canScroll, setCanScroll] = useState(false)
  useEffect(() => {
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
          key: "/",
        },
        {
          name: "Discover",
          key: "/discover",
        },
        {
          name: "Activities",
          key: "/activities",
        },
        {
          name: "NFT Ranking",
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
          key: "/nft-verification",
        },
        {
          name: "Apply for Launchpad",
          key: "/apply-for-launchpad",
        },
      ],
    },
    {
      name: "Resources",
      key: "resources",
      children: [
        {
          name: "Help Center",
          key: "/help-center",
        },
        {
          name: "Trader's Guide",
          key: "/trader-guide",
        },
        {
          name: "Feature",
          key: "/feature",
        },
        {
          name: "FAQ",
          key: "Press Kit",
        },
        {
          name: "NFT Validator",
          key: "nft-validator",
        },
      ],
    },
  ]

  const footerSocials = [
    {
      key: "1",
      image: "/common/footer/nav1.png",
    },
    {
      key: "2",
      image: "/common/footer/nav2.png",
    },
    {
      key: "3",
      image: "/common/footer/nav3.png",
    },
    {
      key: "4",
      image: "/common/footer/nav4.png",
    },
    {
      key: "5",
      image: "/common/footer/nav5.png",
    },
    {
      key: "6",
      image: "/common/footer/nav6.png",
    },
  ]

  const footerNavs = [
    {
      key: "1",
      name: "Term of service",
    },
    {
      key: "2",
      name: "Privacy",
    },
    {
      key: "3",
      name: "Copyright",
    },
    {
      key: "4",
      name: "Help center",
    },
    {
      key: "5",
      name: "Blog",
    },
  ]

  const [spotlightVisible, setSpotlightVisible] = useState(false)
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false)

  const _renderSpotlight = () => (
    <Modal
      isOpen={spotlightVisible}
      onClose={() => setSpotlightVisible(false)}
      closeOnEsc
      size="3xl"
    >
      <ModalOverlay className="spotlight-overlay" />
      <ModalContent className="spotlight">
        <InputGroup>
          <Input size="lg" placeholder="Name, Collection, Address, User" />
          <InputRightElement>
            <Icon as={Icons.Search} />
          </InputRightElement>
        </InputGroup>
      </ModalContent>
    </Modal>
  )

  const _renderMobileMenu = () => (
    <Drawer
      isOpen={mobileMenuVisible}
      onClose={() => setMobileMenuVisible(false)}
    >
      <DrawerOverlay />
      <DrawerContent className="mobile-menu">
        <DrawerHeader>
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
          {navItems.map((nav) => (
            <Stack key={nav.key} className="mobile-menu-stack">
              <Button
                variant="ghost"
                rightIcon={<Icon as={Icons.ChevronDown} />}
                className="mobile-menu-nav"
              >
                {nav.name}
              </Button>
              {nav.children.map((child) => (
                <Link key={child.key} href={child.key}>
                  <Button
                    variant="ghost"
                    className="mobile-menu-nav-item"
                    onClick={() => setMobileMenuVisible(false)}
                  >
                    {child.name}
                  </Button>
                </Link>
              ))}
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
            <img src="/common/logo.png" className="logo" />
          </Link>
          <div className="nav-bar">
            {navItems.map((nav) => (
              <Menu key={nav.key}>
                <MenuButton
                  as={Button}
                  rightIcon={<Icon as={Icons.ChevronDown} />}
                  className="nav-item"
                  _hover={{ border: "none" }}
                  _active={{ border: "none" }}
                  _focus={{ border: "none" }}
                >
                  {nav.name}
                </MenuButton>
                <MenuList className="nav-list">
                  {nav.children.map((child) => (
                    <Link key={child.key} href={child.key}>
                      <MenuItem>{child.name}</MenuItem>
                    </Link>
                  ))}
                </MenuList>
              </Menu>
            ))}
          </div>
        </div>
        <div className="nav-right">
          <Icon
            as={Icons.Search}
            className="search-button"
            onClick={() => setSpotlightVisible(true)}
          />
          <Icon as={Icons.Bell} className="noti-button" />
          <Icon as={Icons.User} className="user chakra-icon" />
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
        <img src="/common/logo.png" className="footer-logo" />
        <div className="footer-content">
          <div className="footer-socials">
            {footerSocials.map((nav) => (
              <div key={nav.key} className="footer-social-item">
                <img src={nav.image} />
              </div>
            ))}
          </div>
          <div className="footer-navs">
            {footerNavs.map((nav) => (
              <div key={nav.key} className="footer-nav-item">
                {nav.name}
              </div>
            ))}
          </div>
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
      {_renderSpotlight()}
      {_renderMobileMenu()}
      {_renderScrollButton()}
    </div>
  )
}
