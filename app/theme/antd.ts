import { theme } from "antd"
import type { ThemeConfig } from "antd"
import merge from "lodash/merge"
import { fontFamily, palette, radius, semantic } from "./palette"

const lightNeutralTokens = {
  colorBgBase: palette.white,
  colorBgLayout: palette.gray[50],
  colorBgContainer: palette.white,
  colorBgElevated: palette.white,
  colorBgSpotlight: palette.gray[950],
  colorBgContainerDisabled: palette.gray[100],
  colorFill: palette.gray[300],
  colorFillSecondary: palette.gray[200],
  colorFillTertiary: palette.gray[100],
  colorFillQuaternary: palette.gray[50],
  colorFillAlter: palette.gray[50],
  colorTextBase: palette.black,
  colorText: palette.black,
  colorTextSecondary: palette.gray[600],
  colorTextTertiary: palette.gray[500],
  colorTextQuaternary: palette.gray[400],
  colorTextDisabled: palette.gray[400],
  colorBorder: palette.gray[300],
  colorBorderSecondary: palette.gray[200],
  colorSplit: palette.gray[200],
} satisfies ThemeConfig["token"]

const darkNeutralTokens = {
  colorBgBase: palette.black,
  colorBgLayout: palette.gray[950],
  colorBgContainer: palette.black,
  colorBgElevated: palette.gray[900],
  colorBgSpotlight: palette.white,
  colorBgContainerDisabled: palette.gray[900],
  colorFill: palette.gray[700],
  colorFillSecondary: palette.gray[800],
  colorFillTertiary: palette.gray[900],
  colorFillQuaternary: palette.gray[950],
  colorFillAlter: palette.gray[950],
  colorTextBase: palette.white,
  colorText: palette.white,
  colorTextSecondary: palette.gray[300],
  colorTextTertiary: palette.gray[400],
  colorTextQuaternary: palette.gray[500],
  colorTextDisabled: palette.gray[500],
  colorBorder: palette.gray[700],
  colorBorderSecondary: palette.gray[800],
  colorSplit: palette.gray[800],
} satisfies ThemeConfig["token"]

/** Ant Design themes derived from the same design tokens used by CSS. */
export const restTheme: ThemeConfig = {
  token: {
    fontFamily,
    fontSize: 14,
    colorSuccess: semantic.light.success,
    colorWarning: semantic.light.warning,
    colorError: semantic.light.error,
    borderRadius: radius.base,
  },
  components: {
    Button: {
      contentFontSizeSM: 14,
      contentFontSize: 14,
      contentFontSizeLG: 14,
    },
    Input: {
      inputFontSizeSM: 14,
      inputFontSize: 14,
      inputFontSizeLG: 14,
    },
    InputNumber: {
      inputFontSizeSM: 14,
      inputFontSize: 14,
      inputFontSizeLG: 14,
    },
    Select: {
      fontSizeSM: 14,
      fontSize: 14,
      fontSizeLG: 14,
      lineHeightLG: 24 / 14,
    },
    Switch: {
      fontSizeSM: 14,
      fontSize: 14,
      fontSizeLG: 14,
    },
    Radio: {
      fontSizeSM: 14,
      fontSize: 14,
      fontSizeLG: 14,
    },
    Tabs: {
      horizontalItemGutter: 25,
    },
    Modal: {
      borderRadiusLG: radius.lg,
    },
    Upload: {
      colorFillAlter: palette.transparent,
    },
  },
}

export const lightTheme: ThemeConfig = {
  algorithm: theme.defaultAlgorithm,
  token: merge({}, restTheme.token, {
    ...lightNeutralTokens,
    colorPrimary: semantic.light.primary,
    colorInfo: semantic.light.primary,
  }),
  components: merge({}, restTheme.components, {
    Button: {
      colorFill: palette.gray[200],
      colorFillSecondary: palette.gray[200],
      colorFillTertiary: palette.gray[100],
      borderColorDisabled: palette.gray[100],
      colorBgContainerDisabled: palette.gray[100],
    },
    Modal: {
      colorBgMask: "rgba(240, 240, 242, .8)",
      boxShadow: semantic.light.popupShadow,
    },
    Select: {
      boxShadow: semantic.light.popupShadow,
    },
    Dropdown: {
      boxShadow: semantic.light.popupShadow,
    },
    Popover: {
      boxShadow: semantic.light.popupShadow,
    },
    Tooltip: {
      colorBgSpotlight: palette.gray[950],
      boxShadow: semantic.light.popupShadow,
    },
    Skeleton: {
      gradientFromColor: palette.gray[100],
      gradientToColor: palette.gray[200],
    },
    Table: {
      borderColor: palette.gray[100],
      rowHoverBg: palette.gray[100],
      headerSortHoverBg: palette.gray[100],
      headerSortActiveBg: palette.gray[100],
      headerBg: palette.transparent,
      bodySortBg: palette.transparent,
      colorBgContainer: palette.transparent,
    },
    Spin: {
      colorBgContainer: palette.transparent,
    },
    Pagination: {
      itemBg: palette.gray[100],
      colorBgTextHover: palette.gray[200],
    },
    Drawer: {
      colorBgElevated: palette.white,
      colorBgMask: "rgba(250, 250, 252, .6)",
      boxShadowDrawerLeft: "none",
      boxShadowDrawerRight: "none",
      boxShadowDrawerDown: "none",
      boxShadowDrawerUp: "none",
    },
  }),
}

