import dayjs from "dayjs"
import duration from "dayjs/plugin/duration"
import { useEffect, useState } from "react"
dayjs.extend(duration)

export const useCountdown = (timestamp: string) => {
  const current = dayjs()
  const end = dayjs(timestamp)
  const duration = dayjs.duration(end.diff(current)).asMilliseconds()

  const [secs, decrement] = useState(duration / 1000)
  useEffect(() => {
    if (secs > 0) {
      const progressLevel = setInterval(() => {
        if (secs > 0) {
          decrement(secs - 1)
        }
      }, 1000)
      return () => clearInterval(progressLevel)
    }
  }, [secs, timestamp])

  const day = parseInt(`${secs / 60 / 60 / 24}`, 10)
  const hou = parseInt(`${(secs / 60 / 60) % day}`, 10)
  const min = parseInt(`${(secs / 60) % hou}`, 10)
  const sec = parseInt(`${secs % 60}`, 10)
  const days = day < 10 ? "0" + day : day
  const hours = hou < 10 ? "0" + hou : hou
  const minutes = min < 10 ? "0" + min : min
  const seconds = sec < 10 ? "0" + sec : sec
  return { days, hours, minutes, seconds }
}

// ==== Expiration (end:true) and Offered (end:false) in table
export const formatTime = (timestamp: any, end: boolean) => {
  const current = dayjs()
  let secs
  if (!end) {
    const inputTime = dayjs(timestamp)
    const duration = dayjs.duration(inputTime.diff(current)).asMilliseconds()
    secs = -duration / 1000
  } else {
    const inputTime = dayjs(timestamp * 1000)
    const duration = dayjs.duration(inputTime.diff(current)).asMilliseconds()
    secs = duration / 1000
  }
  if (end && secs <= 0) {
    return "--:--"
  }
  const day = parseInt(`${secs / 60 / 60 / 24}`, 10)
  const hou = parseInt(`${(secs / 60 / 60) % day}`, 10)
  const min = parseInt(`${(secs / 60) % hou}`, 10)
  const sec = parseInt(`${secs % 60}`, 10)

  if (day) {
    return (
      (!end ? "" : "in ") +
      day +
      (day > 1 ? " days" : " day") +
      (!end ? " ago" : "")
    )
  }
  if (hou) {
    return (
      (!end ? "" : "in ") +
      hou +
      (hou > 1 ? " hours" : " hour") +
      (!end ? " ago" : "")
    )
  }
  if (min) {
    return (
      (!end ? "" : "in ") +
      min +
      (min > 1 ? " minutes" : " minute") +
      (!end ? " ago" : "")
    )
  }
  if (sec) {
    return (
      (!end ? "" : "in ") +
      sec +
      (sec > 1 ? " seconds" : " second") +
      (!end ? " ago" : "")
    )
  }
}
