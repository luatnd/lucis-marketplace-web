import {
  Button,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react"
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  FastForward,
  Rewind,
} from "react-feather"

interface IProps {
  total: number
  offset: number
  pageSize: number
  onChangeOffset?: (value: number) => void
  onChangPageSize?: (value: number) => void
}

export const AppPagination = (props: IProps) => {
  const { total, pageSize, offset, onChangeOffset, onChangPageSize } = props

  const totalPage = Math.ceil(total / pageSize)
  const page = Math.round(offset / pageSize + 1)
  const pageRange = 5

  let pages = []
  for (let i = 1; i <= totalPage; i++) {
    pages.push(i)
  }

  const pageSizeOption = [5, 10, 15, 20, 50, 100]

  const handleChangePage = (value: number) => {
    onChangeOffset((value - 1) * pageSize + 1)
  }

  const handleChangePageSize = (value: number) => {
    onChangPageSize(value)
  }

  const handlePrev = () => {
    onChangeOffset(page - 1)
  }

  const handlePrevDot = () => {
    if (page > pageRange) handleChangePage(page - pageRange)
  }

  const handleNextDot = () => {
    if (page < totalPage - pageRange) handleChangePage(page + pageRange)
  }

  const handleNext = () => {
    onChangeOffset(page + 1)
  }

  const _renderNormal = () => {
    return (
      <div className="page-list">
        {pages.map((key) => (
          <Button
            key={key}
            onClick={() => handleChangePage(key)}
            className={`page-button ${key === page ? "active" : ""}`}
          >
            {key}
          </Button>
        ))}
      </div>
    )
  }

  const _renderResponsive = () => {
    let splitedPages = pages.filter((page) => page !== 1 && page !== totalPage)
    const headPages = splitedPages.slice(0, pageRange)
    const tailPages = splitedPages.slice(
      totalPage - pageRange - 2,
      totalPage - 1
    )
    let focusingPages = splitedPages
    if (page < pageRange + 1) {
      focusingPages = headPages
    } else if (page > totalPage - pageRange + 1) {
      focusingPages = tailPages
    } else {
      focusingPages = splitedPages.slice(page - pageRange + 1, page + 1)
    }
    return (
      <div className="page-list">
        <Button
          onClick={() => handleChangePage(1)}
          className={`page-button ${1 === page ? "active" : ""}`}
        >
          1
        </Button>
        {page > pageRange ? (
          <Button className="dot-button" onClick={handlePrevDot}>
            <span>...</span>
            <Icon as={Rewind} />
          </Button>
        ) : null}
        {focusingPages.map((key) => (
          <Button
            key={key}
            onClick={() => handleChangePage(key)}
            className={`page-button ${key === page ? "active" : ""}`}
          >
            {key}
          </Button>
        ))}
        {page < totalPage - pageRange + 2 ? (
          <Button className="dot-button" onClick={handleNextDot}>
            <span>...</span>
            <Icon as={FastForward} />
          </Button>
        ) : null}
        <Button
          key={totalPage}
          onClick={() => handleChangePage(totalPage)}
          className={`page-button ${totalPage === page ? "active" : ""}`}
        >
          {totalPage}
        </Button>
      </div>
    )
  }

  return (
    <div className="app-pagination">
      <Button onClick={handlePrev} disabled={page <= 1} className="page-button">
        <Icon as={ChevronLeft} />
      </Button>
      {totalPage > 8 ? _renderResponsive() : _renderNormal()}
      <Button
        onClick={handleNext}
        disabled={page >= pages.length}
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
