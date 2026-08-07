import { useEffect } from "react"
import { ConfigProvider, App } from "antd"
import { HappyProvider } from "@ant-design/happy-work-theme"
import { StyleProvider, px2remTransformer } from "@ant-design/cssinjs"
import { useEffectiveTheme } from "@/integrations/xray-js/useEffectiveSettings"
import EscapeAntd from "./EscapeAntd"
import { lightTheme, darkTheme } from "./antd"
import { metaThemeColor } from "./palette"

export const px2rem = px2remTransformer({
  rootValue: 14,
  precision: 2,
})

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
      <StyleProvider transformers={[px2rem]}>
        <HappyProvider>
          <App>
            <EscapeAntd />
            {children}
          </App>
        </HappyProvider>
      </StyleProvider>
    </ConfigProvider>
  )
}

export default Theme
