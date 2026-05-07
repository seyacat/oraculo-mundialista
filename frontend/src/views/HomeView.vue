<template>
  <main class="oraculo-home">
    <div class="home-shell">
      <header class="home-header" aria-label="El Oraculo Mundial">
        <div class="brand-block">
          <img class="brand-logo" src="/oraculo-home/logo-oraculo.webp" alt="Logo de El Oraculo Mundial" />
          <div class="brand-copy">
            <RouterLink to="/" class="brand-name">El Oraculo Mundial</RouterLink>
            <p>Mundial + comunidad + orgullo</p>
          </div>
        </div>
        <button class="menu-button" type="button" aria-label="Abrir menu">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M4 7h16v2H4V7Zm0 5h16v2H4v-2Zm0 5h16v2H4v-2Z" />
          </svg>
        </button>
      </header>

      <section class="hero-section">
        <h1>
          Tu <span class="lime-word">comunidad</span>
          mundialista empieza aqui.
        </h1>
        <p class="hero-copy">Predice partidos, compite con tu gente y comparte la gloria por WhatsApp.</p>

        <div class="hero-actions">
          <RouterLink class="home-button primary" to="/crear">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-3.31 0-6 1.79-6 4v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-1c0-2.21-2.69-4-6-4Z" />
            </svg>
            Ingresar / Registrarme
          </RouterLink>
          
        </div>

        <p class="hero-microcopy">Inicia Sesion y accede TOTALMENTE GRATIS.</p>
      </section>

      <section class="secure-card glass-panel" id="acceso-seguro">
        <img src="/oraculo-home/acceso-seguro.png" alt="" class="secure-art" />
        <div class="secure-content">
          <h2>Acceso seguro a tu comunidad</h2>
          <p></p>
          <div class="secure-actions">
            <button type="button" class="auth-button">
              <img src="/oraculo-home/mail-icon.png" alt="" />
              Continuar con email
            </button>
            <button type="button" class="auth-button">
              <img src="/oraculo-home/google-icon.png" alt="" />
              Continuar con Google
            </button>
          </div>
          <RouterLink class="invite-link" to="/p/la-banda-del-mundial/unirse">¿Ya te invitaron? Entrar con mi link</RouterLink>
          <p class="secure-trust">Tus datos Siempre protegidos con Clerk</p>
        </div>
      </section>

      <section class="preview-card glass-panel" aria-label="Crea tu Propia Comunidad y Diviértete Acertando">
        <p class="preview-label">Crea tu Propia Comunidad y Diviértete Acertando</p>
        <p class="preview-copy">Mientras más grande la comunidad más alto el Reto. ¿Te Atreves?</p>

        <div class="preview-grid">
          <div class="preview-main">
            <img src="/oraculo-home/logo-oraculo.webp" alt="" class="preview-badge" />
            <div class="preview-community-copy">
              <h3>La Banda del Mundial</h3>
              <strong><span>18</span>/25 jugadores</strong>
              <div class="progress-track" aria-label="18 de 25 jugadores">
                <i></i>
              </div>
              <p class="unlock-copy">Faltan 7 para desbloquear un premio de la comunidad</p>
            </div>
          </div>

          <div class="ranking-panel">
            <p class="ranking-title">Ranking actual</p>
            <ol>
              <li v-for="entry in ranking" :key="entry.name">
                <span class="rank-number">{{ entry.position }}</span>
                <span>{{ entry.name }}</span>
                <strong>{{ entry.points }} pts</strong>
              </li>
            </ol>
          </div>
        </div>

        <div class="preview-strip">
          <div>
            <h4>Juan cayo en <span>Humo del Dia</span></h4>
            <p>Todos lo vieron venir.</p>
          </div>
          <span class="whatsapp-chip">Gestiona tus Propios Premios y Sorpresas</span>
        </div>

        <p class="preview-footer">Disfruta en Familia, con tus Compañeros de Trabajo y Amigos TOTALMENTE GRATIS</p>
      </section>

      <section class="inside-section" id="inside">
        <h2>Que encontraras dentro</h2>
        <div class="inside-grid">
          <article v-for="feature in insideFeatures" :key="feature.title" class="inside-card glass-panel">
            <h3>{{ feature.title }}</h3>
            <p>{{ feature.copy }}</p>
          </article>
        </div>
      </section>

      <section class="final-banner glass-panel">
        <img src="/oraculo-home/trophy-beneficios.png" alt="" class="final-art" />
        <div class="final-content">
          <h2>Entra y juega con tu gente.</h2>
          <p>Predice, compite y comparte la gloria mundialista.</p>
          <RouterLink class="home-button primary" to="/crear">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-3.31 0-6 1.79-6 4v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-1c0-2.21-2.69-4-6-4Z" />
            </svg>
            Ingresar / Registrarme
          </RouterLink>
        </div>
      </section>
    </div>
  </main>
