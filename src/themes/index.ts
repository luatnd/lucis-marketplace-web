import { extendTheme } from "@chakra-ui/react"

export const defaultTheme = extendTheme({
  styles: {
    global: (props) => ({
      body: {
        fontFamily: "Poppins",
      },
    }),
  },
})
