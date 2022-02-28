import { Modal } from "antd"
import { ReactNode } from "react"

const commonConfigs = {
  okText: "OK",
  centered: true,
  maskClosable: true,
}

interface IAlertParams {
  title: string
  content?: string | ReactNode
  onOk?: () => void
  onCancel?: () => void
  okText?: string
  cancelText?: string
  width?: number
}

export const AppAlert = {
  error: ({
    title,
    content,
    okText,
    cancelText,
    onOk,
    onCancel,
  }: IAlertParams) =>
    Modal.error({
      ...commonConfigs,
      title,
      content,
      okText: okText ?? "YES",
      cancelText: cancelText ?? "NO",
      className: "app-alert-error",
      onOk,
      onCancel,
    }),
  warn: ({
    title,
    content,
    okText,
    cancelText,
    onOk,
    onCancel,
  }: IAlertParams) =>
    Modal.warn({
      ...commonConfigs,
      title,
      content,
      okText: okText ?? "YES",
      cancelText: cancelText ?? "NO",
      className: "app-alert-warn",
      onOk,
      onCancel,
    }),
  confirm: ({
    title,
    content,
    okText,
    cancelText,
    onOk,
    onCancel,
  }: IAlertParams) =>
    Modal.confirm({
      ...commonConfigs,
      title,
      content,
      okText: okText ?? "YES",
      cancelText: cancelText ?? "NO",
      className: "app-alert-confirm",
      onOk,
      onCancel,
    }),
  success: ({
    title,
    content,
    okText,
    cancelText,
    onOk,
    onCancel,
    width,
  }: IAlertParams) =>
    Modal.success({
      ...commonConfigs,
      title,
      content,
      okText: okText ?? "YES",
      cancelText: cancelText ?? "NO",
      className: "app-alert-success",
      onOk,
      onCancel,
      width: width,
    }),
}
