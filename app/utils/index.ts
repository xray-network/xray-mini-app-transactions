import { SLOT_CONFIG_NETWORK, SLOT_EPOCH_DURATION, SLOT_STARTING_EPOCH } from "@/config"
import { Buffer } from "buffer"
import { crc8 } from "./crc8"
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

export const labelType = (label: number): string | undefined => {
  switch (label) {
    case 100:
      return "ref"
    case 222:
      return "nft"
    case 333:
      return "ft"
    case 444:
      return "rft"
    case 500:
      return "royalty"
    default:
      return undefined
  }
}

export const cip67Crc8Checksum = (num: string): string => {
  return crc8(Buffer.from(num, "hex")).toString(16).padStart(2, "0")
}

export function cip67FromLabel(label: string): number | undefined {
  if (label.length !== 8 || !(label[0] === "0" && label[7] === "0")) {
    return undefined
  }
  const numHex = label.slice(1, 5)
  const num = parseInt(numHex, 16)
  const check = label.slice(5, 7)
  return check === cip67Crc8Checksum(numHex) ? num : undefined
}

export const decodeAssetName = (assetName: string) => {
  try {
    const decode = (assetName: string) => {
      const labelHex = (assetName || "").substring(0, 8)
      const assetNameHex = (assetName || "").substring(8)
      const label = cip67FromLabel(labelHex)
      if (label) {
        return {
          assetNameAsciiNoLabel: Buffer.from(assetNameHex || "", "hex").toString("utf-8") || "",
          label: labelHex,
          labelAscii: label,
          labelType: labelType(label),
        }
      } else {
        return undefined
      }
    }
    const decoded = decode(assetName)
    const assetNameAscii = Buffer.from(assetName || "", "hex").toString("utf-8") || ""
    const assetNameAsciiNoLabel = decoded?.assetNameAsciiNoLabel || assetNameAscii
    const format = /^([/\\\[\]*<>(),.!?@+=%&$#^'"|a-zA-Z0-9 _-]+)$/
    const assetNameFinal = format.test(assetNameAsciiNoLabel) ? assetNameAsciiNoLabel : assetName
    const assetNameFinalWithLabel = (decoded?.label ? `(${decoded?.labelAscii}) ` : "") + assetNameFinal
    return {
      assetName: assetName,
      assetNameAscii: assetNameAscii,
      assetNameAsciiNoLabel: assetNameAsciiNoLabel,
      assetNameFinal: assetNameFinal,
      assetNameFinalWithLabel: assetNameFinalWithLabel,
      label: decoded?.label,
      labelAscii: decoded?.labelAscii,
      labelType: decoded?.labelType,
    }
  } catch (error) {
    console.log("decodeAssetName", error)
    return undefined
  }
}

export const timeAgo = (timestamp: number, locale: string = "en"): string => {
  const diffInSeconds = Math.floor((Date.now() - timestamp) / 1000)
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" })

  const timeUnits = [
    { unit: "year", seconds: 60 * 60 * 24 * 365 },
    { unit: "month", seconds: 60 * 60 * 24 * 30 },
    { unit: "day", seconds: 60 * 60 * 24 },
    { unit: "hour", seconds: 60 * 60 },
    { unit: "minute", seconds: 60 },
    { unit: "second", seconds: 1 },
  ]

  for (const { unit, seconds } of timeUnits) {
    const value = Math.floor(diffInSeconds / seconds)
    if (value > 0) {
      return rtf.format(-value, unit as Intl.RelativeTimeFormatUnit)
    }
  }

  return rtf.format(0, "second")
}

export const unixTimeToSlot = (unixTime: number, network: Types.CW3Types.NetworkName): number => {
  const slotConfig = SLOT_CONFIG_NETWORK[network]
  const timePassed = unixTime - slotConfig.zeroTime
  const slotsPassed = Math.floor(timePassed / slotConfig.slotDuration)
  return slotsPassed + slotConfig.zeroSlot
}

export const slotToUnixTime = (slot: number, network: Types.CW3Types.NetworkName): number => {
  const slotConfig = SLOT_CONFIG_NETWORK[network]
  const msAfterBegin = (slot - slotConfig.zeroSlot) * slotConfig.slotDuration
  return slotConfig.zeroTime + msAfterBegin
}
