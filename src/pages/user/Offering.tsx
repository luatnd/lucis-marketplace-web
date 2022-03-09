import Pagination from "src/components/Pagination"
import { NftItem } from "src/components/NftItem"
import Sort from "src/components/Sort"
import auctions from "../data/auctions.json"
import network from "../data/network.json"
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
const Offering = () => {
  const [data, setData] = useState([])
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [price, setPrice] = useState("All")
  const [made, setMade] = useState("All")
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(20)

  useEffect(() => {
    const firstPageIndex = (currentPage - 1) * pageSize
    const lastPageIndex = firstPageIndex + pageSize
    setData(auctions.slice(firstPageIndex, lastPageIndex))
  }, [currentPage, pageSize])
  const priceSort = [
    { img: "/common/bnb.png", name: "BNB chain" },
    { img: "/common/walletConnect.png", name: "WalletConnect" },
    { img: "/common/ethereum.png", name: "Ethereum" },
    { img: "/common/celo.png", name: "Celo" },
    { img: "/common/aurora.png", name: "Aurora" },
    { img: "/common/arbitrum.png", name: "Arbitrum" },
    { img: "/common/fantom.png", name: "Fantom" },
  ]
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
  return (
    <div className="tab">
      <Tabs>
        <div className="tab-sort">
          <TabList>
            <Tab
              onClick={() => {
                setPageSize(20)
              }}
            >
              auction
            </Tab>
            <Tab
              onClick={() => {
                setPageSize(10)
              }}
            >
              Make Offer
            </Tab>
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
              onSelectOption={(made) => setMade(price)}
            />
          </div>
        </div>
        <TabPanels>
          <TabPanel>
            <div className="offering-auction">
              <div className="list">
                {data.map((auction) => (
                  <NftItem
                    key={auction.id}
                    name={auction.name}
                    image={auction.image}
                    provider={auction.provider}
                    endTime={auction.endTime}
                    price={auction.price}
                    activeBtn={true}
                    auction={true}
                  />
                ))}
              </div>
              <Pagination
                className="pagination-bar"
                currentPage={currentPage}
                totalCount={auctions.length}
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
                      <Link href={"/user/profile-other"}>
                        <a>
                          <div className="item">
                            <img src="/icons/item.png" alt="" />
                            <div>
                              <p>
                                Animverse{" "}
                                <img src="/common/my-nft/check.png" alt="" />
                              </p>
                              <p>CUONG DOLLA NFT</p>
                            </div>
                          </div>
                        </a>
                      </Link>
                    </Td>
                    <Td isNumeric>26.94 BNB</Td>
                    <Td>Nhi</Td>
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
              currentPage={currentPage}
              totalCount={dataSoure.length}
              pageSize={pageSize}
              onPageChange={(page) => setCurrentPage(page)}
              onPageSizeChange={(pageSize) => setPageSize(pageSize)}
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
}
export default Offering
