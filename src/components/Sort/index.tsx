import {
  Button,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react"
import { useState } from "react"
import * as Icons from "react-feather"

const Sort = (props) => {
  const { customClassName, options, onSelectOption } = props

  const [selected, setSelected] = useState(options[0])

  const handleSort = async (event) => {
    if (onSelectOption != undefined) {
      const selected = event.target.value
      onSelectOption(selected)
      const optionSelect = options.filter(
        (item) => item.name == selected && item
      )
      setSelected(optionSelect[0])
    }
  }

  return (
    <div className={`select-sort ${customClassName}`}>
      <Menu>
        <MenuButton
          minWidth="200px"
          as={Button}
          className="select-button"
          rightIcon={<Icon as={Icons.ChevronDown} />}
        >
          {selected && (
            <>
              <img src={selected?.img} alt="" />
              {selected.name}
            </>
          )}
        </MenuButton>
        <MenuList minWidth="205px" className="select-list">
          {options.map(
            (item, index) =>
              item.name != selected?.name && (
                <MenuItem onClick={handleSort} value={item.name} key={index}>
                  {item.img && <img src={item.img} alt="" />}
                  {item.name}
                </MenuItem>
              )
          )}
        </MenuList>
      </Menu>
    </div>
  )
}

export default Sort
