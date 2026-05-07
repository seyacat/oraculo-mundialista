<template>
  <AppShell :eyebrow="moment.eyebrow" :title="moment.title" :back-to="`/p/${slug}`">
    <section class="moment-hero">
      <ShareMomentCard :moment="moment" />
      <article class="moment-context glass-card">
        <p class="eyebrow">{{ community.name }}</p>
        <h2>Este momento vive mejor cuando se comparte.</h2>
        <p>{{ contextCopy }}</p>
        <WhatsAppShareButton
          :label="moment.ctaLabel || 'Compartir por WhatsApp'"
          :title="moment.title"
          :text="moment.message"
        />
      </article>
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
import ShareMomentCard from '../components/share/ShareMomentCard.vue'
import WhatsAppShareButton from '../components/share/WhatsAppShareButton.vue'
import { useDemoCommunity } from '../composables/useDemoCommunity'

const route = useRoute()
const slug = computed(() => route.params.slug || 'la-banda-del-mundial')
const momentId = computed(() => route.params.momentId || 'certificado-oraculo')
const { community, getShareMoment } = useDemoCommunity(slug.value)
const moment = computed(() => getShareMoment(momentId.value))

const contextCopy = computed(() => {
  const copy = {
    certificate: 'Presume la gloria antes de que el grupo te pida pruebas.',
    receipt: 'Un recibo amistoso para recordar que el futbol tambien enseña humildad.',
    shame: 'Humor sano, revancha cerca y cero mala leche.',
    comeback: 'La reputacion se puede arreglar en la proxima fecha.',
    ranking: 'La tabla cambia rapido. Comparte la posicion mientras dura.',
    invite: 'Cada invitacion acerca a la comunidad al proximo beneficio.',
  }

  return copy[moment.value.type] || 'Comparte el momento y deja que la hinchada responda.'
})

const navItems = computed(() => [
  { to: `/p/${slug.value}`, label: 'Inicio', short: 'IN' },
  { to: `/p/${slug.value}/predicciones`, label: 'Predic.', short: 'PR' },
  { to: `/p/${slug.value}/ranking`, label: 'Ranking', short: 'RK' },
  { to: `/p/${slug.value}/verguenza`, label: 'Verg.', short: 'VG' },
  { to: `/p/${slug.value}/poderes`, label: 'Poderes', short: 'PO' },
])
</script>

<style scoped>
.moment-hero {
  display: grid;
  gap: 14px;
}

.moment-context {
  border-radius: 24px;
  padding: 18px;
  display: grid;
  gap: 12px;
}

h2 {
  font-size: clamp(1.45rem, 6vw, 2.25rem);
  font-weight: 900;
}

p:not(.eyebrow) {
  margin: 0;
  color: var(--text-muted);
  line-height: 1.55;
}

@media (min-width: 900px) {
  .moment-hero {
    grid-template-columns: minmax(0, 1fr) minmax(320px, 0.65fr);
    align-items: start;
  }
}
</style>
