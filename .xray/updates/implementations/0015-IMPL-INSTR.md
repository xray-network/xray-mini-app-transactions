# xray-mini-app-transactions implementation 0015 instruction

Implementation-Version: v1
Implementation-ID: xray-mini-app-transactions/0015
Created: 20260819T091039Z
Evidence-Mode: LOCAL
Depends-On: NONE
Provider-Evidence: NONE

## Inputs and authority

| Input                                                                                         | Kind    | Required | Purpose                                                               |
| --------------------------------------------------------------------------------------------- | ------- | -------- | --------------------------------------------------------------------- |
| Human-approved scope-versioned bridge contract dated 2026-08-19                               | `LOCAL` | Yes      | Define handshake-free platform/Cardano clients and `xray.app` status. |
| `package.json`, `package-lock.json`, and `README.md`                                          | `LOCAL` | Yes      | Preserve linked SDK resolution and repository validation.             |
| `app/integrations/xray-js/useEffectiveSettings.ts` and `app/shared/routing/HostRouteSync.tsx` | `LOCAL` | Yes      | Own host settings and route synchronization.                          |
| `app/components/pages/Home/index.tsx` and `app/types/index.ts`                                | `LOCAL` | Yes      | Own transaction Cardano bridge calls and public types.                |

## Objective

Adopt the scope-versioned bridge client in Transactions without a Provider or handshake while preserving transaction behavior.

## Changes to implement

| Change ID | Requirement                                                                                                                                                                                  | Compatibility                                      | Local owner                                 | Validation                                         |
| --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- | ------------------------------------------- | -------------------------------------------------- |
| C01       | Replace grouped, legacy, and `/cardano` imports/types with direct platform/Cardano/CIP-30 v1 client and React namespaces actually used.                                                      | Remove retired APIs without shims.                 | Manifest/lockfile, integrations, app types. | Typecheck and import scan pass.                    |
| C02       | Replace Provider/handshake connection state with lazy platform status and distinguish selected Cardano account, accountless XRAY host, unavailable host, and standalone operation.           | Status does not authorize transaction access.      | Home host/account state.                    | State behavior and build pass.                     |
| C03       | Migrate theme, currency, hide-balances, and route synchronization to platform/v1 hooks/events without connection gating, preserving local fallbacks and loop prevention.                     | No handshake prerequisite.                         | Effective settings and HostRouteSync.       | Typecheck/build pass.                              |
| C04       | Migrate every Transactions Cardano request/hook to direct Cardano v1 or CIP-30 v1 APIs while preserving loading, null, error, signing/submission feedback, and transaction display behavior. | Existing host authorization/errors remain visible. | Home transaction integration.               | Operation inventory and production build pass.     |
| C05       | Remove obsolete Provider, handshake, capability, generic message, grouped-role, and protocol-subpath code/types; update relevant docs.                                                       | No legacy fallback.                                | App source/types and README.                | Stale scan, formatting, typecheck, and build pass. |

## Implementation steps

1. Align linked SDK imports and public types.
2. Replace connection state with platform status.
3. Migrate settings/routes and all Cardano transaction operations.
4. Remove retired code and update relevant documentation.
5. Run validation and review embedded/standalone behavior.

## Validation

- Run `npm run typecheck`.
- Run `npm run build`.
- Run `git diff --check`.
- Scan source for Provider/handshake/capability APIs, `useMiniApp`, `useHostMessage`, grouped `client`, legacy wire names, and `/mini-app-bridge/cardano` imports.

## Compatibility and human review

Implement after XRAY App host support. Human review must cover standalone and embedded selected/accountless states, host preferences/routes, transaction loading, and representative signing/submission success and errors.

## Completion criteria

- Transactions uses only direct scope-versioned platform/Cardano APIs.
- No Provider or handshake gates bridge usage.
- Existing transaction behavior and authorization errors are preserved.
- Typecheck, build, and stale-contract audits pass.

## Out of scope

- XRAY App host, xray-js SDK, transaction feature redesign, or new adapters.
- Legacy protocol fallback.

## Blockers

None.
