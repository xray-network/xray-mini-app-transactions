import { palette, paletteDark, semantic, fontFamily, fontFamilyMono, radius } from "./palette"

/**
 * Serializes the design tokens (app/theme/palette.ts) to CSS custom
 * properties under the --xr-* namespace. The result is injected as a <style>
 * tag in app/root.tsx (rendered on the server, so no flash of unstyled
 * content). Tailwind and the plain .css files consume these variables.
 */

type TokenGroup = { [key: string]: string | number | TokenGroup }

const kebab = (key: string) => key.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase()

const toVariables = (tokens: TokenGroup, prefix: string): string[] =>
  Object.entries(tokens).flatMap(([key, value]) => {
    const name = key === "DEFAULT" ? prefix : `${prefix}-${kebab(key)}`
    if (typeof value === "object") return toVariables(value, name)
    return [`  ${name}: ${value};`]
  })

export const themeCssVariables = [
  ":root {",
  ...toVariables({ ...palette, ...semantic.light }, "--xr"),
  `  --xr-font-sans: ${fontFamily};`,
  `  --xr-font-mono: ${fontFamilyMono};`,
  `  --xr-radius: ${radius.base}px;`,
  `  --xr-radius-lg: ${radius.lg}px;`,
  "}",
  '[data-theme="dark"] {',
  ...toVariables({ ...paletteDark, ...semantic.dark }, "--xr"),
  "}",
].join("\n")
