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
import dayjs from "dayjs"
import { observer } from "mobx-react-lite"
import { useState } from "react"
import { useStore } from "src/hooks/useStore"
import { currency } from "src/utils/Number"

interface IProps {
  info: any
}

export const AucTray = observer((props: IProps) => {
  const { info } = props
  const WalletController = useStore("WalletController")
  const { address } = WalletController

  const [modalVisible, setModalVisible] = useState(false)
  const [aucPrice, setAucPrice] = useState<number>()

  const onClickAuc = () => {
    setModalVisible(true)
  }
  const onClose = () => {
    setModalVisible(false)
  }

  const handleAuc = async () => {
    console.log("AUC")
    setModalVisible(false)
  }

  const _renderAucModal = () => (
    <Modal isCentered isOpen={modalVisible} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Auction</ModalHeader>
        <ModalCloseButton />
        <ModalBody className="auc-modal">
          <label>Price</label>
          <InputGroup>
            <NumberInput>
              <NumberInputField
                placeholder="Price"
                value={aucPrice}
                name="price"
                onChange={(e) => setAucPrice(+e.target.value)}
              />
            </NumberInput>
            <InputRightAddon>BNB</InputRightAddon>
          </InputGroup>
          <p>The minium auc price is {info.aucPrice} BNB</p>
          <Button onClick={handleAuc}>Apply</Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  )

  return (
    <div className="auc-tray">
      <div className="auc-tray-body">
        <div className="price">
          <span>Top auc</span>
          <span>{currency(info.topAuc ?? info.aucPrice)} BNB</span>
          <span>(${currency(info.topAuc * 376)})</span>
        </div>
        <div className="auc-nav">
          <Button
            onClick={address ? onClickAuc : () => WalletController.connect()}
          >
            AUCTION
          </Button>
        </div>
      </div>
      <div className="auction-end">
        <span>Auction end in</span> {dayjs(info.endTime).format("HH:mm:ss")}
      </div>
      {_renderAucModal()}
    </div>
  )
})
