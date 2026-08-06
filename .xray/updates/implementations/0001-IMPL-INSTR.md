# xray-mini-app-transactions implementation 0001 instruction

Implementation-Version: v1
Implementation-ID: xray-mini-app-transactions/0001
Created: 20260806T134530Z
Evidence-Mode: LOCAL
Depends-On: NONE
Provider-Evidence: NONE

## Inputs and authority

| Input | Kind | Required | Purpose |
| --- | --- | --- | --- |
| Human request to install XRAY Updates v1 | `LOCAL` | Yes | Authorizes the required bootstrap installation and acceptance record. |
| Repository structure and root manifest | `LOCAL` | Yes | Establishes flat single-project storage. |

## Objective

Install and validate the XRAY Updates v1 tracking structure for xray-mini-app-transactions.

## Changes to implement

| Change ID | Requirement | Compatibility | Local owner | Validation |
| --- | --- | --- | --- | --- |
| `C01` | Install the canonical standard, templates, README, aggregate ledger, and flat bootstrap records. | Create tracking files only; preserve product source. | `.xray/updates/` | Validate required paths and flat storage invariants. |
| `C02` | Add the required XRAY standards pointer. | Preserve any existing root instructions. | `AGENTS.md` | Verify both required bullets occur once. |

## Implementation steps

1. Confirm this repository is a single project and select flat storage.
2. Create the canonical tracking files and accepted bootstrap record.
3. Add the root agent pointer and validate installation invariants.

## Validation

- Verify the standard and all three canonical templates exist.
- Verify one aggregate status ledger and one matching flat `0001` instruction/result pair exist.
- Verify ledger links, IDs, evidence mode, state, and decision proof agree.
- Verify the root agent pointer contains both required bullets.
- Verify no nested implementation target or target-local status ledger exists.

## Compatibility and human review

Installation adds governance records only and does not alter product behavior.

## Completion criteria

All XRAY Updates v1 installation invariants pass and the human-requested bootstrap is recorded as accepted.

## Out of scope

Product changes, provider evidence, additional plans, upgrades, and deployment.

## Blockers

None.