</template>

<script setup>
const ranking = [
  { position: 1, name: 'Maria', points: 42 },
  { position: 2, name: 'Pancho', points: 39 },
  { position: 3, name: 'Diego', points: 35 },
]

const insideFeatures = [
  { title: 'Predicciones', copy: 'Acierta resultados y suma puntos.' },
  { title: 'Rankings', copy: 'Compite con tu comunidad.' },
  { title: 'Tabla de la Verguenza', copy: 'Gloria, humor y revancha.' },
]
</script>

<style scoped>
.oraculo-home {
  --home-bg: #020812;
  --home-card: rgba(8, 18, 32, 0.74);
  --home-card-strong: rgba(9, 22, 38, 0.84);
  --home-border: rgba(148, 163, 184, 0.24);
  --home-lime: #d7ff00;
  --home-lime-hover: #bdf200;
  --home-mint: #8fffd8;
  --home-text: #f4f7fb;
  --home-soft: #c6d0dc;
  min-height: 100dvh;
  padding: 0 16px 30px;
  color: var(--home-text);
  background:
    linear-gradient(to bottom, rgba(2, 8, 18, 0.12), rgba(2, 8, 18, 0.72) 38%, rgba(2, 8, 18, 0.96) 100%),
    url("https://pub-dc06325214ac4e9a8959030cf5f65654.r2.dev/optimized-ChatGPT%20Image%207%20may%202026%2C%2010_15_36%20a.webp") top center / cover no-repeat,
    var(--home-bg);
}

.oraculo-home *,
.oraculo-home *::before,
.oraculo-home *::after {
  min-width: 0;
  box-sizing: border-box;
}

.home-shell {
  width: min(100%, 980px);
  margin: 0 auto;
  padding: 16px 0 30px;
  display: grid;
  gap: 18px;
}

.glass-panel {
  border: 1px solid var(--home-border);
  border-radius: 16px;
  background:
    linear-gradient(145deg, rgba(143, 255, 216, 0.06), transparent 42%),
    var(--home-card);
  box-shadow: 0 18px 50px rgba(0, 0, 0, 0.34);
  backdrop-filter: blur(14px);
}

.home-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.brand-block {
  display: flex;
  align-items: center;
  gap: 10px;
}

.brand-logo {
  width: 60px;
  height: 60px;
  object-fit: contain;
  filter: drop-shadow(0 0 16px rgba(215, 255, 0, 0.32));
}

.brand-copy {
  display: grid;
  gap: 4px;
}

.brand-name {
  color: var(--home-text);
  font: 900 clamp(1.2rem, 5.2vw, 1.95rem)/1.05 Inter, sans-serif;
  text-decoration: none;
}

.brand-copy p {
  margin: 0;
  color: var(--home-mint);
  letter-spacing: 0.16em;
  text-transform: uppercase;
  font: 800 0.75rem/1.1 "Plus Jakarta Sans", sans-serif;
}

.menu-button {
  width: 42px;
  height: 42px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 10px;
  background: rgba(2, 8, 18, 0.58);
  display: grid;
  place-items: center;
}

.menu-button svg {
  width: 24px;
  height: 24px;
  fill: var(--home-text);
}

.hero-section {
  display: grid;
  gap: 12px;
}

.hero-section h1 {
  margin: 0;
  max-width: 15ch;
  color: var(--home-text);
  font: 900 clamp(2rem, 12vw, 3.6rem)/1.04 Inter, sans-serif;
  letter-spacing: -0.03em;
}

