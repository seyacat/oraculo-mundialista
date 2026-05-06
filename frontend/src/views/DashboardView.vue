<template>
  <div class="dashboard app-shell">
    <header class="dash-header">
      <div class="brand-block">
        <span class="avatar-ring">OM</span>
        <div>
          <p class="eyebrow">El Oráculo Mundial</p>
          <h1>Predicciones</h1>
        </div>
      </div>
      <div class="header-actions">
        <button type="button" class="icon-button" aria-label="Notificaciones">
          <span aria-hidden="true"></span>
        </button>
        <UserButton />
      </div>
    </header>

    <main class="dashboard-grid">
      <section class="oracle-card">
        <div class="live-badge">Vivo pronto</div>
        <div class="match-heading">
          <p class="eyebrow">Grupo A - Estadio Al Bayt</p>
          <h2>Ecuador vs Qatar</h2>
        </div>

        <div class="score-card">
          <label>
            <span>ECU</span>
            <input v-model="score.ecu" aria-label="Goles de Ecuador" inputmode="numeric" maxlength="2" />
          </label>
          <strong>VS</strong>
          <label>
            <span>QAT</span>
            <input v-model="score.qat" aria-label="Goles de Qatar" inputmode="numeric" maxlength="2" />
          </label>
        </div>

        <button type="button" class="primary-button submit-prediction">
          Enviar predicción
        </button>
      </section>

      <section class="powers-section">
        <div class="section-heading">
          <p class="eyebrow">Poderes disponibles</p>
          <span>Recarga en 4h</span>
        </div>
        <div class="powers-grid">
          <button v-for="power in powers" :key="power.name" type="button" class="power-card glass-card">
            <span class="power-mark">{{ power.code }}</span>
            <strong>{{ power.name }}</strong>
            <div class="stadium-lights" aria-hidden="true">
              <i v-for="n in 3" :key="n" :class="{ active: n <= power.charge }"></i>
            </div>
          </button>
        </div>
      </section>

      <section class="prediction-section glass-card">
        <div class="section-heading">
          <div>
            <p class="eyebrow">Tu predicción</p>
            <h2>Ordena tu top mundialista</h2>
          </div>
          <span>Arrastra para mover</span>
        </div>
        <PredictionBoard v-model="prediction" />
      </section>

      <aside class="side-column">
        <section class="ranking-card glass-card">
          <div class="section-heading">
            <div>
              <p class="eyebrow">Ranking</p>
              <h2>La punta</h2>
            </div>
          </div>
          <ol>
            <li v-for="leader in leaders" :key="leader.name">
              <span>{{ leader.rank }}</span>
              <div>
                <strong>{{ leader.name }}</strong>
                <small>{{ leader.points }} pts</small>
              </div>
            </li>
          </ol>
        </section>

        <section class="shame-card">
          <p class="eyebrow">Tabla de la vergüenza</p>
          <h2>Zona roja</h2>
          <p>El último paga penitencia futbolera. Que no seas tú.</p>
        </section>

        <section class="share-section glass-card">
          <div class="section-heading">
            <div>
              <p class="eyebrow">Compartir</p>
              <h2>Reta a tu gente</h2>
            </div>
          </div>
          <ShareButtons :prediction="prediction" />
        </section>
      </aside>
    </main>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { UserButton } from '@clerk/vue'
import PredictionBoard from '../components/PredictionBoard.vue'
import ShareButtons from '../components/ShareButtons.vue'

const prediction = ref([])
const score = reactive({ ecu: '', qat: '' })

const powers = [
  { code: 'DF', name: 'Doble fe', charge: 2 },
  { code: 'AM', name: 'Anti-mufa', charge: 1 },
  { code: 'BT', name: 'Batacazo', charge: 0 },
]

const leaders = [
  { rank: '01', name: 'Panchito FC', points: 128 },
  { rank: '02', name: 'La Tribuna', points: 117 },
  { rank: '03', name: 'VARcelona', points: 109 },
]
</script>

