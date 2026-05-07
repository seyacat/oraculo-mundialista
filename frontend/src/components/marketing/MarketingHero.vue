<template>
  <section class="marketing-hero">
    <div class="hero-copy">
      <p class="eyebrow">{{ eyebrow }}</p>
      <h1>{{ title }}</h1>
      <p class="subtitle">{{ subtitle }}</p>
      <p v-if="microcopy" class="microcopy">{{ microcopy }}</p>

      <div class="hero-actions">
        <RouterLink :to="primaryTo" class="primary-button">{{ primaryLabel }}</RouterLink>
        <RouterLink :to="secondaryTo" class="secondary-button">{{ secondaryLabel }}</RouterLink>
      </div>
    </div>

    <div class="hero-preview glass-card" aria-label="Vista previa del juego">
      <span class="preview-pill">{{ previewLabel }}</span>
      <div class="preview-score">
        <strong>{{ homeCode }}</strong>
        <span>{{ score }}</span>
        <strong>{{ awayCode }}</strong>
      </div>
      <div class="preview-progress" aria-hidden="true">
        <i></i><i></i><i></i><i class="dim"></i>
      </div>
      <p>{{ previewCopy }}</p>
    </div>
  </section>
</template>

<script setup>
defineProps({
  eyebrow: {
    type: String,
    default: 'Mundial + comunidad + orgullo',
  },
  title: {
    type: String,
    default: 'No solo predices el Mundial. Lo juegas contra tu gente.',
  },
  subtitle: {
    type: String,
    default: 'Crea tu comunidad gratis, invita por WhatsApp, predice partidos y compite en rankings de gloria y vergüenza.',
  },
  microcopy: {
    type: String,
    default: 'Gratis para empezar. Solo fútbol, orgullo, comunidad y revancha.',
  },
  primaryLabel: {
    type: String,
    default: 'Crear mi comunidad gratis',
  },
  primaryTo: {
    type: [String, Object],
    default: '/crear',
  },
  secondaryLabel: {
    type: String,
    default: 'Unirme a una comunidad',
  },
  secondaryTo: {
    type: [String, Object],
    default: '/p/la-banda-del-mundial/unirse',
  },
  previewLabel: {
    type: String,
    default: 'Cierra pronto',
  },
  homeCode: {
    type: String,
    default: 'ECU',
  },
  awayCode: {
    type: String,
    default: 'QAT',
  },
  score: {
    type: String,
    default: '2 - 1',
  },
  previewCopy: {
    type: String,
    default: 'Tu hinchada espera la predicción antes del cierre.',
  },
})
</script>

<style scoped>
.marketing-hero {
  display: grid;
  gap: 28px;
  align-items: center;
  padding: 40px 0 24px;
}

.hero-copy {
  display: grid;
  gap: 16px;
}

h1 {
  max-width: 780px;
  color: var(--text);
  font-size: clamp(2.65rem, 10vw, 6.4rem);
  font-weight: 900;
  letter-spacing: 0;
}

.subtitle,
.microcopy,
.hero-preview p {
  color: var(--text-muted);
  line-height: 1.6;
}

.subtitle {
  max-width: 680px;
  font-size: clamp(1rem, 2vw, 1.18rem);
}

.microcopy {
  margin: 0;
  font-size: 0.92rem;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.hero-actions a {
  padding: 0 18px;
}

.hero-preview {
  border-radius: 28px;
  padding: 20px;
  display: grid;
  gap: 16px;
}

.preview-pill {
  width: max-content;
  border-radius: 999px;
  background: var(--energy);
  color: var(--energy-text);
  padding: 8px 12px;
  font-size: 0.76rem;
  font-weight: 900;
  text-transform: uppercase;
}

.preview-score {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 12px;
  color: var(--primary);
  font-family: Inter, sans-serif;
  font-size: clamp(1.4rem, 7vw, 2.8rem);
  font-weight: 900;
  text-align: center;
}

.preview-score span {
  border-radius: 18px;
  padding: 14px;
  background: rgba(42, 53, 72, 0.72);
  color: var(--energy);
}

.preview-progress {
  display: flex;
  gap: 5px;
}

.preview-progress i {
  height: 5px;
  flex: 1;
  border-radius: 999px;
  background: var(--energy);
  box-shadow: 0 0 8px rgba(210, 241, 0, 0.5);
}

.preview-progress .dim {
  background: rgba(137, 147, 143, 0.28);
  box-shadow: none;
}

@media (min-width: 860px) {
  .marketing-hero {
    grid-template-columns: minmax(0, 1.2fr) minmax(320px, 0.8fr);
    padding: 72px 0 40px;
  }
}
</style>
