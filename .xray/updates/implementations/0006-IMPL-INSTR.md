# xray-mini-app-transactions implementation 0006 instruction

Implementation-Version: v1
Implementation-ID: xray-mini-app-transactions/0006
Created: 20260811T093220Z
Evidence-Mode: LOCAL
Depends-On: xray-mini-app-transactions/0005
Provider-Evidence: NONE

## Objective

Adopt direct bridge client module namespace imports.

## Changes to implement

| Change ID | Requirement | Compatibility | Local owner | Validation |
| --- | --- | --- | --- | --- |
| C01 | Replace the named platform client wrapper import with a namespace import. | Coordinated pre-release change. | Transactions routing | Typecheck and build. |

## Validation

- `npm run typecheck`
- `npm run build`
