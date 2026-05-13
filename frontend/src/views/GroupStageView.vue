<template>
  <AppShell eyebrow="Mundial 2026" title="Fase de Grupos" :back-to="`/p/${slug}`">

    <!-- Actions row: hint text + reset-all button -->
    <div class="gs-actions">
      <p class="eyebrow gs-hint">Arrastra para reordenar · Top 2 clasifica de cada grupo</p>
      <button class="secondary-button reset-all-btn" type="button" @click="resetAll">
        ↺ Restablecer todo
      </button>
    </div>

    <!-- Live summary bar -->
    <section class="summary-bar glass-card" aria-label="Resumen de clasificación">
      <div class="summary-stat">
        <span class="stat-dot" style="background: var(--primary)"></span>
        <span class="stat-number" style="color: var(--primary)">{{ summary.direct }}</span>
        <span class="stat-label">Clasificados directos</span>
      </div>
      <div class="summary-divider" aria-hidden="true"></div>
      <div class="summary-stat">
        <span class="stat-dot" style="background: var(--energy)"></span>
        <span class="stat-number" style="color: var(--energy)">{{ summary.possible }}</span>
        <span class="stat-label">Posibles 3ros</span>
      </div>
      <div class="summary-divider" aria-hidden="true"></div>
      <div class="summary-stat">
        <span class="stat-dot" style="background: var(--coral)"></span>
        <span class="stat-number" style="color: var(--coral)">{{ summary.eliminated }}</span>
        <span class="stat-label">Eliminados</span>
      </div>
    </section>

    <!-- Qualifiers preview — collapsible, closed by default -->
    <section class="qualifiers-preview">
      <button
        class="qualifier-toggle-btn secondary-button"
        type="button"
        :aria-expanded="showQualifiers"
        @click="showQualifiers = !showQualifiers"
      >
        <span>{{ showQualifiers ? 'Ocultar clasificados' : `Ver clasificados (${summary.direct})` }}</span>
        <span class="toggle-chevron" :class="{ 'toggle-chevron--open': showQualifiers }" aria-hidden="true"></span>
      </button>

      <div v-if="showQualifiers" class="qualifier-grid">
        <div
          v-for="group in groups"
          :key="group.id"
          class="qualifier-group-row"
        >
          <span class="qualifier-group-label">{{ group.label.replace('Grupo ', '') }}</span>
          <span class="team-chip team-chip--direct">
            <span class="chip-flag">{{ countryFlag(group.teams[0].isoCode) }}</span>
            <span class="chip-code">{{ group.teams[0].code }}</span>
          </span>
          <span class="team-chip team-chip--direct">
            <span class="chip-flag">{{ countryFlag(group.teams[1].isoCode) }}</span>
            <span class="chip-code">{{ group.teams[1].code }}</span>
          </span>
          <span class="team-chip team-chip--possible">
            <span class="chip-flag">{{ countryFlag(group.teams[2].isoCode) }}</span>
            <span class="chip-code">{{ group.teams[2].code }}</span>
          </span>
        </div>
      </div>
    </section>

    <!-- 12-group drag-and-drop grid -->
    <section class="groups-grid" aria-label="Predicciones por grupo">
      <GroupCard
        v-for="group in groups"
        :key="group.id"
        :group="group"
        @update:teams="updateGroupOrder(group.id, $event)"
        @reset="resetGroup(group.id)"
      />
    </section>

    <template #bottom>
      <BottomNav :items="navItems" />
    </template>
  </AppShell>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import AppShell from '../components/layout/AppShell.vue'
import BottomNav from '../components/layout/BottomNav.vue'
import GroupCard from '../components/predictions/GroupCard.vue'
import { useGroupStage } from '../composables/useGroupStage'
import { countryFlag } from '../lib/mock-data/groups'

const route = useRoute()
const slug = computed(() => route.params.slug || 'la-banda-del-mundial')

const { groups, summary, updateGroupOrder, resetGroup, resetAll } = useGroupStage()

const showQualifiers = ref(false)

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
/* ── Actions row ── */
.gs-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.gs-hint {
  /* inherits .eyebrow from global styles */
  line-height: 1.4;
}

.reset-all-btn {
  min-height: 40px;
  padding: 0 14px;
  font-size: 0.82rem;
  border-radius: 12px;
  white-space: nowrap;
}

/* ── Summary bar ── */
.summary-bar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
  gap: 12px;
  padding: 14px 18px;
  border-radius: 20px;
}

.summary-stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  text-align: center;
}

.stat-dot {
  width: 10px;
  height: 10px;
  border-radius: 999px;
  flex-shrink: 0;
}

.stat-number {
  font-size: 2rem;
  font-weight: 900;
  font-family: Inter, sans-serif;
  line-height: 1;
}

.stat-label {
  font-size: 0.72rem;
  color: var(--text-muted);
  white-space: nowrap;
}

.summary-divider {
  width: 1px;
  height: 48px;
  background: rgba(149, 211, 192, 0.12);
  flex-shrink: 0;
}

@media (max-width: 480px) {
  .summary-divider {
    display: none;
  }

  .summary-bar {
    gap: 16px 20px;
  }
}

/* ── Qualifiers preview (collapsible) ── */
.qualifiers-preview {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.qualifier-toggle-btn {
  width: 100%;
  min-height: 44px;
  padding: 0 16px;
  font-size: 0.84rem;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.toggle-chevron {
  width: 8px;
  height: 8px;
  border-right: 2px solid var(--primary);
  border-bottom: 2px solid var(--primary);
  transform: rotate(45deg);
  transition: transform 220ms ease;
  flex-shrink: 0;
  margin-bottom: 2px;
}

.toggle-chevron--open {
  transform: rotate(-135deg);
  margin-bottom: -2px;
}

.qualifier-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 6px;
}

@media (min-width: 500px) {
  .qualifier-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 960px) {
  .qualifier-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (min-width: 1200px) {
  .qualifier-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

.qualifier-group-row {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 10px;
  background: rgba(17, 28, 45, 0.6);
  border: 1px solid rgba(149, 211, 192, 0.1);
  border-radius: 12px;
  flex-wrap: wrap;
}

.qualifier-group-label {
  font-family: Inter, sans-serif;
  font-size: 0.7rem;
  font-weight: 900;
  color: var(--text-muted);
  flex: 0 0 18px;
  text-align: center;
}

.team-chip {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 7px;
  border-radius: 8px;
  font-size: 0.68rem;
  font-weight: 700;
}

.team-chip--direct {
  background: rgba(149, 211, 192, 0.15);
  border: 1px solid rgba(149, 211, 192, 0.25);
  color: var(--primary);
}

.team-chip--possible {
  background: rgba(210, 241, 0, 0.08);
  border: 1px solid rgba(210, 241, 0, 0.2);
  color: var(--energy);
  margin-left: auto;
}

.chip-flag {
  font-size: 1rem;
  line-height: 1;
}

.chip-code {
  font-family: Lexend, 'Plus Jakarta Sans', sans-serif;
  letter-spacing: 0.03em;
}

/* ── 12-group grid (mobile-first) ── */
.groups-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}

@media (min-width: 600px) {
  .groups-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 960px) {
  .groups-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (min-width: 1200px) {
  .groups-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}
</style>
