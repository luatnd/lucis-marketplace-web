import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"
import { observer } from "mobx-react-lite"
import Link from "next/link"
import { useEffect, useState } from "react"
import { AppPagination } from "src/components/AppPagination"
import { AppSelect } from "src/components/AppSelect"
import { formatTime } from "src/hooks/useCountdown"
import { useStore } from "src/hooks/useStore"
import { getNftEventList } from "src/services/nft"
import { ListingBar } from "../components/Home/ListingBar"
import { formatAddress } from "./user/FormatAddress"

const ActivitiesPage = observer(() => {
  const BlockchainStore = useStore("BlockchainStore")
  const { blockchain_Array, blockchain_id } = BlockchainStore

  const [offset, setOffset] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [data, setData] = useState([])
  const [totalData, setTotalData] = useState(0)
  const [type, setType] = useState(0)
  const [blockchain_id0, setBlockchain_id0] = useState(0)
  const typeSort = [
    {
      value: 0,
      label: "All",
    },
    {
      value: 4,
      label: "Listing",
    },
    {
      value: 2,
      label: "Offer",
    },
    {
      value: 3,
      label: "Auction",
    },
    {
      value: 1,
      label: "Sale",
    },
  ]

  const getData = async () => {
    const chainID = blockchain_id ? blockchain_id : blockchain_id0
    const res = await getNftEventList(3806)
    setData(res.data)
    setTotalData(res.total)
  }
  useEffect(() => {
    getData()
  }, [blockchain_id, blockchain_id0, offset, pageSize, type])

  const handleChange = (el) => {
    setType(el.value)
  }

  const handleBlockchain_id = (el) => {
    setBlockchain_id0(el.value)
  }

  return (
    <div className="activities-page">
      <ListingBar />
      <h1 className="activities">Activities</h1>
      <div className="sort">
        <AppSelect
          options={blockchain_Array}
          isSearchable={false}
          className={blockchain_id ? "network hidden" : "network"}
          onChange={(el) => handleBlockchain_id(el)}
          placeholder={
            <div className="placeholder">
              <img src="/common/all-network.png" alt="" />
              All network
            </div>
          }
        />
        <AppSelect
          options={typeSort}
          placeholder="All"
          isSearchable={false}
          onChange={handleChange}
        />
      </div>
      <div>
        <div className="table-activity">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Type</Th>
                <Th>Item</Th>
                <Th>Price</Th>
                <Th>From</Th>
                <Th>To</Th>
                <Th>Date</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map((el, index) => (
                <Tr key={index}>
                  <Td>
                    {" "}
                    {el.type == 1
                      ? "Sale"
                      : el.type == 2
                      ? "Offer"
                      : el.type == 3
                      ? "Auction"
                      : "Listing"}
                  </Td>
                  <Td>
                    <div className="align-center type">
                      <img src="/icons/item.png" alt="" />
                      <Link href={"/nft/" + el.nft_item_id}>
                        <span>{el.item}</span>
                      </Link>
                    </div>
                  </Td>
                  <Td>{el.price}</Td>
                  <Td>
                    <a
                      target="_blank"
                      rel="noreferrer"
                      className="align-center date"
                      href={"/user/" + el.from_address}
                    >
                      {formatAddress(el.from_address, 6, 4)}
                    </a>
                  </Td>
                  <Td>
                    {el.type != 4 && (
                      <>
                        <a
                          target="_blank"
                          rel="noreferrer"
                          className="align-center date"
                          href={"/user/" + el.to_address}
                          style={{ color: "rgba(11, 235, 214, 1)" }}
                        >
                          {formatAddress(el.to_address, 6, 4)}
                        </a>
                      </>
                    )}
                  </Td>
                  <Td>
                    <a
                      target="_blank"
                      rel="noreferrer"
                      className="align-center date"
                      href={
                        "https://testnet.bscscan.com/tx/" + el.transaction_id
                      }
                    >
                      <span>{formatTime(el.created_time, false)}</span>
                      {el.type != 4 && <img src="/icons/open-new.png" alt="" />}
                    </a>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </div>
      </div>
      <AppPagination
        offset={offset}
        limit={pageSize}
        total={totalData}
        onChangeLimit={(pageSize) => setPageSize(pageSize)}
        onChangeOffset={(offset) => setOffset(offset)}
      />
    </div>
  )
})
export default ActivitiesPage
