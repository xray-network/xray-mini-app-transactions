# xray-mini-app-transactions implementation 0010 instruction

Implementation-Version: v1
Implementation-ID: xray-mini-app-transactions/0010
Created: 20260811T211000Z
Evidence-Mode: LOCAL
Depends-On: NONE
Provider-Evidence: NONE

## Inputs and authority

| Input | Kind | Required | Purpose |
| --- | --- | --- | --- |
| `package.json` and `package-lock.json` | `LOCAL` | Yes | Define dependency ownership. |
| Human request to restore `@react-router/serve` | `LOCAL` | Yes | Authorize restoration. |

## Objective

Restore the matching React Router server adapter dependency.

## Changes to implement

| Change ID | Requirement | Compatibility | Local owner | Validation |
| --- | --- | --- | --- | --- |
| C01 | Restore `@react-router/serve` and synchronize npm state. | Preserve SPA behavior and scripts. | Manifest and lockfile | Typecheck, build, and audit. |

## Implementation steps

1. Restore the dependency and lockfile entry.
2. Validate the project and installed tree.

## Validation

- `npm run typecheck && npm run build`
- `npm ls @react-router/serve --depth=0`
- `git diff --check`

## Compatibility and human review

Review dependency restoration without preview-script changes.

## Completion criteria

The dependency is declared, locked, installed, and validation passes.

## Out of scope

Changing preview behavior.

## Blockers

None.
