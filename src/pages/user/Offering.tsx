// import Pagination from "src/components/Pagination"
import { NftItem } from "src/components/NftItem"
import Sort from "src/components/Sort"
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
import { getNfts } from "src/services/nft"
import { useStore } from "src/hooks/useStore"
import network from "../data/network.json"
import { observer } from "mobx-react-lite"
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
  const [offset, setOffset] = useState(0)
  const [offset1, setOffset1] = useState(1)
  const [actionID, setActionID] = useState(null)
  const [makeOffer, setMakeOffer] = useState([])
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
      action: true,
    },
    {
      key: 2,
      type: "Listing",
      action: true,
    },
    {
      key: 3,
      type: "Offer",
      action: true,
    },
    {
      key: 4,
      type: "Auction",
      action: true,
    },
    {
      key: 5,
      type: "Sale",
      action: true,
    },
    {
      key: 6,
      type: "Auction",
      action: true,
    },
    {
      key: 7,
      type: "Offer",
      action: true,
    },
    {
      key: 8,
      type: "Listing",
      action: true,
    },
    {
      key: 9,
      type: "Sale",
      action: true,
    },
    {
      key: 10,
      action: true,
      type: "Sale",
    },
  ]
  const getdata = async () => {
    if (address) {
      const res = await getNfts({
        owner: null,
        aucPrice_gte: 0,
        _sort: "price",
        _order: made,
        _limit: pageSize,
        _page: Math.ceil(offset / pageSize),
      })
      setAuctions(res.data)
      setTotalAuc(res.total)
    }
  }
  useEffect(() => {
    setMakeOffer(dataSoure)
    getdata()
  }, [address])

  useEffect(() => {
    getdata()
  }, [made])

  // useEffect(() => {
  //   setOffset(Number(pageSize * currentPage - pageSize + 1))
  // }, [currentPage])

  useEffect(() => {
    setCurrentPage(Math.ceil(offset / pageSize))
    getdata()
  }, [pageSize, offset])

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
              {auctions.length == 0 ? (
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
                    pageSize={pageSize}
                    offset={offset}
                    onChangeOffset={(offset) => setOffset(offset)}
                    onChangPageSize={(pageSize) => setPageSize(pageSize)}
                  />
                  {/* <Pagination
                    className="pagination-bar"
                    currentPage={currentPage}
                    totalCount={totalAuc}
                    pageSize={pageSize}
                    onPageChange={(page) => setCurrentPage(page)}
                    onPageSizeChange={(pageSize) => setPageSize(pageSize)}
                  /> */}
                </>
              )}
            </div>
          </TabPanel>
          <TabPanel className="offering-make">
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
                    <Tr key={data.key}>
                      <Td>
                        <div className="item">
                          <img src="/icons/item.png" alt="" />
                          <div>
                            <Link href={"/collection/1"}>
                              <a>
                                <p className="to">
                                  Animverse{" "}
                                  <img src="/common/my-nft/check.png" alt="" />
                                </p>
                              </a>
                            </Link>
                            <Link href={"/nft/" + data.key}>
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
                        {data.action ? (
                          <button
                            onClick={() => {
                              setActionID(data.key)
                              onOpen()
                            }}
                          >
                            Cancel
                          </button>
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
              total={10}
              offset={offset}
              pageSize={pageSize1}
              onChangPageSize={(pageSize) => setPageSize1(pageSize)}
              onChangeOffset={(offset) => setOffset1(offset)}
            />
            {/* <Pagination
              className="pagination-bar"
              currentPage={currentPage1}
              totalCount={10}
              pageSize={pageSize1}
              onPageChange={(page) => setCurrentPage1(page)}
              onPageSizeChange={(pageSize) => setPageSize1(pageSize)}
            /> */}
          </TabPanel>
        </TabPanels>
      </Tabs>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent className="dialog-confirm">
          <ModalHeader>Confirm</ModalHeader>
          <ModalCloseButton>
            <img src="/icons/close.png" />
          </ModalCloseButton>
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
