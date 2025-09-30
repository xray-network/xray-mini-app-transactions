import { create } from "zustand"
import { persist } from "zustand/middleware"
import { useWeb3Store } from "@/store/web3"
import * as config from "@/config"
import * as Types from "@/types"

interface AppStoreState {
  // Theme
  themePrefer: Types.App.ThemePrefer
  theme: Types.App.Theme
  initTheme: () => void
  changeTheme: (theme: Types.App.ThemePrefer) => void


  // Settings
  currency: Types.App.Currencies
  currencySet: (currency: Types.App.Currencies) => void
  hideBalances: boolean
  hideBalancesSet: (hide: boolean) => void
  explorer: Types.App.Explorer
  explorerSet: (explorer: Types.App.Explorer) => void

  // Tip
  tip: Types.CW3Types.Tip | null
  updateTip: () => Promise<void>

  // Network
  network: Types.CW3Types.NetworkName | null
  networkSet: (network: Types.CW3Types.NetworkName) => void
}

const getSystemTheme = (): Types.App.Theme => {
  if (typeof window === "undefined") return "light" // fallback for SSR
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
}

export const useAppStore = create<AppStoreState>()(
  persist(
    (set, get) => ({
      // Theme
      theme: "dark",
      themePrefer: "system",
      initTheme: () => {
        const preferredTheme = get().themePrefer
        get().changeTheme(preferredTheme)
      },
      changeTheme: async (theme) => {
        const themeCurrent = theme === "system" ? getSystemTheme() : theme
        const themePrefer = theme
        set({ theme: themeCurrent, themePrefer: themePrefer })
      },


      // Settings
      currency: "usd",
      currencySet: (currency) => set({ currency }),
      hideBalances: false,
      hideBalancesSet: (hide) => set({ hideBalances: hide }),
      explorer: "cardanoscan",
      explorerSet: (explorer) => set({ explorer }),

      // Tip
      tip: null,
      updateTip: async () => {
        const tip = (await useWeb3Store.getState().web3?.getTip()) || null
        set({ tip })
      },

      // Network
      network: "mainnet",
      networkSet: (network) => {
        set({ network })
      },
    }),
    // Persist configuration
    {
      name: `${config.ZUSTAND_STORE_PREFIX}.app`,
      version: 1,
      partialize: (state) => ({
        themePrefer: state.themePrefer,
        currency: state.currency,
        hideBalances: state.hideBalances,
        explorer: state.explorer,
        network: state.network,
      }),
    }
  )
)
