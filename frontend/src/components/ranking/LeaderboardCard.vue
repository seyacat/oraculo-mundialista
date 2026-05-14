<template>
  <section class="leaderboard-card glass-card" data-testid="leaderboard-card">
    <div class="heading">
      <div>
        <p class="eyebrow">{{ eyebrow }}</p>
        <h2>{{ title }}</h2>
      </div>
      <slot name="action"></slot>
    </div>

    <ol v-if="entries.length" class="leaderboard-list">
      <li v-for="entry in entries" :key="entry.id" :class="{ current: entry.isCurrentUser }">
        <span class="position">{{ entry.position }}</span>
        <div>
          <strong>{{ entry.playerName }}</strong>
          <small>{{ entry.badge }} · {{ entry.accuracy }}</small>
        </div>
        <b>{{ entry.points }} pts</b>
      </li>
    </ol>

    <div v-else class="empty-state">
      <h3>{{ emptyTitle }}</h3>
      <p>{{ emptyDescription }}</p>
    </div>
  </section>
</template>

<script setup>
defineProps({
  eyebrow: {
    type: String,
    default: 'Ranking deportivo',
  },
  title: {
    type: String,
    default: 'La punta de la comunidad',
  },
  entries: {
    type: Array,
    default: () => [],
  },
  emptyTitle: {
    type: String,
    default: 'Aun no hay ranking',
  },
  emptyDescription: {
    type: String,
    default: 'Cuando lleguen las primeras predicciones, empieza la pelea por la gloria.',
  },
})
</script>

<style scoped>
.leaderboard-card {
  border-radius: 24px;
  padding: 18px;
  display: grid;
  gap: 16px;
}

.heading {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}

h2 {
  margin-top: 6px;
  font-size: clamp(1.35rem, 5vw, 2rem);
  font-weight: 900;
}

.leaderboard-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 10px;
}

li {
  min-height: 64px;
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 12px;
  align-items: center;
  border: 1px solid rgba(149, 211, 192, 0.12);
  border-radius: 18px;
  padding: 10px;
  background: rgba(17, 28, 45, 0.62);
}

li.current {
  border-color: rgba(210, 241, 0, 0.45);
  background: rgba(210, 241, 0, 0.09);
}

.position {
  width: 42px;
  height: 42px;
  border-radius: 999px;
  display: grid;
  place-items: center;
  background: rgba(210, 241, 0, 0.12);
  color: var(--energy);
  font-weight: 900;
}

strong,
small {
  display: block;
}

small,
.empty-state p {
  color: var(--text-muted);
  line-height: 1.45;
}

b {
  color: var(--primary);
}

.empty-state {
  border: 1px dashed rgba(149, 211, 192, 0.22);
  border-radius: 18px;
  padding: 16px;
}

.empty-state h3 {
  font-size: 1.1rem;
  font-weight: 900;
}

@media (max-width: 440px) {
  .heading {
    display: grid;
  }

  .heading :deep(.whatsapp-button) {
    width: 100%;
  }

  li {
    grid-template-columns: auto 1fr;
  }

  li b {
    grid-column: 2;
  }
}
</style>
