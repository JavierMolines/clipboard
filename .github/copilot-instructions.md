# Copilot Instructions — Clipboard (Angular)

## 1) Purpose and Working Boundaries

This repository implements a lightweight clipboard manager app where user data is stored in browser `localStorage` (not on the backend).

Primary goals when editing this codebase:

- Preserve current behavior and UX unless explicitly requested.
- Make focused, minimal changes in the correct layer (`pages`, `components`, `utils`, `constants`, `types`).
- Keep compatibility with Angular standalone architecture and SSR configuration.
- Prefer root-cause fixes over ad-hoc patches.

Non-goals by default:

- Do not introduce global state libraries.
- Do not add backend persistence unless requested.
- Do not redesign routes/layout/navigation unless requested.
- Do not refactor broadly if a local fix is enough.

---

## 2) Stack and Runtime Truth

Source of truth: `package.json`, `angular.json`, `tsconfig.json`, `biome.json`.

- Framework: Angular `21.1.4` (standalone, no NgModules in app features)
- Rendering: Angular SSR (`@angular/ssr`) + Express `5`
- Language: TypeScript `5.9.x`
- Styling: Tailwind CSS `4.1.x`
- Tooling: Angular CLI, Biome, Prettier, Karma
- RxJS: `~7.8.2`

### Main scripts

- `npm run dev` → `ng serve`
- `npm run build` → `ng build && node renameIndex.js`
- `npm run dev:ssr` → run compiled SSR server
- `npm run test` → Karma tests
- `npm run lint` → Biome check
- `npm run lint:fix` → Biome auto-fix
- `npm run lint:prettier` → Prettier write
- `npm run lint:all` → Prettier + Biome fix

### TS strictness and aliases

`tsconfig.json` enforces strict checks and includes path aliases:

- `@components/*` → `src/app/components/*`
- `@pages/*` → `src/app/pages/*`
- `@utils/*` → `src/app/utils/*`

Notes:

- Existing code sometimes mixes aliases and absolute imports like `src/app/constants/main`.
- Keep consistency with surrounding file when editing; avoid large import normalization unless asked.

---

## 3) High-Level Architecture

Top-level app structure under `src/app`:

- `pages/` → route-level screens
- `components/` → reusable UI blocks
- `constants/` → keys, route metadata
- `types/` → global TS declarations (`*.d.ts`)
- `utils/` → helper logic (including localStorage gateway)

Entry points:

- Browser bootstrap: `src/main.ts`
- Server bootstrap: `src/main.server.ts`
- App config: `src/app/app.config.ts`
- Routes: `src/app/app.routes.ts`
- Root component: `src/app/app.component.ts`

### Standalone configuration

`app.config.ts` uses:

- `provideZonelessChangeDetection()`
- `provideRouter(routes)`

This means UI updates rely on Angular modern zoneless behavior + explicit reactive primitives (signals/computed) where used.

---

## 4) Routing and Layout Model

Source of truth: `src/app/app.routes.ts` and `src/app/constants/routes.ts`.

Routing design:

- Root route (`path: ""`) uses `NavbarComponent` as shell/layout.
- Child pages are lazy-loaded with `loadComponent`:
  - `/` → list page
  - `/create`
  - `/settings`
  - `/storage`
- Dedicated `not-found` page.
- Wildcard `**` redirects to `not-found`.

Route metadata:

- `MAP_ROUTES` provides `title` and `description` per route.
- `AppComponent` listens to `NavigationEnd` and updates document title/meta.

Editing guidance:

- For any new route, update both `app.routes.ts` and `constants/routes.ts` metadata.
- Keep lazy-load pattern for page-level components.
- Preserve the navbar-shell + children approach unless redesign is requested.

---

## 5) Component and Page Conventions

Observed conventions in current code:

- Many route/page components are default exports (`export default class ...`).
- UI components often use named exports (e.g. `ClipboardListComponent`).
- `ChangeDetectionStrategy.OnPush` appears in interactive components (e.g. navbar/list).
- Signals/computed used for local component state in list interactions.

Examples:

- `src/app/pages/list/list.component.ts`
- `src/app/pages/create/create.component.ts`
- `src/app/components/clipboard-list/clipboard-list.component.ts`
- `src/app/components/navbar/navbar.component.ts`

Editing guidance:

- Follow export style already used in the target file.
- Keep component concerns local; avoid introducing cross-component coupling.
- Prefer signal-based local state when extending behavior in files that already use it.
- Keep DOM direct access minimal and localized (existing code uses `ViewChild` and `document.getElementById` in a few places).

---

## 6) Data Model and Storage Flow

Source of truth:

- `src/app/utils/storage/index.storage.ts`
- `src/app/constants/main.ts`
- `src/app/types/main.d.ts`

### Data model

Global types include:

- `RecordClipboard` with `id`, `time`, `data`, `title`
- `SettingsOptions` with `value: "checked" | ""`

Storage keys:

- `ID_CLIPBOARDS_ITEMS = "data"` (array of clipboard item IDs)
- `OPTIONS_BUTTON_CHECK = "optionSaveRedirect"`

### Storage gateway

`UtilityStorage` acts as a static facade for localStorage operations:

- Reads settings/options
- Reads/writes records
- Maintains ID mapper list (`data` key)
- Creates records with generated IDs
- Deletes records + updates mapper

### Practical flow

1. Create page submits text/title.
2. `UtilityStorage.addLocalStorage` generates ID + record + mapper update.
3. List page/maps IDs to records with `addMapperClipboardItems`.
4. Components update list/pagination/search locally.

Editing guidance:

- Keep all storage key logic centralized in `constants/main.ts` + `UtilityStorage`.
- If adding fields to clipboard records, update:
  - global type declarations
  - record generator
  - mapper and render points
