import { extendTheme, theme, ThemeConfig } from "@chakra-ui/react"

const config: ThemeConfig = {
  initialColorMode: "dark",
  cssVarPrefix: "lucis",
}

export const defaultTheme = extendTheme({
  config,
  fonts: {
    heading: `Saira, ${theme.fonts.heading}`,
    body: `Saira, ${theme.fonts.heading}`,
  },
})
