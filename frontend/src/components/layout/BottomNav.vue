<template>
  <nav class="bottom-nav" aria-label="Navegacion de comunidad" :style="{ '--nav-cols': items.length }">
    <RouterLink
      v-for="item in items"
      :key="item.to"
      :to="item.to"
      class="nav-item"
      active-class="active"
    >
      <span class="nav-mark" aria-hidden="true">{{ item.short }}</span>
      <span>{{ item.label }}</span>
    </RouterLink>
  </nav>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    default: () => [],
  },
})
</script>

<style scoped>
.bottom-nav {
  position: fixed;
  left: 8px;
  right: 8px;
  bottom: 8px;
  z-index: 30;
  display: grid;
  grid-template-columns: repeat(var(--nav-cols, 5), minmax(0, 1fr));
  gap: 3px;
  border: 1px solid rgba(149, 211, 192, 0.18);
  border-radius: 22px;
  padding: 6px;
  background: rgba(8, 20, 37, 0.9);
  backdrop-filter: blur(16px);
  box-shadow: 0 22px 70px rgba(0, 0, 0, 0.36);
}

.nav-item {
  min-height: 54px;
  border-radius: 14px;
  display: grid;
  place-items: center;
  gap: 4px;
  color: var(--text-muted);
  font-size: 0.64rem;
  font-weight: 800;
  text-align: center;
  text-decoration: none;
}

.nav-mark {
  width: 23px;
  height: 23px;
  border-radius: 999px;
  display: grid;
  place-items: center;
  background: rgba(149, 211, 192, 0.1);
  color: var(--primary);
  font-size: 0.62rem;
  font-weight: 900;
}

@media (max-width: 370px) {
  .nav-item {
    min-height: 50px;
    font-size: 0.58rem;
  }

  .nav-mark {
    width: 21px;
    height: 21px;
    font-size: 0.56rem;
  }
}

.nav-item.active {
  background: rgba(210, 241, 0, 0.12);
  color: var(--energy);
}

.nav-item.active .nav-mark {
  background: var(--energy);
  color: var(--energy-text);
}

@media (max-width: 400px) {
  .bottom-nav {
    gap: 2px;
  }

  .nav-item {
    font-size: 0.56rem;
  }
}

@media (min-width: 760px) {
  .bottom-nav {
    left: 50%;
    right: auto;
    width: min(680px, calc(100% - 48px));
    transform: translateX(-50%);
  }
}
</style>
