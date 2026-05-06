# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Proyecto

**Oráculo Mundial** — plataforma PWA de predicciones mundialistas con comunidades sociales. Los usuarios crean comunidades, invitan amigos por WhatsApp, predicen partidos, compiten en rankings y comparten momentos de gloria o vergüenza.

El checklist completo de implementación por etapas está en `.claude/plans/hazme-una-pagina-pwa-nested-pine.md`.

La especificación funcional completa está en `docs/02-funcionalidad-y-mecanica.md`.

## Estructura

```
frontend/   Vue 3 + Vite PWA (puerto 5173)
backend/    Node.js Express + Clerk (puerto 3000)
```

## Comandos

### Frontend
```bash
cd frontend
npm run dev      # desarrollo
npm run build    # producción (genera dist/)
npm run preview  # previsualizar build
```

### Backend
```bash
cd backend
npm run dev      # desarrollo con hot-reload (node --watch)
npm start        # producción
```

## Variables de entorno

**`frontend/.env.local`**
```
VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
```

**`backend/.env`**
```
CLERK_SECRET_KEY=sk_test_...
PORT=3000

SUPABASE_URL=https://xxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

Ambos archivos deben crearse copiando el `.env.example` correspondiente. Sin estas keys Clerk y Supabase no funcionan.

## Arquitectura

### Frontend (`frontend/src/`)

- **`main.js`** — monta Vue, registra `clerkPlugin` con la publishable key, y el router.
- **`router/index.js`** — rutas con navigation guard: `/dashboard` y cualquier ruta con `meta.requiresAuth` redirige a `/` si el usuario no está autenticado (`useAuth()` de Clerk).
- **`views/HomeView.vue`** — muestra `<SignIn>` de Clerk cuando no hay sesión; redirige al dashboard si ya está autenticado.
- **`views/DashboardView.vue`** — vista principal post-login. Compone `PredictionBoard` y `ShareButtons`.
- **`components/PredictionBoard.vue`** — lista draggable de 32 equipos usando `vuedraggable`. Los equipos están hardcodeados; en etapas posteriores vendrán del backend.
- **`components/ShareButtons.vue`** — genera links de share para WhatsApp, X, Telegram y Facebook usando el orden actual de la predicción. Calcula el texto dinámicamente desde el array `prediction` recibido como prop.

El proxy `/api → http://localhost:3000` está configurado en `vite.config.js`, por lo que el frontend llama a `/api/*` sin necesidad de URL absoluta.

### Backend (`backend/src/`)

- **`src/index.js`** — único punto de entrada. Aplica `clerkMiddleware()` globalmente. Rutas: `GET /api/health` (pública) y `GET /api/me` (protegida con `requireAuth()`).
- **`src/supabase.js`** — exporta el cliente singleton de Supabase creado con `SUPABASE_SERVICE_ROLE_KEY` (acceso admin, sin RLS). Importar desde aquí en todos los routes.
- CORS configurado solo para `http://localhost:5173`.
- Todo en ES Modules (`"type": "module"`).

### Auth flow

Clerk maneja toda la autenticación. En el frontend usa `@clerk/vue` (componentes `<SignIn>`, `<SignedIn>`, `<SignedOut>`, `<UserButton>`, composable `useAuth()`). En el backend usa `@clerk/express` (middleware `clerkMiddleware()` + `requireAuth()`). No hay sesiones propias ni JWT custom.

### PWA

`vite-plugin-pwa` con `registerType: 'autoUpdate'`. El manifest está en `vite.config.js`. Los iconos deben colocarse en `frontend/public/icons/icon-192.png` y `icon-512.png` para que el PWA sea instalable.

## Copy y lenguaje

Usar siempre lenguaje de **juego social**, nunca de apuestas:
- ✅ reto, comunidad, estratega, predicción, poder, gloria, vergüenza
- ❌ apuesta, cuota, wallet, retiro, bookmaker, dinero en juego

## Etapas pendientes

La implementación sigue el checklist del plan. Las etapas ya completadas:
- **Etapa 1** ✅ — Base técnica, auth con Clerk, PredictionBoard drag & drop, ShareButtons

Próximas etapas en orden: crear comunidad → predicciones → rankings → Tabla de la Vergüenza → poderes → duelos → beneficios → panel admin → PWA pulido.
