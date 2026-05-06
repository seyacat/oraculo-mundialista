<template>
  <main class="home app-shell">
    <section class="hero">
      <div class="hero-copy">
        <p class="eyebrow">Quiniela social del Mundial</p>
        <h1>El Oráculo Mundial</h1>
        <p class="subtitle">
          No solo predices el Mundial. Lo juegas contra tu gente con poderes,
          rankings y una tabla de la vergüenza que nadie quiere liderar.
        </p>

        <div class="hero-actions">
          <RouterLink class="primary-button" to="/dashboard">
            <span class="icon-dot">GO</span>
            Entrar al estadio
          </RouterLink>
          <a class="secondary-button" href="#crear-comunidad">
            Ver comunidad
          </a>
        </div>

        <div class="stats-row" aria-label="Resumen del juego">
          <div>
            <strong>32</strong>
            <span>selecciones</span>
          </div>
          <div>
            <strong>3</strong>
            <span>poderes</span>
          </div>
          <div>
            <strong>1</strong>
            <span>oráculo</span>
          </div>
        </div>
      </div>

      <div class="phone-preview" aria-label="Vista previa de predicciones">
        <div class="preview-top">
          <span class="avatar-ring">OM</span>
          <span>Predicciones</span>
          <span class="live-pill">VIVO</span>
        </div>
        <div class="match-card">
          <span class="eyebrow">Grupo A</span>
          <div class="scoreline">
            <span>ECU</span>
            <input aria-label="Goles de Ecuador en la vista previa" value="2" readonly />
            <b>VS</b>
            <input aria-label="Goles del rival en la vista previa" value="1" readonly />
            <span>QAT</span>
          </div>
          <div class="light-track" aria-hidden="true">
            <i class="active"></i><i class="active"></i><i class="active"></i><i></i>
          </div>
        </div>
        <div class="power-grid" aria-label="Poderes destacados">
          <div><span>DF</span><b>Doble fe</b></div>
          <div><span>AM</span><b>Anti-mufa</b></div>
          <div><span>BT</span><b>Batacazo</b></div>
        </div>
      </div>
    </section>

    <section id="crear-comunidad" class="community-panel glass-card">
      <div>
        <p class="eyebrow">Crea tu comunidad</p>
        <h2>Reta a familia, amigos o toda la oficina.</h2>
      </div>
      <div class="community-options">
        <button type="button">10 jugadores</button>
        <button type="button" class="selected">25 jugadores</button>
        <button type="button">50 jugadores</button>
      </div>
    </section>

    <section v-if="!isSignedIn" class="auth-panel glass-card">
        <div class="auth-copy">
          <p class="eyebrow">Acceso</p>
          <h2>Entra y arma tu predicción.</h2>
        </div>
        <SignIn :afterSignInUrl="'/dashboard'" />
    </section>

    <section v-else class="signed-panel glass-card">
        <p class="eyebrow">Sesión activa</p>
        <RouterLink class="primary-button" to="/dashboard">Ir al dashboard</RouterLink>
    </section>
  </main>
</template>

<script setup>
import { SignIn, useAuth } from '@clerk/vue'

const { isSignedIn } = useAuth()
</script>

<style scoped>
.home {
  padding: 20px;
}

.hero {
  width: min(1120px, 100%);
  min-height: min(760px, calc(100dvh - 40px));
  margin: 0 auto;
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(300px, 0.95fr);
  gap: clamp(2rem, 6vw, 5rem);
  align-items: center;
  padding: clamp(2rem, 6vw, 4rem) 0;
}

.hero-copy {
  max-width: 640px;
}

h1 {
  margin-top: 0.75rem;
  max-width: 620px;
  font-size: clamp(3rem, 9vw, 6.6rem);
  font-weight: 900;
  letter-spacing: 0;
}

.subtitle {
  max-width: 620px;
  margin: 1.25rem 0 0;
  color: var(--text-muted);
  font-size: clamp(1rem, 2vw, 1.18rem);
  line-height: 1.6;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-top: 2rem;
}

.hero-actions a {
  padding: 0.9rem 1.15rem;
}

.stats-row {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.75rem;
  max-width: 520px;
  margin-top: 2rem;
}

.stats-row div {
  border: 1px solid rgba(149, 211, 192, 0.14);
  border-radius: var(--radius-md);
  padding: 1rem;
  background: rgba(17, 28, 45, 0.62);
}

.stats-row strong,
.stats-row span {
  display: block;
}

.stats-row strong {
  color: var(--energy);
  font: 900 1.8rem/1 Inter, sans-serif;
}

.stats-row span {
  margin-top: 0.35rem;
  color: var(--text-muted);
  font-size: 0.82rem;
}

