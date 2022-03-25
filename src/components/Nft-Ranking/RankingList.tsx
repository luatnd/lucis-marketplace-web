import Pagination from "src/components/Pagination"
import Sort from "../Sort"
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import Link from "next/link"
import { AppSelect } from "../AppSelect"
import { networkType } from "src/pages/data/networkType"
import { AppPagination } from "../AppPagination"
import { observer } from "mobx-react-lite"
import { nftRanking } from "src/services/nft"
import { useStore } from "src/hooks/useStore"

export const RankingList = observer(() => {
  const BlockchainStore = useStore("BlockchainStore")
  const { blockchain_Array, blockchain_id } = BlockchainStore
  const [data, setData] = useState([])
  const [total, setTotal] = useState(0)
  const [offset, setOffset] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [time, setTime] = useState(7)
  const [blockchain_id0, setBlockchain_id0] = useState(1)

  const timeSort = [
    { label: "7 days", value: 7 },
    { label: "30 days", value: 30 },
  ]

  const getData = async () => {
    const chainID = blockchain_id ? blockchain_id : blockchain_id0
    const res = await nftRanking(chainID, time, pageSize, offset - 1)
    setData(res.data)
    setTotal(res.total)
  }
  useEffect(() => {
    getData()
  }, [time, blockchain_id0, offset, pageSize, blockchain_id])

  const handleChangeID = (el) => {
    setBlockchain_id0(el.value)
  }

  const handleChangeTime = (el) => {
    setTime(el.value)
  }

  return (
    <div className="ranking-list">
      <h1>nft ranking</h1>
      <div className="nft-search">
        <AppSelect
          options={blockchain_Array}
          isSearchable={false}
          className={blockchain_id ? "network hidden" : "network"}
          onChange={(el) => handleChangeID(el)}
          placeholder={
            <div className="placeholder">
              <img src="/common/all-network.png" alt="" />
              All network
            </div>
          }
        />
        <AppSelect
          options={timeSort}
          isSearchable={false}
          placeholder="7 days"
          onChange={(el) => handleChangeTime(el)}
        />
      </div>
      <div className="table-activity">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>STT</Th>
              <Th>Collection</Th>
              <Th isNumeric>Vol</Th>
              {/* <Th>24h</Th> */}
              {/* <Th>7day</Th> */}
              <Th isNumeric>Floor Price</Th>
              <Th isNumeric>Player</Th>
              <Th isNumeric>Item</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((el, index) => (
              <Tr key={el.id}>
                <Td>{index + offset}</Td>
                <Td>
                  <Link href={"/collection/" + el.id}>
                    <div className="collection">
                      <div className="border-rgba">
                        <img src={el.photo} alt="" />{" "}
                      </div>
                      <span>{el.name}</span>
                    </div>
                  </Link>
                </Td>
                <Td isNumeric>{el.rank_vol}</Td>
                {/* <Td>{Math.floor(Math.random() * 100)}%</Td> */}
                {/* <Td>{Math.floor(Math.random() * 100)}%</Td> */}
                <Td isNumeric>{el.rank_floor_price}</Td>
                <Td isNumeric>{el.player}</Td>
                <Td isNumeric>{el.rank_item}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </div>
      <AppPagination
        total={total}
        offset={offset}
        limit={pageSize}
        onChangeLimit={(pageSize) => setPageSize(pageSize)}
        onChangeOffset={(offset) => setOffset(offset)}
      />
    </div>
  )
})
