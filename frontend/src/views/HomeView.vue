<template>
  <main class="oraculo-home">
    <div class="home-shell">
      <header class="home-header" aria-label="El Oráculo Mundial">
        <img class="brand-logo" src="/oraculo-home/logo-oraculo.png" alt="Logo de El Oráculo Mundial" />
        <div>
          <RouterLink to="/" class="brand-name">El Oráculo Mundial</RouterLink>
          <p>Mundial + comunidad + orgullo</p>
        </div>
      </header>

      <section class="hero-section">
        <h1>
          <span class="hero-line">Crea tu comunidad</span>
          <span class="hero-line"><span class="lime-word">mundialista</span> y reta a tu gente.</span>
        </h1>
        <p class="hero-copy">
          Predice partidos, sube en el ranking, evita la vergüenza
          y comparte la gloria por WhatsApp.
        </p>
        <p class="hero-note">Gratis para empezar. Solo fútbol, comunidad y revancha.</p>

        <div class="hero-actions">
          <RouterLink class="home-button primary" to="/crear">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M16 11a4 4 0 1 0-3.8-5.25A4.7 4.7 0 0 1 14 9.5c0 .52-.09 1.03-.26 1.5H16Zm-8 0a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm0 2c-3.31 0-6 1.79-6 4v1.2c0 .44.36.8.8.8h10.4c.44 0 .8-.36.8-.8V17c0-2.21-2.69-4-6-4Zm8 0c-.46 0-.9.04-1.33.12.83.92 1.33 2.02 1.33 3.18V19h5.2c.44 0 .8-.36.8-.8V17c0-2.21-2.69-4-6-4Z" />
            </svg>
            Crear mi comunidad gratis
          </RouterLink>
          <RouterLink class="home-button secondary" to="/p/la-banda-del-mundial/unirse">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M10 4.75c0-.41.34-.75.75-.75h7.5c.97 0 1.75.78 1.75 1.75v12.5c0 .97-.78 1.75-1.75 1.75h-7.5a.75.75 0 0 1 0-1.5h7.5a.25.25 0 0 0 .25-.25V5.75a.25.25 0 0 0-.25-.25h-7.5A.75.75 0 0 1 10 4.75Zm2.22 4.03a.75.75 0 0 1 1.06-1.06l3.75 3.75a.75.75 0 0 1 0 1.06l-3.75 3.75a.75.75 0 1 1-1.06-1.06l2.47-2.47H4.75a.75.75 0 0 1 0-1.5h9.94l-2.47-2.47Z" />
            </svg>
            Ingresar a mi comunidad
          </RouterLink>
        </div>
      </section>

      <section class="secure-card glass-panel">
        <img src="/oraculo-home/acceso-seguro.png" alt="" class="secure-art" />
        <div class="secure-content">
          <h2>Acceso seguro a tu comunidad</h2>
          <p>Ingreso multitenant con Clerk</p>
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
        </div>
      </section>

      <section class="community-card glass-panel">
        <div class="community-main">
          <img src="/oraculo-home/logo-oraculo.png" alt="" class="band-badge" />
          <div class="community-copy">
            <p class="mint-label">Comunidad demo</p>
            <h2>La Banda del Mundial</h2>
            <strong><span>18</span> / 25 jugadores</strong>
            <div class="progress-track" aria-label="18 de 25 jugadores">
              <i></i>
            </div>
            <p class="unlock-copy">
              Faltan 7 para desbloquear<br />
              premio promocional
            </p>
          </div>
        </div>

        <div class="ranking-panel">
          <p class="ranking-title">
            <img src="/oraculo-home/rankings-epicos.png" alt="" />
            Ranking actual
          </p>
          <ol>
            <li v-for="entry in ranking" :key="entry.name">
              <span class="rank-number">{{ entry.position }}</span>
              <span class="avatar" :class="entry.className"></span>
              <span>{{ entry.name }}</span>
              <strong>{{ entry.points }} pts</strong>
            </li>
          </ol>
        </div>

        <div class="shame-strip">
          <div class="ghost-badge" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="M12 3c-4.4 0-7 3.3-7 7.4V20c0 .6.68.95 1.17.6l1.43-1.02 1.43 1.02c.28.2.66.2.94 0l1.43-1.02 1.43 1.02c.28.2.66.2.94 0l1.43-1.02 1.43 1.02c.49.35 1.17 0 1.17-.6v-9.6C19 6.3 16.4 3 12 3Zm-2.75 8.5a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5Zm5.5 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5Zm.05 3.25c-.77.83-1.7 1.25-2.8 1.25s-2.03-.42-2.8-1.25a.75.75 0 0 1 1.1-1.02c.49.51 1.05.77 1.7.77s1.21-.26 1.7-.77a.75.75 0 0 1 1.1 1.02Z" />
            </svg>
          </div>
          <div>
            <h3>Juan cayó en <span>Humo del Día</span></h3>
            <p>Todos lo vieron venir. 😅</p>
          </div>
          <a class="whatsapp-button" :href="whatsAppUrl" target="_blank" rel="noopener">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12.03 3.2a8.62 8.62 0 0 0-7.42 13.03L3.7 20.8l4.68-1.1A8.61 8.61 0 1 0 12.03 3.2Zm0 15.67a6.97 6.97 0 0 1-3.55-.97l-.25-.15-2.76.65.58-2.7-.17-.27a6.96 6.96 0 1 1 6.15 3.44Zm3.82-5.22c-.21-.1-1.24-.61-1.43-.68-.19-.07-.33-.1-.47.1-.14.21-.54.68-.66.82-.12.14-.24.16-.45.05-.21-.1-.89-.33-1.7-1.05-.63-.56-1.05-1.25-1.17-1.46-.12-.21-.01-.32.09-.43.09-.09.21-.24.31-.36.1-.12.14-.21.21-.35.07-.14.03-.26-.02-.36-.05-.1-.47-1.13-.64-1.55-.17-.4-.34-.35-.47-.36h-.4c-.14 0-.36.05-.54.26-.19.21-.71.69-.71 1.69s.73 1.96.83 2.1c.1.14 1.43 2.18 3.47 3.06.49.21.86.34 1.16.43.49.16.93.14 1.28.08.39-.06 1.24-.51 1.42-1 .18-.49.18-.91.12-1-.05-.09-.19-.14-.4-.24Z" />
            </svg>
            Invitar por WhatsApp
          </a>
        </div>
      </section>

      <section class="how-section">
        <h2>Cómo funciona</h2>
        <div class="step-grid">
          <article v-for="step in steps" :key="step.title" class="step-card glass-panel">
            <img :src="step.icon" alt="" />
            <div>
              <span>{{ step.number }}</span>
              <h3>{{ step.title }}</h3>
              <p>{{ step.copy }}</p>
            </div>
          </article>
        </div>
      </section>

      <section class="moments-section">
        <h2>Momentos para compartir</h2>
        <div class="moment-grid">
          <article v-for="moment in moments" :key="moment.title" class="moment-card glass-panel">
            <img :src="moment.icon" alt="" />
            <h3>{{ moment.title }}</h3>
          </article>
        </div>
      </section>

      <section class="benefits-card glass-panel">
        <img src="/oraculo-home/trophy-beneficios.png" alt="" class="trophy-art" />
        <div class="benefits-content">
          <h2>
            Mientras más crece tu comunidad,
            <span>más beneficios desbloquean todos.</span>
          </h2>
          <ul>
            <li>
              <img src="/oraculo-home/premios-exclusivos.png" alt="" />
              Premios exclusivos
            </li>
            <li>
              <img src="/oraculo-home/rankings-epicos.png" alt="" />
              Rankings épicos
            </li>
            <li>
              <img src="/oraculo-home/gloria-mundialista.png" alt="" />
              Gloria mundialista
            </li>
          </ul>
          <RouterLink class="home-button primary" to="/crear">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M16 11a4 4 0 1 0-3.8-5.25A4.7 4.7 0 0 1 14 9.5c0 .52-.09 1.03-.26 1.5H16Zm-8 0a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm0 2c-3.31 0-6 1.79-6 4v1.2c0 .44.36.8.8.8h10.4c.44 0 .8-.36.8-.8V17c0-2.21-2.69-4-6-4Zm8 0c-.46 0-.9.04-1.33.12.83.92 1.33 2.02 1.33 3.18V19h5.2c.44 0 .8-.36.8-.8V17c0-2.21-2.69-4-6-4Z" />
            </svg>
            Crear mi comunidad gratis
          </RouterLink>
        </div>
      </section>
    </div>
  </main>
