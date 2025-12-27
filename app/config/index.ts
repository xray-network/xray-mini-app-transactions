import * as Types from "@/types"

export const ZUSTAND_STORE_PREFIX = "xray-mini-app-transactions"

export const SLOT_CONFIG_NETWORK: Record<Types.CW3Types.NetworkName, Types.CW3Types.SlotConfig> = {
  mainnet: { zeroTime: 1596059091000, zeroSlot: 4492800, slotDuration: 1000 },
  preview: { zeroTime: 1666656000000, zeroSlot: 0, slotDuration: 1000 },
  preprod: { zeroTime: 1654041600000 + 1728000000, zeroSlot: 86400, slotDuration: 1000 },
  custom: { zeroTime: 0, zeroSlot: 0, slotDuration: 0 },
}

export const SLOT_STARTING_EPOCH: Record<Types.CW3Types.NetworkName, number> = {
  mainnet: 208,
  preprod: 4,
  preview: 0,
  custom: 0,
}

export const SLOT_EPOCH_DURATION: Record<Types.CW3Types.NetworkName, number> = {
  mainnet: 432000,
  preprod: 432000,
  preview: 432000 / 5,
  custom: 0,
}
