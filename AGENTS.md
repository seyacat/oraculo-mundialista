# AGENTS.md — Oráculo Mundial Frontend MVP

## Rol
Actúa como Senior Frontend Engineer especializado en Vue 3, Vite, PWA, UX mobile-first, gamificación social, productos virales y adaptación de diseños Stitch a componentes reutilizables.

## Contexto del producto
El proyecto se llama provisionalmente **El Oráculo Mundial**.

Es una PWA de comunidades mundialistas donde los usuarios pueden crear comunidades, invitar por WhatsApp, predecir partidos, competir en rankings, usar poderes lúdicos, aparecer en la Tabla de la Vergüenza y desbloquear beneficios comunitarios.

No es una casa de apuestas. No maneja dinero apostado. No debe usar lenguaje de apuestas, casino, cuotas, wallet, saldo, retiro, bookmaker, betting ni short.

La experiencia debe sentirse como:

> Mundial + comunidad + predicción + ranking + humor + WhatsApp + beneficios.

## Arquitectura actual obligatoria
Este repo usa:

```txt
frontend/   Vue 3 + Vite + Vue Router + Clerk + PWA
backend/    Express + Clerk + Supabase
 designs/   Stitch HTML/PNG
```

No migrar a Next.js. No crear `src/app`. No crear `.tsx`. No usar React. No usar shadcn/ui.

Trabajar solo sobre el frontend salvo instrucción explícita.

## Objetivo actual
Desarrollar al 100% el frontend navegable del MVP con mocks, tomando como base los diseños Stitch existentes en:

```txt
designs/stitch/oraculo-mundial/
```

Pantallas Stitch disponibles:

```txt
01-predicciones.html / .png
02-invitacion-progreso.html / .png
03-unirse-comunidad.html / .png
04-landing-creacion-comunidad.html / .png
05-rankings-verguenza.html / .png
06-poderes-estrategicos.html / .png
07-tabla-verguenza-detalle.html / .png
08-prd.txt
README.md
```

Usar estos archivos como referencia visual y funcional principal.

## Estilo visual aprobado
Dirección: **Stadium Social**.

Mantener:

- Fondo oscuro de estadio.
- Cards tipo glassmorphism con bordes sutiles.
- Acento verde/neón para acciones críticas.
- Acento dorado para gloria, logro y ranking.
- Botones grandes y táctiles.
- UI mobile-first.
- Energía competitiva y social.
- Humor mundialista.
- Sensación premium, pero simple.

Evitar:

- Apariencia de casino.
- Exceso gamer/cripto.
- Pantallas densas.
- Texto pequeño.
- Componentes no reutilizables.
- Animaciones pesadas.
- Fricción innecesaria.

## Lenguaje permitido
Usar:

- comunidad
- reto
- predicción
- duelo
- poder
- bonus
- sorpresa
- revancha
- beneficio
- premio promocional
- gloria
- vergüenza
- oráculo
- ranking
- hinchada
- mundialista
- capitán
- profeta
- humo del día
- casi oráculo
- recibo de realidad

## Lenguaje prohibido
No usar:

- apuesta
- casino
- cuota
- bookmaker
- bet
- betting
- short
- robar puntos
- mercado de apuestas
- wallet
- saldo
- retiro
- dinero apostado
- ganancia monetaria
- información privilegiada

Sustituir:

```txt
apuesta → reto
cuota → sorpresa del partido
casino del técnico → modo estratega
robar puntos → ganar botín simbólico
retiro de premio → validación de premio
mercado → beneficios desbloqueables
```

## Rutas requeridas
Usar Vue Router. Crear o ajustar estas rutas:

```txt
/                         Landing
/crear                    Crear comunidad
/p/:slug                  Home de comunidad
/p/:slug/unirse           Unirse a comunidad
/p/:slug/predicciones     Predicciones
/p/:slug/ranking          Rankings
/p/:slug/verguenza        Tabla de la Vergüenza
/p/:slug/poderes          Poderes del Oráculo
```

Mantener `/dashboard` solo como compatibilidad. Puede redirigir a `/p/la-banda-del-mundial` o funcionar como demo temporal.

## Estructura frontend esperada
Adaptar progresivamente hacia:

```txt
frontend/src/
├─ App.vue
├─ main.js
├─ style.css
├─ router/
│  └─ index.js
├─ views/
│  ├─ HomeView.vue
│  ├─ CreateCommunityView.vue
│  ├─ CommunityView.vue
│  ├─ JoinCommunityView.vue
│  ├─ PredictionsView.vue
│  ├─ RankingView.vue
│  ├─ ShameView.vue
│  └─ PowersView.vue
├─ components/
│  ├─ layout/
│  │  ├─ AppShell.vue
│  │  └─ BottomNav.vue
│  ├─ marketing/
│  │  ├─ MarketingHero.vue
│  │  └─ HowItWorks.vue
│  ├─ community/
│  │  ├─ CommunityHeader.vue
│  │  ├─ CommunityProgressCard.vue
│  │  └─ UpgradePrompt.vue
│  ├─ predictions/
│  │  └─ PredictionCard.vue
│  ├─ powers/
│  │  └─ OraclePowerCard.vue
│  ├─ ranking/
│  │  ├─ LeaderboardCard.vue
│  │  └─ ViralLeaderboard.vue
│  ├─ shame/
│  │  └─ ShameTableCard.vue
│  └─ share/
│     ├─ WhatsAppShareButton.vue
│     └─ ShareMomentCard.vue
├─ lib/
│  ├─ mock-data/
│  │  ├─ communities.js
│  │  ├─ matches.js
│  │  ├─ rankings.js
│  │  ├─ powers.js
│  │  ├─ shame.js
│  │  └─ shareMoments.js
│  └─ share/
│     └─ whatsapp.js
```