</template>

<script setup>
import { computed } from 'vue'
import { buildWhatsAppShareUrl } from '../lib/share/whatsapp'

const whatsAppUrl = computed(() => buildWhatsAppShareUrl([
  'Estoy jugando El Oraculo Mundial.',
  'Entra a La Banda del Mundial y reta a tu gente.',
  'https://www.oraculomundialista.com/p/la-banda-del-mundial/unirse',
].join('\n')))

const ranking = [
  { position: 1, name: 'María', points: 42, className: 'avatar-one' },
  { position: 2, name: 'Pancho', points: 39, className: 'avatar-two' },
  { position: 3, name: 'Diego', points: 35, className: 'avatar-three' },
]

const steps = [
  {
    number: '1',
    title: 'Crea tu comunidad',
    copy: 'Ponle nombre, define cuántos jugadores quieres y listo.',
    icon: '/oraculo-home/paso-1-crea-comunidad.png',
  },
  {
    number: '2',
    title: 'Invita por WhatsApp',
    copy: 'Comparte el link y mira cómo sube el progreso hacia el próximo premio.',
    icon: '/oraculo-home/paso-2-whatsapp.png',
  },
  {
    number: '3',
    title: 'Predice y compite',
    copy: 'Guarda marcadores, suma puntos y sube en el ranking.',
    icon: '/oraculo-home/paso-3-predice-compite.png',
  },
]

