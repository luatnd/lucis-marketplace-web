import {
  Button,
  Icon,
  Input,
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
import Verified from "@static/icons/verified.svg"
import { observer } from "mobx-react-lite"
import { useState } from "react"
import { currency } from "src/utils/Number"

interface IProps {
  info: any
}

export const OwnerTray = observer((props: IProps) => {
  const { info } = props

  const [fixedPriceModalVisible, setFixedPriceModalVisible] = useState(false)
  const [auctionModalVisible, setAuctionModalVisible] = useState(false)
  const [sendModalVisible, setSendModalVisible] = useState(false)

  const onClickFixedPrice = () => {
    setFixedPriceModalVisible(true)
  }
  const onCloseFixedPrice = () => {
    setFixedPriceModalVisible(false)
  }
  const handleFixedPrice = () => {
    setFixedPriceModalVisible(false)
  }

  const onClickAuction = () => {
    setAuctionModalVisible(true)
  }

  const onClickSend = () => {
    setSendModalVisible(true)
  }

  const onClickChangePrice = () => {
    setFixedPriceModalVisible(true)
  }

  const onClickCancel = () => {
    setFixedPriceModalVisible(false)
  }

  const _renderFixedPriceModal = () => (
    <Modal
      isCentered
      isOpen={fixedPriceModalVisible}
      onClose={onCloseFixedPrice}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Fixed Price</ModalHeader>
        <ModalCloseButton />
        <ModalBody className="fixed-price-modal">
          <div className="modal-head">
            <div className="info-img">
              <img src={info.image} />
            </div>
            <div className="info-text">
              <p>
                {info.contract_name} <Icon as={Verified} />
              </p>
              <h1>{info.name}</h1>
            </div>
          </div>
          <label>Price</label>
          <InputGroup>
            <NumberInput>
              <NumberInputField placeholder="Price" name="price" />
            </NumberInput>
            <InputRightAddon>BNB</InputRightAddon>
          </InputGroup>
          <p>0 BNB = $0</p>
          <p>
            The floor price is 0.0055 BNB. The item will be on sale until you
            cancelled.
          </p>
          <h1>FEES</h1>
          <p>
            Listing is FREE! When the sale succeeds, the following fees will
            occour.
          </p>
          <div className="fee-box">
            <span>
              <p>To Lucis</p>
              <p>2.5%</p>
            </span>
            <span>
              <p>To {info.contract_name}</p>
              <p>2.5%</p>
            </span>
          </div>
          <Button onClick={handleFixedPrice}>Apply</Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  )

  const _renderAuctionModal = () => (
    <Modal
      isCentered
      isOpen={fixedPriceModalVisible}
      onClose={onCloseFixedPrice}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Auction</ModalHeader>
        <ModalCloseButton />
        <ModalBody className="auction-modal">
          <div className="modal-head">
            <div className="info-img">
              <img src={info.image} />
            </div>
            <div className="info-text">
              <p>
                {info.contract_name} <Icon as={Verified} />
              </p>
              <h1>{info.name}</h1>
            </div>
          </div>
          <label>Price</label>
          <InputGroup>
            <NumberInput>
              <NumberInputField placeholder="Price" name="price" />
            </NumberInput>
            <InputRightAddon>BNB</InputRightAddon>
          </InputGroup>
          <p>0 BNB = $0</p>
          <p>
            The floor price is 0.0055 BNB. The item will be on sale until you
            cancelled.
          </p>
          <h1>FEES</h1>
          <p>
            Listing is FREE! When the sale succeeds, the following fees will
            occour.
          </p>
          <label>Duration</label>
          <div className="duration">
            <Button autoFocus>1 Day</Button>
            <Button>3 Days</Button>
            <Button>5 Days</Button>
          </div>
          <div className="fee-box">
            <span>
              <p>To Lucis</p>
              <p>2.5%</p>
            </span>
            <span>
              <p>To {info.contract_name}</p>
              <p>2.5%</p>
            </span>
            <span>
              <p>Bidder to bidder</p>
              <p>5%</p>
            </span>
          </div>
          <Button>Apply</Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  )

  const _renderSendModal = () => (
    <Modal
      isCentered
      isOpen={fixedPriceModalVisible}
      onClose={onCloseFixedPrice}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Send</ModalHeader>
        <ModalCloseButton />
        <ModalBody className="send-modal">
          <div className="modal-head">
            <div className="info-img">
              <img src={info.image} />
            </div>
            <div className="info-text">
              <p>
                {info.contract_name} <Icon as={Verified} />
              </p>
              <h1>{info.name}</h1>
            </div>
          </div>
          <label>Target wallet address</label>
          <InputGroup>
            <Input placeholder="0xadabc..." />
            <InputRightAddon>BNB</InputRightAddon>
          </InputGroup>
          <label>
            {"You won't be able to take back the NFT after the transaction."}
          </label>
          <Button>Apply</Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  )

  const normalTray = (
    <div className="actions">
      <Button onClick={onClickFixedPrice}>Fixed Price</Button>
      <Button onClick={onClickAuction}>Auction</Button>
      <Button onClick={onClickSend}>Send</Button>
    </div>
  )

  const aucAction = (
    <div className="auc-action">
      <div className="auc-action-body">
        <div className="price">
          <span>Top auc</span>
          <span>{currency(info.topAuc)} BNB</span>
          <span>(${currency(info.topAuc * 376)})</span>
        </div>
        <div className="price-nav">
          <div className="cancel">
            <Button onClick={onClickCancel}>Cancel</Button>
          </div>
        </div>
      </div>
    </div>
  )

  const fixedPriceAction = (
    <div className="change-price">
      <div className="change-price-body">
        <div className="price">
          <span>Price</span>
          <span>{currency(info.price)} BNB</span>
          <span>(${currency(info.price * 376)})</span>
        </div>
        <div className="price-nav">
          <Button className="change-price-btn" onClick={onClickChangePrice}>
            Change Price
          </Button>
          <div className="cancel">
            <Button onClick={onClickCancel}>Cancel</Button>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="owner-tray">
      {info.aucPrice ? aucAction : info.price ? fixedPriceAction : normalTray}
      {_renderFixedPriceModal()}
      {_renderAuctionModal()}
      {_renderSendModal()}
    </div>
  )
})
