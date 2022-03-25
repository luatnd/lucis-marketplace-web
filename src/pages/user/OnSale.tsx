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
import { NftItem } from "../../components/NftItem"
import { useEffect, useState } from "react"
import Verified from "@static/icons/verified.svg"
import Link from "next/link"
import { onsaleUser } from "src/services/nft"
import { useStore } from "src/hooks/useStore"
import { observer } from "mobx-react-lite"
import { AppPagination } from "src/components/AppPagination"
import { useRouter } from "next/router"
import { formatAddress } from "./FormatAddress"
import { formatTime } from "src/hooks/useCountdown"
const OnSale = observer(() => {
  const BlockchainStore = useStore("BlockchainStore")
  const { blockchain_Array, blockchain_id } = BlockchainStore
  const [order, setOrder] = useState({
    reverse: true,
    order_by: "created_time",
  })
  const [order1, setOrder1] = useState({
    reverse: true,
    order_by: "created_time",
  })
  const [order2, setOrder2] = useState({
    reverse: true,
    order_by: "created_time",
  })
  const [data, setData] = useState([])
  const [data1, setData1] = useState([])
  const [data2, setData2] = useState([])
  const [pageSize, setPageSize] = useState(20)
  const [pageSize1, setPageSize1] = useState(20)
  const [pageSize2, setPageSize2] = useState(10)
  const [offset, setOffset] = useState(1)
  const [offset1, setOffset1] = useState(1)
  const [offset2, setOffset2] = useState(1)
  const [totalData, setTotalData] = useState(0)
  const [totalData1, setTotalData1] = useState(0)
  const [totalData2, setTotalData2] = useState(0)
  const [blockchain_id0, setBlockchain_id0] = useState(0)
  const [blockchain_id1, setBlockchain_id1] = useState(0)
  const [blockchain_id2, setBlockchain_id2] = useState(0)
  const router = useRouter()
  const { id } = router.query
  const { isOpen, onOpen, onClose } = useDisclosure()

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
  // ==== lấy và lọc dữ liệu selling với địa chỉ id (address của người dùng)
  const getdata = async () => {
    if (id) {
      const chainID = blockchain_id ? blockchain_id : blockchain_id0
      const res = await onsaleUser(
        pageSize,
        offset - 1,
        order.reverse,
        order.order_by,
        id,
        1,
        chainID
      )
      setData(res.data)
      setTotalData(res.total)
    }
  }
  useEffect(() => {
    getdata()
  }, [id, pageSize, offset, order, blockchain_id0, blockchain_id])
  // ==== lấy và lọc dữ liệu auction với địa chỉ id (address của người dùng)
  const getdata1 = async () => {
    if (id) {
      const chainID = blockchain_id ? blockchain_id : blockchain_id1
      const res = await onsaleUser(
        pageSize1,
        offset1 - 1,
        order1.reverse,
        order1.order_by,
        id,
        3,
        chainID
      )
      setData1(res.data)
      setTotalData1(res.total)
    }
  }
  useEffect(() => {
    getdata1()
  }, [id, pageSize1, offset1, order1, blockchain_id1, blockchain_id])
  // ==== lấy và lọc dữ liệu offer với địa chỉ id (address của người dùng)
  const getdata2 = async () => {
    if (id) {
      const chainID = blockchain_id ? blockchain_id : blockchain_id2
      const res = await onsaleUser(
        pageSize2,
        offset2 - 1,
        order2.reverse,
        order2.order_by,
        id,
        2,
        chainID
      )
      setData2(res.data)
      setTotalData2(res.total)
    }
  }
  useEffect(() => {
    getdata2()
  }, [id, pageSize2, offset2, order2, blockchain_id2, blockchain_id])
  // ==== Thay đổi bộ lọc giá của các tabs
  const handleChange = (el, i) => {
    switch (i) {
      case 1:
        setOrder(el.value)
        break
      case 2:
        setOrder1(el.value)
        break
      case 3:
        setOrder2(el.value)
        break
      default:
        break
    }
  }

  const handleBlockchain_id = (el, i) => {
    switch (i) {
      case 0:
        setBlockchain_id0(el.value)
        break
      case 1:
        setBlockchain_id1(el.value)
        break
      case 2:
        setBlockchain_id2(el.value)
        break
      default:
        break
    }
  }

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
              <AppSelect
                options={blockchain_Array}
                isSearchable={false}
                className={blockchain_id ? "network hidden" : "network"}
                onChange={(el) => handleBlockchain_id(el, 0)}
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
            {!totalData ? (
              <img className="nodata" src="/common/my-nft/nodata.png" alt="" />
            ) : (
              <>
                <div className="">
                  <div className="grid-custom">
                    {data.map((auction) => (
                      <div className="grid-item" key={auction.id}>
                        <NftItem
                          info={{
                            id: auction.nft_item_id,
                            name: auction.name,
                            price: auction.price,
                            photo: auction.photo,
                            owner: auction.address,
                            contract_name: auction.contract_name,
                            collection_id: auction.inventory_id,
                            blockchain_id: auction.blockchain_id,
                            inventory_status: 1,
                            endTime: auction.deadline,
                            symbol:
                              blockchain_Array[auction.blockchain_id].symbol,
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <AppPagination
                  total={totalData}
                  offset={offset}
                  limit={pageSize}
                  onChangeLimit={(pageSize) => setPageSize(pageSize)}
                  onChangeOffset={(offset) => setOffset(offset)}
                />
              </>
            )}
          </TabPanel>
          <TabPanel>
            <div className="sort">
              <AppSelect
                options={blockchain_Array}
                isSearchable={false}
                className={blockchain_id ? "network hidden" : "network"}
                onChange={(el) => handleBlockchain_id(el, 1)}
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
            {!totalData1 ? (
              <img className="nodata" src="/common/my-nft/nodata.png" alt="" />
            ) : (
              <>
                <div className="">
                  <div className="grid-custom">
                    {data1.map((auction) => (
                      <div className="grid-item" key={auction.id}>
                        <NftItem
                          info={{
                            id: auction.nft_item_id,
                            name: auction.name,
                            price: auction.current_price,
                            photo: auction.photo,
                            owner: auction.address,
                            contract_name: auction.contract_name,
                            collection_id: auction.inventory_id,
                            blockchain_id: auction.blockchain_id,
                            inventory_status: 2,
                            endTime: auction.deadline,
                            symbol:
                              blockchain_Array[auction.blockchain_id].symbol,
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <AppPagination
                  total={totalData1}
                  limit={pageSize1}
                  offset={offset1}
                  onChangeLimit={(pageSize) => setPageSize1(pageSize)}
                  onChangeOffset={(offset) => setOffset1(offset)}
                />
              </>
            )}
          </TabPanel>
          <TabPanel>
            <div className="sort">
              <AppSelect
                options={blockchain_Array}
                isSearchable={false}
                className={blockchain_id ? "network hidden" : "network"}
                onChange={(el) => handleBlockchain_id(el, 2)}
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
            {!totalData2 ? (
              <img className="nodata" src="/common/my-nft/nodata.png" alt="" />
            ) : (
              <>
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
                        {data2.map((el, index) => (
                          <Tr key={index}>
                            <Td>
                              <div className="align-center item">
                                <div>
                                  <img src={el.photo} alt="" />
                                </div>
                                <div className="name-item">
                                  <Link href={"/collection/" + el.parent_id}>
                                    <a>
                                      <p className="animverse">
                                        {el.contract_name}
                                        <Verified />
                                      </p>
                                    </a>
                                  </Link>
                                  <Link href={"/nft/" + el.nft_item_id}>
                                    <a>
                                      <p>{el.name}</p>
                                    </a>
                                  </Link>
                                </div>
                              </div>
                            </Td>
                            <Td>
                              {el.current_price}{" "}
                              {blockchain_Array[el.blockchain_id].symbol}
                            </Td>
                            <Td className="to">
                              <Link href={"/user/" + el.buyer}>
                                <a>{formatAddress(el.buyer, 6, 4)}</a>
                              </Link>
                            </Td>
                            <Td>{formatTime(el.deadline, true)}</Td>
                            <Td>
                              <span>{formatTime(el.created_time, false)}</span>
                            </Td>
                            <Td>
                              <div>
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
                              </div>
                            </Td>
                          </Tr>
                        ))}
                      </Tbody>
                    </Table>
                  </div>
                </div>
                <AppPagination
                  total={totalData2}
                  offset={offset2}
                  limit={pageSize2}
                  onChangeLimit={(pageSize) => setPageSize2(pageSize)}
                  onChangeOffset={(offset) => setOffset2(offset)}
                />
              </>
            )}

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
