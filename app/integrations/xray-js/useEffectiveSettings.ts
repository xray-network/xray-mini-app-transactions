import { useEffect, useState } from "react"
import {
  useCurrency as useHostCurrency,
  useHideBalances as useHostHideBalances,
  useHostContext,
  useMiniApp,
  useTheme as useHostTheme,
} from "@xray-network/xray-js/mini-app-bridge/react"
import { useExplorer as useHostExplorer } from "@xray-network/xray-js/mini-app-bridge/cardano/react"
import { usePreferencesStore } from "@/store/preferences"
import type { App } from "@/types"

const getSystemTheme = (): App.Theme =>
  typeof window !== "undefined" &&
  typeof window.matchMedia === "function" &&
  window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light"

const useSystemTheme = (enabled: boolean): App.Theme => {
  const [theme, setTheme] = useState<App.Theme>(getSystemTheme)

  useEffect(() => {
    if (!enabled || typeof window.matchMedia !== "function") return
    const media = window.matchMedia("(prefers-color-scheme: dark)")
    const update = () => setTheme(media.matches ? "dark" : "light")
    update()
    media.addEventListener("change", update)
    return () => media.removeEventListener("change", update)
  }, [enabled])

  return theme
}

export const useEffectiveTheme = (): App.Theme => {
  const { connected } = useMiniApp()
  const hostTheme = useHostTheme()
  const preference = usePreferencesStore((state) => state.themePrefer)
  const systemTheme = useSystemTheme(preference === "system")

  if (connected && hostTheme) return hostTheme
  return preference === "system" ? systemTheme : preference
}

export const useEffectiveHostContext = () => {
  const { connected } = useMiniApp()
  const hostContext = useHostContext()
  return connected ? hostContext : null
}

export const useEffectiveNetwork = () => {
  const hostContext = useEffectiveHostContext()
  const localNetwork = usePreferencesStore((state) => state.network)
  return hostContext?.blockchain === "cardano" ? hostContext.network : localNetwork
}

export const useEffectiveCurrency = () => {
  const { connected } = useMiniApp()
  const hostCurrency = useHostCurrency()
  const localCurrency = usePreferencesStore((state) => state.currency)
  return connected && hostCurrency ? hostCurrency : localCurrency
}

export const useEffectiveHideBalances = () => {
  const { connected } = useMiniApp()
  const hostHideBalances = useHostHideBalances()
  const localHideBalances = usePreferencesStore((state) => state.hideBalances)
  return connected && hostHideBalances !== null ? hostHideBalances : localHideBalances
}

export const useEffectiveExplorer = () => {
  const { connected } = useMiniApp()
  const hostExplorer = useHostExplorer()
  const localExplorer = usePreferencesStore((state) => state.explorer)
  return connected && hostExplorer ? hostExplorer : localExplorer
}
