import Pagination from "src/components/Pagination"
import { NftItem } from "src/components/NftItem"
import Sort from "src/components/Sort"
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
  Tfoot,
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
import { getNft } from "src/services/nft"
import { useStore } from "src/hooks/useStore"
import network from "../data/network.json"
import { observer } from "mobx-react-lite"
import { set } from "mobx"
const Offering = observer(() => {
  const WalletController = useStore("WalletController")
  const { address } = WalletController
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [price, setPrice] = useState("All")
  const [made, setMade] = useState("null")
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  const [currentPage1, setCurrentPage1] = useState(1)
  const [pageSize1, setPageSize1] = useState(10)
  const [auctions, setAuctions] = useState([])
  const [totalAuc, setTotalAuc] = useState(0)
  const madeSort = [
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
  const dataSoure = [
    {
      key: 1,
      type: "Sale",
    },
    {
      key: 2,
      type: "Listing",
    },
    {
      key: 3,
      type: "Offer",
    },
    {
      key: 4,
      type: "Auction",
    },
    {
      key: 5,
      type: "Sale",
    },
    {
      key: 6,
      type: "Auction",
    },
    {
      key: 7,
      type: "Offer",
    },
    {
      key: 8,
      type: "Listing",
    },
    {
      key: 9,
      type: "Sale",
    },
    {
      key: 10,
      type: "Sale",
    },
  ]
  const getdata = async () => {
    const res = await getNft({
      owner: address,
      isAuction: true,
      _sort: "price",
      _order: made,
      _limit:pageSize,
      _page:currentPage
    })    
    setAuctions(res.data)
    setTotalAuc(res.total)
  }
  useEffect(() => {
    getdata()
  }, [])
  useEffect(() => {
    getdata()
  }, [made,pageSize,currentPage])
  return (
    <div className="tab">
      <Tabs>
        <div className="tab-sort">
          <TabList>
            <Tab>auction</Tab>
            <Tab>Make Offer</Tab>
          </TabList>
          <div className="right">
            <Sort
              customClassName="price-sort"
              options={network}
              onSelectOption={(price) => setPrice(price)}
            />
            <Sort
              customClassName="type-sort"
              options={madeSort}
              onSelectOption={(made) => {
                switch (made) {
                  case "Price: Max to Min":
                    setMade("desc")
                    break
                  case "Price: Min to Max":
                    setMade("asc")
                    break
                  default:
                    setMade("null")
                    break
                }
              }}
            />
          </div>
        </div>
        <TabPanels>
          <TabPanel>
            <div className="offering-auction">
              <div className="list">
                {auctions.map((auction) => (
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
                ))}
              </div>
              <Pagination
                className="pagination-bar"
                currentPage={currentPage}
                totalCount={totalAuc}
                pageSize={pageSize}
                onPageChange={(page) => setCurrentPage(page)}
                onPageSizeChange={(pageSize) => setPageSize(pageSize)}
              />
            </div>
          </TabPanel>
          <TabPanel className="offering-make">
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
                {dataSoure.map((data) => (
                  <Tr key={data.key}>
                    <Td>
                      <div className="item">
                        <img src="/icons/item.png" alt="" />
                        <div>
                          <Link href={"/collection/1"}>
                            <a>
                              <p>
                                Animverse{" "}
                                <img src="/common/my-nft/check.png" alt="" />
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
                    <Td isNumeric>26.94 BNB</Td>
                    <Td>
                      <Link href={"/user/nhi"}>
                        <a>Nhi</a>
                      </Link>
                    </Td>
                    <Td>in 2 days</Td>
                    <Td>1 days ago</Td>
                    <Td className="button">
                      <button onClick={onOpen}>Cancel</button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
            <Pagination
                className="pagination-bar"
                currentPage={currentPage1}
                totalCount={10}
                pageSize={pageSize1}
                onPageChange={(page) => setCurrentPage1(page)}
                onPageSizeChange={(pageSize) => setPageSize1(pageSize)}
              />
          </TabPanel>
        </TabPanels>
      </Tabs>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent className="dialog-confirm">
          <ModalHeader>Confirm terms</ModalHeader>
          <ModalCloseButton>
            <img src="/icons/close.png" />
          </ModalCloseButton>
          <ModalBody>
            <Text mb="1rem">Are you sure you want to cancel the offer ?</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Approve
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
})
export default Offering
