import "antd/dist/antd.less"
import type { AppProps } from "next/app"
import React from "react"
import { AppLayout } from "../components/AppLayout"
import { rootStore, StoresProvider } from "../stores/rootStore"
import "../styles/antd-theme-custom.less"
import "../styles/styles.scss"

const MyApp = (props: AppProps) => {
  const { Component, pageProps } = props
  return (
    <StoresProvider value={rootStore}>
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </StoresProvider>
  )
}

export default MyApp