export const darkTheme: ThemeConfig = {
  algorithm: theme.darkAlgorithm,
  token: merge({}, restTheme.token, {
    ...darkNeutralTokens,
    colorPrimary: semantic.dark.primary,
    colorInfo: semantic.dark.primary,
  }),
  components: merge({}, restTheme.components, {
    Button: {
      colorFill: palette.gray[800],
      colorFillSecondary: palette.gray[800],
      colorFillTertiary: palette.gray[900],
      defaultBg: palette.black,
      defaultHoverBg: palette.black,
      defaultBorderColor: palette.gray[700],
      borderColorDisabled: palette.gray[900],
      colorBgContainerDisabled: palette.gray[900],
    },
    Tabs: {
      itemActiveColor: palette.white,
      itemSelectedColor: palette.white,
      inkBarColor: palette.white,
      itemHoverColor: palette.gray[300],
    },
    Tag: {
      defaultBg: palette.transparent,
    },
    Input: {
      colorBgContainer: palette.black,
      colorBgContainerDisabled: palette.gray[900],
      colorTextDisabled: palette.gray[500],
    },
    InputNumber: {
      colorBgContainer: palette.black,
      colorBgContainerDisabled: palette.gray[900],
      colorTextDisabled: palette.gray[500],
    },
    Modal: {
      contentBg: palette.black,
      colorBgMask: "rgba(19, 19, 24, .8)",
      boxShadow: semantic.dark.popupShadow,
    },
    Message: {
      contentBg: palette.gray[800],
    },
    Notification: {
      colorBgElevated: palette.gray[800],
    },
    Select: {
      colorBgContainer: palette.transparent,
      colorBgContainerDisabled: palette.gray[900],
      colorTextDisabled: palette.gray[500],
      selectorBg: palette.black,
      colorBgElevated: palette.gray[800],
      boxShadow: semantic.dark.popupShadow,
    },
    Dropdown: {
      colorBgElevated: palette.gray[800],
      boxShadow: semantic.dark.popupShadow,
    },
    Popover: {
      colorBgElevated: palette.gray[800],
      boxShadow: semantic.dark.popupShadow,
    },
    Tooltip: {
      colorTextLightSolid: palette.black,
      colorBgSpotlight: palette.white,
      boxShadow: semantic.dark.popupShadow,
    },
    Radio: {
      colorBgContainer: palette.transparent,
      colorBgContainerDisabled: palette.gray[900],
      colorTextDisabled: palette.gray[500],
    },
    Checkbox: {
      colorBgContainer: palette.transparent,
      colorBgContainerDisabled: palette.gray[900],
      colorTextDisabled: palette.gray[500],
    },
    Skeleton: {
      gradientFromColor: palette.gray[950],
      gradientToColor: palette.gray[800],
    },
    Table: {
      borderColor: palette.gray[800],
      rowHoverBg: palette.gray[900],
      headerSortHoverBg: palette.gray[900],
      headerSortActiveBg: palette.gray[900],
      headerBg: palette.transparent,
      bodySortBg: palette.transparent,
      colorBgContainer: palette.transparent,
    },
    Spin: {
      colorBgContainer: palette.transparent,
    },
    Pagination: {
      itemBg: palette.gray[800],
      colorBgTextHover: palette.gray[600],
    },
    Collapse: {
      colorBgContainer: palette.transparent,
    },
    Drawer: {
      colorBgElevated: palette.black,
      colorBgMask: "rgba(10, 10, 12, .6)",
      boxShadowDrawerLeft: "none",
      boxShadowDrawerRight: "none",
      boxShadowDrawerDown: "none",
      boxShadowDrawerUp: "none",
    },
  }),
}
