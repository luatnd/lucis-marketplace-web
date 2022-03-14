import { Button, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"
import receivedList from "../data/activities.json"
import Verified from "@static/icons/verified.svg"
import Sort from "src/components/Sort"
import { useStore } from "src/hooks/useStore"
import Pagination from "src/components/Pagination"
import { useState } from "react"

const ReceivedOffer = (props) => {
  const NftStore = useStore("NftStore")

  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  const totalData = Number(receivedList.length)

  const { info } = props

  const typeSort = [
    {
      img: "",
      name: "Newest",
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

  return (
    <>
      <div className="sort">
        <Sort customClassName="type-sort" options={typeSort} />
      </div>
      <div className="table-activity">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Item</Th>
              <Th>Price</Th>
              <Th>To</Th>
              <Th>Expiration</Th>
              <Th>Date</Th>
              {NftStore?.nft?.owner && <Th>Action</Th>}
            </Tr>
          </Thead>
          <Tbody>
            {receivedList.map((el, index) => (
              <Tr key={index}>
                <Td>
                  <div className="align-center item">
                    <div>
                      <img src="/icons/item.png" alt="" />
                    </div>
                    <div className="name-item">
                      <p className="animverse">
                        {info?.collection?.name}
                        <Verified />
                      </p>
                      <p>Hlyman</p>
                    </div>
                  </div>
                </Td>
                <Td>{el.price}</Td>
                <Td>{el.to}</Td>
                <Td>in 2 days</Td>
                <Td>
                  <span>{el.date}</span>
                </Td>
                {NftStore?.nft?.owner && (
                  <Td>
                    <Button className="accept">Accept</Button>
                    <Button className="cancel">
                      <span>Cancel</span>
                    </Button>
                  </Td>
                )}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </div>
      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={totalData}
        pageSize={pageSize}
        onPageChange={(page) => setCurrentPage(page)}
        onPageSizeChange={(pageSize) => setPageSize(pageSize)}
      />
    </>
  )
}

export default ReceivedOffer