## Funcionalidad frontend obligatoria
El frontend debe quedar completo para demo:

1. Landing que explique la propuesta.
2. Crear comunidad con formulario simulado.
3. Selector de meta de jugadores.
4. Selector de modo de comunidad.
5. Consentimientos visuales.
6. Pantalla de comunidad con progreso.
7. Unirse a comunidad.
8. Predicciones con marcador.
9. Poderes del Oráculo.
10. Ranking deportivo.
11. Ranking viral.
12. Tabla de la Vergüenza.
13. Momentos compartibles.
14. Botones WhatsApp funcionales.
15. Bottom navigation en pantallas internas.
16. Upgrade prompt Free → Plus/Pro.

## Componentes clave

### MarketingHero.vue
Copy base:

```txt
No solo predices el Mundial.
Lo juegas contra tu gente.
```

Subcopy:

```txt
Crea tu comunidad gratis, invita por WhatsApp, predice partidos y compite en rankings de gloria y vergüenza.
```

CTA principal:

```txt
Crear mi comunidad gratis
```

CTA secundario:

```txt
Unirme a una comunidad
```

Microcopy:

```txt
Gratis para empezar. Sin apuestas. Solo fútbol, orgullo y revancha.
```

### CommunityProgressCard.vue
Debe mostrar:

- Jugadores activos.
- Meta.
- Barra de progreso.
- Próximo beneficio.
- CTA de WhatsApp.

CTA:

```txt
Invitar por WhatsApp
```

### PredictionCard.vue
Debe mostrar:

- Equipos.
- Fecha/hora.
- Estado: abierto, cierra pronto, cerrado, finalizado.
- Inputs de marcador.
- Poder opcional.
- CTA guardar predicción.

### OraclePowerCard.vue
Poderes MVP:

- Doble Fe.
- Última Palabra.
- Anti-Mufa.
- Batacazo.
- Revancha.

Cada poder debe mostrar descripción, usos disponibles y estado.

### ShameTableCard.vue
Copy principal:

```txt
Hoy el fútbol fue cruel con estos profetas.
```

Microcopy:

```txt
Se aceptan explicaciones, excusas y audios de 3 minutos.
```

Categorías:

- Humo del Día.
- El Fantasma.
- Brujo Fallido.
- Casi Oráculo.
- La Mufa.
- Técnico Despedido.
- Capitán Caído.

### WhatsAppShareButton.vue
Debe usar `navigator.share` cuando esté disponible y fallback a `https://wa.me/?text=`.

Helper requerido:

```js
export function buildWhatsAppShareUrl(message) {
  return `https://wa.me/?text=${encodeURIComponent(message)}`
}
```

Mensajes:

Invitación:

```txt
Estoy jugando El Oráculo Mundial.
Métete a mi comunidad y compite conmigo.
A ver si sabes tanto de fútbol como dices:
[link]
```

Ranking:

```txt
Voy #[position] en [community].
Todavía estás a tiempo de alcanzarme:
[link]
```

Vergüenza:

```txt
[Name] cayó en la Tabla de la Vergüenza.
Se aceptan explicaciones:
[link]
```

Certificado:

```txt
Tengo Certificado de Oráculo.
Predije [home] [score] [away] y acerté.
El fútbol habló:
[link]
```

## Mocks obligatorios
Crear mocks realistas, separados del UI.

No meter arrays gigantes dentro de `.vue`.

Mínimo:

- comunidad demo: La Banda del Mundial.
- jugadores demo.
- partidos demo.
- rankings demo.
- poderes demo.
- vergüenza demo.
- momentos compartibles.

## Reglas de UX
Cada pantalla debe tener una acción principal clara.

Prioridad de acciones:

1. Crear comunidad.
2. Invitar por WhatsApp.
3. Predecir.
4. Ver ranking.
5. Compartir gloria/vergüenza.
6. Desbloquear beneficio.
7. Pasar a Plus/Pro.

No crear pantallas decorativas sin acción.

## No implementar todavía
No implementar:

- Backend real.
- Supabase real.
- Pagos.
- SMS.
- Push notifications.
- Chat interno.
- Realtime.
- API externa de partidos.
- Scoring definitivo.
- Admin real.
- Exportación de datos.

## Validación obligatoria
Después de cada bloque:

```bash
cd frontend
npm run build
npm run dev
```

No cerrar tarea si `npm run build` falla.
