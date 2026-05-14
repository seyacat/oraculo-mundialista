<template>
  <main class="dashboard-compat" data-testid="dashboard-view">
    <section class="glass-card">
      <p class="eyebrow">Compatibilidad</p>
      <h1>El dashboard ahora vive en la comunidad.</h1>
      <p>Te llevamos a La Banda del Mundial para continuar la demo navegable.</p>
      <RouterLink class="primary-button" to="/p/la-banda-del-mundial" data-testid="go-to-community-link">Ir a la comunidad</RouterLink>
    </section>
  </main>
</template>

<style scoped>
.dashboard-compat {
  min-height: 100dvh;
  display: grid;
  place-items: center;
  padding: 16px;
}

section {
  width: min(560px, 100%);
  border-radius: 28px;
  padding: 24px;
  display: grid;
  gap: 14px;
}

h1 {
  font-size: clamp(1.8rem, 8vw, 3rem);
  font-weight: 900;
}

p:not(.eyebrow) {
  margin: 0;
  color: var(--text-muted);
  line-height: 1.55;
}

a {
  padding: 0 18px;
}
</style>