const moments = [
  {
    title: 'Certificado de Oráculo',
    icon: '/oraculo-home/certificado-oraculo.png',
  },
  {
    title: 'Recibo de Realidad',
    icon: '/oraculo-home/recibo-realidad.png',
  },
  {
    title: 'Tabla de la Vergüenza',
    icon: '/oraculo-home/tabla-verguenza.png',
  },
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
  --home-muted: #8d9aaa;
  --home-purple: #9b7cff;
  min-height: 100dvh;
  padding: 0 20px;
  overflow-x: hidden;
  color: var(--home-text);
  background:
    linear-gradient(to bottom, rgba(2, 8, 18, 0.1), rgba(2, 8, 18, 0.6) 35%, rgba(2, 8, 18, 0.95) 100%),
    url("https://pub-dc06325214ac4e9a8959030cf5f65654.r2.dev/optimized-ChatGPT%20Image%207%20may%202026%2C%2010_15_36%20a.webp") top center / cover no-repeat,
    var(--home-bg);
}

.oraculo-home *,
.oraculo-home *::before,
.oraculo-home *::after {
  min-width: 0;
}

.home-shell {
  width: min(100%, 980px);
  margin: 0 auto;
  padding: 22px 0 32px;
  display: grid;
  gap: 24px;
}

.glass-panel {
  border: 1px solid var(--home-border);
  background:
    linear-gradient(145deg, rgba(143, 255, 216, 0.07), transparent 42%),
    var(--home-card);
  box-shadow: 0 22px 70px rgba(0, 0, 0, 0.34);
  backdrop-filter: blur(18px);
}

.home-header {
  display: flex;
  align-items: center;
  gap: 14px;
}

.brand-logo {
  width: 52px;
  height: 52px;
  object-fit: contain;
  filter: drop-shadow(0 0 16px rgba(215, 255, 0, 0.32));
}

