# xray-mini-app-transactions implementation 0017 instruction

Implementation-Version: v1
Implementation-ID: xray-mini-app-transactions/0017
Created: 20260831T142726Z
Evidence-Mode: LOCAL
Depends-On: NONE
Provider-Evidence: NONE

## Inputs and authority

| Input                                                                                                                                                                                                                                                                   | Kind    | Required | Purpose                                                                                                                             |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| Human request: populate every transaction-detail tab, preserve the UTXO tab's UI/UX language, and add a `dev:example` package script backed by a full-featured transaction                                                                                              | `LOCAL` | Yes      | Defines the requested behavior, visual compatibility, and standalone review path.                                                   |
| `app/components/pages/Home/index.tsx`                                                                                                                                                                                                                                   | `LOCAL` | Yes      | Owns transaction loading, the existing transaction summary/details, the populated UTXO tab, and the currently disabled detail tabs. |
| `app/components/pages/Home/style.module.css`                                                                                                                                                                                                                            | `LOCAL` | Yes      | Defines page-local transaction list and collapse styling that new detail views must preserve.                                       |
| `app/components/informers/index.ts`, `app/components/informers/Breakdown/index.tsx`, `app/components/informers/Text/index.tsx`, `app/components/informers/Explorer/index.tsx`, `app/components/informers/Ada/index.tsx`, and `app/components/informers/Asset/index.tsx` | `LOCAL` | Yes      | Supply the existing Breakdown, Text, Explorer, Ada, and Asset visual primitives used by the UTXO and general-info views.            |
| `app/components/common/Empty/index.tsx` and `app/styles/shared/box.css`                                                                                                                                                                                                 | `LOCAL` | Yes      | Define the established empty-state and shared card treatments for absent optional transaction data.                                 |
| `app/types/index.ts` and `app/utils/txKoios.ts`                                                                                                                                                                                                                         | `LOCAL` | Yes      | Define the exported Koios response types and current transaction/address interpretation boundary.                                   |
| `app/integrations/xray-js/useEffectiveSettings.ts`                                                                                                                                                                                                                      | `LOCAL` | Yes      | Defines production host/network/explorer settings that example mode must not change.                                                |
| `package.json`                                                                                                                                                                                                                                                          | `LOCAL` | Yes      | Defines the React Router/Vite commands and the existing xray-js Koios client dependency contract.                                   |
| `README.md`                                                                                                                                                                                                                                                             | `LOCAL` | Yes      | Documents the supported local development entry points.                                                                             |

## Objective

Populate all transaction detail tabs and add a full-featured example mode.

## Changes to implement

| Change ID | Requirement                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Compatibility                                                                                                                                                                                                                    | Local owner                                                                                                                  | Validation                                                                                                                                                                                |
| --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `C01`     | Request all `tx_info` expansions needed by the existing tabs: inputs/assets, metadata, withdrawals, certificates, collateral/reference/script details, script bytecode, and governance data included in the raw payload. Keep optional Koios fields nullable and tolerate unknown nested values without throwing.                                                                                                                                                                                                                                                     | Preserve the live Koios endpoint, network selection, refresh, pagination, transaction ordering, loading states, and send/receive/internal summary behavior.                                                                      | `app/components/pages/Home/index.tsx` and transaction data helpers extracted from it as needed                               | Typecheck and production build pass; review a live transaction without optional fields and confirm it still renders.                                                                      |
| `C02`     | Replace every disabled transaction tab with an enabled view: Metadata from `metadata`; Withdrawals from `withdrawals`; Certificates from `certificates`; Contracts from `native_scripts` and `plutus_contracts`; TokenMint from `assets_minted`; Collateral from `collateral_inputs` and `collateral_output`; InputRefs from `reference_inputs`; and Raw from the complete `txInfo` object. Each optional tab must show the shared Empty treatment when its source is absent or empty rather than being disabled or blank.                                            | Retain the existing tab keys and user-facing labels, and leave the meaning and content of the UTXOs tab intact. Raw output must be read-only, deterministic JSON that safely handles non-JSON scalar values.                     | `app/components/pages/Home/index.tsx` and page-local transaction-detail components                                           | Example-mode visual review confirms every tab is enabled, populated, readable, and has no console/render errors; an absent-data fixture or live sparse transaction confirms empty states. |
| `C03`     | Extract reusable transaction-detail presentation for section headings, shared boxes, UTXO-shaped records, arbitrary nested Koios objects/arrays, scalar formatting/copying, and raw JSON. Use the same responsive two-column layout where data has a natural pair, the same `shared-box`/gray inner surface, existing informer typography, dashed separators, spacing, icons, and light/dark styles demonstrated by UTXOs and General/Block Info. Long hashes, addresses, bytecode, and JSON must wrap, truncate, scroll, or copy without overflowing narrow screens. | Reuse existing informers and shared styles before adding page-local CSS; do not introduce a second design system or alter global theme behavior. Keep production data display faithful even when Koios adds unknown object keys. | New page-local components under `app/components/pages/Home/` plus `app/components/pages/Home/style.module.css` when required | Review at mobile and desktop widths in light and dark themes; typecheck/build pass; no horizontal page overflow from the full example payload.                                            |
| `C04`     | Add a typed, deterministic full-transaction example fixture containing account context, tip, address transaction summary, general/block values, inputs and outputs with native assets, metadata, withdrawals, certificates, native and Plutus contracts, minted/burned tokens, collateral input/output, reference inputs, inline datum/reference script details, governance values for Raw, and representative long hashes/bytecode. Example data must be local, must not call Koios, and must be activated only by Vite mode `example`.                              | Normal `dev`, build, and hosted runtime continue using the bridge and live Koios data. The fixture must not leak into or silently fall back from production behavior.                                                            | New example fixture/source module under `app/examples/` and the transaction data boundary in `app/components/pages/Home/`    | Example-mode build passes; browser network review confirms no Koios request; every tab contains representative content from the single fixture transaction.                               |
| `C05`     | Add package script `dev:example` that runs the existing React Router development server with the same host/port as `dev` and `--mode example`; document its purpose and review workflow. Do not add a package solely to set environment variables.                                                                                                                                                                                                                                                                                                                    | Preserve existing script names and commands. `npm run dev:example` must remain an explicit developer-only path.                                                                                                                  | `package.json` and `README.md`                                                                                               | `npm run dev:example -- --strictPort` starts successfully; the page loads the fixture without XRAY host setup; `git diff --check` passes.                                                 |

