/**
 * Design tokens shared by Ant Design, CSS variables, and Tailwind utilities.
 * Keep visual values here so every styling layer resolves the same theme.
 */

const offWhite = "#f6f7f2"

export const fontFamily =
  '"-apple-system-body", "ui-sans-serif", "-apple-system", "system-ui", "Segoe UI", "Helvetica", "Apple Color Emoji", "Arial", "sans-serif", "Segoe UI Emoji", "Segoe UI Symbol"'
export const fontFamilyMono =
  '"ui-monospace", "SFMono-Regular", "SF Mono", "Menlo", "Consolas", "Liberation Mono", "monospace"'

export const radius = {
  base: 10,
  lg: 20,
}

export const metaThemeColor = {
  light: "#ffffff",
  dark: "#000000",
} as const

export const palette = {
  white: "#ffffff",
  black: "#000000",
  transparent: "transparent",
  offWhite,
  td: {
    DEFAULT: offWhite,
    hover: "#eeefe7",
    dark: "#2f222c",
    darkHover: "#3a2b36",
  },
  blue: {
    DEFAULT: "#1940ed",
    50: "#c3cdfa",
    100: "#b0bef9",
    200: "#8b9ef6",
    300: "#657ff3",
    400: "#3f5ff0",
    500: "#1940ed",
    600: "#0f2fbf",
    700: "#0b228b",
    800: "#071657",
    900: "#030923",
    950: "#010209",
  },
  green: {
    DEFAULT: "#15e4a3",
    50: "#f0fcfa",
    100: "#e6fcf9",
    200: "#bef7ec",
    300: "#9df5e2",
    400: "#54ebc3",
    500: "#15e4a3",
    600: "#10cc8a",
    700: "#0cab6b",
    800: "#07874d",
    900: "#046635",
    950: "#02421e",
  },
  gray: {
    DEFAULT: "#6e758d",
    50: "#f9fafb",
    100: "#f3f4f6",
    200: "#e5e7eb",
    300: "#d1d5db",
    400: "#9ca3af",
    500: "#6e758d",
    600: "#55556d",
    700: "#374151",
    800: "#1f2937",
    900: "#1e2232",
    950: "#0e0e18",
  },
  orange: {
    DEFAULT: "#f97316",
    50: "#fff4e6",
    100: "#ffeadc",
    200: "#ffd1b3",
    300: "#ffb88a",
    400: "#ff9f61",
    500: "#f97316",
    600: "#cc5e13",
    700: "#995011",
    800: "#66370e",
    900: "#331b07",
    950: "#190d03",
  },
  red: {
    DEFAULT: "#ef4444",
    50: "#fef2f2",
    100: "#fee2e2",
    200: "#fecaca",
    300: "#fca5a5",
    400: "#f87171",
    500: "#ef4444",
    600: "#dc2626",
    700: "#b91c1c",
    800: "#991b1b",
    900: "#7f1d1d",
    950: "#450a0a",
  },
}

export const paletteDark = {
  blue: {
    DEFAULT: "#5e69ff",
    50: "#f7fbff",
    100: "#f0f7ff",
    200: "#d6e7ff",
    300: "#bfd6ff",
    400: "#8fa5ff",
    500: "#5e69ff",
    600: "#4c56e6",
    700: "#363cbf",
    800: "#222899",
    900: "#141873",
    950: "#080b4a",
  },
}

export const semantic = {
  light: {
    primary: palette.blue.DEFAULT,
    success: palette.green[500],
    warning: palette.orange[500],
    error: palette.red[500],
    popupShadow: "0 6px 30px 0 rgba(0,0,0,.03), 0 3px 6px -4px rgba(0,0,0,.03), 0 9px 28px 8px rgba(0,0,0,.03)",
  },
  dark: {
    primary: paletteDark.blue.DEFAULT,
    success: palette.green[500],
    warning: palette.orange[500],
    error: palette.red[500],
    popupShadow: "0 0 60px 0 rgba(60, 60, 70, .5)",
  },
}
