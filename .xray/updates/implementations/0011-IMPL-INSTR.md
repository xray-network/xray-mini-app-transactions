# xray-mini-app-transactions implementation 0011 instruction

Implementation-Version: v1
Implementation-ID: xray-mini-app-transactions/0011
Created: 20260811T213459Z
Evidence-Mode: LOCAL
Depends-On: NONE
Provider-Evidence: NONE

## Inputs and authority

| Input | Kind | Required | Purpose |
| --- | --- | --- | --- |
| Project manifests, lockfile, Router config, routes, and tooling | `LOCAL` | Yes | Define the React Router 7 contract. |
| React Router 8.3.0 requirements and human migration request | `LOCAL` | Yes | Define the target dependency/runtime contract. |

## Objective

Apply the validated React Router 8 migration contract to Transactions.

## Changes to implement

| Change ID | Requirement | Compatibility | Local owner | Validation |
| --- | --- | --- | --- | --- |
| C01 | Align all Router packages to 8.3.0, React/ReactDOM to 19.2.8, and Node to >=22.22.0. | Preserve SPA behavior and scripts. | Manifest and lockfile | Typecheck, build, npm audit. |
| C02 | Apply only compatibility changes required by typecheck/build. | Preserve application behavior. | Source/config | Typecheck and build. |

## Implementation steps

1. Apply dependency/runtime alignment and refresh npm state.
2. Resolve compatibility failures and validate.

## Validation

- `npm run typecheck && npm run build`
- Router/React `npm ls --depth=0`
- React Router 7 active-reference audit
- `git diff --check`

## Compatibility and human review

Review parity with the reference migration.

## Completion criteria

The app builds and typechecks on the aligned v8 contract.

## Out of scope

Feature, design, or unrelated dependency changes.

## Blockers

None.
