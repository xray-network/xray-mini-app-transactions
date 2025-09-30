import { useState, useEffect } from "react"
import { theme, ConfigProvider, App } from "antd"
import { HappyProvider } from "@ant-design/happy-work-theme"
import { StyleProvider, px2remTransformer } from "@ant-design/cssinjs"
import type { ThemeConfig } from "antd"
import { useAppStore } from "@/store/app"
import merge from "lodash/merge"
import EscapeAntd from "@/utils/escapeAntd"

export const colors = {
  white: "#F6F7F2",
  black: "#000000",
  blue500: "#1940ed",
  blue500dark: "#5e69ff",
  orange500: "#f97316",
  red500: "#ef4444",
  green500: "#15e4a3",
  gray100: "#f3f4f6",
  gray200: "#e5e7eb",
  gray300: "#d1d5db",
  gray400: "#9ca3af",
  gray500: "#6e758d",
  gray600: "#55556d",
  gray700: "#374151",
  gray800: "#1f2937",
  gray900: "#1e2232",
  gray950: "#0e0e18",
  whitePopupShadow: "0 6px 30px 0 rgba(0,0,0,.03), 0 3px 6px -4px rgba(0,0,0,.03), 0 9px 28px 8px rgba(0,0,0,.03)",
  darkPopupShadow: "0 0 60px 0 rgba(60, 60, 70, .5)",
}

export const restTheme: Partial<ThemeConfig> = {
  token: {
    fontFamily: '"satoshi", sans',
    fontSize: 16,
    colorSuccess: colors.green500,
    colorWarning: colors.orange500,
    colorError: colors.red500,
    borderRadius: 10,
  },
  components: {
    Button: {
      contentFontSizeSM: 14,
      contentFontSize: 14,
      contentFontSizeLG: 16,
    },
    Input: {
      inputFontSizeSM: 14,
      inputFontSize: 16,
      inputFontSizeLG: 16,
    },
    InputNumber: {
      inputFontSizeSM: 14,
      inputFontSize: 16,
      inputFontSizeLG: 16,
    },
    Select: {
      fontSizeSM: 14,
      fontSize: 16,
      fontSizeLG: 16,
    },
    Switch: {
      fontSizeSM: 14,
      fontSize: 16,
      fontSizeLG: 16,
    },
    Radio: {
      fontSizeSM: 14,
      fontSize: 16,
      fontSizeLG: 16,
    },
    Tabs: {
      horizontalItemGutter: 25,
    },
    Modal: {
      borderRadiusLG: 20,
    },
    Upload: {
      colorFillAlter: "transparent",
    },
  },
}

export const lightTheme: Partial<ThemeConfig> = {
  algorithm: theme.defaultAlgorithm,
  token: merge({}, restTheme.token, {
    colorPrimary: colors.blue500,
    colorInfo: colors.blue500,
    colorFillAlter: colors.white,
    colorText: colors.black,
    colorBorder: colors.gray300,
  }),
  components: merge({}, restTheme.components, {
    Button: {
      colorFill: colors.gray200,
      colorFillSecondary: colors.gray200,
      colorFillTertiary: colors.gray100,
      borderColorDisabled: colors.gray100,
      colorBgContainerDisabled: colors.gray100,
    },
    Modal: {
      colorBgMask: "rgba(240, 240, 242, .8)",
      boxShadow: colors.whitePopupShadow,
    },
    Select: {
      boxShadow: colors.whitePopupShadow,
    },
    Dropdown: {
      boxShadow: colors.whitePopupShadow,
    },
    Popover: {
      boxShadow: colors.whitePopupShadow,
    },
    Tooltip: {
      colorBgSpotlight: colors.gray950,
      boxShadow: colors.whitePopupShadow,
    },
    Skeleton: {
      gradientFromColor: colors.gray100,
      gradientToColor: colors.gray200,
    },
    Table: {
      borderColor: colors.gray100,
      rowHoverBg: colors.gray100,
      headerSortHoverBg: colors.gray200,
      headerSortActiveBg: colors.gray200,
      headerBg: "transparent",
      bodySortBg: "transparent",
      colorBgContainer: "transparent",
    },
    Spin: {
      colorBgContainer: "transparent",
    },
    Pagination: {
      itemBg: colors.gray100,
      colorBgTextHover: colors.gray200,
    },
    Drawer: {
      colorBgElevated: colors.white,
      colorBgMask: "rgba(250, 250, 252, .6)",
      boxShadowDrawerLeft: "none",
      boxShadowDrawerRight: "none",
      boxShadowDrawerDown: "none",
      boxShadowDrawerUp: "none",
    },
  }),
}

