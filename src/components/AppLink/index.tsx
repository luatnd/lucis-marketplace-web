import Link from "next/link"
import React from "react"
export const AppLink = (props) => {
  return (
    <Link {...props}>
      <a>{props.children}</a>
    </Link>
  )
}
