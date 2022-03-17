import Image, { ImageProps } from "next/image"

export const Img = (props: ImageProps) => {
  return (
    <Image
      layout="fill"
      placeholder="blur"
      {...props}
      blurDataURL="/favicon.svg"
    />
  )
}
