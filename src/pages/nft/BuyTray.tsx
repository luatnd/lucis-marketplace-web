import {
  Button,
  InputGroup,
  InputRightAddon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  NumberInput,
  NumberInputField,
} from "@chakra-ui/react"
import { observer } from "mobx-react-lite"
import { useState } from "react"
import { useStore } from "src/hooks/useStore"
import { currency } from "src/utils/Number"

interface IProps {
  info: any
}

export const BuyTray = observer((props: IProps) => {
  const WalletController = useStore("WalletController")
  const { address } = WalletController
  const { info } = props

  const [modalVisible, setModalVisible] = useState(false)
  const [offerModalVisible, setOfferModalVisible] = useState(false)

  const onClickBuy = () => {
    setModalVisible(true)
  }
  const onClose = () => {
    setModalVisible(false)
    setOfferModalVisible(false)
  }

  const handleBuy = async () => {
    console.log("BUY")
    setModalVisible(false)
  }

  const onClickOffer = () => {
    setOfferModalVisible(true)
  }

  const handleOffer = () => {
    setOfferModalVisible(false)
  }

  const _renderBuyModal = () => (
    <Modal isCentered isOpen={modalVisible} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Buy</ModalHeader>
        <ModalCloseButton />
        <ModalBody className="buy-modal">
          <div className="price">
            <span>Price:</span>
            <div className="price-col">
              <h1>{currency(info.price)} BNB</h1>
              <span>(${currency(info.price * 376)})</span>
            </div>
          </div>
          <Button onClick={handleBuy}>Apply</Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  )

  const _renderOfferModal = () => (
    <Modal isCentered isOpen={offerModalVisible} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Offer</ModalHeader>
        <ModalCloseButton />
        <ModalBody className="offer-modal">
          <label>Price</label>
          <InputGroup>
            <NumberInput>
              <NumberInputField />
            </NumberInput>
            <InputRightAddon>BNB</InputRightAddon>
          </InputGroup>
          <Button onClick={handleOffer}>Apply</Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  )

  return (
    <div className="buy-tray">
      <div className="buy-tray-body">
        <div className="price">
          <span>Price</span>
          <span>{info.price ? currency(info.price) + " BNB" : "-"} </span>
          <span>
            {info.price
              ? `(${currency(info.price * 376)})`
              : "Waiting first offer"}
          </span>
        </div>
        <div className="buy-nav">
          <Button
            onClick={address ? onClickBuy : () => WalletController.connect()}
            isDisabled={!info.price}
          >
            BUY
          </Button>
          <span onClick={onClickOffer}>Or make offer other price</span>
        </div>
      </div>
      {_renderBuyModal()}
      {_renderOfferModal()}
    </div>
  )
})
