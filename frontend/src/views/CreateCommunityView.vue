<template>
  <AppShell eyebrow="Crear comunidad" title="Reta a tu gente">
    <form class="create-form glass-card" @submit.prevent="createCommunity" data-testid="create-community-form">
      <div class="form-intro">
        <p class="eyebrow">Pregunta principal</p>
        <h2>¿Cuántos jugadores quieres retar?</h2>
        <p>Estás creando {{ form.communityName }} con meta de {{ form.playerGoal }} jugadores.</p>
        <button type="submit" class="primary-button top-submit" data-testid="create-submit-top">Crear mi comunidad gratis</button>
      </div>

      <div class="goal-grid">
        <button
          v-for="goal in goals"
          :key="goal.value"
          type="button"
          :class="{ selected: form.playerGoal === goal.value }"
          @click="form.playerGoal = goal.value"
          :data-testid="`goal-${goal.value}-button`"
        >
          <strong>{{ goal.value }}</strong>
          <span>{{ goal.label }}</span>
        </button>
      </div>

      <div class="field-grid">
        <label>
          Nombre de comunidad
          <input v-model="form.communityName" required data-testid="community-name-input" />
        </label>
        <label>
          Nombre del creador
          <input v-model="form.creatorName" required data-testid="creator-name-input" />
        </label>
        <label>
          Celular
          <input v-model="form.phone" inputmode="tel" required data-testid="phone-input" />
        </label>
        <label>
          Ciudad
          <input v-model="form.city" required data-testid="city-input" />
        </label>
        <label>
          Equipo favorito
          <input v-model="form.favoriteTeam" required data-testid="favorite-team-input" />
        </label>
        <label>
          Modo comunidad
          <select v-model="form.mode" data-testid="community-mode-select">
            <option>Liga de Amigos</option>
            <option>Reto Familiar</option>
            <option>Comunidad Mundialista</option>
            <option>Liga Pro</option>
          </select>
        </label>
      </div>

      <label class="check-row">
        <input v-model="form.acceptsRules" type="checkbox" required data-testid="accept-rules-checkbox" />
        Acepto participar con respeto, humor sano y espíritu mundialista.
      </label>
      <label class="check-row">
        <input v-model="form.acceptsPromos" type="checkbox" data-testid="accept-promos-checkbox" />
        Quiero recibir novedades y beneficios promocionales.
      </label>

      <button type="submit" class="primary-button" data-testid="create-submit-bottom">Crear mi comunidad gratis</button>
    </form>
  </AppShell>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import AppShell from '../components/layout/AppShell.vue'

const router = useRouter()

const form = reactive({
  communityName: 'La Banda del Mundial',
  creatorName: 'Pancho',
  phone: '',
  city: 'Guayaquil',
  favoriteTeam: 'Ecuador',
  playerGoal: '25',
  mode: 'Liga de Amigos',
  acceptsRules: true,
  acceptsPromos: false,
})

const goals = [
  { value: '10', label: 'Reto Familiar' },
  { value: '25', label: 'Liga de Amigos' },
  { value: '50', label: 'Comunidad Mundialista' },
  { value: '100+', label: 'Liga Pro' },
]

function createCommunity() {
  router.push('/p/la-banda-del-mundial')
}
</script>

<style scoped>
.create-form {
  border-radius: 28px;
  padding: 18px;
  display: grid;
  gap: 18px;
}

.form-intro h2 {
  margin-top: 8px;
  font-size: clamp(1.55rem, 6vw, 2.4rem);
  font-weight: 900;
}

.form-intro {
  display: grid;
  gap: 12px;
}

.form-intro p:not(.eyebrow) {
  margin: 0;
  color: var(--text-muted);
  line-height: 1.45;
}

.top-submit {
  width: 100%;
  padding: 0 18px;
}

.goal-grid,
.field-grid {
  display: grid;
  gap: 12px;
}

.goal-grid button {
  min-height: 92px;
  border: 1px solid rgba(149, 211, 192, 0.16);
  border-radius: 20px;
  padding: 14px;
  background: rgba(17, 28, 45, 0.7);
  color: var(--text);
  cursor: pointer;
  text-align: left;
}

.goal-grid button.selected {
  border-color: var(--energy);
  background: rgba(210, 241, 0, 0.12);
}

.goal-grid strong,
.goal-grid span {
  display: block;
}

.goal-grid strong {
  color: var(--energy);
  font: 900 1.8rem/1 Inter, sans-serif;
}

.goal-grid span {
  margin-top: 8px;
  color: var(--text-muted);
  font-weight: 800;
}

label {
  display: grid;
  gap: 8px;
  color: var(--text-muted);
  font-weight: 800;
}

input,
select {
  min-height: 50px;
  border: 1px solid rgba(149, 211, 192, 0.18);
  border-radius: 14px;
  padding: 0 14px;
  background: rgba(17, 28, 45, 0.78);
  color: var(--text);
}

.check-row {
  grid-template-columns: auto 1fr;
  align-items: center;
  min-height: 56px;
  border: 1px solid rgba(149, 211, 192, 0.12);
  border-radius: 14px;
  padding: 12px 14px;
  background: rgba(17, 28, 45, 0.48);
  cursor: pointer;
  line-height: 1.4;
}

.check-row input {
  min-height: auto;
  width: 28px;
  height: 28px;
}

button[type="submit"] {
  padding: 0 18px;
}

@media (min-width: 760px) {
  .create-form {
    padding: 26px;
  }

  .goal-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  .field-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
