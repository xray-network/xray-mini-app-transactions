import { theme } from "antd"
import type { ThemeConfig } from "antd"
import merge from "lodash/merge"
import { palette, paletteDark, semantic, fontFamily, radius } from "./palette"

/** antd light/dark themes built from the design tokens in app/theme/palette.ts */

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
      colorFillAlter: "transparent",
    },
  },
}

export const lightTheme: ThemeConfig = {
  algorithm: theme.defaultAlgorithm,
  token: merge({}, restTheme.token, {
    colorPrimary: semantic.light.primary,
    colorInfo: semantic.light.primary,
    colorFillAlter: palette.offWhite,
    colorText: palette.black,
    colorBorder: palette.gray[300],
  }),
  components: merge({}, restTheme.components, {
    Button: {
      colorFill: palette.gray[200],
      colorFillSecondary: palette.gray[200],
      colorFillTertiary: palette.gray[100],
      borderColorDisabled: palette.gray[100],
      colorBgContainerDisabled: palette.gray[100],
      defaultBg: palette.gray[100],
      defaultHoverBg: palette.gray[200],
      defaultBorderColor: palette.gray[100],
      defaultHoverBorderColor: palette.gray[200],
      defaultHoverColor: semantic.light.primary,
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
      headerSortHoverBg: palette.gray[200],
      headerSortActiveBg: palette.gray[200],
      headerBg: "transparent",
      bodySortBg: "transparent",
      colorBgContainer: "transparent",
    },
    Spin: {
      colorBgContainer: "transparent",
    },
    Pagination: {
      itemBg: palette.gray[100],
      colorBgTextHover: palette.gray[200],
    },
    Drawer: {
      colorBgElevated: palette.offWhite,
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
    colorPrimary: semantic.dark.primary,
    colorInfo: semantic.dark.primary,
    colorFillAlter: palette.black,
    colorText: palette.offWhite,
    colorBorder: palette.gray[700],
  }),
  components: merge({}, restTheme.components, {
    Button: {
      colorFill: palette.gray[800],
      colorFillSecondary: palette.gray[800],
      colorFillTertiary: palette.gray[900],
      borderColorDisabled: palette.gray[900],
      colorBgContainerDisabled: palette.gray[900],
      defaultBg: palette.gray[800],
      defaultHoverBg: palette.gray[700],
      defaultBorderColor: palette.gray[800],
      defaultHoverBorderColor: palette.gray[700],
      defaultHoverColor: paletteDark.blue[300],
    },
    Tabs: {
      itemActiveColor: palette.offWhite,
      itemSelectedColor: palette.offWhite,
      inkBarColor: palette.offWhite,
      itemHoverColor: palette.gray[300],
    },
    Tag: {
      defaultBg: "transparent",
    },
    Input: {
      colorBgContainer: "transparent",
      colorBgContainerDisabled: palette.gray[900],
      colorTextDisabled: palette.gray[500],
    },
    InputNumber: {
      colorBgContainer: "transparent",
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
      colorBgContainer: "transparent",
      colorBgContainerDisabled: palette.gray[900],
      colorTextDisabled: palette.gray[500],
      selectorBg: "transparent",
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
      colorBgSpotlight: palette.offWhite,
      boxShadow: semantic.dark.popupShadow,
    },
    Radio: {
      colorBgContainer: "transparent",
      colorBgContainerDisabled: palette.gray[900],
      colorTextDisabled: palette.gray[500],
    },
    Checkbox: {
      colorBgContainer: "transparent",
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
      headerSortHoverBg: palette.gray[800],
      headerSortActiveBg: palette.gray[800],
      headerBg: "transparent",
      bodySortBg: "transparent",
      colorBgContainer: "transparent",
    },
    Spin: {
      colorBgContainer: "transparent",
    },
    Pagination: {
      itemBg: palette.gray[800],
      colorBgTextHover: palette.gray[600],
    },
    Collapse: {
      colorBgContainer: "transparent",
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
