import { create } from "zustand"
import { persist } from "zustand/middleware"
import * as config from "@/config"
import * as Types from "@/types"

interface AppStoreState {
  // Theme
  themePrefer: Types.App.ThemePrefer
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
  updateTip: (tip: Types.CW3Types.Tip | null) => Promise<void>

  // Network
  network: Types.CW3Types.NetworkName | null
  networkSet: (network: Types.CW3Types.NetworkName) => void

  // Account State
  accountState: Types.SDK.HostAccountStatePayload
  accountStateSet: (accountState: Types.SDK.HostAccountStatePayload) => void
}

export const useAppStore = create<AppStoreState>()(
  persist(
    (set) => ({
      // Theme
      themePrefer: "system",
      changeTheme: (themePrefer) => set({ themePrefer }),

      // Settings
      currency: "usd",
      currencySet: (currency) => set({ currency }),
      hideBalances: false,
      hideBalancesSet: (hide) => set({ hideBalances: hide }),
      explorer: "cardanoscan",
      explorerSet: (explorer) => set({ explorer }),

      // Tip
      tip: null,
      updateTip: async (tip) => {
        set({ tip })
      },

      // Network
      network: "mainnet",
      networkSet: (network) => {
        set({ network })
      },

      // Account State
      accountState: null,
      accountStateSet: (accountState) => set({ accountState }),
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
