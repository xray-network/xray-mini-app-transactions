# xray-mini-app-transactions implementation 0009 instruction

Implementation-Version: v1
Implementation-ID: xray-mini-app-transactions/0009
Created: 20260811T205459Z
Evidence-Mode: LOCAL
Depends-On: NONE
Provider-Evidence: NONE

## Inputs and authority

| Input                                       | Kind    | Required | Purpose                                         |
| ------------------------------------------- | ------- | -------- | ----------------------------------------------- |
| `package.json` and active repository source | `LOCAL` | Yes      | Define current dependency and script ownership. |
| Human-approved dependency audit             | `LOCAL` | Yes      | Authorize the reported cleanup.                 |

## Objective

Remove unused dependencies and align SPA tooling with static deployment.

## Changes to implement

| Change ID | Requirement                                                                                        | Compatibility                                 | Local owner | Validation    |
| --------- | -------------------------------------------------------------------------------------------------- | --------------------------------------------- | ----------- | ------------- |
| C01       | Remove unused serve, date, and Jazzicon dependencies while retaining generated-entry dependencies. | Retain active runtime imports and SPA builds. | Manifest    | Build.        |
| C02       | Move formatting, deployment, and Vite plugins to development dependencies.                         | Preserve build and deploy behavior.           | Manifest    | Build.        |
| C03       | Replace broken serve/start scripts with a Wrangler static preview.                                 | Keep SPA output under build/client.           | Scripts     | Static audit. |

## Implementation steps

1. Update package ownership and SPA scripts.
2. Refresh the npm lockfile.
3. Audit installed and declared dependencies.
4. Run project validation.

## Validation

- `npm run typecheck`
- `npm run build`
- `npm ls --depth=0`
- `Manifest/import/script audit`
- `git diff --check`

## Compatibility and human review

Review dependency classification and preview/deployment behavior.

## Completion criteria

All declared changes are implemented, lockfiles are synchronized, and validation passes.

## Out of scope

Feature changes and dependency version upgrades.

## Blockers

None.
