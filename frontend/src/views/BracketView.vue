<template>
  <AppShell eyebrow="Eliminatorias" title="Cuadro Final" :back-to="`/p/${slug}`">
    <section class="bk-header-actions">
      <div class="bk-progress glass-card">
        <span class="bk-progress-label">
          {{ completedCount }} / {{ totalBracketMatches }} pronosticados
        </span>
        <div class="bk-progress-bar">
          <div class="bk-progress-fill" :style="{ width: progressPercent + '%' }"></div>
        </div>
      </div>

      <button
        v-if="completedCount > 0"
        class="secondary-button bk-reset-btn"
        type="button"
        @click="handleResetBracket"
      >
        ↺ Resetear eliminatorias
      </button>

      <p class="bk-hint">
        Toca cada equipo para elegir el ganador
      </p>
    </section>

    <section
      v-if="champion"
      class="bk-champion-banner glass-card"
    >
      <span class="bk-champion-icon" aria-hidden="true">🏆</span>
      <div>
        <p class="eyebrow">Campeón del Mundial</p>
        <h2 class="bk-champion-name">{{ champion.name }}</h2>
      </div>
    </section>

    <section class="bk-bracket-scroll">
      <div class="bk-bracket-grid">
        <div class="bk-round-col">
          <h3 class="bk-round-title">Dieciseisavos</h3>
          <div class="bk-round-matches">
            <BracketMatchCard
              v-for="m in bracket.r32"
              :key="m.id"
              :match="m"
              round-name="R32"
              @pick-winner="onPickWinner"
            />
          </div>
        </div>

        <div class="bk-round-col">
          <h3 class="bk-round-title">Octavos</h3>
          <div class="bk-round-matches">
            <BracketMatchCard
              v-for="m in bracket.r16"
              :key="m.id"
              :match="m"
              round-name="R16"
              @pick-winner="onPickWinner"
            />
          </div>
        </div>

        <div class="bk-round-col">
          <h3 class="bk-round-title">Cuartos</h3>
          <div class="bk-round-matches">
            <BracketMatchCard
              v-for="m in bracket.qf"
              :key="m.id"
              :match="m"
              round-name="QF"
              @pick-winner="onPickWinner"
            />
          </div>
        </div>

        <div class="bk-round-col">
          <h3 class="bk-round-title">Semifinales</h3>
          <div class="bk-round-matches">
            <BracketMatchCard
              v-for="m in bracket.sf"
              :key="m.id"
              :match="m"
              round-name="SF"
              @pick-winner="onPickWinner"
            />
          </div>
        </div>

        <div class="bk-round-col bk-round-col--finals">
          <h3 class="bk-round-title">Finales</h3>
          <div class="bk-round-matches">
            <BracketMatchCard
              :match="bracket.third"
              round-name="3°"
              @pick-winner="onPickWinner"
            />
            <BracketMatchCard
              :match="bracket.final"
              round-name="Final"
              :is-champion="true"
              @pick-winner="onPickWinner"
            />
          </div>
        </div>
      </div>
    </section>

    <template #bottom>
      <BottomNav :items="navItems" />
    </template>
  </AppShell>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AppShell from '../components/layout/AppShell.vue'
import BottomNav from '../components/layout/BottomNav.vue'
import BracketMatchCard from '../components/bracket/BracketMatchCard.vue'
import { useBracket } from '../composables/useBracket'

const route = useRoute()
const slug = computed(() => route.params.slug || 'la-banda-del-mundial')

const {
  bracket,
  champion,
  pickWinner,
  completedCount,
  totalBracketMatches,
  progressPercent,
  selectedMatchId,
  resetBracket,
} = useBracket()

function onPickWinner({ matchId, winner }) {
  pickWinner(matchId, winner)
}

function handleResetBracket() {
  if (confirm('¿Resetear todas las predicciones de eliminatorias?')) {
    resetBracket()
  }
}

const navItems = computed(() => [
  { to: `/p/${slug.value}`, label: 'Inicio', short: 'IN' },
  { to: `/p/${slug.value}/fase-grupos`, label: 'Grupos', short: 'GR' },
  { to: `/p/${slug.value}/predicciones`, label: 'Predic.', short: 'PR' },
  { to: `/p/${slug.value}/ranking`, label: 'Ranking', short: 'RK' },
  { to: `/p/${slug.value}/verguenza`, label: 'Verg.', short: 'VG' },
  { to: `/p/${slug.value}/poderes`, label: 'Poderes', short: 'PO' },
])
</script>

<style scoped>
.bk-header-actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.bk-progress {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px 14px;
  border-radius: 16px;
}

.bk-progress-label {
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--text-muted);
}

.bk-progress-bar {
  width: 100%;
  height: 6px;
  border-radius: 999px;
  background: rgba(149, 211, 192, 0.12);
  overflow: hidden;
}

.bk-progress-fill {
  height: 100%;
  border-radius: 999px;
  background: linear-gradient(90deg, var(--primary), var(--energy));
  transition: width 400ms ease;
}

.bk-reset-btn {
  align-self: flex-start;
  min-height: 38px;
  padding: 0 14px;
  font-size: 0.78rem;
  border-radius: 12px;
}

.bk-hint {
  margin: 0;
  font-size: 0.72rem;
  color: var(--text-muted);
  text-align: center;
  font-style: italic;
}

.bk-champion-banner {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  border-radius: 20px;
  border-color: rgba(255, 215, 0, 0.25);
  background: rgba(255, 215, 0, 0.06);
}

.bk-champion-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.bk-champion-name {
  font-size: clamp(1.1rem, 4vw, 1.6rem);
  font-weight: 900;
  color: #ffd700;
  text-shadow: 0 0 12px rgba(255, 215, 0, 0.25);
  margin-top: 2px;
}

.bk-bracket-scroll {
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  scroll-behavior: smooth;
  padding-bottom: 12px;
  touch-action: pan-x pinch-zoom;
  cursor: grab;
}

.bk-bracket-scroll:active {
  cursor: grabbing;
}

.bk-bracket-scroll::-webkit-scrollbar {
  height: 6px;
}

.bk-bracket-scroll::-webkit-scrollbar-track {
  background: rgba(149, 211, 192, 0.06);
  border-radius: 999px;
}

.bk-bracket-scroll::-webkit-scrollbar-thumb {
  background: rgba(149, 211, 192, 0.2);
  border-radius: 999px;
}

.bk-bracket-grid {
  display: flex;
  gap: 12px;
  min-width: min-content;
  padding: 4px 0;
}

.bk-round-col {
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-width: 170px;
}

.bk-round-col--finals {
  min-width: 180px;
}

.bk-round-title {
  font-family: Inter, sans-serif;
  font-size: 0.72rem;
  font-weight: 900;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--primary);
  padding: 6px 10px;
  border-bottom: 1px solid rgba(149, 211, 192, 0.15);
  white-space: nowrap;
}

.bk-round-matches {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

@media (min-width: 900px) {
  .bk-bracket-grid {
    gap: 16px;
  }

  .bk-round-col {
    min-width: 190px;
  }

  .bk-round-col--finals {
    min-width: 200px;
  }
}

@media (min-width: 1200px) {
  .bk-bracket-scroll {
    overflow-x: visible;
    cursor: default;
  }

  .bk-bracket-grid {
    justify-content: center;
  }
}
</style>
