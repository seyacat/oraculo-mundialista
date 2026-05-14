<template>
  <section class="shame-table" data-testid="shame-table">
    <div class="heading">
      <p class="eyebrow">{{ eyebrow }}</p>
      <h2>{{ title }}</h2>
      <p>{{ microcopy }}</p>
    </div>

    <div v-if="entries.length" class="shame-list">
      <article v-for="entry in entries" :key="entry.id" class="shame-entry">
        <span>{{ entry.category }}</span>
        <h3>{{ entry.playerName }}</h3>
        <p>{{ entry.reason }}</p>
        <small>{{ entry.matchLabel }}</small>
        <button type="button" class="secondary-button" :data-testid="`shame-action-${entry.id}-button`">{{ entry.actionLabel }}</button>
      </article>
    </div>

    <div v-else class="empty-state glass-card">
      <h3>{{ emptyTitle }}</h3>
      <p>{{ emptyDescription }}</p>
    </div>
  </section>
</template>

<script setup>
defineProps({
  eyebrow: {
    type: String,
    default: 'Tabla de la Verguenza',
  },
  title: {
    type: String,
    default: 'Hoy el futbol fue cruel con estos profetas.',
  },
  microcopy: {
    type: String,
    default: 'Se aceptan explicaciones, excusas y audios de 3 minutos.',
  },
  entries: {
    type: Array,
    default: () => [],
  },
  emptyTitle: {
    type: String,
    default: 'Nadie cayo todavia',
  },
  emptyDescription: {
    type: String,
    default: 'La comunidad sigue intacta. Por ahora.',
  },
})
</script>

<style scoped>
.shame-table {
  display: grid;
  gap: 16px;
}

.heading {
  display: grid;
  gap: 8px;
}

h2 {
  font-size: clamp(1.45rem, 6vw, 2.35rem);
  font-weight: 900;
}

.heading p:not(.eyebrow),
.shame-entry p,
.shame-entry small,
.empty-state p {
  color: var(--text-muted);
  line-height: 1.5;
}

.shame-list {
  display: grid;
  gap: 12px;
}

.shame-entry {
  border: 1px solid rgba(255, 180, 171, 0.28);
  border-radius: 22px;
  padding: 16px;
  display: grid;
  gap: 10px;
  background:
    linear-gradient(145deg, rgba(147, 0, 10, 0.22), rgba(21, 32, 49, 0.82)),
    rgba(17, 28, 45, 0.72);
}

.shame-entry > span {
  width: max-content;
  border-radius: 999px;
  padding: 7px 10px;
  background: rgba(255, 180, 171, 0.13);
  color: var(--coral);
  font-size: 0.74rem;
  font-weight: 900;
}

h3 {
  font-size: 1.25rem;
  font-weight: 900;
}

.shame-entry p {
  margin: 0;
}

button {
  padding: 0 14px;
}

.empty-state {
  border-radius: 22px;
  padding: 18px;
}

@media (min-width: 760px) {
  .shame-list {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
