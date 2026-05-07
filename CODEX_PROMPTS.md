# Prompts de ejecución para Codex

## Prompt 1 — Plan primero, sin tocar código

Lee `AGENTS.md`, `CLAUDE.md`, `docs/10-frontend-vue-implementation-brief.md` y `docs/11-ux-ui-neuromarketing-review.md`.

Analiza la arquitectura actual del repo.

No modifiques código todavía.

Crea un plan en:

```txt
docs/12-frontend-execution-plan.md
```

El plan debe incluir:

1. Estado actual del frontend Vue/Vite.
2. Rutas existentes.
3. Rutas faltantes.
4. Componentes existentes.
5. Componentes a crear.
6. Mocks necesarios.
7. Archivos que se tocarán.
8. Riesgos.
9. Orden de implementación por bloques.
10. Validaciones necesarias.

Reglas:

- No migrar a Next.js.
- No tocar backend.
- No conectar Supabase.
- No agregar dependencias.
- No implementar código todavía.

## Prompt 2 — Mocks y helpers

Implementa solo mocks y helper de WhatsApp.

Crear:

```txt
frontend/src/lib/mock-data/communities.js
frontend/src/lib/mock-data/matches.js
frontend/src/lib/mock-data/rankings.js
frontend/src/lib/mock-data/powers.js
frontend/src/lib/mock-data/shame.js
frontend/src/lib/mock-data/shareMoments.js
frontend/src/lib/share/whatsapp.js
```

No tocar vistas todavía.
No tocar backend.
No agregar dependencias.

Al terminar ejecutar:

```bash
cd frontend
npm run build
```

## Prompt 3 — Componentes base

Implementa solo componentes reutilizables:

```txt
components/layout/AppShell.vue
components/layout/BottomNav.vue
components/share/WhatsAppShareButton.vue
components/community/CommunityHeader.vue
components/community/CommunityProgressCard.vue
components/community/UpgradePrompt.vue
components/predictions/PredictionCard.vue
components/powers/OraclePowerCard.vue
components/ranking/LeaderboardCard.vue
components/ranking/ViralLeaderboard.vue
components/shame/ShameTableCard.vue
components/share/ShareMomentCard.vue
```

Usar mocks solo vía props.
No crear rutas todavía salvo que sea necesario para compilar.
No tocar backend.

Validar build.

## Prompt 4 — Rutas y vistas

Crear o ajustar rutas Vue Router:

```txt
/
/crear
/p/:slug
/p/:slug/unirse
/p/:slug/predicciones
/p/:slug/ranking
/p/:slug/verguenza
/p/:slug/poderes
```

Crear vistas correspondientes en `frontend/src/views/`.

Usar componentes y mocks.
No conectar backend.
No tocar Supabase.
Validar build.

## Prompt 5 — Pulido UX/UI y viralidad

Revisar todas las pantallas y mejorar solo UX/copy/consistencia visual.

Objetivo:

- WhatsApp protagonista.
- Comunidad como centro.
- Progreso visible.
- Beneficios desbloqueables claros.
- Tabla de Vergüenza memeable.
- Ranking compartible.
- Poderes entendibles.
- No lenguaje de apuestas.

No agregar features nuevas.
No tocar backend.
Validar build.