## Implementation steps

1. Define page-local Koios transaction aliases and safe normalization helpers for empty values, unknown records/arrays, scalar labels, and deterministic raw serialization.
2. Extract the current UTXO card/layout into reusable transaction-detail components without changing the existing UTXO tab's content or transaction-summary behavior.
3. Enable the eight currently disabled tabs and bind each to its declared `txInfo` field, using semantic renderers where the Koios shape is known and the structured fallback for unknown nested values.
4. Expand the `/tx_info` request flags so live results contain every supported optional section.
5. Add the isolated, typed example source and select it only when `import.meta.env.MODE === "example"`; in that mode supply account/tip/list/info data directly and skip Koios client construction and requests.
6. Add `dev:example` with `--mode example` and document how to open the transaction and inspect every tab.
7. Format changed files, run static/build validation, start example mode, and perform responsive light/dark visual review of all tabs and empty states.

## Validation

- `npm run typecheck`
- `npm run build`
- `npm run build -- --mode example`
- `npm run dev:example -- --strictPort` and load the app in a browser without an XRAY host.
- In example mode, expand the transaction and inspect UTXOs, Metadata, Withdrawals, Certificates, Contracts, TokenMint, Collateral, InputRefs, and Raw at mobile and desktop widths in light and dark themes.
- Confirm the browser makes no Koios request in example mode and shows no render/console error.
- Confirm a live or temporary sparse transaction payload shows the shared empty state in optional tabs without disabling them.
- `git diff --check`

## Compatibility and human review

- Human review should compare every new tab with the UTXO, General Info, and Block Info views for spacing, typography, cards, colors, responsive behavior, copy affordances, and dark-mode parity.
- Verify that the production path still obtains account/tip/settings from the XRAY bridge and transaction data from the selected network's Koios endpoint.
- Verify refresh and Load More still append the correct transaction summaries and expanded details.
- Treat arbitrary Koios structures as display data only; never interpret returned strings as HTML or execute script/bytecode content.

## Completion criteria

- All nine existing tabs are enabled and render their declared transaction fields.
- Optional absent sections use the established empty-state treatment.
- The existing UTXO tab and transaction list behavior remain functionally and visually consistent.
- `npm run dev:example` displays one deterministic transaction with meaningful data in every tab and performs no bridge-dependent Koios fetch.
- Long and nested example values remain usable on narrow and wide viewports in both themes.
- Typecheck, normal build, example build, example-server smoke test, and diff validation pass.

## Out of scope

- Adding new tabs for governance votes or proposals; those fields remain inspectable in Raw.
- Changing Koios providers, explorer providers, account selection, transaction classification, pagination size, or transaction ordering.
- Redesigning the transaction summary, General Info, Block Info, or global application theme.
- Fetching extra asset, script, certificate, metadata-label, or datum details from additional endpoints.
- Editing xray-js or the generated `cardano-koios-client` schema.
- Adding end-to-end test infrastructure or publishing/deploying the example mode.

## Blockers

None.
