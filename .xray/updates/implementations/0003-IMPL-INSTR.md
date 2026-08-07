# xray-mini-app-transactions implementation 0003 instruction

Implementation-Version: v1
Implementation-ID: xray-mini-app-transactions/0003
Created: 20260807T105137Z
Evidence-Mode: LOCAL
Depends-On: NONE
Provider-Evidence: NONE

## Inputs and authority

| Input | Kind | Required | Purpose |
| --- | --- | --- | --- |
| Human request for the unreleased xray-js Cardano facade restructure | `LOCAL` | Yes | Authorizes migration to grouped exports. |
| Linked sibling xray-js runtime and active Transactions Cardano imports | `LOCAL` | Yes | Define the new facade and affected consumers. |

## Objective

Adopt grouped Cardano SDK exports in Transactions.

## Changes to implement

| Change ID | Requirement | Compatibility | Local owner | Validation |
| --- | --- | --- | --- | --- |
| `C01` | Migrate configuration, CIP-67, and Koios imports to grouped xray-js Cardano namespaces. | Breaking sibling API migration; preserve transaction behavior. | Transactions source | Typecheck and build. |
| `C02` | Remove retired Cardano facade imports. | No legacy aliases remain. | Source | Source scan. |

## Implementation steps

Migrate imports, validate, record the result, and move the row to `REVIEW`.

## Validation

- `npm run typecheck && npm run build`
- Retired-export scan
- `git diff --check`

## Compatibility and human review

Review unchanged query and label behavior against the new import contract.

## Completion criteria

Transactions compiles and builds with grouped Cardano exports and no retired imports.

## Out of scope

- Query or transaction behavior changes

## Blockers

None.
