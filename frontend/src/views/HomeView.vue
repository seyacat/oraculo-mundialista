<template>
  <main class="home-view">
    <MarketingHero />

    <HowItWorks :steps="steps" />

    <section class="section-grid">
      <CommunityProgressCard :community="community" />
      <article class="feature-card glass-card">
        <p class="eyebrow">Predicciones</p>
        <h2>Marca el resultado antes del cierre.</h2>
        <p>Partidos claros, estados visibles y poderes opcionales para jugar con estrategia.</p>
        <RouterLink class="secondary-button" to="/p/la-banda-del-mundial/predicciones">Ver predicciones</RouterLink>
      </article>
    </section>

    <section class="feature-grid">
      <article class="feature-card glass-card">
        <p class="eyebrow">Ranking</p>
        <h2>Gloria para quien acierta.</h2>
        <p>Top 3, posición personal y momentos para presumir por WhatsApp.</p>
      </article>
      <article class="feature-card glass-card">
        <p class="eyebrow">Vergüenza</p>
        <h2>Humor sano para la jornada dura.</h2>
        <p>Recibos de realidad, revancha y excusas amistosas para el grupo.</p>
      </article>
      <article class="feature-card glass-card">
        <p class="eyebrow">Poderes</p>
        <h2>Recursos para jugar con picante.</h2>
        <p>Doble Fe, Anti-Mufa, Batacazo y Revancha con desbloqueos claros.</p>
      </article>
    </section>

    <UpgradePrompt
      eyebrow="Beneficios"
      title="Llena tu comunidad y desbloquea premios promocionales."
      description="El progreso visible convierte cada invitación en un paso hacia más gloria para la hinchada."
      cta-label="Crear mi comunidad gratis"
    />

    <section class="final-cta">
      <RouterLink class="primary-button" to="/crear">Crear mi comunidad gratis</RouterLink>
      <RouterLink class="secondary-button" to="/p/la-banda-del-mundial/unirse">Unirme a una comunidad</RouterLink>
    </section>
  </main>
</template>

<script setup>
import MarketingHero from '../components/marketing/MarketingHero.vue'
import HowItWorks from '../components/marketing/HowItWorks.vue'
import CommunityProgressCard from '../components/community/CommunityProgressCard.vue'
import UpgradePrompt from '../components/community/UpgradePrompt.vue'
import { useDemoCommunity } from '../composables/useDemoCommunity'

const { community } = useDemoCommunity()

const steps = [
  {
    number: '1',
    title: 'Crea tu comunidad',
    description: 'Ponle nombre a la hinchada y define cuántos jugadores quieres retar.',
  },
  {
    number: '2',
    title: 'Invita por WhatsApp',
    description: 'Comparte el reto y mira cómo sube el progreso hacia el próximo beneficio.',
  },
  {
    number: '3',
    title: 'Predice y compite',
    description: 'Guarda marcadores, usa poderes y pelea rankings de gloria y vergüenza.',
  },
]
</script>

<style scoped>
.home-view {
  width: min(1120px, 100%);
  margin: 0 auto;
  padding: 16px 16px 56px;
  display: grid;
  gap: 28px;
}

.section-grid,
.feature-grid {
  display: grid;
  gap: 14px;
}

.feature-card {
  border-radius: 24px;
  padding: 18px;
  display: grid;
  gap: 12px;
}

.feature-card h2 {
  font-size: clamp(1.35rem, 5vw, 2rem);
  font-weight: 900;
}

.feature-card p:not(.eyebrow) {
  margin: 0;
  color: var(--text-muted);
  line-height: 1.55;
}

.feature-card a {
  padding: 0 16px;
}

.final-cta {
  display: grid;
  gap: 12px;
}

.final-cta a {
  padding: 0 18px;
}

@media (min-width: 760px) {
  .home-view {
    padding: 24px 24px 72px;
  }

  .section-grid {
    grid-template-columns: minmax(0, 1fr) minmax(280px, 0.75fr);
  }

  .feature-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .final-cta {
    grid-template-columns: repeat(2, max-content);
  }
}
</style>
