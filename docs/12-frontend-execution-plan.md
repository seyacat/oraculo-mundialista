# 12 — Frontend Execution Plan

## Alcance y reglas

Este plan cubre solo el frontend Vue 3 + Vite existente. No se migrará a Next.js, no se tocará backend, no se conectará Supabase, no se agregarán dependencias y no se implementará código en este bloque.

Fuentes leídas para este plan:

- `AGENTS.md`
- `CLAUDE.md`
- `CODEX_PROMPTS.md`
- `docs/10-frontend-vue-implementation-brief.md`
- `docs/11-ux-ui-neuromarketing-review.md`
- Arquitectura actual bajo `frontend/src/`
- Diseños Stitch en `designs/stitch/oraculo-mundial/`

## 1. Estado actual del frontend Vue/Vite

El frontend actual usa Vue 3, Vite, Vue Router, Clerk, `vite-plugin-pwa` y `vuedraggable`. La app está montada en `frontend/src/main.js`, registra `clerkPlugin` con `VITE_CLERK_PUBLISHABLE_KEY`, carga el router y usa `frontend/src/style.css` como base visual global.

El diseño ya tiene una primera aplicación de la dirección Stadium Social: fondo oscuro, glassmorphism, acentos verde/neón, cards deportivas, ranking resumido, poderes básicos y share social. Sin embargo, el frontend aún funciona como una demo de landing + dashboard, no como el MVP navegable de comunidades mundialistas descrito en las guías.

Puntos actuales:

- `App.vue` solo renderiza `<RouterView />`.
- `HomeView.vue` contiene una landing visual con preview de predicción, selector decorativo de comunidad y Clerk `<SignIn>`.
- `DashboardView.vue` concentra predicción, poderes, ranking resumido, vergüenza resumida y botones de compartir en una sola pantalla protegida.
- `PredictionBoard.vue` contiene una lista draggable de 32 selecciones con data hardcodeada dentro del componente.
- `ShareButtons.vue` crea links de WhatsApp, X, Telegram y Facebook desde la predicción recibida.
- `frontend/src/lib/api.js` existe, pero no debe ser protagonista del MVP mockeado todavía.
- `vite.config.js` tiene PWA y proxy `/api` configurable por `VITE_DEV_API_PROXY_TARGET`.
- No existen mocks separados en `frontend/src/lib/mock-data/`.
- No existe helper formal de WhatsApp con `navigator.share` + fallback.
- No existe composable central de demo para compartir mocks entre vistas.
- No existen componentes por dominio (`community`, `predictions`, `ranking`, `shame`, `powers`, `layout`, `marketing`).

## 2. Rutas existentes

Rutas declaradas en `frontend/src/router/index.js`:

- `/` — `HomeView`
- `/dashboard` — `DashboardView`, protegida con `meta.requiresAuth`

Guard actual:

- Si una ruta tiene `meta.requiresAuth`, usa `useAuth()` de Clerk y redirige a `/` cuando `isSignedIn` es falso.

Observación:

- La guía pide mantener `/dashboard` solo por compatibilidad. Puede redirigir a `/p/la-banda-del-mundial` o quedar como demo temporal, pero no debe ser el centro del producto final.

## 3. Rutas faltantes

Rutas requeridas por `AGENTS.md` y `docs/10` que aún no existen:

- `/crear` — Crear comunidad.
- `/p/:slug` — Home de comunidad.
- `/p/:slug/unirse` — Unirse a comunidad.
- `/p/:slug/predicciones` — Predicciones.
- `/p/:slug/ranking` — Rankings.
- `/p/:slug/verguenza` — Tabla de la Vergüenza.
- `/p/:slug/poderes` — Poderes del Oráculo.

Ruta opcional MVP aprobada:

- `/p/:slug/momento/:momentId` — Momento compartible.
  - Debe mostrar momentos con mock data: Certificado de Oráculo, Recibo de Realidad, Vergüenza compartida o Revancha.
  - Debe tener CTA principal de WhatsApp.
  - Debe funcionar aunque no exista backend.

