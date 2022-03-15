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
import { getNfts } from "src/services/nft"
import { useStore } from "src/hooks/useStore"
import { networkType } from "../data/networkType"
import { observer } from "mobx-react-lite"
import { AppSelect } from "src/components/AppSelect"
const Offering = observer(() => {
  const WalletController = useStore("WalletController")
  const { address } = WalletController
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [price, setPrice] = useState("All")
  const [made, setMade] = useState("null")
  const [pageSize, setPageSize] = useState(20)
  const [pageSize1, setPageSize1] = useState(10)
  const [auctions, setAuctions] = useState([])
  const [totalAuc, setTotalAuc] = useState(0)
  const [offset, setOffset] = useState(0)
  const [offset1, setOffset1] = useState(1)
  const [actionID, setActionID] = useState(null)
  const [makeOffer, setMakeOffer] = useState([])
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
  const handleChange = (el) => {
    setMade(el.value)
  }
  const getdata = async () => {
    if (address) {
      const res = await getNfts({
        owner_ne: address,
        aucPrice_gte: 0,
        _sort: "topAuc",
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

  useEffect(() => {
    getdata()
  }, [pageSize, offset])

  return (
    <div className="tab">
      <Tabs align="center">
        <div className="tab-sort">
          <TabList>
            <Tab>auction</Tab>
            <Tab>Make Offer</Tab>
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
              total={10}
              offset={offset1}
              pageSize={pageSize1}
              onChangPageSize={(pageSize) => setPageSize1(pageSize)}
              onChangeOffset={(offset) => setOffset1(offset)}
            />
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
