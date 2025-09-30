import { SLOT_CONFIG_NETWORK, SLOT_EPOCH_DURATION, SLOT_STARTING_EPOCH } from "@/config"
import * as Types from "@/types"

export const truncate = (string: string, start = 6, end = 6) => {
  return `${string.slice(0, start)}...${string.slice(-end)}`
}

export const randomString = () => (Math.random() + 1).toString(36).substring(2)

export const quantityWithCommas = (value: number | string | bigint | undefined | null): string => {
  if (value === undefined || value === null) return "0"
  let str = typeof value === "bigint" ? value.toString() : String(value).trim()
  if (str === "" || str === "NaN") return "0"
  const isNegative = str.startsWith("-")
  if (isNegative) str = str.slice(1)
  const [intPart, decimalPart] = str.split(".")
  const intWithCommas = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  const result = decimalPart ? `${intWithCommas}.${decimalPart}` : intWithCommas
  return isNegative ? `-${result}` : result
}

export const quantityWithLetter = (value: number | string | bigint | undefined, decimals = 2): string => {
  if (value === undefined || value === null) return "0"
  let str = typeof value === "bigint" ? value.toString() : String(value).trim()
  if (str === "" || str === "NaN") return "0"
  const isNegative = str.startsWith("-")
  if (isNegative) str = str.slice(1)
  const [intPart, decimalPart = ""] = str.split(".")
  const len = intPart.length
  const suffixes = ["", "K", "M", "B", "T"]
  const suffixIndex = Math.floor((len - 1) / 3)
  if (suffixIndex === 0 || suffixIndex >= suffixes.length) {
    return (isNegative ? "-" : "") + str
  }
  const remainder = len - suffixIndex * 3
  const main = intPart.slice(0, remainder)
  const rest = intPart.slice(remainder, remainder + decimals)
  let result = main
  if (rest) {
    result += "." + rest.padEnd(decimals, "0")
    result = result.replace(/\.?0+$/, "") // trim trailing zeros
  }
  return (isNegative ? "-" : "") + result + suffixes[suffixIndex]
}

export const quantityFormat = (quantity: number | string | bigint | undefined, decimals = 6, skipZero = false) => {
  const raw = (quantity ?? 0).toString().replace(/^0+/, "")
  const isZero = raw === "" || /^0+$/.test(raw)

  if (skipZero && isZero) {
    return { a: "0", b: "", final: "0" }
  }

  if (decimals <= 0) {
    const formatted = quantityWithCommas(raw || "0")
    return { a: formatted, b: "", final: formatted }
  }

  const integerPart = raw.length > decimals ? raw.slice(0, -decimals) : "0"
  const fractionPart = raw.slice(-decimals).padStart(decimals, "0")

  const a = quantityWithCommas(integerPart)
  const b = fractionPart
  const final = `${a}.${b}`

  return { a, b, final }
}

export const numberFromString = (string: string) => {
  const a = string.slice(7, 15)
  let encode = ""
  for (let i = 0; i < a.length; i += 1) {
    const x = a.slice(i, i + 1)
    encode += x.charCodeAt(0)
  }

  return parseInt(encode, 10)
}

export const capitalizeFirstLetter = (str: string): string => {
  if (!str) return str
  return str.charAt(0).toUpperCase() + str.toLowerCase().slice(1)
}

export const isChromiumBased = (): boolean => {
  return typeof window !== "undefined" && "chrome" in window && !!(window.chrome && (window.chrome as any).app)
}

export const epochStartTime = (epoch: number, network: Types.CW3Types.NetworkName) => {
  const config = SLOT_CONFIG_NETWORK[network]
  const startingEpoch = SLOT_STARTING_EPOCH[network]
  const epochDuration = SLOT_EPOCH_DURATION[network]
  return (epoch * epochDuration + (config.zeroTime / 1000 - startingEpoch * 432000)) * 1000
}

export const epochEndTime = (epoch: number, network: Types.CW3Types.NetworkName) => {
  const config = SLOT_CONFIG_NETWORK[network]
  const startingEpoch = SLOT_STARTING_EPOCH[network]
  const epochDuration = SLOT_EPOCH_DURATION[network]
  return (epoch * epochDuration + epochDuration + (config.zeroTime / 1000 - startingEpoch * 432000)) * 1000
}

export const epochProgress = (epoch: number, network: Types.CW3Types.NetworkName) => {
  const epochDuration = SLOT_EPOCH_DURATION[network] * 1000
  return Math.min(((Date.now() - epochStartTime(epoch, network)) / epochDuration) * 100, 100).toFixed(1)
}

export const pageSizeToContentRange = (currentPage: number, pageSize: number) => {
  return `${(currentPage * pageSize).toString()}-${currentPage * pageSize + pageSize - 1}`
}

export const timestampToDateTime = (timestamp: number) => {
  const date = new Date(timestamp * 1000)
  return date.toLocaleString()
}
