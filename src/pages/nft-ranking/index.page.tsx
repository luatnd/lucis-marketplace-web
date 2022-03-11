import { ListingBar } from "../../components/Home/ListingBar"
import { RankingList } from "../../components/Nft-Ranking/RankingList"
import { GetServerSidePropsContext } from "next"
import { getCollections } from "src/services/nft"

const NftRanking = (props) => {
  const {
    collections,
  } = props
  
  return (
    <div className="nft-ranking">
      <ListingBar />
      <RankingList collections={collections}/>
    </div>
  )
}
export default NftRanking

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const [
    collections,
  ] = await Promise.all([
    getCollections()
  ])

  return {
    props: {
      collections
    },
  }
}