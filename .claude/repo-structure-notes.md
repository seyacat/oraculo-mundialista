# OraculoMundialista — Repo Structure Notes

> Inspection date: 2026-05-13. Read-only survey for downstream task context.

---

## 1. Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Vue 3 (Composition API, `<script setup>`) |
| **Build tool** | Vite 8 |
| **Language** | JavaScript (ES Modules, `"type":"module"` everywhere) |
| **Package manager** | npm (both workspaces use `package-lock.json`) |
| **PWA** | `vite-plugin-pwa` with `registerType: 'autoUpdate'`; manifest in `vite.config.js` |
| **Auth** | Clerk (`@clerk/vue` frontend, `@clerk/express` backend) |
| **Database** | Supabase (`@supabase/supabase-js`), accessed via service-role key (no RLS) |
| **Backend runtime** | Node.js + Express 5 |

---

## 2. Project Layout

```
OraculoMundialista/
├── frontend/          Vue 3 + Vite PWA (port 5173)
│   ├── src/
│   │   ├── main.js
│   │   ├── App.vue
│   │   ├── style.css           ← global design tokens & utility classes
│   │   ├── router/index.js
│   │   ├── composables/
│   │   │   └── useDemoCommunity.js
│   │   ├── lib/
│   │   │   ├── api.js
│   │   │   ├── mock-data/      ← communities, matches, powers, rankings, shame, shareMoments
│   │   │   └── share/whatsapp.js
│   │   ├── views/              (10 views — see §4)
│   │   └── components/         (16 components — see §5)
│   ├── public/
│   │   └── icons/              ← icon-192.png, icon-512.png expected here for PWA
│   ├── vite.config.js
│   └── package.json
└── backend/           Node.js Express (port 3000)
    ├── src/
    │   ├── index.js            ← single entry, Clerk middleware, /api/health, /api/me
    │   └── supabase.js         ← singleton Supabase admin client
    └── package.json
```

---

## 3. Routing (`frontend/src/router/index.js`)

Uses `vue-router` v5 with `createWebHistory`. Auth guard redirects to `/` if `isSignedIn` is false.

| Path | View | Auth? |
|---|---|---|
| `/` | HomeView | No |
| `/sso-callback` | SsoCallbackView | No |
| `/crear` | CreateCommunityView | Yes |
| `/p/:slug` | CommunityView | Yes |
| `/p/:slug/unirse` | JoinCommunityView | No |
| `/p/:slug/predicciones` | PredictionsView | Yes |
| `/p/:slug/ranking` | RankingView | Yes |
| `/p/:slug/verguenza` | ShameView | Yes |
| `/p/:slug/poderes` | PowersView | Yes |
| `/p/:slug/momento/:momentId` | ShareMomentView | Yes |
| `/dashboard` | redirect → `/p/la-banda-del-mundial` | — |

> **Note:** `SsoCallbackView` is imported in the router but not present as a `.vue` file yet (not found in glob). Needs to be created.

---

## 4. Views

| File | Purpose |
|---|---|
| `HomeView.vue` | Marketing landing + Clerk sign-in modal trigger |
| `DashboardView.vue` | Compat shim — redirects to community slug |
| `CommunityView.vue` | Community home (header, progress, prediction preview, leaderboard, shame) |
| `CreateCommunityView.vue` | Form to create a community (currently demo only — pushes to hardcoded slug) |
| `JoinCommunityView.vue` | Invite link landing |
| `PredictionsView.vue` | List of open matches with PredictionCard + OraclePowerCard strip |
| `RankingView.vue` | Leaderboard + viral ranking + share moment |
| `ShameView.vue` | Tabla de la Vergüenza full view |
| `PowersView.vue` | Oracle powers management |
| `ShareMomentView.vue` | Individual shareable moment |

---

## 5. Components

### Layout
| File | Purpose |
|---|---|
| `layout/AppShell.vue` | Page wrapper: sticky header (eyebrow + title + back link), main slot, bottom slot |
| `layout/BottomNav.vue` | Fixed 5-tab bottom navigation; receives `items` array prop |

### Community
| File | Purpose |
|---|---|
| `community/CommunityHeader.vue` | Community name, captain info, hero copy |
| `community/CommunityProgressCard.vue` | Player goal progress bar |
| `community/UpgradePrompt.vue` | Upsell / unlock prompt |

### Predictions
| File | Purpose |
|---|---|
| `predictions/PredictionCard.vue` | Single match card with score inputs; emits `save` |

### Ranking
| File | Purpose |
|---|---|
| `ranking/LeaderboardCard.vue` | Sports ranking list; supports `#action` slot for share button |
| `ranking/ViralLeaderboard.vue` | Viral/social ranking variant |

### Shame
| File | Purpose |
|---|---|
| `shame/ShameTableCard.vue` | Tabla de la Vergüenza compact card |

### Powers
| File | Purpose |
|---|---|
| `powers/OraclePowerCard.vue` | Single oracle power (code, status badge, use pips) |

### Share
| File | Purpose |
|---|---|
| `share/ShareMomentCard.vue` | Shareable moment card |
| `share/WhatsAppShareButton.vue` | Uses `navigator.share` → falls back to `wa.me` link |

