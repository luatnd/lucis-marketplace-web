import { Button, Icon, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"
import Verified from "@static/icons/verified.svg"
import Pagination from "src/components/Pagination"
import { useEffect, useState } from "react"
import { ExternalLink } from "react-feather"
import { useRouter } from "next/router"
import { getAuctionItem } from "src/services/nft"
import { AppPagination } from "src/components/AppPagination"
import { formatAddress } from "../user/FormatAddress"
import { formatTime } from "src/hooks/useCountdown"

const Auction = () => {
  const router = useRouter()
  const { id } = router.query
  const [pageSize, setPageSize] = useState(10)
  const [offset, setOffset] = useState(1)
  const [data, setData] = useState([])
  const [totalData, setTotalData] = useState(0)

  const getData = async () => {
    if (id) {
      const res = await getAuctionItem(id, pageSize, offset - 1)
      setData(res.data)
    }
  }
  useEffect(() => {
    getData()
  }, [id, offset, pageSize])

  return (
    <>
      <div className="table-activity">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Address</Th>
              <Th>Auc</Th>
              <Th isNumeric>Lead</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((el, index) => (
              <Tr key={index}>
                <Td>
                  <div className="align-center item">
                    <div>
                      <img src={el.photo} alt="" />
                    </div>
                    <div className="name-item">
                      {formatAddress(el.currency, 6, 4)}
                    </div>
                  </div>
                </Td>
                <Td>
                  <p>{el.price}</p>
                  <p>{el.usd}</p>
                </Td>
                <Td isNumeric>
                  <a
                    href="https://testnet.bscscan.com/tx/0x138be73463337df5d12e2a4106c48a501f8c6589bcb62b0affa4e5333ec04b6a"
                    target={"_blank"}
                    className="date-column"
                    rel="noreferrer"
                    style={{ justifyContent: "flex-end" }}
                  >
                    {formatTime(el.created_time, false)}{" "}
                    <Icon as={ExternalLink} />
                  </a>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        <AppPagination
          total={totalData}
          limit={pageSize}
          offset={offset}
          onChangeLimit={(pageSize) => {
            setPageSize(pageSize)
          }}
          onChangeOffset={(offset) => {
            setOffset(offset)
          }}
        />
      </div>
    </>
  )
}

export default Auction