<style scoped>
.dashboard {
  width: min(1180px, 100%);
  margin: 0 auto;
  padding: 20px 20px 48px;
}

.dash-header {
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 72px;
  margin: -20px -20px 1.25rem;
  padding: 0 20px;
  border-bottom: 1px solid rgba(64, 73, 69, 0.55);
  background: rgba(8, 20, 37, 0.84);
  backdrop-filter: blur(14px);
}

.brand-block,
.header-actions {
  display: flex;
  align-items: center;
}

.brand-block {
  gap: 0.75rem;
}

.avatar-ring {
  width: 44px;
  height: 44px;
  border: 2px solid var(--energy);
  border-radius: 999px;
  display: grid;
  place-items: center;
  color: var(--energy);
  font-size: 0.72rem;
  font-weight: 900;
  box-shadow: 0 0 15px rgba(210, 241, 0, 0.24);
}

.dash-header h1 {
  color: var(--energy);
  font-size: clamp(1.25rem, 4vw, 1.65rem);
  font-weight: 900;
  letter-spacing: 0;
}

.header-actions {
  gap: 0.75rem;
}

.icon-button {
  width: 44px;
  height: 44px;
  border: 1px solid rgba(149, 211, 192, 0.16);
  border-radius: 999px;
  background: rgba(31, 42, 60, 0.72);
  cursor: pointer;
  display: grid;
  place-items: center;
}

.icon-button span,
.icon-button span::before {
  display: block;
}

.icon-button span {
  position: relative;
  width: 14px;
  height: 16px;
  border: 2px solid var(--primary);
  border-bottom: 0;
  border-radius: 9px 9px 4px 4px;
}

.icon-button span::before {
  content: "";
  position: absolute;
  left: 3px;
  bottom: -6px;
  width: 6px;
  height: 2px;
  border-radius: 99px;
  background: var(--primary);
}

.dashboard-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.35fr) minmax(300px, 0.65fr);
  gap: 1rem;
  align-items: start;
}

.oracle-card,
.prediction-section,
.ranking-card,
.share-section,
.shame-card {
  border-radius: var(--radius-xl);
}

.oracle-card {
  position: relative;
  overflow: hidden;
  min-height: 330px;
  padding: clamp(1.25rem, 4vw, 2rem);
  border: 1px solid rgba(64, 73, 69, 0.56);
  background:
    linear-gradient(145deg, rgba(21, 32, 49, 0.96), rgba(15, 82, 68, 0.42)),
    radial-gradient(circle at 92% 0%, rgba(210, 241, 0, 0.18), transparent 18rem);
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.25);
}

.oracle-card::after {
  content: "";
  position: absolute;
  inset: auto -12% -46% 45%;
  height: 210px;
  border-radius: 50%;
  border: 1px solid rgba(149, 211, 192, 0.12);
}

.live-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  border-radius: 999px;
  background: var(--energy);
  color: var(--energy-text);
  padding: 0.45rem 0.7rem;
  font-size: 0.72rem;
  font-weight: 900;
  text-transform: uppercase;
  box-shadow: 0 0 15px rgba(210, 241, 0, 0.3);
}

.match-heading {
  padding-right: 6rem;
}

.match-heading h2,
.section-heading h2,
.ranking-card h2,
.shame-card h2,
.share-section h2 {
  margin-top: 0.45rem;
  color: var(--text);
  font-size: clamp(1.45rem, 4vw, 2rem);
  font-weight: 900;
}

.score-card {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: clamp(0.75rem, 3vw, 1.4rem);
  align-items: center;
  margin: 2rem auto 1.5rem;
  max-width: 560px;
}

.score-card label {
  display: grid;
  place-items: center;
  gap: 0.7rem;
}

.score-card label span {
  color: var(--primary);
  font-family: Inter, sans-serif;
  font-size: 1.35rem;
  font-weight: 900;
}