.brand-name {
  display: block;
  color: var(--home-text);
  font: 900 clamp(1.35rem, 5vw, 2rem)/1.05 Inter, sans-serif;
}

.home-header p,
.mint-label {
  margin: 6px 0 0;
  color: var(--home-mint);
  font: 800 0.78rem/1.1 "Plus Jakarta Sans", sans-serif;
  letter-spacing: 0.22em;
  text-transform: uppercase;
}

.hero-section {
  padding-top: 16px;
  display: grid;
  gap: 16px;
}

.hero-section h1 {
  max-width: 880px;
  color: var(--home-text);
  font: 900 clamp(2.65rem, 11.2vw, 4rem)/1.05 Inter, sans-serif;
  letter-spacing: -0.03em;
  overflow-wrap: break-word;
}

.hero-line {
  display: block;
}

.hero-section h1 .lime-word,
.benefits-content h2 span {
  color: var(--home-lime);
}

.hero-copy {
  max-width: 760px;
  margin: 0;
  color: var(--home-soft);
  font-size: clamp(1.03rem, 3.7vw, 1.35rem);
  font-weight: 600;
  line-height: 1.45;
}

.hero-note {
  margin: 0;
  color: var(--home-soft);
  font-size: clamp(0.92rem, 3.3vw, 1.08rem);
  font-weight: 600;
}

.hero-actions {
  display: grid;
  gap: 10px;
}

.home-button,
.whatsapp-button,
.auth-button {
  width: 100%;
  min-height: 58px;
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  font-weight: 900;
  text-align: center;
  transition: transform 180ms ease, box-shadow 180ms ease, background 180ms ease;
}

.home-button svg,
.whatsapp-button svg {
  width: 25px;
  height: 25px;
  flex: 0 0 auto;
  fill: currentColor;
}

.home-button.primary {
  background: var(--home-lime);
  color: #071007;
  box-shadow: 0 0 28px rgba(215, 255, 0, 0.28);
}

.home-button.primary:hover {
  background: var(--home-lime-hover);
  color: #071007;
  transform: translateY(-1px);
  box-shadow: 0 0 34px rgba(215, 255, 0, 0.38);
}

.home-button.secondary {
  border: 1px solid rgba(255, 255, 255, 0.25);
  background: rgba(4, 10, 20, 0.48);
  color: var(--home-text);
}

.secure-card {
  border-radius: 18px;
  padding: 18px;
  display: grid;
  gap: 16px;
  box-shadow: 0 0 34px rgba(143, 255, 216, 0.1);
}

.secure-art {
  width: 124px;
  margin: 0 auto;
  object-fit: contain;
  filter: drop-shadow(0 0 22px rgba(143, 255, 216, 0.22));
}

.secure-content {
  display: grid;
  gap: 12px;
}

.secure-content h2,
.community-copy h2,
.how-section h2,
.moments-section h2,
.benefits-content h2 {
  margin: 0;
  color: var(--home-text);
  font: 900 clamp(1.35rem, 5vw, 1.78rem)/1.15 Inter, sans-serif;
}

.secure-content p {
  margin: 0;
  color: var(--home-mint);
  font-size: 1rem;
  font-weight: 800;
}

.secure-actions {
  display: grid;
  gap: 10px;
}

.auth-button {
  min-height: 54px;
  border: 1px solid rgba(255, 255, 255, 0.24);
  background: rgba(3, 9, 19, 0.42);
  color: var(--home-text);
  cursor: pointer;
  font-size: 0.98rem;
}

.auth-button img {
  width: 28px;
  height: 28px;
  object-fit: contain;
}

.invite-link {
  width: max-content;
  max-width: 100%;
  color: var(--home-mint);
  font-weight: 800;
  text-decoration: underline;
  text-underline-offset: 3px;
}

