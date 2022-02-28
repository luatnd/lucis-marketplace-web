import { ImgHTMLAttributes } from "react"

export const AppImg = (props: ImgHTMLAttributes<any>) => {
  return (
    <img
      {...props}
      onError={({ currentTarget }) =>
        (currentTarget.src = "/assets/layout/logo.png")
      }
    />
  )
}
