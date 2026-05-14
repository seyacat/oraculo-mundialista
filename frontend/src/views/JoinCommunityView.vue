<template>
  <AppShell eyebrow="Invitación pública" title="Te retaron a entrar" :back-to="`/p/${slug}`">
    <section class="join-card glass-card">
      <p class="eyebrow">Reto recibido</p>
      <h2>Pancho te retó a entrar a {{ community.name }}.</h2>
      <p>Ya son {{ community.activePlayers }}/{{ community.playerGoal }} jugadores. Entran {{ community.nextBenefit?.remainingPlayers }} más y desbloquean el primer beneficio.</p>

      <button type="button" class="primary-button accept-button" @click="acceptChallenge" data-testid="accept-challenge-button">Aceptar reto</button>

      <CommunityProgressCard :community="community" :show-cta="false" />

      <div class="join-actions">
        <WhatsAppShareButton
          label="Compartir comunidad"
          title="Invitación mundialista"
          :text="getShareMoment('invitacion-comunidad').message"
        />
      </div>
    </section>
  </AppShell>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppShell from '../components/layout/AppShell.vue'
import CommunityProgressCard from '../components/community/CommunityProgressCard.vue'
import WhatsAppShareButton from '../components/share/WhatsAppShareButton.vue'
import { useDemoCommunity } from '../composables/useDemoCommunity'

const route = useRoute()
const router = useRouter()
const slug = computed(() => route.params.slug || 'la-banda-del-mundial')
const { community, getShareMoment } = useDemoCommunity(slug.value)

function acceptChallenge() {
  router.push(`/p/${slug.value}/predicciones`)
}
</script>

<style scoped>
.join-card {
  border-radius: 28px;
  padding: 18px;
  display: grid;
  gap: 16px;
}

h2 {
  font-size: clamp(1.8rem, 8vw, 3.4rem);
  font-weight: 900;
}

p:not(.eyebrow) {
  margin: 0;
  color: var(--text-muted);
  line-height: 1.6;
}

.accept-button {
  padding: 0 18px;
  min-height: 58px;
  font-size: 1.05rem;
}

.join-actions {
  display: grid;
  gap: 12px;
}

.join-actions :deep(.whatsapp-button) {
  background: rgba(37, 211, 102, 0.16);
  border: 1px solid rgba(37, 211, 102, 0.45);
  color: #a9f7c8;
}

@media (min-width: 680px) {
  .join-actions {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  }
}
</style>
