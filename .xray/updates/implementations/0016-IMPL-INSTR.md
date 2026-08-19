# xray-mini-app-transactions implementation 0016 instruction

Implementation-Version: v1
Implementation-ID: xray-mini-app-transactions/0016
Created: 20260819T131657Z
Evidence-Mode: LOCAL
Depends-On: mini-app-bridge/0014
Provider-Evidence: NONE

## Inputs and authority

| Input | Kind | Required | Purpose |
| --- | --- | --- | --- |
| Normalized SDK status contract and Transactions bridge integration | `LOCAL` | Yes | Preserve status-derived account behavior. |

## Objective

Adopt the normalized status SDK with no Transactions behavior change.

## Changes to implement

| Change ID | Requirement | Compatibility | Validation |
| --- | --- | --- | --- |
| C01 | Confirm React status still supplies `{ host, account }`; remove any direct duplicated-account assumptions or update docs if present. | Preserve selected/accountless/unavailable/standalone and transaction behavior. | Typecheck, build, scan, and diff check pass. |

## Implementation steps

1. Align affected consumption/docs only if required.
2. Validate.

## Validation

- `npm run typecheck`, `npm run build`, and `git diff --check`.

## Compatibility and human review

Review host/account states and transaction loading.

## Completion criteria

Transactions builds against the normalized SDK without reading account from low-level payload.

## Out of scope

Transaction behavior or UI changes.

## Blockers

Implement after SDK plan `mini-app-bridge/0014`.