Decisión propuesta:

- Mantener `/` como landing pública.
- Agregar las rutas comunitarias con mocks, sin `requiresAuth` obligatorio para la demo, salvo que luego se decida proteger acciones específicas visualmente.
- Agregar `/p/:slug/momento/:momentId` como ruta opcional para piezas compartibles y deep links virales.
- Mantener `/dashboard` como compatibilidad y redirigirlo o rehacerlo como wrapper hacia `/p/la-banda-del-mundial`.

## 4. Componentes existentes

Componentes actuales:

- `frontend/src/components/PredictionBoard.vue`
  - Lista draggable de selecciones.
  - Usa `vuedraggable`.
  - Data hardcodeada.
  - Emite `update:modelValue`.
  - Útil como referencia, pero no cubre `PredictionCard.vue` de partidos.
  - No borrar en esta fase. Debe quedar como legacy/reference hasta validar el nuevo flujo.

- `frontend/src/components/ShareButtons.vue`
  - Links a WhatsApp, X, Telegram y Facebook.
  - Usa texto derivado de `prediction`.
  - Debe evolucionar hacia `WhatsAppShareButton.vue` y `ShareMomentCard.vue`, con WhatsApp como canal principal.
  - No borrar en esta fase. Debe quedar como legacy/reference hasta validar el nuevo flujo.

- `frontend/src/components/HelloWorld.vue`
  - Componente starter de Vite/Vue.
  - No forma parte del producto y debería quedar fuera del flujo final.

Vistas existentes:

- `frontend/src/views/HomeView.vue`
  - Landing + Clerk.
  - Tiene copy y visual inicial, pero no cubre todas las secciones obligatorias.

- `frontend/src/views/DashboardView.vue`
  - Dashboard monolítico.
  - Mezcla responsabilidades que luego deben dividirse entre comunidad, predicciones, ranking, vergüenza y poderes.

## 5. Componentes a crear

Componentes base de layout:

- `frontend/src/components/layout/AppShell.vue`
  - Marco visual para rutas internas.
  - Debe manejar contenedor, safe area mobile, header contextual y espacio para bottom nav.

- `frontend/src/components/layout/BottomNav.vue`
  - Navegación interna: Inicio, Predicciones, Ranking, Vergüenza, Poderes.
  - Visible en rutas `/p/:slug/*`.

Componentes marketing:

- `frontend/src/components/marketing/MarketingHero.vue`
  - Hero con copy aprobado: "No solo predices el Mundial. Lo juegas contra tu gente."
  - CTAs: Crear mi comunidad gratis / Unirme a una comunidad.

- `frontend/src/components/marketing/HowItWorks.vue`
  - Explicar en pocos pasos: crear comunidad, invitar, predecir, competir, compartir.

Componentes comunidad:

- `frontend/src/components/community/CommunityHeader.vue`
  - Nombre, capitán, jugadores activos, estado de comunidad.

- `frontend/src/components/community/CommunityProgressCard.vue`
  - Meta, progreso, próximo beneficio y CTA WhatsApp.

- `frontend/src/components/community/UpgradePrompt.vue`
  - Camino Free -> Plus/Pro con beneficios desbloqueables.

Componentes predicciones:

- `frontend/src/components/predictions/PredictionCard.vue`
  - Partido, fecha/hora, estado, inputs de marcador, poder opcional, guardar predicción.

Componentes poderes:

- `frontend/src/components/powers/OraclePowerCard.vue`
  - Doble Fe, Última Palabra, Anti-Mufa, Batacazo, Revancha.
  - Descripción, usos disponibles, estado y cómo ganarlo.

Componentes ranking:

- `frontend/src/components/ranking/LeaderboardCard.vue`
  - Ranking deportivo con top 3, mi posición, movimiento y CTA compartir.

