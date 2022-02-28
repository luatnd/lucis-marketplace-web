type FormatOptions = {
  sign?: boolean // true if you wanna show +/- sign before the value
  decimalPadding?: boolean // true if you wanna padding zero value to end of string. Eg: 11.20 instead of 11.2
  fallbackValue?: any // If return NaN, this fallback value will be return instead of NaN. It still allow to return '' if str is ''
}

export function currency(
  floatVal: number | string,
  fixed = 0,
  option: FormatOptions = null
): string {
  return format(floatVal, fixed, option)
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// window.tmp__currency = currency;

/**
 * Usage: currencyFormat(12345678.982)
 * Usage: currencyFormat(12345678.982, 2)
 *
 * @param {number|string} floatVal
 * @param {number} fixed
 * @param {{}} option {
 *    sign: true if you wanna show +/- sign before the value, default is false
 * }
 * @returns {string}
 */
export function format(
  floatVal: number | string,
  fixed = 0,
  option: FormatOptions = null
): string {
  const default_opt = {
    sign: false,
    decimalPadding: false,
    fallbackValue: null,
  }
  if (!option) {
    option = default_opt
  } else {
    option = Object.assign(default_opt, option)
  }

  if (floatVal === null || floatVal === undefined) {
    return option.fallbackValue
  }

  if (floatVal === "") {
    return ""
  }

  if (typeof floatVal !== "number") {
    floatVal = parseFloat(floatVal)
  }

  // Support option is true / false, it mean sign
  let sign = false,
    decimalPadding = false
  if (typeof option === "boolean") {
    sign = option
  } else {
    if (typeof option.sign !== "undefined") {
      sign = option.sign
    }
    if (typeof option.decimalPadding !== "undefined") {
      decimalPadding = option.decimalPadding
    }
  }

  const signStr = sign && floatVal > 0 ? "+" : ""

  if (decimalPadding) {
    return floatVal
      ? signStr + formatNumber(floatVal, fixed, ".", ",")
      : ("0" + ".").toString().padEnd(2 + fixed, "0")
  } else if (typeof Intl === "undefined") {
    return signStr + formatNumber(floatVal, fixed, ".", ",")
  } else {
    return (
      signStr +
      trimNonMeaningFullNumber(
        new Intl.NumberFormat("en-US", {
          maximumFractionDigits: fixed,
        }).format(floatVal)
      )
    )
  }
}

function formatNumber(floatVal, decimal, decimalSeparator, separator) {
  // 23,124,131.42
  const separatorPositionsReg =
    decimal > 0
      ? new RegExp(`\\d(?=(\\d{3})+\\.)`, "g")
      : new RegExp(`\\d(?=(\\d{3})+$)`, "g")

  const f = floatVal
    .toFixed(decimal)
    .replace(separatorPositionsReg, `$&${separator}`)

  // 23.124.131,42
  if (decimalSeparator !== ".") {
    f.replace(new RegExp(separator, "g"), "_")
    f.replace(new RegExp(decimalSeparator, "g"), separator)
    f.replace(new RegExp("_", "g"), decimalSeparator)
  }

  return f
}

export function trimNonMeaningFullNumber(n: string): string {
  if (n === "0") {
    return n
  }

  const i = n.indexOf(".")
  if (i === -1) {
    return trim(n, "0", "l")
  } else {
    const l = n.substr(0, i)
    const r = n.substr(i + 1)
    return trim(l, "0", "l") + "." + trim(r, "0", "r")
  }
}

export function trim(s: string, char = " ", dir: "l" | "r" | "" = ""): string {
  const pr = new RegExp(`(${char}+)$`)
  const pl = new RegExp(`^(${char}+)`)
  if (dir === "") {
    return s.replace(pl, "").replace(pr, "")
  } else if (dir === "r") {
    return s.replace(pr, "")
  } else if (dir === "l") {
    return s.replace(pl, "")
  }
}

export function isEqual(a: number, b: number): boolean {
  if (a == b) {
    return true
  }

  const EPSILON = 1e-6
  return Math.abs(a - b) < EPSILON //EPSILON = 0.0000001d
}

export const strToHex = (str) => {
  let result = ""
  for (let i = 0; i < str.length; i++) {
    result += str.charCodeAt(i).toString(16)
  }
  return result
}
