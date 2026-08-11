# xray-mini-app-transactions implementation 0004 instruction

Implementation-Version: v1
Implementation-ID: xray-mini-app-transactions/0004
Created: 20260811T082930Z
Evidence-Mode: LOCAL
Depends-On: NONE
Provider-Evidence: NONE

## Inputs and authority

| Input | Kind | Required | Purpose |
| --- | --- | --- | --- |
| Current human request | `LOCAL` | Yes | Consume iframe host context. |
| `app/integrations/xray-js/useEffectiveSettings.ts` | `LOCAL` | Yes | Owned bridge settings integration. |

## Objective

Adopt host context in the Transactions mini app.

## Changes to implement

| Change ID | Requirement | Compatibility | Local owner | Validation |
| --- | --- | --- | --- | --- |
| C01 | Expose host context and derive hosted Cardano network from it, retaining standalone fallback. | Cardano behavior remains stable. | `app/integrations/xray-js/` | Typecheck and build. |

## Implementation steps

Update integration and validate.

## Validation

- `npm run typecheck`
- `npm run build`

## Compatibility and human review

Review embedded and standalone network selection.

## Completion criteria

Host context is consumed and validation is recorded.

## Out of scope

Feature UI changes.

## Blockers

None.
