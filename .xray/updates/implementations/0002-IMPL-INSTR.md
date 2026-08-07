# xray-mini-app-transactions implementation 0002 instruction

Implementation-Version: v1
Implementation-ID: xray-mini-app-transactions/0002
Created: 20260806T140900Z
Evidence-Mode: LOCAL
Depends-On: NONE
Provider-Evidence: NONE

## Inputs and authority

| Input                                                                                                         | Kind    | Required | Purpose                                                                                                                                         |
| ------------------------------------------------------------------------------------------------------------- | ------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| Human request to adopt the React template theme and style approach                                            | `LOCAL` | Yes      | Authorizes the theme-system refactor.                                                                                                           |
| `../xray-mini-app-template-react/app/theme/` and related template styles                                      | `LOCAL` | Yes      | Defines the design-token, CSS-variable, host-theme, and Ant Design approach.                                                                    |
| Human request to fold mini-app structural alignment into this non-terminal implementation                     | `LOCAL` | Yes      | Expands the template adoption to store, integration, routing, type, and utility ownership boundaries.                                           |
| `../xray-mini-app-template-react/app/{integrations,shared,store,theme,types,utils}` and `app/root.tsx`        | `LOCAL` | Yes      | Defines the reference module layout and host-versus-standalone state ownership.                                                                 |
| Human request to npm-link `@xray-network/xray-js`, remove direct legacy dependencies, and reuse its utilities | `LOCAL` | Yes      | Requires host communication, Koios access/types, slot conversion, asset decoding, and Cardano constants to resolve through the sibling runtime. |
| `../xray-js/packages/runtime` public exports                                                                  | `LOCAL` | Yes      | Defines the mini-app bridge, Koios client/types, slot, asset/encoding, and Cardano configuration exports.                                       |
| `app/`                                                                                                        | `LOCAL` | Yes      | Provides the app-specific UI and styles that must remain functional.                                                                            |

## Objective

Adopt the React template design-token, effective-settings, and application-module structure while preserving this mini app's functionality and app-specific code.

## Changes to implement

| Change ID | Requirement                                                                                                                                                                                                                                                                                          | Compatibility                                                                                                                                                                                               | Local owner                                                               | Validation                                                                                                                                                                                  |
| --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `C01`     | Establish one typed palette that feeds CSS variables, Tailwind tokens, browser theme color, and Ant Design tokens.                                                                                                                                                                                   | Preserve existing semantic colors and dark-mode behavior.                                                                                                                                                   | Theme and style modules                                                   | Typecheck/build and inspect generated CSS.                                                                                                                                                  |
| `C02`     | Resolve theme from the XRAY host when connected and from a standalone system/local fallback otherwise.                                                                                                                                                                                               | Do not persist host-owned theme values as local preferences.                                                                                                                                                | Theme integration and layout                                              | Typecheck/build; verify host and standalone branches.                                                                                                                                       |
| `C03`     | Apply the template provider hierarchy and SSR-safe token injection without discarding app-specific styles.                                                                                                                                                                                           | Ant Design context APIs and existing style imports must continue working.                                                                                                                                   | Theme provider and root/layout                                            | Production build.                                                                                                                                                                           |
| `C04`     | Declare any direct styling dependencies and remove obsolete duplicate theme code.                                                                                                                                                                                                                    | npm remains the only package manager.                                                                                                                                                                       | Manifest and theme files                                                  | npm lock refresh and stale-code scan.                                                                                                                                                       |
| `C05`     | Align preferences, live host state, routing effects, Ant Design escape access, and app types with template boundaries; npm-link `xray-js` as the sole bridge/Cardano facade and replace direct Koios, Buffer, slot, CIP-67, asset/encoding, and config dependencies/helpers with its public exports. | Preserve the persisted preference key, transaction query behavior, tolerant invalid-label fallback, label presentation, and other feature-specific utilities; host-owned values must not enter persistence. | Manifest/lockfile and `app/{integrations,shared,store,theme,types,utils}` | Inspect sibling resolution, typecheck/build, and scan for direct legacy dependencies, duplicate CRC/CIP-67 helpers, legacy app state, effects, package/provider names, and CW3 terminology. |

## Implementation steps

1. Introduce the template palette, CSS serializer, effective-theme hook, and provider structure.
2. Map Tailwind and plain CSS to the shared token namespace.
3. Update root/layout markup for initial tokens and theme-color behavior.
4. Remove redundant theme subscriptions/state where the SDK hook owns host synchronization.
5. Refresh npm metadata and run repository completion checks.
6. Record outcomes and move the implementation to `REVIEW`.
7. Replace the mixed persisted/runtime app store and monolithic effects wrapper with template-aligned preferences, SDK hooks, and routing modules.

## Validation

- Refresh the npm lockfile.
- Run the repository typecheck when available.
- Run the production build.
- Scan for obsolete theme files, duplicate host-theme subscriptions, and stale color-variable namespaces.
- Scan for obsolete `store/app`, `effects.tsx`, and `utils/escapeAntd` ownership.
- Inspect `npm ls`/`readlink`, import-smoke `@xray-network/xray-js/cardano`, and confirm no active legacy package/provider/CW3 terminology remains.
- Confirm no direct mini-app SDK, Buffer, or Koios dependency/import remains.
- `git diff --check`

## Compatibility and human review

Review typography scale and app-specific component appearance in light and dark modes. Host theme
must take precedence only while connected; standalone mode must follow the local/system preference.

## Completion criteria

Theme ownership, palette, CSS variables, Tailwind mappings, Ant Design tokens, browser theme color,
preferences, live SDK state, and routing effects follow the template approach; required validation
passes and application-specific behavior remains.

## Out of scope

Redesigning pages, changing transaction query behavior, or removing feature-specific utilities.

## Blockers

None.