- `frontend/src/components/ranking/ViralLeaderboard.vue`
  - Ranking viral/social: invitaciones, shares, recibos de realidad, participación.

Componentes vergüenza:

- `frontend/src/components/shame/ShameTableCard.vue`
  - Categorías: Humo del Día, El Fantasma, Brujo Fallido, Casi Oráculo, La Mufa, Técnico Despedido, Capitán Caído.
  - Debe ser memeable y compartible.

Componentes compartir:

- `frontend/src/components/share/WhatsAppShareButton.vue`
  - Usar `navigator.share` cuando esté disponible y fallback `https://wa.me/?text=`.

- `frontend/src/components/share/ShareMomentCard.vue`
  - Momentos compartibles: invitación, ranking, vergüenza, certificado de oráculo.

Vistas a crear:

- `frontend/src/views/CreateCommunityView.vue`
- `frontend/src/views/CommunityView.vue`
- `frontend/src/views/JoinCommunityView.vue`
- `frontend/src/views/PredictionsView.vue`
- `frontend/src/views/RankingView.vue`
- `frontend/src/views/ShameView.vue`
- `frontend/src/views/PowersView.vue`
- `frontend/src/views/ShareMomentView.vue` para `/p/:slug/momento/:momentId`

## 6. Mocks necesarios

Crear mocks realistas y separados del UI:

- `frontend/src/lib/mock-data/communities.js`
  - Comunidad demo: La Banda del Mundial.
  - Slug: `la-banda-del-mundial`.
  - Capitán, ciudad, meta, jugadores activos, beneficio próximo, plan actual.

- `frontend/src/lib/mock-data/matches.js`
  - Partidos demo con equipos, código, fecha/hora, grupo, estadio, estado.
  - Estados: abierto, cierra pronto, cerrado, finalizado.

- `frontend/src/lib/mock-data/rankings.js`
  - Ranking deportivo.
  - Ranking viral.
  - Top 3, mi posición, puntos, movimiento y badges.

- `frontend/src/lib/mock-data/powers.js`
  - Doble Fe, Última Palabra, Anti-Mufa, Batacazo, Revancha.
  - Estado: disponible, usado, bloqueado.
  - Usos disponibles, explicación, condición de desbloqueo.

- `frontend/src/lib/mock-data/shame.js`
  - Tabla de la Vergüenza con categorías requeridas.
  - Jugador, razón, partido, copy de humor, CTA de revancha/recibo.

- `frontend/src/lib/mock-data/shareMoments.js`
  - Invitación, ranking, vergüenza, certificado.
  - Mensajes base aprobados para WhatsApp.

Crear helper:

- `frontend/src/lib/share/whatsapp.js`
  - `buildWhatsAppShareUrl(message)`.
  - Helper para `navigator.share` con fallback.
  - No depender de backend ni Supabase.

Crear composable:

- `frontend/src/composables/useDemoCommunity.js`
  - Centralizar acceso de demo a:
    - `community`
    - `matches`
    - `rankings`
    - `powers`
    - `shameEntries`
    - `shareMoments`
  - Debe consumir los mocks de `frontend/src/lib/mock-data/*`.
  - Debe aceptar `slug` y devolver la comunidad demo correspondiente o fallback a `la-banda-del-mundial`.
  - No debe llamar API, Supabase ni backend.
  - Debe ser la fuente común para las vistas `/p/:slug/*`.

Estados vacíos obligatorios:

- Ranking sin predicciones.
  - Mostrar que todavía no hay posiciones y CTA a predecir/invitar.
- Vergüenza sin caídos todavía.
  - Mostrar humor positivo y CTA para jugar la próxima jornada.
- Predicciones sin partidos abiertos.
  - Mostrar próximo cierre/partido disponible y CTA para volver a comunidad.
- Poderes sin poderes desbloqueados.
  - Explicar cómo desbloquear poderes e invitar por WhatsApp.
