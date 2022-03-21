import { Input } from "@chakra-ui/react"
import { observer } from "mobx-react-lite"
import { useState } from "react"
import { useStore } from "src/hooks/useStore"
import { collectionService } from "src/services/CollectionService"
import { AppSpinner } from "../AppSpinner"
import { CollectionItem } from "../Home/CollectionItem"

let searchTimer

export const SearchBarMobile = observer(() => {
  const BlockchainStore = useStore("BlockchainStore")
  const { blockchain_id } = BlockchainStore

  const [resultVisible, setResultVisible] = useState(false)
  const [searchText, setSearchText] = useState<string>()
  const [loading, setLoading] = useState(false)

  const [result, setResult] = useState<any>()

  const fetchData = async (value) => {
    if (value) {
      const res = await collectionService.searchCollections({
        search: value,
        limit: 5,
        blockchain_id,
      })
      setResult(res)
      setLoading(false)
    }
  }

  const onSearch = async ({ target: { value } }) => {
    if (value) setResultVisible(true)
    else setResultVisible(false)
    setLoading(true)
    setResult(null)
    setSearchText(value)
    clearTimeout(searchTimer)
    searchTimer = setTimeout(() => {
      fetchData(value)
    }, 1000)
  }
  const handleBlur = () => {
    setTimeout(() => {
      setResultVisible(false)
    }, 100)
  }
  const handleFocus = () => {
    if (searchText) setResultVisible(true)
  }

  return (
    <div className="search-bar">
      <Input
        placeholder="Collection/ User/ address"
        value={searchText}
        onChange={onSearch}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {searchText ? (
        <div className="result-box">
          {loading ? (
            <AppSpinner />
          ) : (
            <div>
              {result?.length ? (
                result.map((collection) => (
                  <CollectionItem key={collection.id} info={collection} />
                ))
              ) : (
                <img src="/common/nodata.png" />
              )}
            </div>
          )}
        </div>
      ) : null}
    </div>
  )
})
