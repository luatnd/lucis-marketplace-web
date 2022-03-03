import { Listing } from "../../components/Home/Listing"
import { RankingList } from "../../components/Nft-Ranking/RankingList"
import { Pagination } from "../../components/Nft-Ranking/Pagination"
const NftRanking = () => {
  return (
    <div className="nft-ranking">
      <Listing />
      <RankingList />
      <Pagination />
    </div>
  )
}
export default NftRanking
