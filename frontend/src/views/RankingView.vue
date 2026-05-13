<template>
  <AppShell eyebrow="Ranking" title="La gloria se mueve" :back-to="`/p/${slug}`">
    <LeaderboardCard v-if="sportsRanking.length" :entries="sportsRanking">
      <template #action>
        <WhatsAppShareButton
          class="compact-share"
          label="Compartir"
          title="Ranking mundialista"
          :text="shareText"
          :url="`https://www.oraculomundialista.com/p/${slug}/ranking`"
        />
      </template>
    </LeaderboardCard>

    <article v-else class="empty-note glass-card">
      <p class="eyebrow">Si nadie predice todavía</p>
      <h2>{{ emptyStates.ranking.title }}</h2>
      <p>{{ emptyStates.ranking.description }}</p>
    </article>

    <ViralLeaderboard :entries="rankings.viral" />
    <ShareMomentCard :moment="getShareMoment('ranking-posicion')" />

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
import LeaderboardCard from '../components/ranking/LeaderboardCard.vue'
import ViralLeaderboard from '../components/ranking/ViralLeaderboard.vue'
import WhatsAppShareButton from '../components/share/WhatsAppShareButton.vue'
import ShareMomentCard from '../components/share/ShareMomentCard.vue'
import { useDemoCommunity } from '../composables/useDemoCommunity'

const route = useRoute()
const slug = computed(() => route.params.slug || 'la-banda-del-mundial')
const { community, rankings, emptyStates, getShareMoment } = useDemoCommunity(slug.value)

const sportsRanking = computed(() => rankings.value.sports || [])
const shareText = computed(() => `Voy #${rankings.value.currentUserPosition.position} en ${community.value.name}. Todavia estas a tiempo de alcanzarme:`)

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
.compact-share {
  min-width: 132px;
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
</style>
