import React from "react"
import classnames from "classnames"
import { usePagination, DOTS } from "./usePagination"
import { Select } from "@chakra-ui/react"

const Pagination = (props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className,
    onPageSizeChange,
  } = props

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  })

  // If there are less than 2 times in pagination range we shall not render the component
  // if (currentPage === 0 || paginationRange.length < 2) {
  //     console.log('halo');

  //     return null;
  // }

  const onNext = () => {
    onPageChange(currentPage + 1)
  }

  const onPrevious = () => {
    onPageChange(currentPage - 1)
  }
  const onPageSize = (event) => {
    onPageSizeChange(event.target.value)
  }

  const lastPage = paginationRange[paginationRange.length - 1]
  return (
    <div className="pagination-container">
      <ul
        className={classnames("pagination-content", { [className]: className })}
      >
        {/* Left navigation arrow */}
        <li
          className={classnames("pagination-item", {
            disabled: currentPage === 1,
          })}
          onClick={onPrevious}
        >
          <div className="arrow left" />
        </li>
        {paginationRange.map((pageNumber, key) => {
          // If the pageItem is a DOT, render the DOTS unicode character
          if (pageNumber === DOTS) {
            return (
              <li className="pagination-item dots" key={key}>
                &#8230;
              </li>
            )
          }

          // Render our Page Pills
          return (
            <li
              className={classnames("pagination-item", {
                selected: pageNumber === currentPage,
              })}
              onClick={() => onPageChange(pageNumber)}
              key={key}
            >
              {pageNumber}
            </li>
          )
        })}
        {/*  Right Navigation arrow */}
        <li
          className={classnames("pagination-item", {
            disabled: currentPage === lastPage,
          })}
          onClick={onNext}
        >
          <div className="arrow right" />
        </li>
      </ul>
      <Select
        onChange={onPageSize}
        value={pageSize}
        className="page-size"
        width="150px"
      >
        <option value="20">20 / page</option>
        <option value="30">30 / page</option>
        <option value="40">40 / page</option>
        <option value="50">50 / page</option>
      </Select>
    </div>
  )
}

export default Pagination