.community-card {
  border-color: rgba(143, 255, 216, 0.28);
  border-radius: 18px;
  display: grid;
  overflow: hidden;
  background:
    linear-gradient(145deg, rgba(15, 82, 68, 0.32), rgba(8, 18, 32, 0.82)),
    var(--home-card-strong);
}

.community-main {
  padding: 18px;
  display: grid;
  gap: 14px;
}

.band-badge {
  width: 118px;
  object-fit: contain;
  filter: drop-shadow(0 0 18px rgba(143, 255, 216, 0.2));
}

.community-copy {
  display: grid;
  gap: 10px;
}

.community-copy strong {
  color: var(--home-text);
  font-size: 1.4rem;
}

.community-copy strong span {
  color: var(--home-lime);
  font-size: 1.8rem;
}

.progress-track {
  width: min(100%, 340px);
  height: 12px;
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
  box-shadow: 0 0 16px rgba(215, 255, 0, 0.52);
}

.unlock-copy {
  margin: 0;
  color: var(--home-soft);
  line-height: 1.35;
}

.ranking-panel {
  padding: 18px;
  display: grid;
  gap: 12px;
}

.ranking-title {
  margin: 0;
  display: flex;
  align-items: center;
  gap: 9px;
  color: var(--home-text);
  font-weight: 900;
}

.ranking-title img {
  width: 22px;
  height: 22px;
  object-fit: contain;
}

.ranking-panel ol {
  margin: 0;
  padding: 0;
  display: grid;
  gap: 11px;
  list-style: none;
}

.ranking-panel li {
  display: grid;
  grid-template-columns: auto auto 1fr auto;
  align-items: center;
  gap: 10px;
  color: var(--home-text);
  font-weight: 800;
}

.rank-number {
  width: 29px;
  height: 29px;
  border-radius: 999px;
  display: grid;
  place-items: center;
  background: var(--home-lime);
  color: #06111f;
  font-weight: 900;
}

.ranking-panel li:nth-child(2) .rank-number {
  background: #9aa3af;
}

.ranking-panel li:nth-child(3) .rank-number {
  background: #b9774f;
}

.avatar {
  width: 32px;
  height: 32px;
  border-radius: 999px;
  border: 2px solid rgba(255, 255, 255, 0.44);
}

