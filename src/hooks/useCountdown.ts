import moment from "moment"
import { useEffect, useState } from "react"
export const useCountdown = (timestamp: string) => {
  const current = moment()
  const end = moment(timestamp)
  const duration = moment.duration(end.diff(current)).asMilliseconds()

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
