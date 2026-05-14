<template>
  <AppShell eyebrow="Poderes" title="Recursos del Oráculo" :back-to="`/p/${slug}`">
    <section class="explainer glass-card">
      <p class="eyebrow">Cómo se ganan</p>
      <h2>Participa, invita y acierta para activar poderes.</h2>
      <p>Cada poder tiene usos limitados y un momento ideal. Si está bloqueado, la card explica cómo desbloquearlo.</p>
      <RouterLink class="primary-button top-action" :to="`/p/${slug}/predicciones`" data-testid="use-power-link">Usar poder en predicciones</RouterLink>
    </section>

    <section v-if="powers.length" class="power-grid">
      <OraclePowerCard v-for="power in powers" :key="power.id" :power="power" />
    </section>

    <article v-if="!powers.length || !availablePowers.length" class="empty-note glass-card" data-testid="powers-empty-note">
      <p class="eyebrow">Si no hay poderes activos</p>
      <h2>{{ emptyStates.powers.title }}</h2>
      <p>{{ emptyStates.powers.description }}</p>
    </article>

    <section class="next-action glass-card">
      <p class="eyebrow">Siguiente jugada</p>
      <h2>Usa tus poderes donde se decide la reputación.</h2>
      <p>Vuelve a predicciones o invita a tu gente para desbloquear más recursos de la comunidad.</p>
      <div class="action-row">
        <RouterLink class="primary-button" :to="`/p/${slug}/predicciones`" data-testid="use-power-predictions-link">Usar poder en predicciones</RouterLink>
        <WhatsAppShareButton
          label="Invitar para desbloquear"
          title="Invitación mundialista"
          text="Estoy jugando El Oraculo Mundial. Sumate a mi comunidad para desbloquear mas poderes."
          :url="`https://www.oraculomundialista.com/p/${slug}/unirse`"
        />
      </div>
    </section>

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
import WhatsAppShareButton from '../components/share/WhatsAppShareButton.vue'
import { useDemoCommunity } from '../composables/useDemoCommunity'

const route = useRoute()
const slug = computed(() => route.params.slug || 'la-banda-del-mundial')
const { powers, emptyStates } = useDemoCommunity(slug.value)
const availablePowers = computed(() => powers.value.filter((power) => power.status !== 'bloqueado'))

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
.explainer,
.next-action {
  border-radius: 24px;
  padding: 18px;
}

h2 {
  margin-top: 8px;
  font-size: clamp(1.35rem, 5vw, 2rem);
  font-weight: 900;
}

.explainer p:not(.eyebrow),
.next-action p:not(.eyebrow) {
  margin: 10px 0 0;
  color: var(--text-muted);
  line-height: 1.55;
}

.next-action {
  display: grid;
  gap: 14px;
}

.action-row {
  display: grid;
  gap: 12px;
}

.action-row a {
  padding: 0 16px;
}

.top-action {
  margin-top: 12px;
  padding: 0 16px;
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

  .action-row {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  }
}
</style>
