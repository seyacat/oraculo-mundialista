<template>
  <AppShell eyebrow="Vergüenza" title="Recibos con cariño" :back-to="`/p/${slug}`">
    <section class="whatsapp-hero glass-card">
      <p class="eyebrow">Recibo de realidad</p>
      <h2>La risa sana viaja por WhatsApp.</h2>
      <p>Comparte el recibo con cariño y deja abierta la revancha de la próxima fecha.</p>
      <WhatsAppShareButton
        label="Enviar recibo por WhatsApp"
        title="Recibo de Realidad"
        :text="getShareMoment('recibo-realidad').message"
      />
    </section>

    <ShameTableCard v-if="shameEntries.length" :entries="shameEntries" />
    <article v-else class="empty-note glass-card">
      <p class="eyebrow">Cuando nadie caiga</p>
      <h2>{{ emptyStates.shame.title }}</h2>
      <p>{{ emptyStates.shame.description }}</p>
    </article>

    <section class="revancha-card glass-card">
      <p class="eyebrow">Revancha</p>
      <h2>La próxima fecha limpia reputaciones.</h2>
      <p>El fútbol da otra vuelta. La comunidad también.</p>
      <WhatsAppShareButton
        label="Pedir revancha por WhatsApp"
        title="Pedido de Revancha"
        :text="getShareMoment('revancha').message"
      />
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
import ShameTableCard from '../components/shame/ShameTableCard.vue'
import WhatsAppShareButton from '../components/share/WhatsAppShareButton.vue'
import { useDemoCommunity } from '../composables/useDemoCommunity'

const route = useRoute()
const slug = computed(() => route.params.slug || 'la-banda-del-mundial')
const { shameEntries, emptyStates, getShareMoment } = useDemoCommunity(slug.value)

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
.revancha-card,
.whatsapp-hero {
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
  font-size: clamp(1.2rem, 5vw, 1.7rem);
  font-weight: 900;
}

h2 {
  font-size: clamp(1.35rem, 5vw, 2rem);
  font-weight: 900;
}

p:not(.eyebrow) {
  margin: 0;
  color: var(--text-muted);
  line-height: 1.55;
}
</style>
