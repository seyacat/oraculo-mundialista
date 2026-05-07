<template>
  <AppShell eyebrow="Poderes" title="Recursos del Oráculo" :back-to="`/p/${slug}`">
    <section class="explainer glass-card">
      <p class="eyebrow">Cómo se ganan</p>
      <h2>Participa, invita y acierta para activar poderes.</h2>
      <p>Cada poder tiene usos limitados y un momento ideal. Si está bloqueado, la card explica cómo desbloquearlo.</p>
    </section>

    <section class="power-grid">
      <OraclePowerCard v-for="power in powers" :key="power.id" :power="power" />
    </section>

    <article class="empty-note glass-card">
      <p class="eyebrow">Si no hay poderes activos</p>
      <h2>{{ emptyStates.powers.title }}</h2>
      <p>{{ emptyStates.powers.description }}</p>
    </article>

    <UpgradePrompt />

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
import OraclePowerCard from '../components/powers/OraclePowerCard.vue'
import UpgradePrompt from '../components/community/UpgradePrompt.vue'
import { useDemoCommunity } from '../composables/useDemoCommunity'

const route = useRoute()
const slug = computed(() => route.params.slug || 'la-banda-del-mundial')
const { powers, emptyStates } = useDemoCommunity(slug.value)

const navItems = computed(() => [
  { to: `/p/${slug.value}`, label: 'Inicio', short: 'IN' },
  { to: `/p/${slug.value}/predicciones`, label: 'Predic.', short: 'PR' },
  { to: `/p/${slug.value}/ranking`, label: 'Ranking', short: 'RK' },
  { to: `/p/${slug.value}/verguenza`, label: 'Verg.', short: 'VG' },
  { to: `/p/${slug.value}/poderes`, label: 'Poderes', short: 'PO' },
])
</script>

<style scoped>
.explainer {
  border-radius: 24px;
  padding: 18px;
}

h2 {
  margin-top: 8px;
  font-size: clamp(1.35rem, 5vw, 2rem);
  font-weight: 900;
}

.explainer p:not(.eyebrow) {
  margin: 10px 0 0;
  color: var(--text-muted);
  line-height: 1.55;
}

.power-grid {
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

@media (min-width: 760px) {
  .power-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
