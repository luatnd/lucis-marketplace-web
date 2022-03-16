import { Icon, Spinner } from "@chakra-ui/react"
import Logo from "@static/favicon.svg"

export const AppSpinner = () => {
  return (
    <div className="app-spinner">
      <div className="spinner">
        <Icon as={Logo} className="logo" />
        <Icon as={Spinner} className="spinner-icon" />
      </div>
    </div>
  )
}
