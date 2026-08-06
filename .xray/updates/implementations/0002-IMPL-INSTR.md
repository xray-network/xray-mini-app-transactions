# xray-mini-app-transactions implementation 0002 instruction

Implementation-Version: v1
Implementation-ID: xray-mini-app-transactions/0002
Created: 20260806T140900Z
Evidence-Mode: LOCAL
Depends-On: NONE
Provider-Evidence: NONE

## Inputs and authority

| Input | Kind | Required | Purpose |
| --- | --- | --- | --- |
| Human request to adopt the React template theme and style approach | `LOCAL` | Yes | Authorizes the theme-system refactor. |
| `../xray-mini-app-template-react/app/theme/` and related template styles | `LOCAL` | Yes | Defines the design-token, CSS-variable, host-theme, and Ant Design approach. |
| `app/` | `LOCAL` | Yes | Provides the app-specific UI and styles that must remain functional. |

## Objective

Adopt the React template design-token and effective-theme approach while preserving this mini app's functionality and app-specific styling.

## Changes to implement

| Change ID | Requirement | Compatibility | Local owner | Validation |
| --- | --- | --- | --- | --- |
| `C01` | Establish one typed palette that feeds CSS variables, Tailwind tokens, browser theme color, and Ant Design tokens. | Preserve existing semantic colors and dark-mode behavior. | Theme and style modules | Typecheck/build and inspect generated CSS. |
| `C02` | Resolve theme from the XRAY host when connected and from a standalone system/local fallback otherwise. | Do not persist host-owned theme values as local preferences. | Theme integration and layout | Typecheck/build; verify host and standalone branches. |
| `C03` | Apply the template provider hierarchy and SSR-safe token injection without discarding app-specific styles. | Ant Design context APIs and existing style imports must continue working. | Theme provider and root/layout | Production build. |
| `C04` | Declare any direct styling dependencies and remove obsolete duplicate theme code. | npm remains the only package manager. | Manifest and theme files | npm lock refresh and stale-code scan. |

## Implementation steps

1. Introduce the template palette, CSS serializer, effective-theme hook, and provider structure.
2. Map Tailwind and plain CSS to the shared token namespace.
3. Update root/layout markup for initial tokens and theme-color behavior.
4. Remove redundant theme subscriptions/state where the SDK hook owns host synchronization.
5. Refresh npm metadata and run repository completion checks.
6. Record outcomes and move the implementation to `REVIEW`.

## Validation

- Refresh the npm lockfile.
- Run the repository typecheck when available.
- Run the production build.
- Scan for obsolete theme files, duplicate host-theme subscriptions, and stale color-variable namespaces.
- `git diff --check`

## Compatibility and human review

Review typography scale and app-specific component appearance in light and dark modes. Host theme
must take precedence only while connected; standalone mode must follow the local/system preference.

## Completion criteria

Theme ownership, palette, CSS variables, Tailwind mappings, Ant Design tokens, and browser theme
color follow the template approach; required validation passes; application-specific styles remain.

## Out of scope

Redesigning pages, changing product behavior, or migrating non-theme settings.

## Blockers

None.

