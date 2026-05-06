<template>
  <div class="dashboard">
    <header class="dash-header">
      <h1>El Oráculo Mundial</h1>
      <UserButton />
    </header>

    <section class="prediction-section">
      <h2>Tu predicción</h2>
      <p class="hint">Arrastrá los equipos para ordenar tu pronóstico del Mundial</p>
      <PredictionBoard />
    </section>

    <section class="share-section">
      <h2>Compartir</h2>
      <ShareButtons :prediction="prediction" />
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { UserButton } from '@clerk/vue'
import PredictionBoard from '../components/PredictionBoard.vue'
import ShareButtons from '../components/ShareButtons.vue'

const prediction = ref([])
</script>

<style scoped>
.dashboard {
  max-width: 480px;
  margin: 0 auto;
  padding: 1rem;
  min-height: 100dvh;
}
.dash-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}
.dash-header h1 {
  font-size: 1.25rem;
  font-weight: 700;
}
.prediction-section, .share-section {
  margin-bottom: 2rem;
}
h2 {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}
.hint {
  font-size: 0.85rem;
  opacity: 0.6;
  margin-bottom: 1rem;
}
</style>
