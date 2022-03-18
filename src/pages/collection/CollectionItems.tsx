import { useState } from "react"
import { AppPagination } from "src/components/AppPagination"
import { AppSelect } from "src/components/AppSelect"
import { NftItem } from "src/components/NftItem"

export const CollectionItems = () => {
  const [data, setData] = useState<any>()
  const [total, setTotal] = useState(0)
  const [offset, setOffset] = useState(0)
  const [limit, setLimit] = useState(20)

  return (
    <div className="collection-item-list">
      <div className="filter-row">
        <div className="total">{20} items listed</div>
        <div className="filter">
          <AppSelect
            placeholder="Type"
            isSearchable={false}
            options={[
              {
                label: "Type",
                value: null,
              },
              {
                label: "Fixed price",
                value: false,
              },
              {
                label: "Auction",
                value: true,
              },
            ]}
          />
          <AppSelect
            placeholder="Price: Min to Max"
            isSearchable={false}
            options={[
              {
                label: "Price: Min to Max",
                value: "asc",
              },
              {
                label: "Price: Max to Min",
                value: "desc",
              },
            ]}
          />
        </div>
      </div>
      <div className="item-list">
        {data?.map((item) => (
          <NftItem info={item} key={item.id} />
        ))}
      </div>
      <AppPagination
        total={total}
        offset={offset}
        limit={limit}
        onChangeOffset={(value) => setOffset(value)}
        onChangeLimit={(value) => setLimit(value)}
      />
    </div>
  )
}
