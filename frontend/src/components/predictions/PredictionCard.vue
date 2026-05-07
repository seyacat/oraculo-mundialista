<template>
  <article class="prediction-card glass-card">
    <div class="match-meta">
      <div>
        <p class="eyebrow">{{ match.group }} - {{ match.stadium }}</p>
        <h3>{{ match.home?.name }} vs {{ match.away?.name }}</h3>
      </div>
      <span class="status" :class="match.status">{{ match.statusLabel }}</span>
    </div>

    <div class="score-row">
      <label>
        <span>{{ match.home?.code }}</span>
        <input :value="match.prediction?.homeScore" inputmode="numeric" aria-label="Marcador local" />
      </label>
      <strong>VS</strong>
      <label>
        <span>{{ match.away?.code }}</span>
        <input :value="match.prediction?.awayScore" inputmode="numeric" aria-label="Marcador visitante" />
      </label>
    </div>

    <p class="match-copy">{{ match.featuredCopy }}</p>

    <div class="card-actions">
      <span>{{ match.kickoffLabel }} · {{ match.closesInLabel }}</span>
      <button type="button" class="primary-button">{{ match.prediction?.saved ? 'Predicción guardada' : 'Guardar predicción' }}</button>
    </div>
  </article>
</template>

<script setup>
defineProps({
  match: {
    type: Object,
    required: true,
  },
})
</script>

<style scoped>
.prediction-card {
  border-radius: 24px;
  padding: 18px;
  display: grid;
  gap: 16px;
}

.match-meta,
.card-actions {
  display: flex;
  gap: 12px;
  justify-content: space-between;
}

.match-meta {
  align-items: start;
}

h3 {
  margin-top: 6px;
  font-size: clamp(1.25rem, 5vw, 1.85rem);
  font-weight: 900;
}

.status {
  border-radius: 999px;
  padding: 8px 10px;
  background: rgba(149, 211, 192, 0.12);
  color: var(--primary);
  font-size: 0.72rem;
  font-weight: 900;
  white-space: nowrap;
}

.status.cierra-pronto {
  background: var(--energy);
  color: var(--energy-text);
}

.status.finalizado,
.status.cerrado {
  background: rgba(255, 180, 171, 0.12);
  color: var(--coral);
}

.score-row {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 12px;
  align-items: center;
}

label {
  display: grid;
  justify-items: center;
  gap: 8px;
}

label span {
  color: var(--primary);
  font-weight: 900;
}

input {
  width: min(86px, 28vw);
  aspect-ratio: 1;
  border: 2px solid rgba(137, 147, 143, 0.34);
  border-radius: 20px;
  background: rgba(42, 53, 72, 0.82);
  color: var(--primary);
  text-align: center;
  font: 900 2rem/1 Inter, sans-serif;
}

.score-row strong {
  color: rgba(216, 227, 251, 0.38);
}

.match-copy,
.card-actions span {
  color: var(--text-muted);
  line-height: 1.5;
}

.match-copy {
  margin: 0;
}

.card-actions {
  align-items: center;
  flex-wrap: wrap;
}

.card-actions button {
  padding: 0 16px;
}
</style>
