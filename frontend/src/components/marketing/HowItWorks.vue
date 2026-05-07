<template>
  <section class="how-it-works">
    <div class="section-heading">
      <p class="eyebrow">{{ eyebrow }}</p>
      <h2>{{ title }}</h2>
    </div>

    <div class="steps">
      <article v-for="step in steps" :key="step.title" class="step-card glass-card">
        <span>{{ step.number }}</span>
        <h3>{{ step.title }}</h3>
        <p>{{ step.description }}</p>
      </article>
    </div>
  </section>
</template>

<script setup>
defineProps({
  eyebrow: {
    type: String,
    default: 'Como funciona',
  },
  title: {
    type: String,
    default: 'Tres pasos para prender la comunidad.',
  },
  steps: {
    type: Array,
    default: () => [],
  },
})
</script>

<style scoped>
.how-it-works {
  display: grid;
  gap: 14px;
}

.section-heading {
  display: grid;
  gap: 8px;
}

h2 {
  max-width: 620px;
  font-size: clamp(1.45rem, 5vw, 2.25rem);
  font-weight: 900;
}

.steps {
  display: grid;
  gap: 12px;
}

.step-card {
  border-radius: 18px;
  padding: 16px;
  display: grid;
  gap: 8px;
}

.step-card span {
  width: 38px;
  height: 38px;
  border-radius: 999px;
  display: grid;
  place-items: center;
  background: rgba(210, 241, 0, 0.14);
  color: var(--energy);
  font-weight: 900;
}

.step-card h3 {
  font-size: 1.1rem;
  font-weight: 900;
}

.step-card p {
  margin: 0;
  color: var(--text-muted);
  line-height: 1.55;
}

@media (min-width: 760px) {
  .steps {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
</style>
