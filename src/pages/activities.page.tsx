import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"
import { observer } from "mobx-react-lite"
import Link from "next/link"
import { useEffect, useState } from "react"
import { AppPagination } from "src/components/AppPagination"
import { AppSelect } from "src/components/AppSelect"
import { formatTime } from "src/hooks/useCountdown"
import { useStore } from "src/hooks/useStore"
import { getNftEventList } from "src/services/nft"
import { formatNftPrice } from "src/utils/Number"
import { ListingBar } from "../components/Home/ListingBar"
import { formatAddress } from "./user/FormatAddress"

const ActivitiesPage = observer(() => {
  const BlockchainStore = useStore("BlockchainStore")
  const { blockchain_Array, blockchain_id } = BlockchainStore

  const [offset, setOffset] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [data, setData] = useState([])
  const [totalData, setTotalData] = useState(0)
  const [type, setType] = useState({
    kind: 0,
    status: 0,
  })
  const [blockchain_id0, setBlockchain_id0] = useState(0)
  const typeSort = [
    {
      value: {
        kind: 0,
        status: 0,
      },
      label: "All",
    },
    {
      value: {
        kind: 1,
        status: 0,
      },
      label: "Listing",
    },
    {
      value: {
        kind: 2,
        status: 0,
      },
      label: "Offer",
    },
    {
      value: {
        kind: 3,
        status: 0,
      },
      label: "Auction",
    },
    {
      value: {
        kind: 1,
        status: 1,
      },
      label: "Sale",
    },
  ]

  const getData = async () => {
    const chainID = blockchain_id ? blockchain_id : blockchain_id0
    const res = await getNftEventList(
      0,
      chainID,
      type.kind,
      pageSize,
      offset - 1,
      type.status
    )
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
                    {el.kind == 1
                      ? el.status
                        ? "Sale"
                        : "Listing"
                      : el.kind == 2
                      ? "Offer"
                      : "Auction"}
                  </Td>
                  <Td>
                    <div className="align-center type bold">
                      <img src={el.photo} alt="" />
                      <Link href={"/nft/" + el.nft_item_id}>
                        <span>{el.name}</span>
                      </Link>
                    </div>
                  </Td>
                  <Td>
                    {el.price ? formatNftPrice(el.price) : "--"}{" "}
                    {blockchain_Array[el.blockchain_id]?.symbol}
                  </Td>
                  <Td>
                    {el.kind == 1
                      ? el.seller && (
                          <a
                            target="_blank"
                            rel="noreferrer"
                            className="align-center date"
                            href={"/user/" + el.seller}
                          >
                            {el.seller_name
                              ? el.seller_name
                              : formatAddress(el.seller, 6, 4)}
                          </a>
                        )
                      : el.buyer && (
                          <a
                            target="_blank"
                            rel="noreferrer"
                            className="align-center date"
                            href={"/user/" + el.buyer}
                          >
                            {el.buyer_name
                              ? el.buyer_name
                              : formatAddress(el.buyer, 6, 4)}
                          </a>
                        )}
                  </Td>
                  <Td>
                    {el.kind == 1
                      ? el.status == 1 && (
                          <a
                            target="_blank"
                            rel="noreferrer"
                            className="align-center date"
                            href={"/user/" + el.buyer}
                          >
                            {el.buyer_name
                              ? el.buyer_name
                              : formatAddress(el.buyer, 6, 4)}
                          </a>
                        )
                      : el.seller && (
                          <a
                            target="_blank"
                            rel="noreferrer"
                            className="align-center date"
                            href={"/user/" + el.seller}
                          >
                            {el.seller_name
                              ? el.seller_name
                              : formatAddress(el.seller, 6, 4)}
                          </a>
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
