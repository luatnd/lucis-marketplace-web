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
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import Link from "next/link"
import { AppPagination } from "src/components/AppPagination"
import { AppSelect } from "src/components/AppSelect"
import { favoriteActivitiUser, mineActivitiUser } from "src/services/nft"
import { formatAddress } from "./FormatAddress"
import { formatTime } from "src/hooks/useCountdown"
import { useRouter } from "next/router"
import { useStore } from "src/hooks/useStore"
import { observer } from "mobx-react-lite"
const Activities = observer(() => {
  const BlockchainStore = useStore("BlockchainStore")
  const { blockchain_Array, blockchain_id } = BlockchainStore
  const router = useRouter()
  const { id } = router.query
  const [tab, setTab] = useState(0)

  const [data, setData] = useState([])
  const [total, setTotal] = useState(0)
  const [offset, setOffset] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [order, setOrder] = useState({
    reverse: true,
    order_by: "created_time",
  })
  const [blockchain_id2, setBlockchain_id2] = useState(0)

  const [data1, setData1] = useState([])
  const [total1, setTotal1] = useState(0)
  const [offset1, setOffset1] = useState(1)
  const [pagesize1, setPageSize1] = useState(10)
  const [order1, setOrder1] = useState({
    reverse: true,
    order_by: "created_time",
  })
  const [blockchain_id1, setBlockchain_id1] = useState(0)

  const typeSort = [
    {
      value: {
        reverse: true,
        order_by: "created_time",
      },
      label: "Recently listed",
    },
    {
      value: {
        reverse: false,
        order_by: "price",
      },
      label: "Price: Min to Max",
    },
    {
      value: {
        reverse: true,
        order_by: "price",
      },
      label: "Price: Max to Min",
    },
  ]
  // ====load data favotite tab
  const getdata = async () => {
    if (id) {
      const chainID = blockchain_id != 0 ? blockchain_id : blockchain_id2
      const res = await favoriteActivitiUser(
        id,
        chainID,
        pageSize,
        offset - 1,
        order.reverse,
        order.order_by
      )
      setData(res.data)
      setTotal(res.total)
    }
  }
  useEffect(() => {
    getdata()
  }, [id, pageSize, offset, order, blockchain_id, blockchain_id2, tab])
  // ==== load data mine tab
  const getdata1 = async () => {
    if (id) {
      const chainID = blockchain_id != 0 ? blockchain_id : blockchain_id1
      const res = await mineActivitiUser(
        id,
        chainID,
        pagesize1,
        offset1 - 1,
        order1.reverse,
        order1.order_by
      )
      setData1(res.data)
      setTotal1(res.total)
    }
  }
  useEffect(() => {
    getdata1()
  }, [id, pagesize1, offset1, order1, blockchain_id, blockchain_id1, tab])

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

  const handleChangeNetwork = (el) => {
    switch (tab) {
      case 0:
        setBlockchain_id2(el.value)
        break
      case 1:
        setBlockchain_id1(el.value)
        break
      default:
        break
    }
  }

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
              Favorites
            </Tab>
            <Tab
              onClick={() => {
                setTab(1)
              }}
            >
              mine
            </Tab>
          </TabList>
          <div className="right">
            <AppSelect
              options={blockchain_Array}
              isSearchable={false}
              className={blockchain_id ? "network hidden" : "network"}
              placeholder={
                <div className="placeholder">
                  <img src="/common/all-network.png" alt="" />
                  All network
                </div>
              }
              onChange={(el) => handleChangeNetwork(el)}
            />
            <AppSelect
              isSearchable={false}
              options={typeSort}
              placeholder="Recently listed"
              onChange={(el) => {
                handleChange(el)
              }}
            />
          </div>
        </div>
        <TabPanels>
          <TabPanel className="tab-activities">
            {total > 0 ? (
              <div className="border">
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>Type</Th>
                      <Th>Item</Th>
                      <Th isNumeric>Price</Th>
                      <Th>From</Th>
                      <Th>To</Th>
                      <Th>Date</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {data.map((data, index) => (
                      <Tr key={index}>
                        <Td>
                          {data.kind == 1
                            ? !data.buyer_address
                              ? "Listing"
                              : "Sale"
                            : data.kind == 2
                            ? "Offer"
                            : "Auction"}
                        </Td>
                        <Td className="item">
                          <Link href={"/nft/" + data.nft_item_id}>
                            <a>
                              <img src={data.photo} alt="" /> {data.name}
                            </a>
                          </Link>
                        </Td>
                        <Td isNumeric>
                          {data.price}{" "}
                          {blockchain_Array[data.blockchain_id].symbol}
                        </Td>
                        <Td>
                          {data.kind == 3 || data.kind == 2
                            ? data.buyer_address && (
                                <Link href={"/user/" + data.buyer_address}>
                                  <a>
                                    {data.buyer_name
                                      ? data.buyer_name
                                      : formatAddress(data.buyer_address, 6, 4)}
                                  </a>
                                </Link>
                              )
                            : data.seller_address && (
                                <Link href={"/user/" + data.seller_address}>
                                  <a>
                                    {data.seller_name
                                      ? data.seller_name
                                      : formatAddress(
                                          data.seller_address,
                                          6,
                                          4
                                        )}
                                  </a>
                                </Link>
                              )}
                        </Td>
                        <Td className="to">
                          {data.kind != 3 && data.kind != 2
                            ? data.buyer_address && (
                                <Link href={"/user/" + data.buyer_address}>
                                  <a>
                                    {data.buyer_name
                                      ? data.buyer_name
                                      : formatAddress(data.buyer_address, 6, 4)}
                                  </a>
                                </Link>
                              )
                            : data.seller_address && (
                                <Link href={"/user/" + data.seller_address}>
                                  <a>
                                    {data.seller_name
                                      ? data.seller_name
                                      : formatAddress(
                                          data.seller_address,
                                          6,
                                          4
                                        )}
                                  </a>
                                </Link>
                              )}
                        </Td>
                        <Td className="date">
                          {formatTime(data.created_time, false)}{" "}
                          {data.kind == 1 && !data.buyer_address ? null : (
                            <a
                              href={
                                "https://testnet.bscscan.com/tx/" +
                                data.transaction_id
                              }
                              target={"_blank"}
                              rel="noreferrer"
                            >
                              <img src="/icons/open-new.png" alt="" />
                            </a>
                          )}
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </div>
            ) : (
              <img className="nodata" src="/common/my-nft/nodata.png" alt="" />
            )}
            {total ? (
              <AppPagination
                total={total}
                offset={offset}
                limit={pageSize}
                onChangeLimit={(pageSize) => setPageSize(pageSize)}
                onChangeOffset={(offset) => setOffset(offset)}
              />
            ) : null}
          </TabPanel>
          <TabPanel className="tab-activities">
            {total1 ? (
              <div className="border">
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>Type</Th>
                      <Th>Item</Th>
                      <Th isNumeric>Price</Th>
                      <Th>From</Th>
                      <Th>To</Th>
                      <Th>Date</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {data1.map((data, index) => (
                      <Tr key={index}>
                        <Td>
                          {data.kind == 1
                            ? !data.buyer_address
                              ? "Listing"
                              : "Sale"
                            : data.kind == 2
                            ? "Offer"
                            : "Auction"}
                        </Td>
                        <Td className="item">
                          <Link href={"/nft/" + data.nft_item_id}>
                            <a>
                              <img src={data.photo} alt="" /> {data.name}
                            </a>
                          </Link>
                        </Td>
                        <Td isNumeric>
                          {data.price}{" "}
                          {blockchain_Array[data.blockchain_id].symbol}
                        </Td>
                        <Td>
                          {data.kind == 3 || data.kind == 2
                            ? data.buyer_address && (
                                <Link href={"/user/" + data.buyer_address}>
                                  <a>
                                    {data.buyer_name
                                      ? data.buyer_name
                                      : formatAddress(data.buyer_address, 6, 4)}
                                  </a>
                                </Link>
                              )
                            : data.seller_address && (
                                <Link href={"/user/" + data.seller_address}>
                                  <a>
                                    {data.seller_name
                                      ? data.seller_name
                                      : formatAddress(
                                          data.seller_address,
                                          6,
                                          4
                                        )}
                                  </a>
                                </Link>
                              )}
                        </Td>
                        <Td className="to">
                          {data.kind != 3 && data.kind != 2
                            ? data.buyer_address && (
                                <Link href={"/user/" + data.buyer_address}>
                                  <a>
                                    {data.buyer_name
                                      ? data.buyer_name
                                      : formatAddress(data.buyer_address, 6, 4)}
                                  </a>
                                </Link>
                              )
                            : data.seller_address && (
                                <Link href={"/user/" + data.seller_address}>
                                  <a>
                                    {data.seller_name
                                      ? data.seller_name
                                      : formatAddress(
                                          data.seller_address,
                                          6,
                                          4
                                        )}
                                  </a>
                                </Link>
                              )}
                        </Td>
                        <Td className="date">
                          {formatTime(data.created_time, false)}{" "}
                          {data.kind == 1 && !data.buyer_address ? null : (
                            <a
                              href={
                                "https://testnet.bscscan.com/tx/" +
                                data.transaction_id
                              }
                              target={"_blank"}
                              rel="noreferrer"
                            >
                              <img src="/icons/open-new.png" alt="" />
                            </a>
                          )}
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </div>
            ) : (
              <img className="nodata" src="/common/my-nft/nodata.png" alt="" />
            )}
            {total1 ? (
              <AppPagination
                total={total1}
                offset={offset1}
                limit={pagesize1}
                onChangeLimit={(pageSize) => setPageSize1(pageSize)}
                onChangeOffset={(offset) => setOffset1(offset)}
              />
            ) : null}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  )
})
export default Activities