.lime-word {
  color: var(--home-lime);
  text-shadow: 0 0 16px rgba(215, 255, 0, 0.32);
}

.hero-copy {
  margin: 0;
  max-width: 52ch;
  color: var(--home-soft);
  font-size: clamp(1rem, 3.9vw, 1.25rem);
  line-height: 1.42;
}

.hero-actions {
  display: grid;
  gap: 10px;
}

.home-button,
.auth-button {
  width: 100%;
  min-height: 56px;
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-weight: 900;
  text-align: center;
  text-decoration: none;
  transition: transform 180ms ease, box-shadow 180ms ease, background 180ms ease;
}

.home-button svg {
  width: 22px;
  height: 22px;
  fill: currentColor;
}

.home-button.primary {
  background: var(--home-lime);
  color: #071007;
  box-shadow: 0 0 28px rgba(215, 255, 0, 0.3);
}

.home-button.secondary {
  border: 1px solid rgba(143, 255, 216, 0.52);
  color: var(--home-text);
  background: rgba(4, 10, 20, 0.48);
}

.hero-microcopy {
  margin: 0;
  color: var(--home-mint);
  font-size: 0.9rem;
  line-height: 1.35;
}

.secure-card {
  padding: 16px;
  display: grid;
  gap: 14px;
}

.secure-art {
  width: 106px;
  margin: 0 auto;
  object-fit: contain;
}

.secure-content {
  display: grid;
  gap: 10px;
}

.secure-content h2,
.inside-section h2,
.final-content h2 {
  margin: 0;
  font: 900 clamp(1.35rem, 5vw, 1.8rem)/1.15 Inter, sans-serif;
}

.secure-content > p {
  margin: 0;
  color: var(--home-mint);
  font-weight: 800;
}

.secure-actions {
  display: grid;
  gap: 9px;
}

.auth-button {
  min-height: 52px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(3, 9, 19, 0.42);
  color: var(--home-text);
  font-size: 0.96rem;
}

.auth-button img {
  width: 24px;
  height: 24px;
}

.invite-link {
  width: max-content;
  max-width: 100%;
  color: var(--home-mint);
  font-weight: 800;
  text-decoration: underline;
  text-underline-offset: 3px;
}

.secure-trust {
  margin: 2px 0 0;
  color: var(--home-mint);
  font-size: 0.95rem;
}

.preview-card {
  padding: 16px;
  border-color: rgba(215, 255, 0, 0.45);
  background:
    linear-gradient(145deg, rgba(15, 82, 68, 0.28), rgba(8, 18, 32, 0.84)),
    var(--home-card-strong);
  display: grid;
  gap: 12px;
}

.preview-label {
  width: fit-content;
  margin: 0;
  padding: 6px 12px;
  border-radius: 999px;
  background: rgba(215, 255, 0, 0.13);
  color: var(--home-lime);
  font-size: 0.78rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-weight: 900;
}

.preview-copy {
  margin: 0;
  color: var(--home-mint);
  font-weight: 700;
}

.preview-grid {
  display: grid;
  gap: 12px;
}

.preview-main {
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: 12px;
}

.preview-badge {
  width: 88px;
  object-fit: contain;
}

.preview-community-copy {
  display: grid;
  gap: 8px;
}

.preview-community-copy h3 {
  margin: 0;
  font-size: 1.8rem;
}

.preview-community-copy strong {
  color: var(--home-text);
  font-size: 1.7rem;
}

.preview-community-copy strong span {
  color: var(--home-lime);
}

.progress-track {
  width: min(100%, 360px);
  height: 11px;
  border-radius: 999px;
  overflow: hidden;
  background: rgba(148, 163, 184, 0.28);
}

.progress-track i {
  display: block;
  width: 72%;
  height: 100%;
  border-radius: inherit;
  background: var(--home-lime);
}

.unlock-copy {
  margin: 0;
  color: var(--home-soft);
  line-height: 1.35;
}

.ranking-panel {
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: 12px;
  padding: 12px;
  display: grid;
  gap: 10px;
  background: rgba(4, 10, 20, 0.35);
}

.ranking-title {
  margin: 0;
  font-weight: 900;
}

.ranking-panel ol {
  margin: 0;
  padding: 0;
  display: grid;
  gap: 9px;
  list-style: none;
}

