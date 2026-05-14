<template>
  <section class="marketing-hero" data-testid="marketing-hero">
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

    <div class="hero-preview glass-card" aria-label="Comunidad demo">
      <div class="preview-head">
        <span class="preview-pill">Comunidad viva</span>
        <strong>{{ communityProgress }}</strong>
      </div>

      <div>
        <h2>{{ communityName }}</h2>
        <p>{{ benefitCopy }}</p>
      </div>

      <div class="preview-progress" aria-label="Progreso 18 de 25 jugadores">
        <span :style="{ width: progressWidth }"></span>
      </div>

      <div class="mini-grid">
        <div class="mini-panel">
          <p class="mini-label">Ranking</p>
          <ol>
            <li v-for="entry in ranking" :key="entry.name">
              <span>#{{ entry.position }} {{ entry.name }}</span>
              <strong>{{ entry.points }} pts</strong>
            </li>
          </ol>
        </div>
        <div class="mini-panel shame">
          <p class="mini-label">Vergüenza</p>
          <strong>Juan cayó en “Humo del Día”.</strong>
          <small>Con cariño. Con revancha.</small>
        </div>
      </div>

      <a class="whatsapp-cta" :href="whatsAppUrl" target="_blank" rel="noopener">
        <span aria-hidden="true">WA</span>
        Invitar por WhatsApp
      </a>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { buildWhatsAppShareUrl } from '../../lib/share/whatsapp'

const ranking = [
  { position: 1, name: 'María', points: 42 },
  { position: 2, name: 'Pancho', points: 39 },
  { position: 3, name: 'Diego', points: 35 },
]

const whatsAppUrl = computed(() => buildWhatsAppShareUrl([
  'Estoy creando mi comunidad en El Oraculo Mundial.',
  'Entra a La Banda del Mundial y reta a tu gente.',
  'https://www.oraculomundialista.com/p/la-banda-del-mundial/unirse',
].join('\n')))

defineProps({
  eyebrow: {
    type: String,
    default: 'Mundial + comunidad + orgullo',
  },
  title: {
    type: String,
    default: 'Crea tu comunidad mundialista y reta a tu gente.',
  },
  subtitle: {
    type: String,
    default: 'Predice partidos, sube en el ranking, evita la vergüenza y comparte la gloria por WhatsApp.',
  },
  microcopy: {
    type: String,
    default: 'Gratis para empezar. Solo fútbol, comunidad y revancha.',
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
  communityName: {
    type: String,
    default: 'La Banda del Mundial',
  },
  communityProgress: {
    type: String,
    default: '18/25 jugadores',
  },
  benefitCopy: {
    type: String,
    default: 'Faltan 7 para desbloquear premio promocional.',
  },
  progressWidth: {
    type: String,
    default: '72%',
  },
})
</script>

<style scoped>
.marketing-hero {
  display: grid;
  gap: 18px;
  align-items: center;
  padding: 18px 0 10px;
}

.hero-copy {
  min-width: 0;
  display: grid;
  gap: 12px;
}

h1 {
  width: 100%;
  max-width: 11.5ch;
  color: var(--text);
  font-size: clamp(2.2rem, 8.5vw, 5.2rem);
  font-weight: 900;
  letter-spacing: 0;
  overflow-wrap: anywhere;
}

.subtitle,
.microcopy,
.hero-preview p {
  color: var(--text-muted);
  line-height: 1.6;
}

.subtitle {
  max-width: 680px;
  font-size: clamp(1rem, 2vw, 1.14rem);
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
  min-width: min(100%, 238px);
  padding: 0 18px;
}

.hero-preview {
  min-width: 0;
  border-radius: 24px;
  padding: 16px;
  display: grid;
  gap: 14px;
}

.preview-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
}

.preview-head strong {
  color: var(--energy);
  font: 900 1rem/1 Inter, sans-serif;
  white-space: nowrap;
}

.preview-pill,
.mini-label {
  width: max-content;
  border-radius: 999px;
  background: rgba(149, 211, 192, 0.12);
  color: var(--primary);
  padding: 8px 12px;
  font-size: 0.76rem;
  font-weight: 900;
  text-transform: uppercase;
}

.hero-preview h2 {
  margin-top: 2px;
  font-size: clamp(1.45rem, 6vw, 2rem);
  font-weight: 900;
}

.preview-progress {
  height: 12px;
  border-radius: 999px;
  overflow: hidden;
  background: rgba(137, 147, 143, 0.22);
}

.preview-progress span {
  display: block;
  height: 100%;
  border-radius: inherit;
  background: var(--energy);
  box-shadow: 0 0 12px rgba(210, 241, 0, 0.5);
}

.mini-grid {
  display: grid;
  gap: 10px;
}

.mini-panel {
  border: 1px solid rgba(149, 211, 192, 0.12);
  border-radius: 18px;
  padding: 12px;
  background: rgba(4, 14, 31, 0.4);
}

ol {
  list-style: none;
  margin: 10px 0 0;
  padding: 0;
  display: grid;
  gap: 8px;
}

li {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  color: var(--text);
  font-weight: 800;
}

li strong,
.shame strong {
  color: var(--energy);
}

.shame {
  display: grid;
  gap: 8px;
}

.shame small {
  color: var(--text-muted);
  font-weight: 800;
}

.whatsapp-cta {
  min-height: 54px;
  border-radius: var(--radius-md);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: #25d366;
  color: #062b16;
  font-weight: 900;
}

.whatsapp-cta span {
  width: 30px;
  height: 30px;
  border-radius: 999px;
  display: grid;
  place-items: center;
  background: rgba(6, 43, 22, 0.14);
  font-size: 0.72rem;
}

@media (min-width: 860px) {
  .marketing-hero {
    grid-template-columns: minmax(0, 1fr) minmax(360px, 0.78fr);
    gap: 32px;
    padding: 44px 0 18px;
  }

  .hero-preview {
    padding: 20px;
  }
}

@media (min-width: 760px) {
  h1 {
    max-width: 720px;
  }
}

@media (min-width: 1040px) {
  .mini-grid {
    grid-template-columns: 1.05fr 0.95fr;
  }
}
</style>
