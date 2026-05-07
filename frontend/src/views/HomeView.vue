<template>
  <main class="home-view">
    <header class="home-header">
      <RouterLink to="/" class="brand">El Oráculo Mundial</RouterLink>
      <span>Mundial + comunidad + orgullo</span>
    </header>

    <MarketingHero />

    <HowItWorks :steps="steps" title="Tres pasos. Un grupo encendido." />

    <section class="moments-section">
      <div class="section-heading">
        <p class="eyebrow">Momentos compartibles</p>
        <h2>Gloria, recibos y revancha listos para el grupo.</h2>
      </div>

      <div class="moment-grid">
        <article v-for="moment in moments" :key="moment.title" class="moment-card glass-card">
          <span>{{ moment.code }}</span>
          <h3>{{ moment.title }}</h3>
          <p>{{ moment.copy }}</p>
        </article>
      </div>
    </section>

    <section class="benefits-card glass-card">
      <div>
        <p class="eyebrow">Beneficios desbloqueables</p>
        <h2>Mientras más crece tu comunidad, más beneficios desbloquean todos.</h2>
        <p>18/25 jugadores — faltan 7.</p>
      </div>

      <div class="benefit-progress" aria-label="18 de 25 jugadores">
        <span></span>
      </div>

      <RouterLink class="primary-button" to="/crear">Crear mi comunidad gratis</RouterLink>
    </section>

    <section class="final-cta">
      <p class="eyebrow">Tu gente, tu torneo</p>
      <h2>El Mundial se juega mejor con tu gente.</h2>
      <RouterLink class="primary-button" to="/crear">Crear mi comunidad gratis</RouterLink>
    </section>
  </main>
</template>

<script setup>
import MarketingHero from '../components/marketing/MarketingHero.vue'
import HowItWorks from '../components/marketing/HowItWorks.vue'

const steps = [
  {
    number: '1',
    title: 'Crea tu comunidad',
    description: 'Ponle nombre al grupo y define la meta de jugadores.',
  },
  {
    number: '2',
    title: 'Invita por WhatsApp',
    description: 'Comparte el reto y mira crecer la hinchada.',
  },
  {
    number: '3',
    title: 'Predice y compite',
    description: 'Sube en ranking, presume gloria y pide revancha.',
  },
]

const moments = [
  {
    code: 'OR',
    title: 'Certificado de Oráculo',
    copy: 'Para quien vio venir el marcador y merece presumirlo.',
  },
  {
    code: 'RR',
    title: 'Recibo de Realidad',
    copy: 'Para el amigo que habló fuerte y necesita cariño público.',
  },
  {
    code: 'VG',
    title: 'Tabla de la Vergüenza',
    copy: 'Humor sano para caídas épicas y revanchas pendientes.',
  },
]
</script>

<style scoped>
.home-view {
  width: 100%;
  max-width: 1120px;
  overflow-x: hidden;
  margin: 0 auto;
  padding: 14px 16px 56px;
  display: grid;
  gap: 30px;
}

.home-header {
  min-height: 44px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.brand {
  color: var(--text);
  font-family: Inter, sans-serif;
  font-weight: 900;
}

.home-header span {
  max-width: 100%;
  border: 1px solid rgba(149, 211, 192, 0.18);
  border-radius: 999px;
  padding: 7px 10px;
  color: var(--primary);
  font-size: 0.68rem;
  font-weight: 900;
  text-align: right;
  text-transform: uppercase;
  white-space: normal;
}

.moments-section,
.benefits-card,
.final-cta {
  display: grid;
  gap: 16px;
}

.section-heading {
  display: grid;
  gap: 8px;
}

.section-heading h2,
.benefits-card h2,
.final-cta h2 {
  max-width: 680px;
  font-size: clamp(1.55rem, 6vw, 2.55rem);
  font-weight: 900;
}

.moment-grid {
  display: grid;
  gap: 12px;
}

.moment-card {
  border-radius: 18px;
  padding: 16px;
  display: grid;
  gap: 10px;
}

.moment-card span {
  width: 38px;
  height: 38px;
  border-radius: 999px;
  display: grid;
  place-items: center;
  background: rgba(210, 241, 0, 0.14);
  color: var(--energy);
  font-weight: 900;
}

.moment-card h3 {
  font-size: 1.12rem;
  font-weight: 900;
}

.moment-card p,
.benefits-card p,
.final-cta p:not(.eyebrow) {
  margin: 0;
  color: var(--text-muted);
  line-height: 1.5;
}

.benefits-card {
  border-radius: 24px;
  padding: 18px;
}

.benefit-progress {
  height: 12px;
  border-radius: 999px;
  overflow: hidden;
  background: rgba(137, 147, 143, 0.22);
}

.benefit-progress span {
  display: block;
  width: 72%;
  height: 100%;
  border-radius: inherit;
  background: var(--energy);
  box-shadow: 0 0 12px rgba(210, 241, 0, 0.5);
}

.benefits-card a,
.final-cta a {
  padding: 0 18px;
}

.final-cta {
  border-radius: 24px;
  padding: 22px 0 0;
}

@media (max-width: 520px) {
  .home-header {
    align-items: start;
    flex-direction: column;
    gap: 8px;
  }

  .home-header span {
    text-align: left;
  }
}

@media (min-width: 768px) {
  .home-view {
    padding: 20px 24px 72px;
    gap: 38px;
  }

  .moment-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .benefits-card {
    grid-template-columns: minmax(0, 1fr) minmax(180px, 0.45fr) max-content;
    align-items: center;
    padding: 22px;
  }

  .final-cta {
    align-items: center;
    grid-template-columns: minmax(0, 1fr) max-content;
  }

  .final-cta .eyebrow {
    grid-column: 1 / -1;
  }
}
</style>
