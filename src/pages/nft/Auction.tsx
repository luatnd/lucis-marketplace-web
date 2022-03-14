import { Button, Icon, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"
import receivedList from "../data/activities.json"
import Verified from "@static/icons/verified.svg"
import Pagination from "src/components/Pagination"
import { useState } from "react"
import { ExternalLink } from "react-feather"

const Auction = (props) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  const [totalData, setTotalData] = useState(Number(receivedList.length))

  const { info } = props

  const data = [
    {
      img: info?.collection.logo,
      address: "0x531b…fFf8",
      auc: "0.1 BNB",
      usd: "($39.95)",
      lead: "41 seconds ago",
    },
    {
      img: info?.collection.logo,
      address: "0x531b…fFf8",
      auc: "0.1 BNB",
      usd: "($39.95)",
      lead: "41 seconds ago",
    },
    {
      img: info?.collection.logo,
      address: "0x531b…fFf8",
      auc: "0.1 BNB",
      usd: "($39.95)",
      lead: "41 seconds ago",
    },
    {
      img: info?.collection.logo,
      address: "0x531b…fFf8",
      auc: "0.1 BNB",
      usd: "($39.95)",
      lead: "41 seconds ago",
    },
    {
      img: info?.collection.logo,
      address: "0x531b…fFf8",
      auc: "0.1 BNB",
      usd: "($39.95)",
      lead: "41 seconds ago",
    },
    {
      img: info?.collection.logo,
      address: "0x531b…fFf8",
      auc: "0.1 BNB",
      usd: "($39.95)",
      lead: "41 seconds ago",
    },
    {
      img: info?.collection.logo,
      address: "0x531b…fFf8",
      auc: "0.1 BNB",
      usd: "($39.95)",
      lead: "41 seconds ago",
    },
    {
      img: info?.collection.logo,
      address: "0x531b…fFf8",
      auc: "0.1 BNB",
      usd: "($39.95)",
      lead: "41 seconds ago",
    },
    {
      img: info?.collection.logo,
      address: "0x531b…fFf8",
      auc: "0.1 BNB",
      usd: "($39.95)",
      lead: "41 seconds ago",
    },
    {
      img: info?.collection.logo,
      address: "0x531b…fFf8",
      auc: "0.1 BNB",
      usd: "($39.95)",
      lead: "41 seconds ago",
    },
    {
      img: info?.collection.logo,
      address: "0x531b…fFf8",
      auc: "0.1 BNB",
      usd: "($39.95)",
      lead: "41 seconds ago",
    },
    {
      img: info?.collection.logo,
      address: "0x531b…fFf8",
      auc: "0.1 BNB",
      usd: "($39.95)",
      lead: "41 seconds ago",
    },
    {
      img: info?.collection.logo,
      address: "0x531b…fFf8",
      auc: "0.1 BNB",
      usd: "($39.95)",
      lead: "41 seconds ago",
    },
    {
      img: info?.collection.logo,
      address: "0x531b…fFf8",
      auc: "0.1 BNB",
      usd: "($39.95)",
      lead: "41 seconds ago",
    },
    {
      img: info?.collection.logo,
      address: "0x531b…fFf8",
      auc: "0.1 BNB",
      usd: "($39.95)",
      lead: "41 seconds ago",
    },
    {
      img: info?.collection.logo,
      address: "0x531b…fFf8",
      auc: "0.1 BNB",
      usd: "($39.95)",
      lead: "41 seconds ago",
    },
    {
      img: info?.collection.logo,
      address: "0x531b…fFf8",
      auc: "0.1 BNB",
      usd: "($39.95)",
      lead: "41 seconds ago",
    },
    {
      img: info?.collection.logo,
      address: "0x531b…fFf8",
      auc: "0.1 BNB",
      usd: "($39.95)",
      lead: "41 seconds ago",
    },
    {
      img: info?.collection.logo,
      address: "0x531b…fFf8",
      auc: "0.1 BNB",
      usd: "($39.95)",
      lead: "41 seconds ago",
    },
    {
      img: info?.collection.logo,
      address: "0x531b…fFf8",
      auc: "0.1 BNB",
      usd: "($39.95)",
      lead: "41 seconds ago",
    },
    {
      img: info?.collection.logo,
      address: "0x531b…fFf8",
      auc: "0.1 BNB",
      usd: "($39.95)",
      lead: "41 seconds ago",
    },
    {
      img: info?.collection.logo,
      address: "0x531b…fFf8",
      auc: "0.1 BNB",
      usd: "($39.95)",
      lead: "41 seconds ago",
    },
    {
      img: info?.collection.logo,
      address: "0x531b…fFf8",
      auc: "0.1 BNB",
      usd: "($39.95)",
      lead: "41 seconds ago",
    },
    {
      img: info?.collection.logo,
      address: "0x531b…fFf8",
      auc: "0.1 BNB",
      usd: "($39.95)",
      lead: "41 seconds ago",
    },
    {
      img: info?.collection.logo,
      address: "0x531b…fFf8",
      auc: "0.1 BNB",
      usd: "($39.95)",
      lead: "41 seconds ago",
    },
    {
      img: info?.collection.logo,
      address: "0x531b…fFf8",
      auc: "0.1 BNB",
      usd: "($39.95)",
      lead: "41 seconds ago",
    },
    {
      img: info?.collection.logo,
      address: "0x531b…fFf8",
      auc: "0.1 BNB",
      usd: "($39.95)",
      lead: "41 seconds ago",
    },
    {
      img: info?.collection.logo,
      address: "0x531b…fFf8",
      auc: "0.1 BNB",
      usd: "($39.95)",
      lead: "41 seconds ago",
    },
    {
      img: info?.collection.logo,
      address: "0x531b…fFf8",
      auc: "0.1 BNB",
      usd: "($39.95)",
      lead: "41 seconds ago",
    },
    {
      img: info?.collection.logo,
      address: "0x531b…fFf8",
      auc: "0.1 BNB",
      usd: "($39.95)",
      lead: "41 seconds ago",
    },
    {
      img: info?.collection.logo,
      address: "0x531b…fFf8",
      auc: "0.1 BNB",
      usd: "($39.95)",
      lead: "41 seconds ago",
    },
    {
      img: info?.collection.logo,
      address: "0x531b…fFf8",
      auc: "0.1 BNB",
      usd: "($39.95)",
      lead: "41 seconds ago",
    },
    {
      img: info?.collection.logo,
      address: "0x531b…fFf8",
      auc: "0.1 BNB",
      usd: "($39.95)",
      lead: "41 seconds ago",
    },
    {
      img: info?.collection.logo,
      address: "0x531b…fFf8",
      auc: "0.1 BNB",
      usd: "($39.95)",
      lead: "41 seconds ago",
    },
    {
      img: info?.collection.logo,
      address: "0x531b…fFf8",
      auc: "0.1 BNB",
      usd: "($39.95)",
      lead: "41 seconds ago",
    },
    {
      img: info?.collection.logo,
      address: "0x531b…fFf8",
      auc: "0.1 BNB",
      usd: "($39.95)",
      lead: "41 seconds ago",
    },
    {
      img: info?.collection.logo,
      address: "0x531b…fFf8",
      auc: "0.1 BNB",
      usd: "($39.95)",
      lead: "41 seconds ago",
    },
    {
      img: info?.collection.logo,
      address: "0x531b…fFf8",
      auc: "0.1 BNB",
      usd: "($39.95)",
      lead: "41 seconds ago",
    },
  ]
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
                      <img
                        src={el.img}
                        alt=""
                        style={{ width: 40, height: 40, borderRadius: "100%" }}
                      />
                    </div>
                    <div className="name-item">{el.address}</div>
                  </div>
                </Td>
                <Td>
                  <p>{el.auc}</p>
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
                    {el.lead} <Icon as={ExternalLink} />
                  </a>
                </Td>
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

export default Auction