.avatar-one {
  background: linear-gradient(135deg, #f7c5c9, #5a2f8e);
}

.avatar-two {
  background: linear-gradient(135deg, #f0b892, #24364b);
}

.avatar-three {
  background: linear-gradient(135deg, #d7b080, #1b4f61);
}

.ranking-panel strong {
  color: var(--home-text);
}

.shame-strip {
  border-top: 1px solid rgba(148, 163, 184, 0.2);
  padding: 16px;
  display: grid;
  gap: 14px;
  background: rgba(4, 10, 20, 0.42);
}

.ghost-badge {
  width: 58px;
  height: 58px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 999px;
  display: grid;
  place-items: center;
  background: rgba(255, 255, 255, 0.08);
}

.ghost-badge svg {
  width: 31px;
  height: 31px;
  fill: var(--home-text);
}

.shame-strip h3 {
  margin: 0;
  font-size: 1.12rem;
}

.shame-strip h3 span {
  color: var(--home-purple);
}

.shame-strip p {
  margin: 4px 0 0;
  color: var(--home-soft);
  font-weight: 700;
}

.whatsapp-button {
  min-height: 56px;
  background: var(--home-lime);
  color: #071007;
}

.how-section,
.moments-section {
  display: grid;
  gap: 14px;
}

.step-grid,
.moment-grid {
  display: grid;
  gap: 14px;
}

.step-card {
  position: relative;
  border-radius: 16px;
  padding: 16px;
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: start;
  gap: 13px;
}

.step-card img {
  width: 58px;
  height: 58px;
  object-fit: contain;
}

.step-card span {
  width: 24px;
  height: 24px;
  border-radius: 999px;
  display: grid;
  place-items: center;
  background: var(--home-lime);
  color: #06111f;
  font-size: 0.78rem;
  font-weight: 900;
}

.step-card h3 {
  margin: 8px 0 7px;
  font-size: 0.98rem;
}

.step-card p {
  margin: 0;
  color: var(--home-soft);
  font-size: 0.92rem;
  line-height: 1.45;
}

.moment-card {
  border-radius: 14px;
  padding: 14px;
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: 14px;
}

.moment-card img {
  width: 58px;
  height: 58px;
  object-fit: contain;
}

.moment-card h3 {
  margin: 0;
  font-size: 1.1rem;
}

.benefits-card {
  border-color: rgba(143, 255, 216, 0.32);
  border-radius: 18px;
  padding: 18px;
  display: grid;
  gap: 18px;
  background:
    radial-gradient(circle at 8% 25%, rgba(215, 255, 0, 0.16), transparent 10rem),
    linear-gradient(145deg, rgba(15, 82, 68, 0.38), rgba(8, 18, 32, 0.88)),
    var(--home-card);
}

.trophy-art {
  width: 92px;
  filter: drop-shadow(0 0 22px rgba(215, 255, 0, 0.5));
}

.benefits-content {
  display: grid;
  gap: 16px;
}

.benefits-content ul {
  margin: 0;
  padding: 0;
  display: grid;
  gap: 12px;
  list-style: none;
}

.benefits-content li {
  display: flex;
  align-items: center;
  gap: 9px;
  color: var(--home-soft);
  font-weight: 800;
}

.benefits-content li img {
  width: 24px;
  height: 24px;
  object-fit: contain;
}

@media (min-width: 720px) {
  .oraculo-home {
    padding: 0 32px;
  }

  .home-shell {
    padding: 24px 0 42px;
  }

  .brand-logo {
    width: 64px;
    height: 64px;
  }

  .hero-section {
    padding-top: 26px;
  }

  .home-button,
  .whatsapp-button {
    min-height: 68px;
    font-size: 1.15rem;
  }

  .secure-card {
    grid-template-columns: 180px 1fr;
    align-items: center;
    padding: 22px 24px;
  }

  .secure-art {
    width: 150px;
  }

  .secure-actions {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .community-card {
    grid-template-columns: minmax(0, 1.25fr) minmax(280px, 0.75fr);
  }

  .community-main {
    grid-template-columns: 160px minmax(0, 1fr);
    align-items: start;
    padding: 28px 28px 22px;
  }

  .band-badge {
    width: 148px;
  }

  .ranking-panel {
    padding: 28px 28px 22px 0;
  }

  .shame-strip {
    grid-column: 1 / -1;
    grid-template-columns: auto minmax(0, 1fr) minmax(240px, 0.42fr);
    align-items: center;
    padding: 18px 28px;
  }

  .step-grid,
  .moment-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .step-card:not(:last-child)::after {
    content: "›";
    position: absolute;
    right: -19px;
    top: 50%;
    z-index: 2;
    color: var(--home-mint);
    font-size: 2rem;
    transform: translateY(-50%);
  }

  .benefits-card {
    grid-template-columns: 118px 1fr;
    align-items: center;
    padding: 24px 26px;
  }

  .trophy-art {
    width: 110px;
  }

  .benefits-content ul {
    grid-template-columns: repeat(3, max-content);
  }
}

@media (max-width: 420px) {
  .oraculo-home {
    padding: 0 16px;
  }

  .home-shell {
    gap: 20px;
  }

  .home-header {
    align-items: flex-start;
  }

  .brand-logo {
    width: 48px;
    height: 48px;
  }

  .hero-section h1 {
    font-size: clamp(2.2rem, 11vw, 2.75rem);
  }

  .hero-copy {
    font-size: 1rem;
  }

  .secure-card,
  .benefits-card {
    padding: 16px;
  }

  .community-main,
  .ranking-panel {
    padding: 16px;
  }

  .ranking-panel li {
    grid-template-columns: auto auto 1fr auto;
  }
}
</style>