- Be defensive with parse/try-catch as current implementation expects resilience to malformed storage data.

Known caveat:

- `addMapperClipboardItems` can return entries from mapper keys even if underlying record is missing or malformed. Consider validation if a task asks for robustness improvements.

---

## 7) SSR and Server Behavior

Source of truth:

- `server.ts`
- `src/server/config.server.ts`
- `src/server/routes.server.ts`

### Server model

- Express app serves static browser build files and delegates route rendering to `CommonEngine`.
- SSR config merges app config + server rendering providers.

### Render mode config

Current `serverRoutes` includes:

- `{ path: "**", renderMode: RenderMode.Client }`
- plus specific prerender routes (`create`, `storage`, `not-found`)

Potential ambiguity:

- Wildcard-first ordering may overshadow specific routes depending on matching semantics. Treat this as technical debt to validate before changing behavior.

Editing guidance:

- If modifying SSR behavior, verify route matching precedence and expected render mode outcomes.
- Keep `server.ts` static serving + Angular render chain intact unless migration is requested.

---

## 8) Quality, Formatting, and Code Style

### Linters/formatters

- Biome is enabled with recommended rules and import organization.
- Cognitive complexity rule enforced with max 15.
- Prettier is also present; project may use both (`lint:all`).

### Practical style rules for this repo

- Preserve existing naming and file-level style first.
- Avoid introducing one-letter variable names.
- Avoid large formatting-only diffs.
- Keep changes scoped and minimal.
- Prefer explicit, readable logic over dense abstractions.

### Error handling pattern

Current code often uses permissive `try/catch` with silent fallbacks in storage utilities and DOM focus methods.

- Preserve user-facing resilience.
- If improving error handling, do so without breaking happy-path behavior.

---

## 9) Change Protocol for Future Iterations

When implementing a feature/fix:

1. Identify the owning layer first (`page` vs `component` vs `utils`).
2. Update route metadata if route-level behavior/title/description changes.
3. Update type declarations before touching broader usage.
4. Keep storage changes backward-compatible whenever possible.
5. Validate with targeted checks before broad checks.

Suggested validation order:

- Narrow check (specific file/flow reasoning)
- `npm run lint`
- `npm run test` (if change affects app logic/UI behavior)

If modifying build/SSR behavior, also verify:

- `npm run build`
- optional runtime smoke for SSR (`npm run dev:ssr` after build)

---

## 10) Known Risks and Technical Debt (Current State)

1. Documentation drift

- `README.md` mentions CodeMirror usage; codebase does not show a direct runtime integration pattern in current TS files.

2. SSR render mode ambiguity

- `serverRoutes` places wildcard client route before specific prerender routes.

3. Storage coupling

- LocalStorage logic is static and central, which is simple but tightly coupled and harder to test in isolation.

4. Error observability

- Multiple silent catches reduce crash risk but also hide root causes.

5. Import path consistency

- Mixed alias and absolute style in imports (`@...` and `src/app/...`).

These are not blockers; treat as backlog unless task explicitly targets them.

---

## 11) File Map for Fast Navigation

Core app setup:

- `src/app/app.config.ts`
- `src/app/app.routes.ts`
- `src/app/app.component.ts`
- `src/app/constants/routes.ts`

Storage and shared constants:

- `src/app/utils/storage/index.storage.ts`
- `src/app/constants/main.ts`
- `src/app/types/main.d.ts`

Representative feature files:

- `src/app/pages/list/list.component.ts`
- `src/app/pages/create/create.component.ts`
- `src/app/components/clipboard-list/clipboard-list.component.ts`
- `src/app/components/navbar/navbar.component.ts`
- `src/app/components/navbar/navbar.data.ts`

Server/SSR:

- `server.ts`
- `src/server/config.server.ts`
- `src/server/routes.server.ts`

Ops/tooling:

- `package.json`
- `angular.json`
- `tsconfig.json`
- `biome.json`
- `renameIndex.js`
- `moveNginx.sh`

---

## 12) Assistant Rules (Project-Specific)

For AI assistants working in this repository:

- Prefer surgical edits over broad refactors.
- Do not alter storage keys (`data`, `optionSaveRedirect`) without migration handling.
- Do not replace standalone + lazy route architecture unless asked.
- Keep route SEO metadata in sync with route definitions.
- Preserve strict TypeScript compatibility.
- Respect existing component export style per file.
- Flag ambiguities explicitly instead of guessing (especially SSR behavior).

When uncertain:

- state assumptions clearly,
- choose the simplest behavior-preserving change,
- and suggest a follow-up validation step.

---

## 13) Quick Task Playbooks

### Add a new page route

1. Create page under `src/app/pages/<feature>/`.
2. Add lazy route in `app.routes.ts` under navbar children (or top-level if needed).
3. Add metadata in `constants/routes.ts`.
4. If visible in menu, add option in `components/navbar/navbar.data.ts`.

### Extend clipboard record schema

1. Update `RecordClipboard` in `types/main.d.ts`.
2. Update record creation in `UtilityStorage.generateRecordClipboard`.
3. Ensure mapper/read logic handles old and new records safely.
4. Update UI components consuming the field.

### Change save/create behavior

1. Start in `pages/create/create.component.ts`.
2. Keep `UtilityStorage` as write gateway.
3. Validate option-dependent navigation (`OPTIONS_BUTTON_CHECK`).
4. Ensure list page can render resulting data.

---

## 14) Maintenance Notes for This Instructions File

Update this file whenever one of these changes happens:

- Route tree/layout strategy changes
- Storage schema/keys change
- Tooling/lint/build scripts change
- SSR render strategy changes
- Folder responsibilities or import conventions change

Keep this document factual and tied to existing source files.
Avoid speculative guidance and keep migration notes explicit when behavior changes.
