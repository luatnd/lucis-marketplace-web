import {
  Button,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { ChevronDown, ChevronLeft, ChevronRight } from "react-feather"

interface IProps {
  total: number
  offset: number
  pageSize: number
  onChangeOffset?: (value: number) => void
  onChangPageSize?: (value: number) => void
}

export const AppPagination = (props: IProps) => {
  const { total, pageSize, offset, onChangeOffset, onChangPageSize } = props

  const pageRange = 5

  let pages = []
  for (let i = 1; i <= total; i++) {
    pages.push(i)
  }

  const pageSizeOption = [5, 10, 15, 20, 50, 100]

  const handleChangePage = (value: number) => {
    onChangeOffset(value)
  }

  const handleChangePageSize = (value: number) => {
    onChangPageSize(value)
  }

  const handlePrev = () => {
    onChangeOffset(offset - 1)
  }

  const handlePrevDot = () => {
    if (offset > pageRange) onChangeOffset(offset - pageRange)
  }

  const handleNextDot = () => {
    if (offset < total - pageRange) onChangeOffset(offset + pageRange)
  }

  const handleNext = () => {
    onChangeOffset(offset + 1)
  }

  const _renderNormal = () => {
    return (
      <div className="page-list">
        {pages.map((page) => (
          <Button
            key={page}
            onClick={() => handleChangePage(page)}
            className={`page-button ${page === offset ? "active" : ""}`}
          >
            {page}
          </Button>
        ))}
      </div>
    )
  }

  const _renderResponsive = () => {
    let splitedPages = pages.filter((page) => page !== 1 && page !== total)
    const headPages = splitedPages.slice(0, pageRange)
    const tailPages = splitedPages.slice(total - pageRange - 2, total - 1)
    let focusingPages = splitedPages
    if (offset < pageRange + 1) {
      focusingPages = headPages
    } else if (offset > total - pageRange + 1) {
      focusingPages = tailPages
    } else {
      focusingPages = splitedPages.slice(offset - pageRange + 1, offset + 1)
    }
    return (
      <div className="page-list">
        <Button
          onClick={() => handleChangePage(1)}
          className={`page-button ${1 === offset ? "active" : ""}`}
        >
          1
        </Button>
        {offset > pageRange ? (
          <Button className="dot-button" onClick={handlePrevDot}>
            ...
          </Button>
        ) : null}
        {focusingPages.map((page) => (
          <Button
            key={page}
            onClick={() => handleChangePage(page)}
            className={`page-button ${page === offset ? "active" : ""}`}
          >
            {page}
          </Button>
        ))}
        {offset < total - pageRange + 2 ? (
          <Button className="dot-button" onClick={handleNextDot}>
            ...
          </Button>
        ) : null}
        <Button
          key={total}
          onClick={() => handleChangePage(20)}
          className={`page-button ${total === offset ? "active" : ""}`}
        >
          {total}
        </Button>
      </div>
    )
  }

  return (
    <div className="app-pagination">
      <Button
        onClick={handlePrev}
        disabled={offset <= 1}
        className="page-button"
      >
        <Icon as={ChevronLeft} />
      </Button>
      {total > 8 ? _renderResponsive() : _renderNormal()}
      <Button
        onClick={handleNext}
        disabled={offset >= pages.length}
        className="page-button"
      >
        <Icon as={ChevronRight} />
      </Button>
      <Menu>
        <MenuButton
          as={Button}
          rightIcon={<ChevronDown />}
          className="page-size-button"
        >
          {pageSize}/page
        </MenuButton>
        <MenuList>
          {pageSizeOption.map((option) => (
            <MenuItem key={option} onClick={() => handleChangePageSize(option)}>
              {option}/page
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </div>
  )
}