### Marketing
| File | Purpose |
|---|---|
| `marketing/HowItWorks.vue` | How-it-works section (used on landing) |
| `marketing/MarketingHero.vue` | Hero section variant |

### Legacy
| File | Purpose |
|---|---|
| `PredictionBoard.vue` | Drag-and-drop 32-team board (vuedraggable, Etapa 1); superseded by new views |
| `ShareButtons.vue` | Social share links (Etapa 1 legacy); superseded by WhatsAppShareButton |
| `HelloWorld.vue` | Vite scaffold stub |

---

## 6. State Management

**No global store (Pinia / Vuex).** State is handled exclusively via:

- `useDemoCommunity(slug)` composable — returns `computed` refs wrapping static mock data
- Local `reactive({})` inside views for transient UI state (e.g., `savedMatches` in PredictionsView)
- Vue Router params for slug-based context

Mock data modules (`lib/mock-data/`): `communities.js`, `matches.js`, `powers.js`, `rankings.js`, `shame.js`, `shareMoments.js`

When backend integration lands, `lib/api.js` (`apiFetch(path, options)`) is the hook point.

---

## 7. Styles

**No CSS framework or utility library.** 100% hand-written CSS with:

- CSS custom properties (design tokens) in `style.css` (`:root`)
- Scoped `<style scoped>` per component
- Global utility classes in `style.css`: `.glass-card`, `.eyebrow`, `.primary-button`, `.secondary-button`, `.icon-dot`, `.neon-glow`
- Dark-only color scheme (`color-scheme: dark`)
- Responsive breakpoints: 420 px (mobile tweaks), 760 px (tablet), 900 px (desktop)

### Design Tokens (`:root` in `style.css`)
| Token | Value |
|---|---|
| `--background` | `#081425` |
| `--text` | `#d8e3fb` |
| `--text-muted` | `#bfc9c4` |
| `--primary` | `#95d3c0` (mint) |
| `--energy` | `#d2f100` (lime/yellow) |
| `--energy-text` | `#191e00` |
| `--coral` | `#ffb4ab` |
| `--surface-*` | layered dark blues |

### Typography
- Body: `'Plus Jakarta Sans'`, system-ui stack
- Headings (`h1`, `h2`, `h3`): Inter, Plus Jakarta Sans
- Eyebrow labels: Lexend
- All via Google Fonts (loaded via CSS or assumed available)

---

## 8. Testing

**No test framework configured.** No `vitest`, `jest`, or `cypress` in any `package.json`. No `*.test.*` or `*.spec.*` files in project source (only inside `node_modules`).

---

## 9. Environment Variables

### Frontend (`frontend/.env.local`)
| Variable | Purpose |
|---|---|
| `VITE_CLERK_PUBLISHABLE_KEY` | Clerk frontend key (optional: app degrades gracefully without it in dev) |
| `VITE_API_BASE_URL` | API base; defaults to `/api` (proxied in dev) |
| `VITE_DEV_API_PROXY_TARGET` | Dev proxy target; defaults to `http://localhost:3000` |

### Backend (`backend/.env`)
| Variable | Purpose |
|---|---|
| `CLERK_SECRET_KEY` | Clerk backend key |
| `CLERK_PUBLISHABLE_KEY` | (optional, for Clerk SDK) |
| `PORT` | Express port (default 3000) |
| `SUPABASE_URL` | Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase admin key (bypasses RLS) |
| `CORS_ORIGINS` | Comma-separated allowed origins |
| `FRONTEND_ORIGIN` | Single origin fallback |

---

## 10. Key Patterns & Conventions

- **`<script setup>` + Composition API** everywhere; no Options API.
- **ES Modules** in both frontend and backend (`"type":"module"`).
- **No TypeScript** — plain JavaScript throughout.
- **Slug-based routing** — all community pages nest under `/p/:slug`; slug `la-banda-del-mundial` is the hardcoded demo.
- **Demo-first** — all views use `useDemoCommunity()` with static mock data. Real API calls are not wired yet (backend only has `/api/health` and `/api/me`).
- **Social/gamification language** — copy uses "reto, comunidad, predicción, gloria, vergüenza". Never gambling vocabulary.
- **WhatsApp share** — primary social vector; uses `navigator.share` Web API with `wa.me` fallback.
- **PWA** — theme color `#081425`, standalone display, icons at `public/icons/icon-{192,512}.png`.
- **CORS** — backend allows only origins listed in `CORS_ORIGINS` env var.

---

## 11. Gaps / Observations for Downstream Tasks

1. `SsoCallbackView.vue` is imported in the router but the file does not exist — will 404 on OAuth callback.
2. No real backend API beyond health + auth identity; all data is mock.
3. `CreateCommunityView` form submission is a no-op (just `router.push` to hardcoded slug).
4. `PredictionBoard.vue` and `ShareButtons.vue` are legacy Etapa-1 components not used in current views.
5. No Pinia store — adding one would be the natural next step when backend data arrives.
6. No test suite at all — good opportunity to add Vitest + Vue Test Utils if needed.
7. Icons at `public/icons/` are referenced in the PWA manifest but no actual PNG files were found in the repo.
