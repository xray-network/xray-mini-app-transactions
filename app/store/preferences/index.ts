import { create } from "zustand"
import { persist } from "zustand/middleware"
import { ZUSTAND_STORE_PREFIX } from "@/config"
import type { CardanoTypes } from "@/types"
import type { Currencies, Explorer, ThemePrefer } from "@/types/app"

interface PreferencesState {
  themePrefer: ThemePrefer
  setThemePreference: (theme: ThemePrefer) => void
  network: CardanoTypes.NetworkName
  setNetwork: (network: CardanoTypes.NetworkName) => void
  currency: Currencies
  setCurrency: (currency: Currencies) => void
  hideBalances: boolean
  setHideBalances: (hide: boolean) => void
  explorer: Explorer
  setExplorer: (explorer: Explorer) => void
}

/** Standalone defaults only. Host-owned values are never copied into persistence. */
export const usePreferencesStore = create<PreferencesState>()(
  persist(
    (set) => ({
      themePrefer: "system",
      setThemePreference: (themePrefer) => set({ themePrefer }),
      network: "mainnet",
      setNetwork: (network) => set({ network }),
      currency: "usd",
      setCurrency: (currency) => set({ currency }),
      hideBalances: false,
      setHideBalances: (hideBalances) => set({ hideBalances }),
      explorer: "cardanoscan",
      setExplorer: (explorer) => set({ explorer }),
    }),
    {
      name: `${ZUSTAND_STORE_PREFIX}.app`,
      version: 1,
      partialize: ({ themePrefer, network, currency, hideBalances, explorer }) => ({
        themePrefer,
        network,
        currency,
        hideBalances,
        explorer,
      }),
    }
  )
)
