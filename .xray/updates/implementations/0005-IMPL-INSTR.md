# xray-mini-app-transactions implementation 0005 instruction

Implementation-Version: v1
Implementation-ID: xray-mini-app-transactions/0005
Created: 20260811T085802Z
Evidence-Mode: LOCAL
Depends-On: NONE
Provider-Evidence: NONE

## Inputs and authority

| Input | Kind | Required | Purpose |
| --- | --- | --- | --- |
| Current human request | `LOCAL` | Yes | Adopt separated platform and Cardano bridge APIs. |
| `app/` bridge consumers | `LOCAL` | Yes | Transactions settings, routing, tip, and account usage. |

## Objective

Adopt the explicit Cardano bridge adapter in Transactions.

## Changes to implement

| Change ID | Requirement | Compatibility | Local owner | Validation |
| --- | --- | --- | --- | --- |
| C01 | Move Cardano hooks/settings imports to Cardano paths while retaining platform APIs for shared behavior. | Old mixed imports are removed. | Transactions application | Typecheck and build. |

## Implementation steps

Migrate imports and validate.

## Validation

- `npm run typecheck`
- `npm run build`

## Compatibility and human review

Review Cardano/platform import ownership.

## Completion criteria

Transactions validates against the new architecture.

## Out of scope

Feature changes.

## Blockers

None.
