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
import { networkType } from "../data/networkType"
import { favoriteActivitiUser, mineActivitiUser } from "src/services/nft"
import { formatAddress } from "./FormatAddress"
import { formatTime } from "src/hooks/useCountdown"
import { useRouter } from "next/router"
const Activities = () => {
  const router = useRouter()
  const { id } = router.query

  const [data, setData] = useState([])
  const [total, setTotal] = useState(0)
  const [offset, setOffset] = useState(0)
  const [pageSize, setPageSize] = useState(10)

  const [data1, setData1] = useState([])
  const [total1, setTotal1] = useState(0)
  const [offset1, setOffset1] = useState(0)
  const [pagesize1, setPageSize1] = useState(10)

  const madeSort = [
    {
      img: "",
      name: "Recently listed",
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
  const typeSort = [
    {
      value: "",
      label: "Recently listed",
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
  // ====load data favotite tab
  const getdata = async () => {
    if (id) {
      const res = await favoriteActivitiUser(id,1)
      setData(res.data)
      setTotal(res.total)
    }
  }
  useEffect(() => {
    getdata()
  }, [id, pageSize, offset])
  // ==== load data mine tab
  const getdata1 = async () => {
    if (id) {
      const res = await mineActivitiUser(id,1)
      setData1(res.data)
      setTotal1(res.total)
    }
  }
  useEffect(() => {
    getdata1()
  }, [id, pagesize1, offset1])

  return (
    <div className="tab">
      <Tabs align="center">
        <div className="tab-sort">
          <TabList>
            <Tab>Favorites</Tab>
            <Tab>mine</Tab>
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
              options={typeSort}
              placeholder="Recently listed"
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
                    {data.map((data) => (
                      <Tr key={data.key}>
                        <Td>
                          {data.kind == 1
                            ? "Sale"
                            : data.kind == 2
                            ? "Offer"
                            : data.kind == 3
                            ? "Auction"
                            : "Listing"}
                        </Td>
                        <Td className="item">
                          <Link href={"/nft/" + data.key}>
                            <a>
                              <img src={data.photo} alt="" /> {data.name}
                            </a>
                          </Link>
                        </Td>
                        <Td isNumeric>{data.price}</Td>
                        <Td>
                          <Link href={"/user/" + data.from}>
                            <a>{data.seller_name}</a>
                          </Link>
                        </Td>
                        <Td className="to">
                          <Link href={"/user/" + data.transaction_id}>
                            <a>{formatAddress(data.transaction_id, 6, 4)}</a>
                          </Link>
                        </Td>
                        <Td className="date">
                          {formatTime(data.created_time, false)}{" "}
                          {data.kind != 4 ? (
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
                          ) : null}
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
                pageSize={pageSize}
                onChangPageSize={(pageSize) => setPageSize(pageSize)}
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
                    {data1.map((data) => (
                      <Tr key={data.key}>
                        <Td>
                          {data.kind == 1
                            ? "Sale"
                            : data.kind == 2
                            ? "Offer"
                            : data.kind == 3
                            ? "Auction"
                            : "Listing"}
                        </Td>
                        <Td className="item">
                          <Link href={"/nft/" + data.key}>
                            <a>
                              <img src={data.photo} alt="" /> {data.name}
                            </a>
                          </Link>
                        </Td>
                        <Td isNumeric>{data.price}</Td>
                        <Td>
                          <Link href={"/user/" + data.from}>
                            <a>{data.seller_name}</a>
                          </Link>
                        </Td>
                        <Td className="to">
                          <Link href={"/user/" + data.transaction_id}>
                            <a>{formatAddress(data.transaction_id, 6, 4)}</a>
                          </Link>
                        </Td>
                        <Td className="date">
                          {formatTime(data.created_time, false)}{" "}
                          {data.kind != 4 ? (
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
                          ) : null}
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
                pageSize={pagesize1}
                onChangPageSize={(pageSize) => setPageSize1(pageSize)}
                onChangeOffset={(offset) => setOffset1(offset)}
              />
            ) : null}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  )
}
export default Activities
