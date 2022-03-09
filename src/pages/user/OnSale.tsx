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
import auctions from "../data/auctions.json"
import { useEffect, useState } from "react"
import Pagination from "../../components/Pagination"
import receivedList from "../data/activities.json"
import Verified from "@static/icons/verified.svg"
import Link from "next/link"

const OnSale = () => {
  const [data, setData] = useState([])
  const [received, setReceived] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [currentPage1, setCurrentPage1] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  const [pageSize1, setPageSize1] = useState(10)
  const [totalData, setTotalData] = useState(Number(auctions.length))
  const [auTotal, setAuTotal] = useState(0)
  const [seTotal, setSeTotal] = useState(0)

  const { isOpen, onOpen, onClose } = useDisclosure()
  useEffect(() => {
    let au = 0
    let se = 0
    auctions.forEach((el) => {
      if (el.auction == true) {
        au++
      } else {
        se++
      }
    })
    setAuTotal(au)
    setSeTotal(se)
  }, [])

  useEffect(() => {
    const firstPageIndex = (currentPage - 1) * pageSize
    const lastPageIndex = firstPageIndex + pageSize
    setData(auctions.slice(firstPageIndex, lastPageIndex))
  }, [currentPage, pageSize])

  useEffect(() => {
    const firstPageIndex = (currentPage1 - 1) * pageSize1
    const lastPageIndex = firstPageIndex + pageSize1
    setReceived(receivedList.slice(firstPageIndex, lastPageIndex))
  }, [currentPage1, pageSize1])

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
          <Tab>Selling</Tab>
          <Tab>Auction</Tab>
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
                {data.map((auction, index) =>
                  auction.auction != true ? (
                    <div className="grid-item" key={index}>
                      <NftItem
                        key={auction.id}
                        name={auction.name}
                        image={auction.image}
                        provider={auction.provider}
                        endTime={auction.endTime}
                        price={auction.price}
                        auction={auction.auction}
                        activeBtn={true}
                      />
                    </div>
                  ) : null
                )}
              </div>
            </div>
            <Pagination
              className="pagination-bar"
              currentPage={currentPage}
              totalCount={seTotal}
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
                {data.map((auction, index) =>
                  auction.auction == true ? (
                    <div className="grid-item" key={index}>
                      <NftItem
                        key={auction.id}
                        name={auction.name}
                        image={auction.image}
                        provider={auction.provider}
                        endTime={auction.endTime}
                        price={auction.price}
                        auction={auction.auction}
                        activeBtn={true}
                      />
                    </div>
                  ) : null
                )}
              </div>
            </div>
            <Pagination
              className="pagination-bar"
              currentPage={currentPage}
              totalCount={auTotal}
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
                              <p className="animverse">
                                Animverse
                                <Verified />
                              </p>
                              <p>CUONG DOLLA NFT</p>
                            </div>
                          </div>
                        </Td>
                        <Td>{el.price}</Td>
                        <Td className="to">
                          <Link href={"/user/" + el.to}>
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
              currentPage={currentPage1}
              totalCount={totalData}
              pageSize={pageSize1}
              onPageChange={(page) => setCurrentPage1(page)}
              onPageSizeChange={(pageSize) => setPageSize1(pageSize)}
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