.ranking-panel li {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 9px;
  font-weight: 800;
}

.rank-number {
  width: 28px;
  height: 28px;
  border-radius: 999px;
  display: grid;
  place-items: center;
  background: var(--home-lime);
  color: #06111f;
}

.ranking-panel li:nth-child(2) .rank-number {
  background: #9aa3af;
}

.ranking-panel li:nth-child(3) .rank-number {
  background: #b9774f;
}

.preview-strip {
  border: 1px solid rgba(148, 163, 184, 0.22);
  border-radius: 12px;
  padding: 12px;
  display: grid;
  gap: 10px;
  background: rgba(4, 10, 20, 0.35);
}

.preview-strip h4 {
  margin: 0;
  font-size: 1.1rem;
}

.preview-strip h4 span {
  color: #a686ff;
}

.preview-strip p {
  margin: 4px 0 0;
  color: var(--home-soft);
}

.whatsapp-chip {
  width: fit-content;
  border: 1px solid rgba(143, 255, 216, 0.45);
  border-radius: 999px;
  padding: 7px 12px;
  color: var(--home-mint);
  font-weight: 800;
  font-size: 0.9rem;
  background: rgba(143, 255, 216, 0.08);
}

.preview-footer {
  margin: 0;
  color: var(--home-lime);
  text-align: center;
  font-weight: 800;
}

.inside-section {
  display: grid;
  gap: 12px;
}

.inside-grid {
  display: grid;
  gap: 10px;
}

.inside-card {
  padding: 14px;
}

.inside-card h3 {
  margin: 0 0 6px;
  font-size: 1.3rem;
}

.inside-card p {
  margin: 0;
  color: var(--home-soft);
}

.final-banner {
  padding: 14px;
  display: grid;
  gap: 12px;
  align-items: center;
}

.final-art {
  width: 92px;
  object-fit: contain;
  filter: drop-shadow(0 0 18px rgba(215, 255, 0, 0.38));
}

.final-content {
  display: grid;
  gap: 10px;
}

.final-content p {
  margin: 0;
  color: var(--home-soft);
}

@media (min-width: 720px) {
  .oraculo-home {
    padding: 0 26px 40px;
  }

  .home-shell {
    padding-top: 20px;
    gap: 20px;
  }

  .brand-logo {
    width: 74px;
    height: 74px;
  }

  .hero-actions {
    max-width: 660px;
    grid-template-columns: 1fr 1fr;
  }

  .secure-card {
    grid-template-columns: 150px 1fr;
    align-items: center;
    padding: 18px;
  }

  .secure-art {
    width: 132px;
  }

  .secure-actions {
    grid-template-columns: 1fr 1fr;
  }

  .preview-grid {
    grid-template-columns: minmax(0, 1.25fr) minmax(280px, 0.75fr);
    align-items: start;
  }

  .preview-strip {
    grid-template-columns: 1fr auto;
    align-items: center;
  }

  .inside-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .final-banner {
    grid-template-columns: auto 1fr;
    padding: 16px 18px;
  }

  .final-art {
    width: 118px;
  }
}

@media (max-width: 420px) {
  .secure-content {
    text-align: center;
  }

  .invite-link {
    margin: 0 auto;
  }

  .preview-label {
    margin: 0 auto;
  }

  .preview-copy {
    text-align: center;
  }

  .preview-grid {
    justify-items: center;
    text-align: center;
  }

  .preview-main {
    grid-template-columns: 78px 1fr;
    justify-self: center;
  }

  .preview-badge {
    width: 76px;
  }

  .preview-strip {
    justify-items: center;
    text-align: center;
    grid-template-columns: 1fr;
  }

  .inside-section h2 {
    text-align: center;
  }

  .inside-grid {
    justify-items: center;
  }

  .inside-card {
    text-align: center;
  }

  .final-banner {
    justify-items: center;
    text-align: center;
  }

  .final-content {
    justify-items: center;
    text-align: center;
  }

  .brand-logo {
    width: 56px;
    height: 56px;
  }

  .brand-name {
    font-size: 1.9rem;
  }

  .hero-section h1 {
    max-width: 12ch;
  }
}
</style>
