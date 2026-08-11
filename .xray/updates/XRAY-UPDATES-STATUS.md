# XRAY Updates status

Status-Version: v1

This is the only lifecycle and decision-proof ledger for all implementation records.

## xray-mini-app-transactions implementation status

Target: xray-mini-app-transactions

### Implementation ledger

| ID     | Title                                | Instruction                                         | State      | Result                                          | Evidence mode | Decision proof                                                                                                                             |
| ------ | ------------------------------------ | --------------------------------------------------- | ---------- | ----------------------------------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `0001` | Install XRAY Updates                 | [Instruction](./implementations/0001-IMPL-INSTR.md) | `ACCEPTED` | [Result](./implementations/0001-IMPL-RESULT.md) | `LOCAL`       | Human requested installation of XRAY Updates.                                                                                              |
| `0002` | Adopt template structure and runtime | [Instruction](./implementations/0002-IMPL-INSTR.md) | `REVIEW`   | [Result](./implementations/0002-IMPL-RESULT.md) | `LOCAL`       | Template boundaries, the linked xray-js bridge/Cardano facade, and Koios/utility dependency consolidation validate and await human review. |
| `0003` | Adopt grouped Cardano exports        | [Instruction](./implementations/0003-IMPL-INSTR.md) | `REVIEW`   | [Result](./implementations/0003-IMPL-RESULT.md) | `LOCAL`       | Grouped Cardano config/types/CIP-67/Koios, typecheck, and production build pass.                                                           |
| `0004` | Adopt bridge host context            | [Instruction](./implementations/0004-IMPL-INSTR.md) | `REVIEW`   | [Result](./implementations/0004-IMPL-RESULT.md) | `LOCAL`       | Context integration, typecheck, and build pass.                                                                                            |
| `0005` | Adopt Cardano bridge adapter         | [Instruction](./implementations/0005-IMPL-INSTR.md) | `REVIEW`   | [Result](./implementations/0005-IMPL-RESULT.md) | `LOCAL`       | Cardano tip/account migration, typecheck, and build pass and await human review.                                                           |
| `0006` | Adopt direct bridge modules          | [Instruction](./implementations/0006-IMPL-INSTR.md) | `REVIEW`   | [Result](./implementations/0006-IMPL-RESULT.md) | `LOCAL`       | Direct namespace import, typecheck, and build pass and await human review.                                                                 |
| `0007` | Upgrade Ant Design and Copy          | [Instruction](./implementations/0007-IMPL-INSTR.md) | `REVIEW`   | [Result](./implementations/0007-IMPL-RESULT.md) | `LOCAL`       | Canonical package-free Copy, Ant Design 6.6.0, retained feedback bridge, typecheck, and production build await review.                     |
| `0008` | Remove rem styling pipeline          | [Instruction](./implementations/0008-IMPL-INSTR.md) | `REVIEW`   | [Result](./implementations/0008-IMPL-RESULT.md) | `LOCAL`       | Pixel-only authored styling, a fixed 3.5px Tailwind scale, canonical utility syntax, typecheck, and production build await human review.   |
| `0009` | Clean SPA dependencies               | [Instruction](./implementations/0009-IMPL-INSTR.md) | `REVIEW`   | [Result](./implementations/0009-IMPL-RESULT.md) | `LOCAL`       | Runtime dependency cleanup, valid static preview, installed-tree audit, typecheck, and production build await review.                      |
| `0010` | Restore React Router serve           | [Instruction](./implementations/0010-IMPL-INSTR.md) | `REVIEW`   | [Result](./implementations/0010-IMPL-RESULT.md) | `LOCAL`       | Server adapter restoration, installed resolution, typecheck, and production build await human review.                                     |