.score-card input {
  width: min(112px, 28vw);
  aspect-ratio: 1;
  border: 2px solid rgba(137, 147, 143, 0.36);
  border-radius: 24px;
  background: rgba(42, 53, 72, 0.86);
  color: var(--primary);
  text-align: center;
  font: 900 clamp(2rem, 8vw, 3rem)/1 Inter, sans-serif;
}

.score-card strong {
  color: rgba(216, 227, 251, 0.32);
  font: 900 1.8rem/1 Inter, sans-serif;
}

.submit-prediction {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 560px;
  margin: 0 auto;
}

.powers-section,
.prediction-section,
.side-column {
  margin-top: 1rem;
}

.section-heading {
  display: flex;
  justify-content: space-between;
  align-items: end;
  gap: 1rem;
  margin-bottom: 0.9rem;
}

.section-heading > span {
  color: var(--text-muted);
  font-size: 0.82rem;
  white-space: nowrap;
}

.powers-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.75rem;
}

.power-card {
  min-height: 126px;
  border-radius: var(--radius-lg);
  color: var(--text);
  cursor: pointer;
  padding: 1rem;
  display: grid;
  justify-items: center;
  gap: 0.65rem;
  text-align: center;
  transition: transform 180ms ease, border-color 180ms ease, background 180ms ease;
}

.power-card:hover {
  border-color: rgba(210, 241, 0, 0.5);
  transform: translateY(-1px);
}

.power-mark {
  width: 42px;
  height: 42px;
  border-radius: 999px;
  display: grid;
  place-items: center;
  background: rgba(210, 241, 0, 0.12);
  color: var(--energy);
  font-size: 0.8rem;
  font-weight: 900;
}

.power-card strong {
  font-size: 0.82rem;
  line-height: 1.2;
}

.stadium-lights {
  width: 100%;
  display: flex;
  gap: 4px;
}

.stadium-lights i {
  height: 4px;
  flex: 1;
  border-radius: 999px;
  background: rgba(137, 147, 143, 0.3);
}

.stadium-lights .active {
  background: var(--energy);
  box-shadow: 0 0 8px var(--energy);
}

.prediction-section,
.ranking-card,
.share-section {
  padding: 1rem;
}

.side-column {
  display: grid;
  gap: 1rem;
}

.ranking-card ol {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 0.7rem;
}

.ranking-card li {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  border: 1px solid rgba(149, 211, 192, 0.11);
  border-radius: var(--radius-md);
  padding: 0.8rem;
  background: rgba(17, 28, 45, 0.62);
}

.ranking-card li > span {
  width: 42px;
  height: 42px;
  border-radius: 999px;
  display: grid;
  place-items: center;
  background: rgba(210, 241, 0, 0.12);
  color: var(--energy);
  font-weight: 900;
}

.ranking-card strong,
.ranking-card small {
  display: block;
}

.ranking-card small {
  margin-top: 0.15rem;
  color: var(--text-muted);
}

.shame-card {
  padding: 1.15rem;
  border: 1px solid rgba(255, 180, 171, 0.32);
  background:
    linear-gradient(145deg, rgba(147, 0, 10, 0.28), rgba(21, 32, 49, 0.84)),
    radial-gradient(circle at top right, rgba(255, 180, 171, 0.15), transparent 12rem);
}

.shame-card p:last-child {
  margin: 0.65rem 0 0;
  color: var(--text-muted);
  line-height: 1.5;
}

@media (max-width: 920px) {
  .dashboard-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 560px) {
  .dashboard {
    padding-inline: 16px;
  }

  .dash-header {
    margin-inline: -16px;
    padding-inline: 16px;
  }

  .powers-grid {
    grid-template-columns: 1fr;
  }

  .match-heading {
    padding-right: 0;
    padding-top: 2rem;
  }
}
</style>