- Comunidad sin suficientes jugadores.
  - Mostrar progreso bajo, próximo beneficio y CTA principal de WhatsApp.

Regla:

- Sacar arrays grandes de los `.vue`. Los componentes deben recibir props desde vistas/mocks.

## 7. Archivos que se tocarán

Bloque de mocks y helpers:

- `frontend/src/lib/mock-data/communities.js`
- `frontend/src/lib/mock-data/matches.js`
- `frontend/src/lib/mock-data/rankings.js`
- `frontend/src/lib/mock-data/powers.js`
- `frontend/src/lib/mock-data/shame.js`
- `frontend/src/lib/mock-data/shareMoments.js`
- `frontend/src/lib/share/whatsapp.js`
- `frontend/src/composables/useDemoCommunity.js`

Bloque de componentes:

- `frontend/src/components/layout/AppShell.vue`
- `frontend/src/components/layout/BottomNav.vue`
- `frontend/src/components/marketing/MarketingHero.vue`
- `frontend/src/components/marketing/HowItWorks.vue`
- `frontend/src/components/community/CommunityHeader.vue`
- `frontend/src/components/community/CommunityProgressCard.vue`
- `frontend/src/components/community/UpgradePrompt.vue`
- `frontend/src/components/predictions/PredictionCard.vue`
- `frontend/src/components/powers/OraclePowerCard.vue`
- `frontend/src/components/ranking/LeaderboardCard.vue`
- `frontend/src/components/ranking/ViralLeaderboard.vue`
- `frontend/src/components/shame/ShameTableCard.vue`
- `frontend/src/components/share/WhatsAppShareButton.vue`
- `frontend/src/components/share/ShareMomentCard.vue`

Bloque de vistas y rutas:

- `frontend/src/router/index.js`
- `frontend/src/views/HomeView.vue`
- `frontend/src/views/CreateCommunityView.vue`
- `frontend/src/views/CommunityView.vue`
- `frontend/src/views/JoinCommunityView.vue`
- `frontend/src/views/PredictionsView.vue`
- `frontend/src/views/RankingView.vue`
- `frontend/src/views/ShameView.vue`
- `frontend/src/views/PowersView.vue`
- `frontend/src/views/ShareMomentView.vue`
- `frontend/src/views/DashboardView.vue` solo para compatibilidad o redirección.

Bloque de estilos:

- `frontend/src/style.css`
  - Reusar tokens actuales Stadium Social.
  - Añadir utilidades globales solo si reducen duplicación real.
  - Mantener mobile-first, tactilidad y accesibilidad.

Archivos a no tocar en esta etapa:

- `backend/**`
- `frontend/package.json`
- `frontend/package-lock.json`
- Configuración de Supabase.
- Nuevas dependencias.

Archivos legacy a conservar en esta fase:

- `frontend/src/components/PredictionBoard.vue`
- `frontend/src/components/ShareButtons.vue`

Estos componentes pueden quedar como referencia o compatibilidad temporal hasta que el nuevo flujo de componentes y rutas esté validado con build y navegación manual.

## 8. Riesgos

Riesgos técnicos:

- El guard de Clerk actual puede bloquear rutas demo si se marca `requiresAuth` demasiado pronto.
- `useAuth()` dentro del guard puede depender del estado inicial de Clerk y producir redirecciones tempranas si se usa agresivamente.
- `HomeView.vue` y `DashboardView.vue` tienen mucha lógica/markup monolítico; refactorizar sin perder visual requiere bloques pequeños.
- Los estilos scoped actuales podrían duplicarse si no se extraen patrones comunes con criterio.
- PWA referencia iconos `/icons/icon-192.png` y `/icons/icon-512.png`; si no existen, la instalabilidad puede quedar incompleta aunque el build pase.
- `PredictionBoard.vue` usa `vuedraggable`; no debe confundirse con la nueva experiencia de predicción por partidos.
- La ruta `/p/:slug/momento/:momentId` puede quedar sin datos si `momentId` no existe; debe tener fallback claro sin romper navegación.
- `useDemoCommunity.js` puede convertirse en un punto de acoplamiento si mezcla lógica visual; debe limitarse a seleccionar y devolver mocks.

