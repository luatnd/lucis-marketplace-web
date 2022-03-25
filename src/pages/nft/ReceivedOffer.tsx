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
import Verified from "@static/icons/verified.svg"
import { useStore } from "src/hooks/useStore"
import { useEffect, useState } from "react"
import { AppPagination } from "src/components/AppPagination"
import { AppSelect } from "src/components/AppSelect"
import Link from "next/link"
import { getReceivedOfferItem } from "src/services/nft"
import { useRouter } from "next/router"
import { formatAddress } from "../user/FormatAddress"
import { formatTime } from "src/hooks/useCountdown"

const ReceivedOffer = (props) => {
  const router = useRouter()
  const { id } = router.query
  const [received, setReceived] = useState([])
  const [offset, setOffset] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [total, setTotal] = useState(0)

  const { isOpen, onOpen, onClose } = useDisclosure()

  const WalletController = useStore("WalletController")
  const { address } = WalletController
  const { info } = props

  const typeSort = [
    {
      value: {
        reverse: true,
        order_by: "created_time",
      },
      label: "Recently listed",
    },
    {
      value: {
        reverse: false,
        order_by: "price",
      },
      label: "Price: Min to Max",
    },
    {
      value: {
        reverse: true,
        order_by: "price",
      },
      label: "Price: Max to Min",
    },
  ]

  const getData = async () => {
    if (id) {
      const res = await getReceivedOfferItem(id, pageSize, offset - 1)
      setReceived(res.data)
      setTotal(res.total)
    }
  }

  useEffect(() => {
    getData()
  }, [])
  return (
    <>
      <div className="sort">
        <AppSelect
          isSearchable={false}
          options={typeSort}
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
                      <img src={el.photo} alt="" />
                    </div>
                    <div className="name-item">
                      <Link href={"/collection/"+el.collection_id}>
                        <a>
                          <p className="animverse">
                            {el.collection_name}
                            {/* <Verified /> */}
                          </p>
                        </a>
                      </Link>
                      <Link href={"/user/"+el.currency}>
                        <a>
                          <p>{el.name}</p>
                        </a>
                      </Link>
                    </div>
                  </div>
                </Td>
                <Td>{el.price}</Td>
                <Td className="to">
                  <Link href={"/user/"+el.buyer}>
                    <a>{formatAddress(el.buyer,6,4)}</a>
                  </Link>
                </Td>
                <Td>{formatTime(el.deadline,true)}</Td>
                <Td>
                  <span>{formatTime(el.created_time,false)}</span>
                </Td>
                {info?.owner_address === address ? (
                  <Td>
                    {el.action == null ? (
                      <>
                        <Button className="accept">Accept</Button>
                        <Button
                          className="cancel"
                          onClick={() => {
                            onOpen()
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
        total={total}
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
