<template>
  <AppShell>
    <CommunityHeader :community="community" />

    <CommunityProgressCard :community="community" />
    <article class="empty-note glass-card">
      <p class="eyebrow">Comunidad en crecimiento</p>
      <h2>{{ emptyStates.community.title }}</h2>
      <p>{{ emptyStates.community.description }}</p>
    </article>

    <section class="home-grid">
      <PredictionCard :match="matches[0]" />

      <article class="quick-card glass-card">
        <p class="eyebrow">Siguiente acción</p>
        <h2>Predice el próximo partido.</h2>
        <p>No te quedes como El Fantasma de la jornada. Tu hinchada espera marcador.</p>
        <RouterLink class="primary-button" :to="`/p/${slug}/predicciones`">Predecir próximo partido</RouterLink>
      </article>
    </section>

    <section class="home-grid">
      <LeaderboardCard :entries="rankings.sports.slice(0, 3)" title="Podio actual" />
      <ShameTableCard :entries="shameEntries.slice(0, 2)" />
    </section>

    <ShareMomentCard :moment="getShareMoment('invitacion-comunidad')" />

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
import CommunityHeader from '../components/community/CommunityHeader.vue'
import CommunityProgressCard from '../components/community/CommunityProgressCard.vue'
import PredictionCard from '../components/predictions/PredictionCard.vue'
import LeaderboardCard from '../components/ranking/LeaderboardCard.vue'
import ShameTableCard from '../components/shame/ShameTableCard.vue'
import ShareMomentCard from '../components/share/ShareMomentCard.vue'
import { useDemoCommunity } from '../composables/useDemoCommunity'

const route = useRoute()
const slug = computed(() => route.params.slug || 'la-banda-del-mundial')
const { community, matches, rankings, shameEntries, emptyStates, getShareMoment } = useDemoCommunity(slug.value)

const navItems = computed(() => [
  { to: `/p/${slug.value}`, label: 'Inicio', short: 'IN' },
  { to: `/p/${slug.value}/predicciones`, label: 'Predic.', short: 'PR' },
  { to: `/p/${slug.value}/ranking`, label: 'Ranking', short: 'RK' },
  { to: `/p/${slug.value}/verguenza`, label: 'Verg.', short: 'VG' },
  { to: `/p/${slug.value}/poderes`, label: 'Poderes', short: 'PO' },
])
</script>

<style scoped>
.home-grid {
  display: grid;
  gap: 14px;
}

.quick-card {
  border-radius: 24px;
  padding: 18px;
  display: grid;
  gap: 12px;
}

.empty-note {
  border-radius: 24px;
  padding: 16px;
}

.empty-note h2 {
  margin-top: 8px;
  font-size: clamp(1.25rem, 5vw, 1.8rem);
  font-weight: 900;
}

.empty-note p:not(.eyebrow) {
  margin: 8px 0 0;
  color: var(--text-muted);
  line-height: 1.5;
}

.quick-card h2 {
  font-size: clamp(1.35rem, 5vw, 2rem);
  font-weight: 900;
}

.quick-card p:not(.eyebrow) {
  margin: 0;
  color: var(--text-muted);
  line-height: 1.55;
}

.quick-card a {
  padding: 0 16px;
}

@media (min-width: 900px) {
  .home-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
