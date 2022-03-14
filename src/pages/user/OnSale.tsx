import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tab,
  Table,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react"
import { AppSelect } from "src/components/AppSelect"
import { networkType } from "../data/networkType"
import { NftItem } from "../../components/NftItem"
import { useEffect, useState } from "react"
import receivedList from "../data/activities.json"
import Verified from "@static/icons/verified.svg"
import Link from "next/link"
import { getNfts } from "src/services/nft"
import { useStore } from "src/hooks/useStore"
import { observer } from "mobx-react-lite"
import { AppPagination } from "src/components/AppPagination"
const OnSale = observer(() => {
  const WalletController = useStore("WalletController")
  const { address } = WalletController
  const [isAuction, setisAuction] = useState(false)
  const [order, setOrder] = useState("null")
  const [order1, setOrder1] = useState("null")
  const [data, setData] = useState([])
  const [data1, setData1] = useState([])
  const [receivedData, setReceivedData] = useState(receivedList)
  const [received, setReceived] = useState([])
  const [currentPage2, setCurrentPage2] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  const [pageSize1, setPageSize1] = useState(20)
  const [pageSize2, setPageSize2] = useState(10)
  const [offset, setOffset] = useState(1)
  const [offset1, setOffset1] = useState(1)
  const [offset2, setOffset2] = useState(1)
  const [totalData, setTotalData] = useState(0)
  const [totalData1, setTotalData1] = useState(0)
  const [actionID, setActionID] = useState(null)

  const { isOpen, onOpen, onClose } = useDisclosure()

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
    setReceived(receivedData.slice(offset2 - 1, offset2 - 1 + pageSize2))
  }, [offset2, pageSize2, receivedData])

  const accpet = (id) => {
    setReceivedData(
      receivedData.map((data) =>
        data.key == id ? { ...data, action: true } : data
      )
    )
    setReceived(receivedData.slice(offset2 - 1, offset2 - 1 + pageSize2))
  }
  const cancel = (id) => {
    setReceivedData(
      receivedData.map((data) =>
        data.key == id ? { ...data, action: false } : data
      )
    )
    setReceived(receivedList.slice(offset2 - 1, offset2 - 1 + pageSize2))
  }
  const getdata = async () => {
    if (address) {
      const res = await getNfts({
        owner: address,
        price_gte: 0,
        _sort: "price",
        _order: order,
        _limit: pageSize,
        _page: Math.ceil(offset / pageSize),
      })
      setData(res.data)
      setTotalData(res.total)
    }
  }
  const getdata1 = async () => {
    if (address) {
      const res = await getNfts({
        owner: address,
        aucPrice_gte: 0,
        _sort: "topAuc",
        _order: order1,
        _limit: pageSize1,
        _page: Math.ceil(offset1 / pageSize1),
      })
      setData1(res.data)
      setTotalData1(res.total)
    }
  }
  useEffect(() => {
    getdata()
    getdata1()
  }, [address])

  useEffect(() => {
    getdata()
  }, [order])

  useEffect(() => {
    getdata1()
  }, [order1])

  useEffect(() => {
    getdata()
  }, [pageSize, offset])

  useEffect(() => {
    getdata1()
  }, [pageSize1, offset1])

  const handleChange = (el, i) => {
    switch (i) {
      case 1:
        setOrder(el.value)
        break
      case 2:
        setOrder1(el.value)
        break
      default:
        break
    }
  }
  return (
    <div className="tab-on-sale">
      <Tabs className="tab-os">
        <TabList className="header-tab">
          <Tab
            onClick={() => {
              setisAuction(false)
            }}
          >
            Selling
          </Tab>
          <Tab
            onClick={() => {
              setisAuction(true)
            }}
          >
            Auction
          </Tab>
          <Tab>Received Offer</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <div className="sort">
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
                onChange={(el) => handleChange(el, 1)}
              />
            </div>
            {data.length == 0 ? (
              <img className="nodata" src="/common/my-nft/nodata.png" alt="" />
            ) : (
              <>
                <div className="">
                  <div className="grid-custom">
                    {data.map((auction) => (
                      <div className="grid-item" key={auction.id}>
                        <NftItem info={auction} />
                      </div>
                    ))}
                  </div>
                </div>
                <AppPagination
                  total={totalData}
                  offset={offset}
                  pageSize={pageSize}
                  onChangPageSize={(pageSize) => setPageSize(pageSize)}
                  onChangeOffset={(offset) => setOffset(offset)}
                />
              </>
            )}
          </TabPanel>
          <TabPanel>
            <div className="sort">
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
                onChange={(el) => handleChange(el, 2)}
              />
            </div>
            {data1.length == 0 ? (
              <img className="nodata" src="/common/my-nft/nodata.png" alt="" />
            ) : (
              <>
                <div className="">
                  <div className="grid-custom">
                    {data1.map((auction) => (
                      <div className="grid-item" key={auction.id}>
                        <NftItem info={auction} />
                      </div>
                    ))}
                  </div>
                </div>
                <AppPagination
                  total={totalData1}
                  pageSize={pageSize1}
                  offset={offset1}
                  onChangPageSize={(pageSize) => setPageSize1(pageSize)}
                  onChangeOffset={(offset) => setOffset1(offset)}
                />
              </>
            )}
          </TabPanel>
          <TabPanel>
            <div className="sort">
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
                onChange={(el) => handleChange(el, 3)}
              />
            </div>
            <div className="">
              <div className="table-activity">
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>Item</Th>
                      <Th>Price</Th>
                      <Th>To</Th>
                      <Th>Expiration</Th>
                      <Th>Offered at</Th>
                      <Th>Action</Th>
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
                              <Link href={"/nft/1"}>
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
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </div>
            </div>
            <AppPagination
              total={receivedList.length}
              offset={offset2}
              pageSize={pageSize2}
              onChangPageSize={(pageSize) => setPageSize2(pageSize)}
              onChangeOffset={(offset) => setOffset2(offset)}
            />
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent className="dialog-confirm">
                <ModalHeader>Confirm</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Text mb="1rem">
                    Are you sure you want to cancel the offer ?
                  </Text>
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
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  )
})

export default OnSale
