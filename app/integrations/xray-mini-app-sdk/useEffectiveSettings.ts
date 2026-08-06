import { useEffect, useState } from "react"
import { useMiniApp, useTheme as useHostTheme } from "@xray-network/mini-app-sdk/react"
import { useAppStore } from "@/store/app"
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
  const preference = useAppStore((state) => state.themePrefer)
  const systemTheme = useSystemTheme(preference === "system")

  if (connected && hostTheme) return hostTheme
  return preference === "system" ? systemTheme : preference
}

