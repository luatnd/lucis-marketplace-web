import { ChakraProvider } from "@chakra-ui/react"
import type { AppProps } from "next/app"
import React, { useEffect, useState } from "react"
import { AppLayout } from "../components/AppLayout"
import { rootStore, StoresProvider } from "../stores/rootStore"
import "../styles/styles.scss"
import { defaultTheme } from "../themes"
import "animate.css"

const MyApp = (props: AppProps) => {
  const { Component, pageProps } = props

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <ChakraProvider resetCSS theme={defaultTheme}>
      <StoresProvider value={rootStore}>
        {mounted ? (
          <AppLayout>
            <Component {...pageProps} />
          </AppLayout>
        ) : null}
      </StoresProvider>
    </ChakraProvider>
  )
}

export default MyApp
