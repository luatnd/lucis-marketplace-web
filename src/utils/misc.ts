import { message } from "antd"

export const copyToClipboard = (content: string) => {
  navigator.clipboard.writeText(content)
  message.success("Copied to clipboard !", 1)
}
