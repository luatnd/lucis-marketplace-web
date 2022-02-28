import {
  Button,
  Drawer,
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
import { useState } from "react"
import * as Icons from "react-feather"

export const AppLayout = ({ children }) => {
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

  const [spotlightVisible, setSpotlightVisible] = useState(false)
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false)

  const _renderSpotlight = () => (
    <Modal
      isOpen={spotlightVisible}
      onClose={() => setSpotlightVisible(false)}
      closeOnEsc
      size="3xl"
    >
      <ModalOverlay />
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
            <img src="/common/logo.png" className="logo" />
          </Link>
        </DrawerHeader>
        <DrawerCloseButton />
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
                <Button variant="ghost" className="mobile-menu-nav-item">
                  {child.name}
                </Button>
              </Link>
            ))}
          </Stack>
        ))}
      </DrawerContent>
    </Drawer>
  )

  const _renderHeader = () => (
    <div className="header">
      <Link href="/">
        <img src="/common/logo.png" className="logo" />
      </Link>
      <div className="nav-bar">
        {navItems.map((nav) => (
          <Menu key={nav.key}>
            <MenuButton
              as={Button}
              rightIcon={<Icon as={Icons.ChevronDown} />}
              background="none"
              _hover={{ border: "none" }}
              _active={{ border: "none" }}
              _focus={{ border: "none" }}
            >
              {nav.name}
            </MenuButton>
            <MenuList>
              {nav.children.map((child) => (
                <Link key={child.key} href={child.key}>
                  <MenuItem>{child.name}</MenuItem>
                </Link>
              ))}
            </MenuList>
          </Menu>
        ))}
      </div>
      <InputGroup>
        <Input
          className="search-bar"
          onClick={() => setSpotlightVisible(true)}
          placeholder="Name, Collection, Address, User"
        />
        <InputRightElement>
          <Icon as={Icons.Search} />
        </InputRightElement>
      </InputGroup>
      <Icon as={Icons.Bell} className="noti-button" />
      <img src="/common/example-avatar.png" className="user" />
      <Icon
        as={Icons.Menu}
        className="menu-button"
        onClick={() => setMobileMenuVisible(true)}
      />
    </div>
  )

  const _renderContent = () => <div className="content">{children}</div>

  const _renderFooter = () => (
    <div className="footer">Copyright © Lucis NFT</div>
  )

  return (
    <div className={"app-layout"}>
      {_renderHeader()}
      {_renderContent()}
      {_renderFooter()}
      {_renderSpotlight()}
      {_renderMobileMenu()}
    </div>
  )
}
