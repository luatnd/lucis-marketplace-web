import Pagination from "src/components/Pagination"
import Sort from "../Sort"
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import Link from "next/link"

export const RankingList = (props) => {
  const { collections } = props

  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [data, setData] = useState([])

  useEffect(() => {
    const firstPageIndex = (currentPage - 1) * pageSize
    const lastPageIndex = firstPageIndex + pageSize
    setData(collections.slice(firstPageIndex, lastPageIndex))
  }, [currentPage, pageSize, collections])

  const priceSort = [
    { img: "/common/bnb.png", name: "BNB chain" },
    { img: "/common/ethereum.png", name: "Ethereum" },
    { img: "/common/celo.png", name: "Celo" },
    { img: "/common/aurora.png", name: "Aurora" },
    { img: "/common/arbitrum.png", name: "Arbitrum" },
    { img: "/common/fantom.png", name: "Fantom" },
  ]
  const timeSort = [
    { img: "", name: "7 days" },
    { img: "", name: "30 days" },
  ]

  return (
    <div className="ranking-list">
      <h1>nft ranking</h1>
      <div className="nft-search">
        <Sort customClassName="price-sort" options={priceSort} />
        <Sort customClassName="type-sort" options={timeSort} />
      </div>
      <div className="table-activity">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>STT</Th>
              <Th>Collection</Th>
              <Th isNumeric>Vol</Th>
              <Th>24h</Th>
              <Th>7day</Th>
              <Th isNumeric>Floor Price</Th>
              <Th isNumeric>Player</Th>
              <Th>Item</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((el) => (
              <Tr key={el.id}>
                <Td>{el.id}</Td>
                <Td>
                  <Link href={"collection/" + el.id}>
                    <div className="collection">
                      <div className="border-rgba">
                        <img src={el.logo} alt="" />{" "}
                      </div>
                      <span>{el.name}</span>
                    </div>
                  </Link>
                </Td>
                <Td isNumeric>{el.stats.volume} BNB</Td>
                <Td>{Math.floor(Math.random() * 100)}%</Td>
                <Td>{Math.floor(Math.random() * 100)}%</Td>
                <Td isNumeric>{el.stats.floorPrice}</Td>
                <Td isNumeric>{el.stats.player}</Td>
                <Td>{el.stats.traded}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </div>
      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={collections.length}
        pageSize={pageSize}
        onPageChange={(page) => setCurrentPage(page)}
        onPageSizeChange={(pageSize) => setPageSize(pageSize)}
      />
    </div>
  )
}
