import { Menu, MenuButton, MenuItem, MenuList, Table, Tbody, Td, Th, Thead, Tr, Button, Icon } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import { Listing } from "../components/Home/Listing"
import activities from './data/activities.json'
import * as Icons from "react-feather"
import Pagination from "../components/Pagination";
import Sort from "../components/Sort";

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
    handleSort()
  }, [currentPage, pageSize, sort]);

  const handleSort = () => {
    const data = activities.filter(el => {
      if (el.type ==  sort && sort != 'All' ) {
        return el
      } else if(sort == 'All') {
        return el
      }else return ''
    })
    setTotalData(Number(data.length))
    setData(data)
  }
  
  const priceSort = [
    {
      'img': '/icons/bnb-logo.png',
      'name': 'BNB Chain'
    }
  ]
  const typeSort = [
    {
      'img': '',
      'name': 'All'
    },
    {
      'img': '',
      'name': 'Listing'
    },
    {
      'img': '',
      'name': 'Offer'
    },
    {
      'img': '',
      'name': 'Auction'
    },
    {
      'img': '',
      'name': 'Sale'
    },
  ]
  
  return <div className="activities-page">
    <Listing />
    <h1 className="activities">Activities</h1>
    <div className="sort">
      <Sort
        customClassName="price-sort"
        options={priceSort}
      />
      <Sort
        customClassName="type-sort"
        options={typeSort}
        onSelectOption={sort => setSort(sort)}
      />
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
                    <a target="_blank" rel="noreferrer" className="align-center date" href="https://testnet.bscscan.com/tx/0x138be73463337df5d12e2a4106c48a501f8c6589bcb62b0affa4e5333ec04b6a">
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
