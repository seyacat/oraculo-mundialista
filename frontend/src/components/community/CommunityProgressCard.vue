<template>
  <section class="progress-card glass-card">
    <div class="progress-top">
      <div>
        <p class="eyebrow">{{ eyebrow }}</p>
        <h2>{{ community.activePlayers }}/{{ community.playerGoal }} jugadores</h2>
      </div>
      <strong>{{ progress }}%</strong>
    </div>

    <div class="progress-track" aria-hidden="true">
      <span :style="{ width: `${progress}%` }"></span>
    </div>

    <p class="benefit">{{ community.nextBenefit?.description }}</p>

    <a :href="whatsAppUrl" target="_blank" rel="noopener" class="primary-button">
      {{ ctaLabel }}
    </a>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { buildWhatsAppShareUrl } from '../../lib/share/whatsapp'

const props = defineProps({
  community: {
    type: Object,
    required: true,
  },
  eyebrow: {
    type: String,
    default: 'Progreso comunitario',
  },
  ctaLabel: {
    type: String,
    default: 'Invitar por WhatsApp',
  },
  message: {
    type: String,
    default: '',
  },
})

const progress = computed(() => Math.min(100, Math.max(0, props.community.progressPercent || 0)))
const whatsAppUrl = computed(() => {
  const message = props.message || [
    'Estoy jugando El Oraculo Mundial.',
    'Metete a mi comunidad y compite conmigo.',
    props.community.inviteUrl,
  ].filter(Boolean).join('\n')

  return buildWhatsAppShareUrl(message)
})
</script>

<style scoped>
.progress-card {
  border-radius: 24px;
  padding: 18px;
  display: grid;
  gap: 16px;
}

.progress-top {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 12px;
}

h2 {
  margin-top: 6px;
  font-size: clamp(1.45rem, 6vw, 2.2rem);
  font-weight: 900;
}

.progress-top strong {
  color: var(--energy);
  font: 900 1.5rem/1 Inter, sans-serif;
}

.progress-track {
  height: 12px;
  border-radius: 999px;
  overflow: hidden;
  background: rgba(137, 147, 143, 0.22);
}

.progress-track span {
  display: block;
  height: 100%;
  border-radius: inherit;
  background: var(--energy);
  box-shadow: 0 0 12px rgba(210, 241, 0, 0.5);
}

.benefit {
  margin: 0;
  color: var(--text-muted);
  line-height: 1.55;
}
</style>
