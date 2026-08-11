# xray-mini-app-transactions implementation 0008 instruction

Implementation-Version: v1
Implementation-ID: xray-mini-app-transactions/0008
Created: 20260811T200807Z
Evidence-Mode: LOCAL
Depends-On: NONE
Provider-Evidence: NONE

## Objective

Remove rem transformation and convert active Transactions styling to explicit pixels.

## Changes to implement

| Change ID | Requirement                                                       | Compatibility                                                                | Local owner    | Validation    |
| --------- | ----------------------------------------------------------------- | ---------------------------------------------------------------------------- | -------------- | ------------- |
| C01       | Remove the StyleProvider and px-to-rem transformer.               | Preserve the Ant Design provider stack.                                      | Theme          | Verify.       |
| C02       | Remove the direct css-in-js dependency and root lock declaration. | Keep transitive packages intact.                                             | Dependencies   | Verify.       |
| C03       | Convert every active rem dimension at the configured 14px root.   | Preserve rendered dimensions.                                                | Styles/layouts | Static audit. |
| C04       | Set Tailwind's spacing base to `3.5px`.                           | Preserve the former 14px-root scale.                                         | Tailwind theme | Verify.       |
| C05       | Canonicalize pixel utilities and postfix important modifiers.     | Round direct values to the nearest Tailwind token and preserve v4 semantics. | App styles     | Static audit. |

## Validation

- `npm run typecheck`
- `npm run build`
- Pixel/rem source audit
- `git diff --check`

## Blockers

None.
