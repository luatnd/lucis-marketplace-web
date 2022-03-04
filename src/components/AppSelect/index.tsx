import Select, { Props } from "react-select"

export const AppSelect = (props: Props) => {
  const { className } = props
  return <Select {...props} className={`app-select ${className}`} />
}
