import { ChakraProvider } from "@chakra-ui/react"
import "animate.css"
import type { AppProps } from "next/app"
import Head from "next/head"
import React, { useEffect, useState } from "react"
import "slick-carousel/slick/slick-theme.css"
import "slick-carousel/slick/slick.css"
import { AppLayout } from "../components/AppLayout"
import { rootStore, StoresProvider } from "../stores/rootStore"
import "../styles/styles.scss"
import { defaultTheme } from "../themes"

const MyApp = (props: AppProps) => {
  const { Component, pageProps } = props

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div>
      <Head>
        <title>Lucis NFT - Redefine Play to Earn ecosystem</title>
        <meta property="og:title" content="Lucis NFT" />
        <meta property="og:image" content="/meta-banner.png" />
        <meta
          name="description"
          content={`One of the most effective investment platforms for investors. We create a hybrid platform to connect investors and skilled scholars in the world of "Play to Earn" gaming and metaverse.`}
        />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:url" content="https://lucis.nft/" />
      </Head>
      <ChakraProvider resetCSS theme={defaultTheme}>
        <StoresProvider value={rootStore}>
          {mounted ? (
            <AppLayout>
              <Component {...pageProps} />
            </AppLayout>
          ) : null}
        </StoresProvider>
      </ChakraProvider>
    </div>
  )
}

export default MyApp
