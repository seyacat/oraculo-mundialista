# STACK_REPORT — Oráculo Mundialista

> Generated: 2026-05-13 · Branch: task-14267665-explore-the-oraculomundialista-repo-at-m

---

## 1. Repository Layout

```
OraculoMundialista/
├── frontend/          # Vue 3 SPA (Vite, port 5173)
├── backend/           # Node.js Express API (port 3000)
├── docs/              # Design & functional specs (Markdown)
├── .claude/           # Claude Code config & plans
├── CLAUDE.md          # AI coding instructions
├── CODEX_PROMPTS.md   # Additional AI context
└── Orchestrator.json  # Task orchestration config
```

---

## 2. Frontend

| Concern | Choice | Notes |
|---------|--------|-------|
| **Framework** | **Vue 3.5** (`vue@^3.5.32`) | Composition API / `<script setup>` throughout |
| **Build tool** | **Vite 8** (`vite@^8.0.10`) | `@vitejs/plugin-vue@^6.0.6` |
| **Language** | **JavaScript** (ES Modules) | No TypeScript; `"type": "module"` |
| **Package manager** | **npm** (`package-lock.json` present) | Separate `node_modules` per workspace |
| **PWA** | `vite-plugin-pwa@^1.3.0` | `registerType: 'autoUpdate'`, manifest in `vite.config.js` |
| **Routing** | **Vue Router 5** (`vue-router@^5.0.6`) | `createWebHistory`, auth guard via `useAuth()` |
| **Auth** | **Clerk** (`@clerk/vue@^2.2.0`) | `clerkPlugin`, `<SignIn>`, `<SignedIn/Out>`, `<UserButton>`, `useAuth()` |
| **State management** | **None** (no Pinia / Vuex) | Local `ref`/`reactive` per component; shared module-level `ref` in composables (`useGroupStage`) |
| **Drag-and-drop** | **vuedraggable@^4.1.0** | Already installed and in active use (see `PredictionBoard.vue`, `GroupCard.vue`) |
| **Styling** | **Plain CSS** (no Tailwind / CSS Modules / styled-components) | Global design tokens via CSS custom properties in `style.css`; per-component `<style scoped>` |
| **HTTP client** | Native `fetch` | Thin wrapper in `src/lib/api.js`; proxy `/api → localhost:3000` in `vite.config.js` |

### Build scripts (`frontend/package.json`)

```json
"dev":     "vite"
"build":   "vite build"
"preview": "vite preview"
```

---

## 3. Backend

| Concern | Choice | Notes |
|---------|--------|-------|
| **Runtime** | **Node.js** (`"type": "module"`) | ES Modules only |
| **Framework** | **Express 5** (`express@^5.2.1`) | Includes explicit 4-arg error handler required by Express 5 |
| **Auth** | **Clerk** (`@clerk/express@^2.1.13`) | `clerkMiddleware()` global + `getAuth(req)` per route |
| **Database client** | **Supabase** (`@supabase/supabase-js@^2.105.3`) | Singleton in `src/supabase.js`, uses `SUPABASE_SERVICE_ROLE_KEY` (admin / no RLS) |
| **CORS** | `cors@^2.8.6` | Allowed origins from `CORS_ORIGINS` env var; default `http://localhost:5173` |
| **Env vars** | `dotenv@^17.4.2` | `.env` file; `.env.example` committed |
| **Package manager** | **npm** | |

### Build scripts (`backend/package.json`)

```json
"dev":   "node --watch src/index.js"
"start": "node src/index.js"
```

---

## 4. Existing Components & Views

### Views (`frontend/src/views/`)

| File | Route | Auth? |
|------|-------|-------|
| `HomeView.vue` | `/` | No |
| `SsoCallbackView.vue` | `/sso-callback` | No |
| `CreateCommunityView.vue` | `/crear` | ✅ |
| `CommunityView.vue` | `/p/:slug` | ✅ |
| `JoinCommunityView.vue` | `/p/:slug/unirse` | No |
| `PredictionsView.vue` | `/p/:slug/predicciones` | ✅ |
| `RankingView.vue` | `/p/:slug/ranking` | ✅ |
| `ShameView.vue` | `/p/:slug/verguenza` | ✅ |
| `PowersView.vue` | `/p/:slug/poderes` | ✅ |
| `ShareMomentView.vue` | `/p/:slug/momento/:momentId` | ✅ |

### Components (`frontend/src/components/`)

```
layout/
  AppShell.vue            # Top-level shell with bottom nav
  BottomNav.vue           # Mobile tab bar

marketing/
  MarketingHero.vue       # Landing hero section
  HowItWorks.vue          # Explainer section

community/
  CommunityHeader.vue
  CommunityProgressCard.vue
  UpgradePrompt.vue

predictions/
  GroupCard.vue           # Per-group draggable ranking card (vuedraggable, ghost/chosen/drag-class)
  PredictionCard.vue      # Individual match prediction card

ranking/
  LeaderboardCard.vue
  ViralLeaderboard.vue

shame/
  ShameTableCard.vue

powers/
  OraclePowerCard.vue

share/
  ShareMomentCard.vue
  WhatsAppShareButton.vue

PredictionBoard.vue       # Legacy draggable 32-team ranking (vuedraggable)
ShareButtons.vue          # WhatsApp / X / Telegram / Facebook share
HelloWorld.vue            # Scaffold remnant
```

