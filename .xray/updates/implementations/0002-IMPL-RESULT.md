# xray-mini-app-transactions implementation 0002 result

Result-Version: v1
Implementation-ID: xray-mini-app-transactions/0002
Instruction: ./0002-IMPL-INSTR.md
Evidence-Mode: LOCAL

## Change dispositions

| Change ID | Disposition   | Implementation                                                                                                                                                                                                                                                                                                                                                                                                                        | Validation                                                                                                                                                         |
| --------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `C01`     | `IMPLEMENTED` | Added the typed palette, CSS serializer, `--xr-*` Tailwind mapping, Ant Design themes, and browser theme colors.                                                                                                                                                                                                                                                                                                                      | Typecheck, production build, and stale-variable scan passed.                                                                                                       |
| `C02`     | `IMPLEMENTED` | Added an effective-theme hook: SDK host theme while connected, persisted local/system preference while standalone.                                                                                                                                                                                                                                                                                                                    | Typecheck and source inspection passed; host theme is not persisted.                                                                                               |
| `C03`     | `IMPLEMENTED` | Added SSR token injection and the template provider hierarchy while retaining app-specific style imports.                                                                                                                                                                                                                                                                                                                             | Production client and SPA builds passed.                                                                                                                           |
| `C04`     | `IMPLEMENTED` | Removed duplicate theme state/subscriptions and the legacy theme file; declared CSS-in-JS directly and refreshed npm metadata.                                                                                                                                                                                                                                                                                                        | npm lock refresh and stale-code scan passed.                                                                                                                       |
| `C05`     | `IMPLEMENTED` | Split standalone preferences from bridge-owned live state; npm-linked `xray-js`; routed bridge hooks/types, Koios access/types, slot conversion, Cardano constants, cardano-lib-backed CIP-67 validation, and asset/hex decoding through public xray-js subpaths; removed the local CRC-8 codec plus direct mini-app SDK, Koios, and Buffer dependencies; separated routing effects; and moved Ant Design escape access into `theme`. | Exact sibling resolution, dependency/source scans, CIP-67 vector smoke, typecheck, production build, and legacy architecture/package/terminology/CRC scans passed. |

## Outcome

The transactions frontend now follows the React template's theme, state, integration, routing, type, and utility ownership architecture.

## Inputs consumed

The human implementation request, the local React template theme/style modules, and the transactions frontend source and manifest.

## Project changes

Introduced shared theme modules and XRAY bridge effective settings; migrated CSS/Tailwind; replaced the mixed app store and monolithic effects wrapper with preferences, xray-js bridge hooks, and routing modules; reused xray-js Koios/slot/asset/encoding/config exports; updated root providers and npm metadata.

## Exported change contract

| Change ID | Semantic change                                                                                                                                                                                                                            | Compatibility                                                                                                                                         | Downstream action                                                                                                 |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `C01`     | Palette values are authored once and consumed by Ant Design, CSS, Tailwind, and browser chrome.                                                                                                                                            | Existing semantic light/dark colors are retained.                                                                                                     | Add future design tokens in `app/theme/palette.ts`.                                                               |
| `C02`     | A connected XRAY host owns the effective theme; standalone mode owns its local/system preference.                                                                                                                                          | Host values never overwrite local preference.                                                                                                         | Use the SDK theme hook rather than adding theme message subscriptions.                                            |
| `C03`     | Theme providers share one hierarchy and CSS variables are present in initial HTML.                                                                                                                                                         | Existing Ant Design context and app styles remain available.                                                                                          | Place UI requiring Ant Design context beneath `Theme`.                                                            |
| `C04`     | npm declares the CSS-in-JS package used directly by the frontend.                                                                                                                                                                          | npm remains the only package manager.                                                                                                                 | Refresh `package-lock.json` after dependency changes.                                                             |
| `C05`     | Persistence contains standalone preferences only while xray-js bridge hooks own live network, tip, account, and display settings; xray-js also owns Koios, slot, Cardano constants, CIP-67 validation, and generic asset/encoding helpers. | The existing storage key, transaction behavior, tolerant invalid-label fallback, and label presentation are preserved; host values are not persisted. | Use xray-js public subpaths for shared runtime behavior and keep feature query and UI presentation modules local. |

## Validation

Sibling `npm link`; `npm run typecheck`; `npm run build`; dependency/source, stale theme/variable, and legacy architecture/package/terminology scans; `git diff --check`.

## Deviations from instruction

The human expanded this non-terminal implementation to include the template's application-module structure and xray-js consolidation. Feature-specific transaction query modules remain local; generic Koios, slot, asset, and encoding behavior now comes from xray-js.
The system-owned global npm prefix rejected direct linking, so a temporary writable npm prefix registered and linked the same sibling runtime while `package.json` retained its portable `file:` dependency.

## Remaining human review

Visually review representative transaction pages in standalone light/dark/system modes and inside an XRAY host.

## Reproducibility

Build/link `../xray-js/packages/runtime`, run `npm run typecheck && npm run build`, then scan active source and npm metadata for legacy theme/store/effect ownership plus `cardano-web3-js`, `cardano-web-js`, `CardanoWeb3`, and `CW3Types`.
