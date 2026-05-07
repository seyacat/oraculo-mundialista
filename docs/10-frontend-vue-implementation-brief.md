# 10 — Frontend Vue Implementation Brief

## Objetivo

Desarrollar al 100% el frontend navegable del MVP de **El Oráculo Mundial** usando la arquitectura actual: Vue 3 + Vite + Vue Router + PWA.

El backend será desarrollado por otra persona. El frontend debe trabajar con mocks, pero debe quedar preparado para conectar datos reales después.

## No negociar

- No migrar a Next.js.
- No tocar backend salvo instrucción explícita.
- No conectar Supabase real.
- No implementar pagos.
- No implementar SMS.
- No implementar push notifications.
- No implementar chat interno.
- No implementar realtime.
- No usar lenguaje de apuestas.

## Fuente visual

Usar como referencia los diseños Stitch ubicados en:

```txt
designs/stitch/oraculo-mundial/
```

Especialmente:

- `04-landing-creacion-comunidad.html`
- `03-unirse-comunidad.html`
- `02-invitacion-progreso.html`
- `01-predicciones.html`
- `06-poderes-estrategicos.html`
- `05-rankings-verguenza.html`
- `07-tabla-verguenza-detalle.html`

## Pantallas obligatorias

### 1. Landing — `/`

Debe incluir:

1. Hero.
2. Cómo funciona.
3. Crear comunidad.
4. Invitación por WhatsApp.
5. Predicciones.
6. Poderes.
7. Rankings.
8. Tabla de la Vergüenza.
9. Beneficios desbloqueables.
10. CTA final.

CTA principal: `Crear mi comunidad gratis`.
CTA secundario: `Unirme a una comunidad`.

### 2. Crear comunidad — `/crear`

Campos:

- Nombre de comunidad.
- Nombre del creador.
- Celular.
- Ciudad.
- Equipo favorito.
- Meta de jugadores.
- Modo de comunidad.
- Consentimiento de participación.
- Consentimiento comercial opcional.

Pregunta principal:

```txt
¿Cuántos jugadores quieres retar?
```

Opciones:

- 10 — Reto Familiar.
- 25 — Liga de Amigos.
- 50 — Comunidad Mundialista.
- 100+ — Liga Pro.

Al enviar, simular éxito y navegar a `/p/la-banda-del-mundial`.

### 3. Comunidad — `/p/:slug`

Debe incluir:

- Header de comunidad.
- Meta de jugadores.
- Progreso.
- Próximo beneficio.
- CTA WhatsApp.
- Próximo partido.
- CTA predicción.
- Ranking resumido.
- Tabla de vergüenza resumida.
- Poder recomendado.
- Upgrade prompt.

### 4. Unirse — `/p/:slug/unirse`

Debe mostrar:

```txt
Pancho te retó a entrar a La Banda del Mundial.
Ya son 18/25 jugadores.
Entran 7 más y desbloquean el primer beneficio.
```

CTA: `Aceptar reto`.

Al aceptar, navegar a `/p/:slug/predicciones`.

### 5. Predicciones — `/p/:slug/predicciones`

Debe mostrar:

- Lista de partidos.
- Estado de cierre.
- Inputs de marcador.
- Poder opcional.
- CTA guardar.
- Feedback visual de predicción guardada.

### 6. Rankings — `/p/:slug/ranking`

Debe mostrar:

- Ranking deportivo.
- Ranking viral.
- Top 3.
- Mi posición.
- CTA compartir.

### 7. Tabla de Vergüenza — `/p/:slug/verguenza`

Debe mostrar:

- Humo del Día.
- El Fantasma.
- Brujo Fallido.
- Casi Oráculo.
- La Mufa.
- Técnico Despedido.
- Capitán Caído.
- CTA enviar recibo de realidad.
- CTA pedir revancha.

### 8. Poderes — `/p/:slug/poderes`

Debe mostrar:

- Doble Fe.
- Última Palabra.
- Anti-Mufa.
- Batacazo.
- Revancha.
- Cómo se gana cada poder.
- Estado disponible/usado/bloqueado.

## Bottom navigation

Crear navegación interna mobile:

```txt
Inicio | Predicciones | Ranking | Vergüenza | Poderes
```

Mostrarla en las rutas `/p/:slug/*`.

## Componentes mínimos

- `AppShell.vue`
- `BottomNav.vue`
- `MarketingHero.vue`
- `HowItWorks.vue`
- `CommunityHeader.vue`
- `CommunityProgressCard.vue`
- `UpgradePrompt.vue`
- `PredictionCard.vue`
- `OraclePowerCard.vue`
- `LeaderboardCard.vue`
- `ViralLeaderboard.vue`
- `ShameTableCard.vue`
- `WhatsAppShareButton.vue`
- `ShareMomentCard.vue`

## Mocks mínimos

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

## Criterios de aceptación

El frontend estará terminado cuando:

1. Todas las rutas funcionen.
2. Todas las pantallas sean navegables.
3. La UI respete Stitch/Stadium Social.
4. El producto se entienda en 5 segundos.
5. WhatsApp sea protagonista.
6. La Tabla de la Vergüenza sea compartible.
7. Haya camino visible Free → Plus/Pro.
8. No exista lenguaje de apuestas.
9. `cd frontend && npm run build` pase.
10. El frontend pueda mostrarse a usuarios y sponsors.
