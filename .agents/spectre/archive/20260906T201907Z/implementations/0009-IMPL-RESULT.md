# xray-mini-app-transactions implementation 0009 result

Result-Version: v1
Implementation-ID: xray-mini-app-transactions/0009
Instruction: ./0009-IMPL-INSTR.md
Evidence-Mode: LOCAL

## Change dispositions

| Change ID | Disposition   | Implementation                                                                             | Validation                   |
| --------- | ------------- | ------------------------------------------------------------------------------------------ | ---------------------------- |
| C01       | `IMPLEMENTED` | Removed React Router Serve, date-fns, and Jazzicon; retained generated-entry dependencies. | Typecheck/build passed.      |
| C02       | `IMPLEMENTED` | Moved Prettier, Wrangler, SVGR, and WASM plugins to development scope.                     | Installed-tree audit passed. |
| C03       | `IMPLEMENTED` | Replaced invalid serve/start commands with a Wrangler static preview.                      | Script audit passed.         |

## Outcome

Transactions has a smaller runtime manifest and a valid static preview workflow.

## Inputs consumed

- Project manifests, lockfiles, scripts, active imports, installed dependency trees, and the human-approved audit.

## Project changes

- Updated dependency ownership and synchronized npm lock/install state.
- Preserved React Router Node and isbot after validation proved they are generated-entry requirements.

## Exported change contract

| Change ID | Semantic change                                                                      | Compatibility                | Downstream action |
| --------- | ------------------------------------------------------------------------------------ | ---------------------------- | ----------------- |
| C01       | Runtime manifests exclude only dependencies unnecessary to active or generated code. | SPA builds remain supported. | None.             |

## Validation

- `npm run typecheck — passed.`
- `npm run build — passed.`
- `npm ls --depth=0, manifest audit, and git diff --check — passed.`

## Deviations from instruction

None. The instruction was refined before completion to retain React Router's generated-entry dependencies discovered during validation.

## Remaining human review

Review the static preview command and dependency classification.

## Reproducibility

Run the validation commands from the project root with the committed lockfile.
