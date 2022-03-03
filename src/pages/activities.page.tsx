import { Menu, MenuButton, MenuItem, MenuList, Table, Tbody, Td, Th, Thead, Tr, Button, Icon } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import { Listing } from "../components/Home/Listing"
import Pagination from "../components/Pagination"
import activities from './data/activities.json'
import * as Icons from "react-feather"

const ActivitiesPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [data, setData] = useState([]);
  const [sort, setSort] = useState("All");
  const [totalData, setTotalData] = useState(Number(activities.length));

  useEffect(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    setData(activities.slice(firstPageIndex, lastPageIndex));
  }, [currentPage, pageSize]);

  const handleSort = (event) => {
    const sort = event.target.value
    const data = activities.filter(el => {
      if (el.type ==  sort && sort != 'All' ) {
        return el
      } else if(sort == 'All') {
        return el
      }else return ''
    })
    setSort(sort);
    setTotalData(Number(data.length))
    setData(data)
  }
  
  return <div className="activities-page">
    <Listing />
    <h1 className="activities">Activities</h1>
    <div className="sort">
      <div className="select-sort price-sort">
        <Menu>
          <MenuButton minWidth='200px' as={Button} className="select-button"
            rightIcon={<Icon as={Icons.ChevronDown} />}
          >
            <img src="/icons/bnb-logo.png" alt="" />
            BNB Chain</MenuButton>
          <MenuList minWidth='205px' className="select-list">
            <MenuItem value="BNB Chain">
              <img src="/icons/bnb-logo.png" alt="" />BNB Chain</MenuItem>
          </MenuList>
        </Menu>
      </div>
      <div className="select-sort">
        <Menu>
          <MenuButton minWidth='200px' as={Button} className="select-button"
            rightIcon={<Icon as={Icons.ChevronDown} />}
          >{sort}</MenuButton>
          <MenuList minWidth='205px' className="select-list">
            <MenuItem onClick={handleSort} value="All">All</MenuItem>
            <MenuItem onClick={handleSort} value="Listing">Listing</MenuItem>
            <MenuItem onClick={handleSort} value="Offer">Offer</MenuItem>
            <MenuItem onClick={handleSort} value="Auction">Auction</MenuItem>
            <MenuItem onClick={handleSort} value="Sale">Sale</MenuItem>
          </MenuList>
        </Menu>
      </div>
    </div>
    <div>
      <div className="table-activity">
        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th>Type</Th>
              <Th>Item</Th>
              <Th>Price</Th>
              <Th>From</Th>
              <Th>To</Th>
              <Th>Date</Th>
            </Tr>
          </Thead>
          <Tbody>
              {data.map((el, index) => (
                <Tr key={index}>
                  <Td>{el.type}</Td>
                  <Td>
                    <div className="align-center type">
                      <img src="/icons/item.png" alt="" />
                      <span>
                        {el.item}
                      </span>
                    </div>
                    </Td>
                  <Td>{el.price}</Td>
                  <Td>{el.from}</Td>
                  <Td>{el.to}</Td>
                  <Td>
                    <a target="_blank" className="align-center date" href="https://testnet.bscscan.com/tx/0x138be73463337df5d12e2a4106c48a501f8c6589bcb62b0affa4e5333ec04b6a">
                      <span>
                        {el.date}
                      </span>
                      <img src="/icons/open-new.png" alt="" />
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
          onPageChange={page => setCurrentPage(page)}
          onPageSizeChange={pageSize => setPageSize(pageSize)}
        />
    </div>
  </div>
}

export default ActivitiesPage
