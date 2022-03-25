import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"
import { ReactNode } from "react"

type TColumn = {
  title?: string
  dataIndex?: string
  render?: (any) => ReactNode | string
}

interface IProps {
  className?: string
  tableClassName?: string
  columns?: TColumn[]
  data?: any[]
}

export const AppTable = (props: IProps) => {
  const { columns, data, className, tableClassName } = props

  return (
    <div className={`${className} app-table`}>
      <Table className={tableClassName}>
        <Thead>
          <Tr>
            {columns?.map((column, index) => (
              <Th key={index}>{column?.title}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {data?.map((item, index) => (
            <Tr key={index}>
              {columns?.map((column, index) => (
                <Td key={index}>
                  {column?.render
                    ? column.render(item ?? null)
                    : item[`${column?.dataIndex}`] ?? null}
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  )
}
