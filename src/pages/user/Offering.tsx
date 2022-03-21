import { NftItem } from "src/components/NftItem"
import { AppPagination } from "src/components/AppPagination"
import { useEffect, useState } from "react"
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Text,
  Button,
  useDisclosure,
} from "@chakra-ui/react"
import Link from "next/link"
import { offeringUser } from "src/services/nft"
import { useStore } from "src/hooks/useStore"
import { networkType } from "../data/networkType"
import { observer } from "mobx-react-lite"
import { AppSelect } from "src/components/AppSelect"
import { formatTime } from "src/hooks/useCountdown"
import { useRouter } from "next/router"
const Offering = observer(() => {
  const WalletController = useStore("WalletController")
  const { address } = WalletController

  const { isOpen, onOpen, onClose } = useDisclosure()

  const router = useRouter()
  const { id } = router.query

  const [tab, setTab] = useState(0)

  const [auctions, setAuctions] = useState([])
  const [totalAuc, setTotalAuc] = useState(0)
  const [offset, setOffset] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  const [order, setOrder] = useState({
    reverse: true,
    order_by: "created_time",
  })

  const [makeOffer, setMakeOffer] = useState([])
  const [totalMake, setTotalMake] = useState(0)
  const [offset1, setOffset1] = useState(1)
  const [pageSize1, setPageSize1] = useState(10)
  const [order1, setOrder1] = useState({
    reverse: true,
    order_by: "created_time",
  })

  const [actionID, setActionID] = useState(null)
  const madeSort = [
    {
      value: {
        reverse: true,
        order_by: "created_time",
      },
      label: "Newest",
    },
    {
      value: {
        reverse: false,
        order_by: "current_price",
      },
      label: "Price: Min to Max",
    },
    {
      value: {
        reverse: true,
        order_by: "current_price",
      },
      label: "Price: Max to Min",
    },
  ]
  const handleChange = (el) => {
    switch (tab) {
      case 0:
        setOrder(el.value)
        break
      case 1:
        setOrder1(el.value)
        break
      default:
        break
    }
  }
  // ==== load data make offer
  const getdata1 = async () => {
    if (id) {
      const res = await offeringUser(
        2,
        pageSize1,
        offset1-1,
        id,
        order1.reverse,
        order1.order_by
      )
      setMakeOffer(res.data)
      setTotalMake(res.total)
    }
  }
  useEffect(() => {
    getdata1()
  }, [id, pageSize1, offset1, order1])
  // ==== load data auction
  const getdata = async () => {
    if (id) {
      const res = await offeringUser(
        3,
        pageSize,
        offset-1,
        id,
        order.reverse,
        order.order_by
      )
      setAuctions(res.data)
      setTotalAuc(res.total)
      console.log(totalAuc)
    }
  }
  useEffect(() => {
    getdata()
  }, [id, pageSize, offset, order])

  return (
    <div className="tab">
      <Tabs align="center">
        <div className="tab-sort">
          <TabList>
            <Tab
              onClick={() => {
                setTab(0)
              }}
            >
              auction
            </Tab>
            <Tab
              onClick={() => {
                setTab(1)
              }}
            >
              Make Offer
            </Tab>
          </TabList>
          <div className="right">
            <AppSelect
              options={networkType}
              isSearchable={false}
              className="network"
              placeholder={
                <div className="placeholder">
                  <img src="/common/all-network.png" alt="" />
                  All network
                </div>
              }
            />
            <AppSelect
              isSearchable={false}
              options={madeSort}
              placeholder="Newest"
              onChange={(el) => handleChange(el)}
            />
          </div>
        </div>
        <TabPanels>
          <TabPanel>
            <div className="offering-auction">
              {!totalAuc ? (
                <img
                  className="nodata"
                  src="/common/my-nft/nodata.png"
                  alt=""
                />
              ) : (
                <>
                  {" "}
                  <div className="list">
                    {auctions.map((auction) => (
                      <NftItem key={auction.id} info={auction} />
                    ))}
                  </div>
                  <AppPagination
                    total={totalAuc}
                    limit={pageSize}
                    offset={offset}
                    onChangeOffset={(offset) => setOffset(offset)}
                    onChangeLimit={(pageSize) => setPageSize(pageSize)}
                  />
                </>
              )}
            </div>
          </TabPanel>
          <TabPanel className="offering-make">
            {!totalMake ? (
              <img className="nodata" src="/common/my-nft/nodata.png" alt="" />
            ) : (
              <>
                <div className="border">
                  <Table variant="simple">
                    <Thead>
                      <Tr>
                        <Th>Item</Th>
                        <Th isNumeric>Price</Th>
                        <Th>To</Th>
                        <Th>Expiration</Th>
                        <Th>Offered</Th>
                        <Th>Action</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {makeOffer.map((data) => (
                        <Tr key={data.event_id}>
                          <Td>
                            <div className="item">
                              <img src={data.photo} alt="" />
                              <div>
                                <Link href={"/collection/" + data.parent_id}>
                                  <a>
                                    <p className="to">
                                      {data.contract_name}{" "}
                                      <img
                                        src="/common/my-nft/check.png"
                                        alt=""
                                      />
                                    </p>
                                  </a>
                                </Link>
                                <Link href={"/nft/" + data.nft_item_id}>
                                  <a>
                                    <p>{data.name}</p>
                                  </a>
                                </Link>
                              </div>
                            </div>
                          </Td>
                          <Td isNumeric>{data.price}</Td>
                          <Td>
                            <Link href={"/user/" + data.transaction_id}>
                              <a>Nhi</a>
                            </Link>
                          </Td>
                          <Td>{formatTime(data.deadline, true)}</Td>
                          <Td>{formatTime(data.created_time, false)}</Td>
                          <Td>
                            {data.action ? (
                              <div className="button">
                                <button
                                  onClick={() => {
                                    setActionID(data.key)
                                    onOpen()
                                  }}
                                >
                                  Cancel
                                </button>
                              </div>
                            ) : (
                              "Canceled"
                            )}
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </div>
                <AppPagination
                  total={totalMake}
                  offset={offset1}
                  limit={pageSize1}
                  onChangeLimit={(pageSize) => setPageSize1(pageSize)}
                  onChangeOffset={(offset) => setOffset1(offset)}
                />
              </>
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>
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
                setMakeOffer(
                  makeOffer.map((data) =>
                    data.key == actionID ? { ...data, action: false } : data
                  )
                )
              }}
            >
              Approve
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
})
export default Offering
