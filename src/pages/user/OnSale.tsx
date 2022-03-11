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
import Sort from "../../components/Sort"
import network from "../data/network.json"
import { NftItem } from "../../components/NftItem"
import { useEffect, useState } from "react"
import Pagination from "../../components/Pagination"
import receivedList from "../data/activities.json"
import Verified from "@static/icons/verified.svg"
import Link from "next/link"
import { getNfts } from "src/services/nft"
import { useStore } from "src/hooks/useStore"

const OnSale = () => {
  const WalletController = useStore("WalletController")
  const { address } = WalletController
  const [isAuction, setisAuction] = useState(false)
  const [order, setOrder] = useState("null")
  const [order1, setOrder1] = useState("null")
  const [data, setData] = useState([])
  const [data1, setData1] = useState([])
  const [receivedData, setReceivedData] = useState(receivedList)
  const [received, setReceived] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [currentPage1, setCurrentPage1] = useState(1)
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
    const res = await getNfts({
      owner: address,
      isAuction: false,
      _sort: "price",
      _order: order,
      _limit: pageSize,
      _page: currentPage,
    })
    setData(res.data)
    setTotalData(res.total)
  }
  const getdata1 = async () => {
    const res = await getNfts({
      owner: address,
      isAuction: true,
      _sort: "price",
      _order: order1,
      _limit: pageSize1,
      _page: currentPage1,
    })
    setData1(res.data)
    setTotalData1(res.total)
  }
  useEffect(() => {
    getdata()
    getdata1()
  }, [])

  useEffect(() => {
    getdata()
  }, [currentPage, order])
  
  useEffect(() => {
    getdata1()
  }, [currentPage1, order1])

  useEffect(() => {
    setOffset(Number(pageSize * currentPage - pageSize + 1))
  }, [currentPage])

  useEffect(() => {
    setCurrentPage(Math.ceil(offset / pageSize))
  }, [pageSize])

  useEffect(() => {
    setOffset1(Number(pageSize1 * currentPage1 - pageSize1 + 1))
  }, [currentPage1])

  useEffect(() => {
    setCurrentPage1(Math.ceil(offset1 / pageSize1))
  }, [pageSize1])

  useEffect(() => {
    setOffset2(Number(pageSize2 * currentPage2 - pageSize2 + 1))
  }, [currentPage2])

  useEffect(() => {
    setCurrentPage2(Math.ceil(offset2 / pageSize2))
  }, [pageSize2])
  const typeSort = [
    {
      img: "",
      name: "Newest",
    },
    {
      img: "",
      name: "Price: Min to Max",
    },
    {
      img: "",
      name: "Price: Max to Min",
    },
  ]

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
              <Sort customClassName="price-sort" options={network} />
              <Sort
                customClassName="type-sort"
                options={typeSort}
                onSelectOption={(made) => {
                  switch (made) {
                    case "Price: Max to Min":
                      setOrder("desc")
                      break
                    case "Price: Min to Max":
                      setOrder("asc")
                      break
                    default:
                      setOrder("null")
                      break
                  }
                }}
              />
            </div>
            <div className="">
              <div className="grid-custom">
                {data.map((auction) => (
                  <div className="grid-item" key={auction.id}>
                    <NftItem
                      id={auction.id}
                      key={auction.id}
                      name={auction.name}
                      image={auction.image}
                      collection={auction.collection}
                      endTime={auction.endTime}
                      price={auction.price}
                      isAuction={auction.isAuction}
                      activeBtn={true}
                    />
                  </div>
                ))}
              </div>
            </div>
            <Pagination
              className="pagination-bar"
              currentPage={currentPage}
              totalCount={totalData}
              pageSize={pageSize}
              onPageChange={(page) => setCurrentPage(page)}
              onPageSizeChange={(pageSize) => setPageSize(pageSize)}
            />
          </TabPanel>
          <TabPanel>
            <div className="sort">
              <Sort customClassName="price-sort" options={network} />
              <Sort
                customClassName="type-sort"
                options={typeSort}
                onSelectOption={(made) => {
                  switch (made) {
                    case "Price: Max to Min":
                      setOrder1("desc")
                      break
                    case "Price: Min to Max":
                      setOrder1("asc")
                      break
                    default:
                      setOrder1("null")
                      break
                  }
                }}
              />
            </div>
            <div className="">
              <div className="grid-custom">
                {data1.map((auction) => (
                  <div className="grid-item" key={auction.id}>
                    <NftItem
                      id={auction.id}
                      key={auction.id}
                      name={auction.name}
                      image={auction.image}
                      collection={auction.collection}
                      endTime={auction.endTime}
                      price={auction.price}
                      isAuction={auction.isAuction}
                      activeBtn={true}
                    />
                  </div>
                ))}
              </div>
            </div>
            <Pagination
              className="pagination-bar"
              currentPage={currentPage1}
              totalCount={totalData1}
              pageSize={pageSize1}
              onPageChange={(page) => setCurrentPage1(page)}
              onPageSizeChange={(pageSize) => setPageSize1(pageSize)}
            />
          </TabPanel>
          <TabPanel>
            <div className="sort">
              <Sort customClassName="price-sort" options={network} />
              <Sort customClassName="type-sort" options={typeSort} />
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
                        <Td>
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
            <Pagination
              className="pagination-bar"
              currentPage={currentPage2}
              totalCount={receivedList.length}
              pageSize={pageSize2}
              onPageChange={(page) => setCurrentPage2(page)}
              onPageSizeChange={(pageSize) => setPageSize2(pageSize)}
            />
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent className="dialog-confirm">
                <ModalHeader>Confirm</ModalHeader>
                <ModalCloseButton>
                  <img src="/icons/close.png" />
                </ModalCloseButton>
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
}

export default OnSale
