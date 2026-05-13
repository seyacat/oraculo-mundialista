<template>
  <AppShell eyebrow="Predicciones" title="Marca antes del cierre" :back-to="`/p/${slug}`">
    <section v-if="matches.length" class="prediction-list">
      <PredictionCard
        v-for="match in matches"
        :key="match.id"
        :match="match"
        :saved-label="savedMatches[match.id] ? 'Predicción guardada para demo' : ''"
        @save="savePrediction(match.id)"
      />
    </section>

    <article v-else class="empty-note glass-card">
      <p class="eyebrow">Cuando no haya partidos abiertos</p>
      <h2>{{ emptyStates.predictions.title }}</h2>
      <p>{{ emptyStates.predictions.description }}</p>
    </article>

    <section class="powers-strip">
      <OraclePowerCard v-for="power in availablePowers" :key="power.id" :power="power" />
    </section>

    <template #bottom>
      <BottomNav :items="navItems" />
    </template>
  </AppShell>
</template>

<script setup>
import { computed, reactive } from 'vue'
import { useRoute } from 'vue-router'
import AppShell from '../components/layout/AppShell.vue'
import BottomNav from '../components/layout/BottomNav.vue'
import PredictionCard from '../components/predictions/PredictionCard.vue'
import OraclePowerCard from '../components/powers/OraclePowerCard.vue'
import { useDemoCommunity } from '../composables/useDemoCommunity'

const route = useRoute()
const slug = computed(() => route.params.slug || 'la-banda-del-mundial')
const { matches, powers, emptyStates } = useDemoCommunity(slug.value)
const savedMatches = reactive({})

const availablePowers = computed(() => powers.value.filter((power) => power.status !== 'bloqueado').slice(0, 3))

function savePrediction(matchId) {
  savedMatches[matchId] = true
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
.prediction-list,
.powers-strip {
  display: grid;
  gap: 14px;
}

.empty-note {
  border-radius: 24px;
  padding: 16px;
}

.empty-note h2 {
  margin-top: 8px;
  font-size: clamp(1.2rem, 5vw, 1.7rem);
  font-weight: 900;
}

.empty-note p:not(.eyebrow) {
  margin: 8px 0 0;
  color: var(--text-muted);
  line-height: 1.5;
}

@media (min-width: 900px) {
  .prediction-list,
  .powers-strip {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