export const darkTheme: Partial<ThemeConfig> = {
  algorithm: theme.darkAlgorithm,
  token: merge({}, restTheme.token, {
    colorPrimary: colors.blue500dark,
    colorInfo: colors.blue500dark,
    colorFillAlter: colors.black,
    colorText: colors.white,
    colorBorder: colors.gray700,
  }),
  components: merge({}, restTheme.components, {
    Button: {
      colorFill: colors.gray800,
      colorFillSecondary: colors.gray800,
      colorFillTertiary: colors.gray900,
      defaultBg: colors.black,
      defaultHoverBg: colors.black,
      defaultBorderColor: colors.gray700,
      borderColorDisabled: colors.gray900,
      colorBgContainerDisabled: colors.gray900,
    },
    Tabs: {
      itemActiveColor: colors.white,
      itemSelectedColor: colors.white,
      inkBarColor: colors.white,
      itemHoverColor: colors.gray300,
    },
    Tag: {
      defaultBg: "transparent",
    },
    Input: {
      colorBgContainer: "transparent",
      colorBgContainerDisabled: colors.gray900,
      colorTextDisabled: colors.gray500,
    },
    InputNumber: {
      colorBgContainer: "transparent",
      colorBgContainerDisabled: colors.gray900,
      colorTextDisabled: colors.gray500,
    },
    Modal: {
      contentBg: colors.black,
      colorBgMask: "rgba(19, 19, 24, .8)",
      boxShadow: colors.darkPopupShadow,
    },
    Message: {
      contentBg: colors.gray800,
    },
    Notification: {
      colorBgElevated: colors.gray800,
    },
    Select: {
      colorBgContainer: "transparent",
      colorBgContainerDisabled: colors.gray900,
      colorTextDisabled: colors.gray500,
      selectorBg: "transparent",
      colorBgElevated: colors.gray800,
      boxShadow: colors.darkPopupShadow,
    },
    Dropdown: {
      colorBgElevated: colors.gray800,
      boxShadow: colors.darkPopupShadow,
    },
    Popover: {
      colorBgElevated: colors.gray800,
      boxShadow: colors.darkPopupShadow,
    },
    Tooltip: {
      colorTextLightSolid: colors.black,
      colorBgSpotlight: colors.white,
      boxShadow: colors.darkPopupShadow,
    },
    Radio: {
      colorBgContainer: "transparent",
      colorBgContainerDisabled: colors.gray900,
      colorTextDisabled: colors.gray500,
    },
    Checkbox: {
      colorBgContainer: "transparent",
      colorBgContainerDisabled: colors.gray900,
      colorTextDisabled: colors.gray500,
    },
    Skeleton: {
      gradientFromColor: colors.gray950,
      gradientToColor: colors.gray800,
    },
    Table: {
      borderColor: colors.gray800,
      rowHoverBg: colors.gray900,
      headerSortHoverBg: colors.gray800,
      headerSortActiveBg: colors.gray800,
      headerBg: "transparent",
      bodySortBg: "transparent",
      colorBgContainer: "transparent",
    },
    Spin: {
      colorBgContainer: "transparent",
    },
    Pagination: {
      itemBg: colors.gray800,
      colorBgTextHover: colors.gray600,
    },
    Collapse: {
      colorBgContainer: "transparent",
    },
    Drawer: {
      colorBgElevated: colors.black,
      colorBgMask: "rgba(10, 10, 12, .6)",
      boxShadowDrawerLeft: "none",
      boxShadowDrawerRight: "none",
      boxShadowDrawerDown: "none",
      boxShadowDrawerUp: "none",
    },
  }),
}

export const px2rem = px2remTransformer({
  rootValue: 16,
  precision: 2,
})

const Theme = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useAppStore((state) => state)
  const [antdTheme, setAntdTheme] = useState<Partial<ThemeConfig>>(lightTheme)

  useEffect(() => {
    const html = document?.querySelector("html")
    if (html) {
      const antdTheme = theme === "light" ? lightTheme : darkTheme
      setAntdTheme(antdTheme)
      html.setAttribute("data-disable-transitions", "true")
      html.setAttribute("data-theme", theme)
      html.querySelector("meta[name='theme-color']")?.setAttribute("content", theme === "light" ? "#ffffff" : "#131318")
      setTimeout(() => {
        html.removeAttribute("data-disable-transitions")
      }, 500)
    }
  }, [theme])

  return (
    <ConfigProvider theme={antdTheme}>
      <App>
        <EscapeAntd />
      </App>
      <StyleProvider transformers={[px2rem]}>
        <HappyProvider>{children}</HappyProvider>
      </StyleProvider>
    </ConfigProvider>
  )
}

export default Theme
