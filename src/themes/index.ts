import { extendTheme, ThemeConfig } from "@chakra-ui/react"

const config: ThemeConfig = {
  initialColorMode: "dark",
}

export const defaultTheme = extendTheme({
  config,
  styles: {
    global: {
      body: {
        fontFamily: "Saira",
      },
    },
  },
})
