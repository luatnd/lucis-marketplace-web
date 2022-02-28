import NextImage, { ImageProps } from "next/image"

const localNoOptimizeLoader = ({ src, width, quality }) => {
  const baseUrl = typeof window !== "undefined" ? window.location.origin : "/"
  return `${baseUrl}/${src}?w=${width}&q=${quality || 75}`
}

export const LazyImage = (props: ImageProps) => {
  return <NextImage unoptimized loader={localNoOptimizeLoader} {...props} />
}
