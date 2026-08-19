import { useEffect, useState } from "react"
import { cardanoV1, platformV1 } from "@xray-network/xray-js/mini-app-bridge/react"
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
  const hostTheme = platformV1.useTheme()
  const preference = usePreferencesStore((state) => state.themePrefer)
  const systemTheme = useSystemTheme(preference === "system")

  if (hostTheme.data) return hostTheme.data
  return preference === "system" ? systemTheme : preference
}

export const useEffectiveHostContext = () => {
  return platformV1.useStatus().data?.account ?? null
}

export const useEffectiveNetwork = () => {
  const hostContext = useEffectiveHostContext()
  const localNetwork = usePreferencesStore((state) => state.network)
  return hostContext?.blockchain === "cardano" ? hostContext.network : localNetwork
}

export const useEffectiveCurrency = () => {
  const hostCurrency = platformV1.useCurrency()
  const localCurrency = usePreferencesStore((state) => state.currency)
  return hostCurrency.data ?? localCurrency
}

export const useEffectiveHideBalances = () => {
  const hostHideBalances = platformV1.useHideBalances()
  const localHideBalances = usePreferencesStore((state) => state.hideBalances)
  return hostHideBalances.data ?? localHideBalances
}

export const useEffectiveExplorer = () => {
  const hostExplorer = cardanoV1.useExplorer()
  const localExplorer = usePreferencesStore((state) => state.explorer)
  return hostExplorer.data ?? localExplorer
}
