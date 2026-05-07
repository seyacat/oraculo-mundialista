<template>
  <article class="power-card glass-card" :class="power.status">
    <div class="power-top">
      <span class="power-code">{{ power.code }}</span>
      <span class="power-status">{{ statusLabel }}</span>
    </div>
    <h3>{{ power.name }}</h3>
    <p>{{ power.description }}</p>
    <small>{{ power.unlockHint }}</small>
    <div class="uses">
      <span v-for="n in maxUses" :key="n" :class="{ active: n <= power.usesAvailable }"></span>
    </div>
  </article>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  power: {
    type: Object,
    required: true,
  },
  maxUses: {
    type: Number,
    default: 3,
  },
})

const statusLabel = computed(() => {
  const labels = {
    disponible: 'Disponible',
    usado: 'Usado',
    bloqueado: 'Bloqueado',
  }

  return labels[props.power.status] || props.power.status
})
</script>

<style scoped>
.power-card {
  border-radius: 22px;
  padding: 16px;
  display: grid;
  gap: 10px;
}

.power-card.bloqueado {
  opacity: 0.72;
}

.power-top {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  align-items: center;
}

.power-code {
  width: 44px;
  height: 44px;
  border-radius: 999px;
  display: grid;
  place-items: center;
  background: rgba(210, 241, 0, 0.13);
  color: var(--energy);
  font-weight: 900;
}

.power-status {
  border-radius: 999px;
  padding: 7px 10px;
  background: rgba(149, 211, 192, 0.12);
  color: var(--primary);
  font-size: 0.72rem;
  font-weight: 900;
}

h3 {
  font-size: 1.25rem;
  font-weight: 900;
}

p,
small {
  color: var(--text-muted);
  line-height: 1.5;
}

p {
  margin: 0;
}

.uses {
  display: flex;
  gap: 5px;
}

.uses span {
  height: 5px;
  flex: 1;
  border-radius: 999px;
  background: rgba(137, 147, 143, 0.25);
}

.uses .active {
  background: var(--energy);
  box-shadow: 0 0 8px rgba(210, 241, 0, 0.42);
}
</style>