Riesgos UX/producto:

- Mantener el producto centrado en "dashboard" en lugar de comunidad reduce viralidad.
- WhatsApp puede quedar como botón secundario si no se diseña como loop principal.
- Exceso de secciones en landing puede diluir la CTA "Crear mi comunidad gratis".
- La Tabla de la Vergüenza puede sonar agresiva si el copy no mantiene rivalidad segura.
- Los poderes pueden parecer decoración si no explican valor, uso y desbloqueo.
- Los estados vacíos pueden sentirse como errores si no tienen copy, CTA y siguiente acción.
- La decoración visual puede competir con la claridad del flujo si se prioriza por encima de CTA, progreso y WhatsApp.
- Usar términos prohibidos de apuestas dañaría el posicionamiento y debe evitarse en todos los textos.

Riesgos de alcance:

- Intentar conectar backend/Supabase durante este trabajo rompería las reglas actuales.
- Agregar dependencias para iconos, UI o formularios puede complicar el MVP y está prohibido.
- Querer resolver auth real de todos los flujos antes de tener demo mockeada puede frenar el frontend.

## 9. Orden de implementación por bloques

### Bloque 1 — Mocks y helper de WhatsApp

Objetivo:

- Crear la base de datos mockeada y helper de share.
- No tocar vistas.
- No tocar backend.
- No agregar dependencias.

Archivos:

- `frontend/src/lib/mock-data/*`
- `frontend/src/lib/share/whatsapp.js`
- `frontend/src/composables/useDemoCommunity.js`

Validación:

- `cd frontend && npm run build`

### Bloque 2 — Componentes reutilizables

Objetivo:

- Crear componentes base con props.
- Usar visual Stadium Social.
- Evitar arrays grandes dentro de componentes.
- No crear rutas salvo ajuste mínimo si fuera necesario para compilar.

Archivos:

- `components/layout/*`
- `components/marketing/*`
- `components/community/*`
- `components/predictions/*`
- `components/powers/*`
- `components/ranking/*`
- `components/shame/*`
- `components/share/*`

Validación:

- `cd frontend && npm run build`

### Bloque 3 — Rutas y vistas MVP

Objetivo:

- Crear rutas faltantes.
- Crear la ruta opcional `/p/:slug/momento/:momentId`.
- Crear vistas obligatorias.
- Usar componentes y mocks.
- Hacer que todo sea navegable.
- Mantener `/dashboard` como compatibilidad.

Archivos:

- `frontend/src/router/index.js`
- `frontend/src/views/*`

Validación:

- Navegar manualmente por `/`, `/crear`, `/p/la-banda-del-mundial`, `/p/la-banda-del-mundial/unirse`, `/p/la-banda-del-mundial/predicciones`, `/p/la-banda-del-mundial/ranking`, `/p/la-banda-del-mundial/verguenza`, `/p/la-banda-del-mundial/poderes`, `/p/la-banda-del-mundial/momento/certificado-oraculo`.
- `cd frontend && npm run build`

### Bloque 4 — Pulido UX/UI y loops virales

Objetivo:

- Reforzar los cuatro loops: comunidad, competencia, reputación y retorno.
- Hacer WhatsApp protagonista.
- Ajustar copy y jerarquía mobile.
- No agregar features nuevas.

Prioridad visual del pulido:

1. Claridad mobile.
2. CTA visible.
3. Comunidad y progreso visibles.
4. WhatsApp protagonista.
5. Humor y reputación.
6. Decoración visual al final.

Validación:

- Revisar cada pantalla con checklist UX.
- `cd frontend && npm run build`

