<template>
  <section class="viral-leaderboard" data-testid="viral-leaderboard">
    <div class="heading">
      <p class="eyebrow">{{ eyebrow }}</p>
      <h2>{{ title }}</h2>
      <p>{{ description }}</p>
    </div>

    <div class="viral-list">
      <article v-for="entry in entries" :key="entry.id" class="viral-card glass-card">
        <span>{{ entry.position }}</span>
        <div>
          <strong>{{ entry.playerName }}</strong>
          <small>{{ entry.label }}</small>
        </div>
        <b>{{ entry.score }}</b>
      </article>
    </div>
  </section>
</template>

<script setup>
defineProps({
  eyebrow: {
    type: String,
    default: 'Ranking viral',
  },
  title: {
    type: String,
    default: 'Quien prendio mas la hinchada',
  },
  description: {
    type: String,
    default: 'Invitaciones, momentos compartidos y revancha tambien construyen reputacion.',
  },
  entries: {
    type: Array,
    default: () => [],
  },
})
</script>

<style scoped>
.viral-leaderboard {
  display: grid;
  gap: 14px;
}

.heading {
  display: grid;
  gap: 8px;
}

h2 {
  font-size: clamp(1.35rem, 5vw, 2rem);
  font-weight: 900;
}

.heading p:not(.eyebrow),
small {
  color: var(--text-muted);
  line-height: 1.5;
}

.viral-list {
  display: grid;
  gap: 10px;
}

.viral-card {
  border-radius: 18px;
  padding: 14px;
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 12px;
  align-items: center;
}

.viral-card > span {
  width: 38px;
  height: 38px;
  border-radius: 999px;
  display: grid;
  place-items: center;
  background: var(--energy);
  color: var(--energy-text);
  font-weight: 900;
}

strong,
small {
  display: block;
}

b {
  color: var(--primary);
  font-size: 1.2rem;
}
</style>
