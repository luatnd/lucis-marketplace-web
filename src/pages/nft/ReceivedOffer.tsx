import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react"
import receivedList from "../data/activities.json"
import Verified from "@static/icons/verified.svg"
import { useStore } from "src/hooks/useStore"
import { useEffect, useState } from "react"
import { AppPagination } from "src/components/AppPagination"
import { AppSelect } from "src/components/AppSelect"
import Link from "next/link"

const ReceivedOffer = (props) => {
  const [receivedData, setReceivedData] = useState(receivedList)
  const [received, setReceived] = useState([])
  const [offset, setOffset] = useState(1)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [pageSize, setPageSize] = useState(10)
  const [actionID, setActionID] = useState(null)
  const WalletController = useStore("WalletController")
  const { address } = WalletController
  const { info } = props
  const madeSort = [
    {
      value: "",
      label: "Newest",
    },
    {
      value: "asc",
      label: "Price: Min to Max",
    },
    {
      value: "desc",
      label: "Price: Max to Min",
    },
  ]
  useEffect(() => {
    setReceived(receivedData.slice(offset - 1, offset - 1 + pageSize))
  }, [offset, pageSize, receivedData])

  const accpet = (id) => {
    setReceivedData(
      receivedData.map((data) =>
        data.key == id ? { ...data, action: true } : data
      )
    )
    setReceived(receivedData.slice(offset - 1, offset - 1 + pageSize))
  }
  const cancel = (id) => {
    setReceivedData(
      receivedData.map((data) =>
        data.key == id ? { ...data, action: false } : data
      )
    )
    setReceived(receivedList.slice(offset - 1, offset - 1 + pageSize))
  }
  return (
    <>
      <div className="sort">
        <AppSelect
          isSearchable={false}
          options={madeSort}
          placeholder="Newest"
        />
      </div>
      <div className="table-activity">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Item</Th>
              <Th>Price</Th>
              <Th>To</Th>
              <Th>Expiration</Th>
              <Th>Date</Th>
              {info?.owner === address ? <Th>Action</Th> : null}
            </Tr>
          </Thead>
          <Tbody>
            {received.map((el, index) => (
              <Tr key={index}>
                <Td>
                  <div className="align-center item">
                    <div>
                      <img src="/icons/item.png" alt="" />
                    </div>
                    <div className="name-item">
                      <Link href={"/collection/1"}>
                        <a>
                          <p className="animverse">
                            Animverse
                            <Verified />
                          </p>
                        </a>
                      </Link>
                      <Link href={"/user/1"}>
                        <a>
                          <p>CUONG DOLLA NFT</p>
                        </a>
                      </Link>
                    </div>
                  </div>
                </Td>
                <Td>{el.price}</Td>
                <Td className="to">
                  <Link href={"/user/1"}>
                    <a>{el.to}</a>
                  </Link>
                </Td>
                <Td>in 2 days</Td>
                <Td>
                  <span>{el.date}</span>
                </Td>
                {info?.owner === address ? (
                  <Td>
                    {el.action == null ? (
                      <>
                        <Button
                          className="accept"
                          onClick={() => {
                            accpet(el.key)
                          }}
                        >
                          Accept
                        </Button>
                        <Button
                          className="cancel"
                          onClick={() => {
                            onOpen()
                            setActionID(el.key)
                          }}
                        >
                          <span>Cancel</span>
                        </Button>
                      </>
                    ) : el.action == true ? (
                      "Accepted"
                    ) : (
                      "Canceled"
                    )}
                  </Td>
                ) : null}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </div>
      <AppPagination
        total={receivedList.length}
        offset={offset}
        limit={pageSize}
        onChangeLimit={(pageSize) => setPageSize(pageSize)}
        onChangeOffset={(offset) => setOffset(offset)}
      />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent className="dialog-confirm">
          <ModalHeader>Confirm</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text mb="1rem">Are you sure you want to cancel the offer ?</Text>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                onClose()
                cancel(actionID)
              }}
            >
              Approve
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ReceivedOffer