### Bloque 5 — Limpieza frontend

Objetivo:

- Eliminar o aislar componentes starter no usados.
- Reducir duplicación de estilos.
- Confirmar que no hay lenguaje prohibido.
- Confirmar que no se tocó backend.
- Confirmar que `PredictionBoard.vue` y `ShareButtons.vue` no fueron borrados.

Validación:

- `rg "apuesta|casino|cuota|bookmaker|betting|wallet|saldo|retiro|dinero apostado|ganancia monetaria" frontend/src`
- `cd frontend && npm run build`

## 10. Validaciones necesarias

Validaciones de build:

- `cd frontend && npm run build`
- `cd frontend && npm run dev`

Validaciones de navegación:

- `/`
- `/crear`
- `/p/la-banda-del-mundial`
- `/p/la-banda-del-mundial/unirse`
- `/p/la-banda-del-mundial/predicciones`
- `/p/la-banda-del-mundial/ranking`
- `/p/la-banda-del-mundial/verguenza`
- `/p/la-banda-del-mundial/poderes`
- `/p/la-banda-del-mundial/momento/certificado-oraculo`
- `/p/la-banda-del-mundial/momento/recibo-realidad`
- `/p/la-banda-del-mundial/momento/verguenza-compartida`
- `/p/la-banda-del-mundial/momento/revancha`
- `/dashboard`

Validaciones UX:

- Cada pantalla tiene una acción principal clara.
- CTA principal visible above the fold en mobile.
- WhatsApp aparece como acción central en comunidad, ranking, vergüenza y momentos compartibles.
- La comunidad, el progreso y el próximo beneficio son visibles.
- Predicciones se pueden entender y completar rápido.
- Ranking muestra jerarquía, top 3 y mi posición.
- Tabla de la Vergüenza tiene humor seguro y CTA de revancha/recibo.
- Poderes explican qué hacen, cuándo usarlos, cómo ganarlos y cuántos quedan.
- Upgrade Free -> Plus/Pro existe sin presión de casino ni dinero apostado.
- Estados vacíos tienen copy útil y CTA clara:
  - Ranking sin predicciones.
  - Vergüenza sin caídos.
  - Predicciones sin partidos abiertos.
  - Poderes sin desbloqueos.
  - Comunidad con pocos jugadores.
- La prioridad visual se cumple en este orden: claridad mobile, CTA visible, comunidad/progreso, WhatsApp, humor/reputación, decoración.

Validaciones de lenguaje:

- No usar lenguaje prohibido: apuesta, casino, cuota, bookmaker, bet, betting, short, robar puntos, mercado de apuestas, wallet, saldo, retiro, dinero apostado, ganancia monetaria, información privilegiada.
- Usar lenguaje permitido: comunidad, reto, predicción, duelo, poder, bonus, sorpresa, revancha, beneficio, premio promocional, gloria, vergüenza, oráculo, ranking, hinchada, mundialista.

Validaciones técnicas:

- No tocar `backend/**`.
- No conectar Supabase.
- No agregar dependencias.
- No crear archivos React, Next, `.tsx` o `src/app`.
- No guardar secretos en frontend.
- Mantener `VITE_CLERK_PUBLISHABLE_KEY` como variable requerida para Clerk.
- Mantener mocks separados del UI.
- Centralizar mocks de la demo con `frontend/src/composables/useDemoCommunity.js`.
- Mantener componentes con props y responsabilidades pequeñas.
- No borrar `PredictionBoard.vue` ni `ShareButtons.vue` en esta fase.

Validaciones visuales:

- Respetar Stadium Social: dark stadium, glass cards, verde/neón, dorado para gloria, cards táctiles.
- Revisar mobile 375px, tablet 768px y desktop 1024px+.
- Evitar texto pequeño, overlap y CTAs de baja altura táctil.
- Mantener foco visible y navegación usable por teclado.
