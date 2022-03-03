import { useState } from "react"
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react"
const Pagination = () => {
  const [total, setTotal] = useState(500)
  const [num, setNum] = useState(10)
  const numArray = [10, 20, 30, 40, 50]
  return (
    <div className="pagination">
      <div className="current-page">
        <img className="prev none" src="/common/arrow-left.png" alt="" />
        <div className="container">
          <span className="active">1</span>
          <span>2</span>
          <span>3</span>
          <span>4</span>
          <span>5</span>
          <span>...</span>
          <span>{Math.floor(total / num)}</span>
        </div>
        <img className="next" src="/common/arrow-right.png" alt="" />
      </div>
      <div className="options">
        <Menu>
          <MenuButton>
            <div className="left">
              <span>{num + " / page"}</span>
            </div>
            <img className="right" src="/common/arrow-down2.png" alt="" />
          </MenuButton>
          <MenuList>
            {numArray.map((n) =>
              n != num ? (
                <MenuItem
                  key={n}
                  onClick={() => {
                    setNum(n)
                  }}
                >
                  <span>{n + " / page"}</span>
                </MenuItem>
              ) : null
            )}
          </MenuList>
        </Menu>
      </div>
    </div>
  )
}
export { Pagination }
