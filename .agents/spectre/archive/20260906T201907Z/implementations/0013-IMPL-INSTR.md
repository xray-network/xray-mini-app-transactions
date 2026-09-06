# xray-mini-app-transactions implementation 0013 instruction

Implementation-Version: v1
Implementation-ID: xray-mini-app-transactions/0013
Created: 20260812T112201Z
Evidence-Mode: LOCAL
Depends-On: xray-js/cardano/0007
Provider-Evidence: NONE

## Inputs and authority

| Input | Kind | Required | Purpose |
| --- | --- | --- | --- |
| Transactions utilities and strict xray-js Cardano Lib boundary | `LOCAL` | Yes | Migrate CIP-67 access without behavior changes. |

## Objective

Consume CIP-67 exclusively through `@xray-network/xray-js/cardano/lib`.

## Changes to implement

| Change ID | Requirement | Compatibility | Local owner | Validation |
| --- | --- | --- | --- | --- |
| C01 | Move `cips` from the Cardano application import to `cardanoLib.cips` from `/cardano/lib`. | Preserve asset-label decoding. | Transactions utilities | Typecheck, build, and import audit. |

## Implementation steps

1. Update the utility import and CIP-67 reference.
2. Run application validation and diff checks.

## Validation

- `npm run typecheck`
- `npm run build`
- retired-import audit
- `git diff --check`

## Compatibility and human review

Review the import-only transactions utility migration.

## Completion criteria

Transactions uses the low-level entry for CIP-67 and validates.

## Out of scope

Transaction behavior or UI changes.

## Blockers

None.
