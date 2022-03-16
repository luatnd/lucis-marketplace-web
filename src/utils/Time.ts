import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
dayjs.extend(utc)
/**
 * convert seconds count to time string in mm:ss
 * @param secs
 */
export function secondsToTimeStr(secs: number): string {
  return secs < 0
    ? ""
    : `${Math.floor(secs / 60)
        .toString()
        .padStart(2, "0")}:${(secs % 60).toString().padStart(2, "0")}`
}

/**
 * Compare date Current date with 2 date (UTC)
 * @param start
 * @param end
 * @returns string
 */
export function compareDate(startTime: string, endTime: string) {
  const currUTC = dayjs.utc()
  const startUTC = dayjs.utc(startTime)
  const endUTC = dayjs.utc(endTime)
  const isBefore = dayjs.duration(currUTC.diff(startUTC)).asMilliseconds() < 0
  const isAfter = dayjs.duration(endUTC.diff(currUTC)).asMilliseconds() < 0

  let status = ""

  if (!isBefore && !isAfter) {
    status = "ontime"
  } else if (!isBefore && isAfter) {
    status = "after"
  } else {
    status = "before"
  }

  return status
}
