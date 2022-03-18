export const isImg = (url: string): boolean => {
  return url?.match(/\.(jpeg|jpg|gif|png)$/) != null
}
export const isVideo = (url: string): boolean => {
  return url?.match(/\.(mp4|mov|webm|avi|mkv)$/) != null
}
