import { Listing } from "../../components/Home/Listing"
import { RankingList } from "../../components/Nft-Ranking/RankingList"
import Pagination from "src/components/Pagination"
import { useState } from "react"
const NftRanking = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  return (
    <div className="nft-ranking">
      <Listing />
      <RankingList />
      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={500}
        pageSize={10}
        onPageChange={(page) => setCurrentPage(page)}
        onPageSizeChange={(pageSize) => setPageSize(pageSize)}
      />
    </div>
  )
}
export default NftRanking
