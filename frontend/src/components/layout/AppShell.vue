<template>
  <div class="app-shell-layout" data-testid="app-shell">
    <header v-if="title || eyebrow" class="shell-header" data-testid="shell-header">
      <RouterLink v-if="backTo" :to="backTo" class="back-link" aria-label="Volver">
        <span aria-hidden="true"></span>
      </RouterLink>
      <div>
        <p v-if="eyebrow" class="eyebrow">{{ eyebrow }}</p>
        <h1 v-if="title">{{ title }}</h1>
      </div>
      <slot name="actions"></slot>
    </header>

    <main class="shell-main">
      <slot></slot>
    </main>

    <slot name="bottom"></slot>
  </div>
</template>

<script setup>
defineProps({
  eyebrow: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: '',
  },
  backTo: {
    type: [String, Object],
    default: '',
  },
})
</script>

<style scoped>
.app-shell-layout {
  min-height: 100dvh;
  width: min(1120px, 100%);
  margin: 0 auto;
  padding: 16px 16px 96px;
  --shell-padding: 16px;
  isolation: isolate;
}

.shell-header {
  position: sticky;
  top: 0;
  z-index: 20;
  min-height: 72px;
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 12px;
  align-items: center;
  margin: -16px -16px 20px;
  padding: 12px 16px;
  border-bottom: 1px solid rgba(149, 211, 192, 0.14);
  background: rgba(8, 20, 37, 0.86);
  backdrop-filter: blur(14px);
}

.shell-header h1 {
  margin-top: 4px;
  color: var(--text);
  font-size: clamp(1.35rem, 5vw, 2rem);
  font-weight: 900;
  letter-spacing: 0;
}

.back-link {
  width: 44px;
  height: 44px;
  border: 1px solid rgba(149, 211, 192, 0.18);
  border-radius: 999px;
  display: grid;
  place-items: center;
  background: rgba(17, 28, 45, 0.76);
}

.back-link span {
  width: 11px;
  height: 11px;
  border-left: 2px solid var(--primary);
  border-bottom: 2px solid var(--primary);
  transform: rotate(45deg);
}

.shell-main {
  display: grid;
  gap: 16px;
  min-width: 0;
}

@media (max-width: 380px) {
  .shell-main { gap: 12px; }
}

@media (min-width: 760px) {
  .app-shell-layout {
    padding: 24px 24px 112px;
    --shell-padding: 24px;
  }

  .shell-header {
    margin: -24px -24px 24px;
    padding: 14px 24px;
  }
}

@media (min-width: 760px) {
  .app-shell-layout {
    padding: 24px 24px 112px;
  }

  .shell-header {
    margin: -24px -24px 24px;
    padding: 14px 24px;
  }
}
</style>
