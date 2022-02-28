import { ChakraProvider } from "@chakra-ui/react"
import type { AppProps } from "next/app"
import React from "react"
import { AppLayout } from "../components/AppLayout"
import { rootStore, StoresProvider } from "../stores/rootStore"
import "../styles/styles.scss"

const MyApp = (props: AppProps) => {
  const { Component, pageProps } = props

  return (
    <ChakraProvider resetCSS>
      <StoresProvider value={rootStore}>
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </StoresProvider>
    </ChakraProvider>
  )
}

export default MyApp