.phone-preview {
  position: relative;
  width: min(390px, 100%);
  justify-self: center;
  border: 1px solid rgba(149, 211, 192, 0.22);
  border-radius: 32px;
  padding: 1rem;
  background:
    linear-gradient(180deg, rgba(21, 32, 49, 0.88), rgba(4, 14, 31, 0.96)),
    radial-gradient(circle at top right, rgba(210, 241, 0, 0.2), transparent 15rem);
  box-shadow: 0 40px 100px rgba(0, 0, 0, 0.36);
}

.phone-preview::before {
  content: "";
  position: absolute;
  inset: -1.25rem;
  z-index: -1;
  border-radius: 40px;
  background: rgba(210, 241, 0, 0.08);
  filter: blur(32px);
}

.preview-top,
.scoreline,
.power-grid {
  display: flex;
  align-items: center;
}

.preview-top {
  justify-content: space-between;
  min-height: 48px;
  font-family: Inter, sans-serif;
  font-weight: 800;
}

.avatar-ring {
  width: 42px;
  height: 42px;
  border: 2px solid var(--energy);
  border-radius: 999px;
  display: grid;
  place-items: center;
  color: var(--energy);
  font-size: 0.75rem;
}

.live-pill {
  border-radius: 999px;
  background: var(--energy);
  color: var(--energy-text);
  padding: 0.45rem 0.7rem;
  font-size: 0.7rem;
}

.match-card {
  margin-top: 1rem;
  border: 1px solid rgba(149, 211, 192, 0.15);
  border-radius: 24px;
  padding: 1.25rem;
  background: rgba(21, 32, 49, 0.74);
}

.scoreline {
  justify-content: space-between;
  gap: 0.7rem;
  margin-top: 1rem;
}

.scoreline span {
  color: var(--primary);
  font-family: Inter, sans-serif;
  font-weight: 900;
}

.scoreline input {
  width: 54px;
  height: 54px;
  border: 2px solid rgba(137, 147, 143, 0.35);
  border-radius: 16px;
  background: var(--surface-highest);
  color: var(--primary);
  text-align: center;
  font: 900 1.6rem/1 Inter, sans-serif;
}

.scoreline b {
  color: rgba(216, 227, 251, 0.35);
}

.light-track {
  display: flex;
  gap: 4px;
  margin-top: 1.25rem;
}

.light-track i {
  height: 4px;
  flex: 1;
  border-radius: 999px;
  background: rgba(137, 147, 143, 0.28);
}

.light-track .active {
  background: var(--energy);
  box-shadow: 0 0 8px var(--energy);
}

.power-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
  margin-top: 1rem;
}

.power-grid div {
  min-height: 92px;
  border: 1px solid rgba(149, 211, 192, 0.13);
  border-radius: 16px;
  padding: 0.85rem 0.5rem;
  background: rgba(21, 32, 49, 0.58);
  text-align: center;
}

.power-grid span,
.power-grid b {
  display: block;
}

.power-grid span {
  width: 34px;
  height: 34px;
  margin: 0 auto 0.7rem;
  border-radius: 999px;
  display: grid;
  place-items: center;
  background: rgba(210, 241, 0, 0.12);
  color: var(--energy);
  font-size: 0.72rem;
  font-weight: 900;
}

.power-grid b {
  font-size: 0.72rem;
  line-height: 1.2;
}

.community-panel,
.auth-panel,
.signed-panel {
  width: min(960px, calc(100% - 40px));
  margin: 0 auto 1rem;
  border-radius: var(--radius-xl);
  padding: clamp(1.25rem, 4vw, 2rem);
}

.community-panel {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 1rem;
  align-items: center;
}

.community-panel h2,
.auth-panel h2 {
  margin-top: 0.45rem;
  font-size: clamp(1.4rem, 4vw, 2rem);
}

.community-options {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: flex-end;
}

.community-options button {
  min-height: 48px;
  border: 1px solid rgba(149, 211, 192, 0.18);
  border-radius: var(--radius-md);
  background: rgba(17, 28, 45, 0.75);
  color: var(--text);
  cursor: pointer;
  padding: 0 1rem;
  font-weight: 800;
}

.community-options .selected {
  border-color: var(--energy);
  background: var(--energy);
  color: var(--energy-text);
}

.auth-panel {
  display: grid;
  grid-template-columns: minmax(220px, 0.8fr) minmax(280px, 1fr);
  gap: 1.5rem;
  align-items: start;
}

.signed-panel {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

@media (max-width: 860px) {
  .hero,
  .community-panel,
  .auth-panel {
    grid-template-columns: 1fr;
  }

  .hero {
    min-height: 0;
  }

  .community-options {
    justify-content: flex-start;
  }
}

@media (max-width: 560px) {
  .home {
    padding: 16px;
  }

  .hero-actions,
  .signed-panel {
    align-items: stretch;
    flex-direction: column;
  }

  .hero-actions a,
  .signed-panel a {
    width: 100%;
  }

  .stats-row {
    grid-template-columns: 1fr;
  }

  .community-panel,
  .auth-panel,
  .signed-panel {
    width: 100%;
  }
}
</style>
