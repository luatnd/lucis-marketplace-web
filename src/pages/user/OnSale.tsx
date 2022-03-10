import {
  Button,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
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
import * as Icons from "react-feather"
import { NftItem } from "../../components/NftItem"
import { useEffect, useState } from "react"
import Pagination from "../../components/Pagination"
import receivedList from "../data/activities.json"
import Verified from "@static/icons/verified.svg"
import Link from "next/link"
import { getNft, getNfts } from "src/services/nft"
import { useStore } from "src/hooks/useStore"

const OnSale = () => {
  const WalletController = useStore("WalletController")
  const { address } = WalletController
  const [isAuction, setisAuction] = useState(false)
  const [data, setData] = useState([])
  const [received, setReceived] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [currentPage1, setCurrentPage1] = useState(1)
  const [currentPage2, setCurrentPage2] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  const [pageSize1, setPageSize1] = useState(20)
  const [pageSize2, setPageSize2] = useState(10)
  const [totalData, setTotalData] = useState(0)

  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    const firstPageIndex = (currentPage2 - 1) * pageSize2
    const lastPageIndex = Number(firstPageIndex) + Number(pageSize2)
    setReceived(receivedList.slice(firstPageIndex, lastPageIndex))
  }, [currentPage2, pageSize2])

  const getdata = async () => {
    const res = await getNfts({
      owner: address,
      isAuction: isAuction,
      _limit: isAuction ? pageSize1 : pageSize,
      _page: isAuction ? currentPage1 : currentPage2,
    })
    setData(res.data)
    setTotalData(res.total)
  }
  useEffect(() => {
    getdata()
  }, [])
  useEffect(() => {
    getdata()
  }, [pageSize, currentPage, currentPage1, pageSize2,isAuction])
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
              <Sort customClassName="type-sort" options={typeSort} />
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
              <Sort customClassName="type-sort" options={typeSort} />
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
              currentPage={currentPage1}
              totalCount={totalData}
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
                              <Link href={"/user/1"}>
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
                          <Button className="accept">Accept</Button>
                          <Button className="cancel" onClick={onOpen}>
                            <span>Cancel</span>
                          </Button>
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
                <ModalHeader>Confirm terms</ModalHeader>
                <ModalCloseButton>
                  <img src="/icons/close.png" />
                </ModalCloseButton>
                <ModalBody>
                  <Text mb="1rem">
                    Are you sure you want to cancel the offer ?
                  </Text>
                </ModalBody>

                <ModalFooter>
                  <Button colorScheme="blue" mr={3} onClick={onClose}>
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
