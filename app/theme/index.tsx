import { useEffect } from "react"
import { ConfigProvider, App } from "antd"
import { HappyProvider } from "@ant-design/happy-work-theme"
import { useEffectiveTheme } from "@/integrations/xray-js/useEffectiveSettings"
import EscapeAntd from "./EscapeAntd"
import { lightTheme, darkTheme } from "./antd"
import { metaThemeColor } from "./palette"

const Theme = ({ children }: { children: React.ReactNode }) => {
  const theme = useEffectiveTheme()

  useEffect(() => {
    const html = document.documentElement
    html.setAttribute("data-disable-transitions", "true")
    html.setAttribute("data-theme", theme)
    html.querySelector("meta[name='theme-color']")?.setAttribute("content", metaThemeColor[theme])
    const enableTransitions = setTimeout(() => {
      html.removeAttribute("data-disable-transitions")
    }, 500)
    return () => clearTimeout(enableTransitions)
  }, [theme])

  return (
    <ConfigProvider theme={theme === "dark" ? darkTheme : lightTheme}>
      <HappyProvider>
        <App>
          <EscapeAntd />
          {children}
        </App>
      </HappyProvider>
    </ConfigProvider>
  )
}

export default Theme
