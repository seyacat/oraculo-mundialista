<template>
  <aside class="upgrade-prompt" data-testid="upgrade-prompt">
    <div>
      <p class="eyebrow">{{ eyebrow }}</p>
      <h2>{{ title }}</h2>
      <p>{{ description }}</p>
    </div>
    <button type="button" class="secondary-button" data-testid="upgrade-cta-button">{{ ctaLabel }}</button>
  </aside>
</template>

<script setup>
defineProps({
  eyebrow: {
    type: String,
    default: 'Free hacia Plus',
  },
  title: {
    type: String,
    default: 'Tu comunidad esta cerca de desbloquear mas beneficios.',
  },
  description: {
    type: String,
    default: 'Cuando la hinchada crece, aparecen mas momentos compartibles, poderes y beneficios promocionales.',
  },
  ctaLabel: {
    type: String,
    default: 'Ver beneficios',
  },
})
</script>

<style scoped>
.upgrade-prompt {
  border: 1px solid rgba(210, 241, 0, 0.22);
  border-radius: 24px;
  padding: 18px;
  display: grid;
  gap: 16px;
  background:
    linear-gradient(145deg, rgba(21, 32, 49, 0.88), rgba(210, 241, 0, 0.08)),
    rgba(17, 28, 45, 0.72);
}

h2 {
  margin-top: 8px;
  font-size: clamp(1.25rem, 5vw, 1.8rem);
  font-weight: 900;
}

p:not(.eyebrow) {
  margin: 10px 0 0;
  color: var(--text-muted);
  line-height: 1.55;
}

button {
  padding: 0 16px;
}

@media (min-width: 720px) {
  .upgrade-prompt {
    grid-template-columns: 1fr auto;
    align-items: center;
  }
}
</style>