### Composables (`frontend/src/composables/`)

| File | Purpose |
|------|---------|
| `useGroupStage.js` | Module-level singleton managing all 12 WC 2026 groups; exposes `groups`, `directQualifiers`, `thirdPlaceTeams`, `qualifierIds`, `possibleIds`, `summary`, `updateGroupOrder`, `resetGroup`, `resetAll`. Persists to `localStorage` under key `oraculo-group-stage-v1` via a deep `watch`. |
| `useDemoCommunity.js` | Provides mock community data for component development |

### Mock data (`frontend/src/lib/mock-data/`)

All data is currently **client-side mock objects** — no live API calls from views:

| File | Contents |
|------|----------|
| `communities.js` | `demoCommunities[]` — slug, captain, progress, stats |
| `groups.js` | `wc2026Groups[]` — **12 groups A–L, 48 teams**, each with `id`, `code`, `name`, `isoCode` (ISO 3166-1 alpha-2), `pot`; plus helpers `countryFlag(iso2)` and `positionMeta(index)` |
| `matches.js` | `demoMatches[]` — groups, status (abierto / cierra-pronto / finalizado), predictions |
| `powers.js` | Oracle power cards |
| `rankings.js` | Sports leaderboard + viral leaderboard |
| `shame.js` | Shame table entries |
| `shareMoments.js` | Share moment snapshots |

---

## 5. World Cup Data Already Present

### Full WC 2026 Group Stage (`src/lib/mock-data/groups.js`)

All **48 teams across 12 groups (A–L)** are defined with:
- Stable `id` and 3-letter FIFA `code`
- Spanish `name`
- ISO 3166-1 alpha-2 `isoCode` → used by `countryFlag()` to derive emoji flags (🇦🇷, 🇧🇷, …)
- Seeding `pot` (1–4)

The `positionMeta(index)` helper encodes WC 2026 qualification rules:
- 1st & 2nd → *clasifica directamente*
- 3rd → *posible* (best 8 of 12 advance)
- 4th → *eliminado*

### Legacy 32-team list (`PredictionBoard.vue`)

Hardcoded array of 32 teams with a tier rating (`form: S+/S/A+/…/D`). This predates `groups.js` and the two datasets overlap — the groups-based data is the canonical source going forward.

### Demo match fixtures (`mock-data/matches.js`)

Four sample group-stage matches (ECU–QAT, ARG–MEX, BRA–SRB, ESP–GER). No full schedule yet.

---

## 6. Testing

**No test framework is configured.** There are no `vitest.config.*`, `jest.config.*`, or `playwright.config.*` files anywhere in the project. Neither `package.json` includes test scripts or test devDependencies. All test files found are inside `node_modules` (third-party).

---

## 7. Recommendations

### (a) Drag-and-drop library

**Keep `vuedraggable@^4.1.0` — already installed and actively used in two components.**

`vuedraggable` v4 wraps SortableJS and works natively with Vue 3 `v-model`. Both `PredictionBoard.vue` (legacy, flat list of 32 teams) and `GroupCard.vue` (per-group, with `ghost-class`, `chosen-class`, `drag-class`, and `<transition-group>`) use it. Touch support is handled via `touch-action: none` in CSS. No migration cost. If more advanced pointer-event customization is needed later, raw SortableJS is the natural fallback — but there is no reason to change now.

### (b) Persistence approach

**`localStorage` is already the implemented short-term store; Supabase via the existing Express backend is the correct medium-term target.**

`useGroupStage.js` already persists the 12-group prediction tree to `localStorage` under `oraculo-group-stage-v1` with a deep `watch`. This covers the offline/PWA requirement.

The upgrade path is:
1. **Now (done):** `localStorage` keyed by composable constant — instant optimistic UI, survives refreshes.
2. **Next:** When a user is signed in, add a `PATCH /api/predictions/group-stage` endpoint that writes to Supabase, called debounced on each drag. Clerk's `userId` becomes the Supabase row key.
3. **Long-term:** Supabase becomes the source of truth so communities can compute shared rankings and shame tables across all members.

Recommended pattern for the transition: write to `localStorage` immediately (optimistic), queue the API call, and roll back on error.

### (c) Test framework

**Add Vitest — nothing is configured yet, so start fresh.**

Vitest is the natural companion for a Vite project:
- Zero-config with Vite (shares the same `vite.config.js`).
- Works with `@vue/test-utils` for component tests.
- `jsdom` environment covers DOM testing without a browser.
- Add `@playwright/test` later for E2E flows (login → create community → predict).

Suggested minimal setup:

```bash
cd frontend
npm install -D vitest @vue/test-utils jsdom
```

Add to `frontend/package.json`:
```json
"test":       "vitest run",
"test:watch": "vitest"
```

Add `test` block to `vite.config.js`:
```js
test: {
  environment: 'jsdom',
  globals: true,
}
```

Priority test targets once Vitest is wired up:
- `useGroupStage.js` — pure logic, trivial to unit-test (updateGroupOrder, resetGroup, localStorage serialization)
- `countryFlag()` and `positionMeta()` in `groups.js`
- `ShareButtons.vue` / `WhatsAppShareButton.vue` — verify share URL generation
