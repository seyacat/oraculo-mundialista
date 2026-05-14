<template>
  <draggable
    v-model="teams"
    item-key="id"
    handle=".drag-handle"
    animation="200"
    class="team-list"
    data-testid="prediction-board"
  >
    <template #item="{ element, index }">
      <div class="team-item">
        <span class="position">{{ index + 1 }}</span>
        <button class="drag-handle" type="button" aria-label="Arrastrar equipo">
          <span aria-hidden="true"></span>
        </button>
        <span class="team-code">{{ element.code }}</span>
        <span class="name">{{ element.name }}</span>
        <span class="odds">{{ element.form }}</span>
      </div>
    </template>
  </draggable>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import draggable from 'vuedraggable'

const teams = ref([
  { id: 1, code: 'ARG', name: 'Argentina', form: 'S+' },
  { id: 2, code: 'FRA', name: 'Francia', form: 'S' },
  { id: 3, code: 'BRA', name: 'Brasil', form: 'S' },
  { id: 4, code: 'ENG', name: 'Inglaterra', form: 'A+' },
  { id: 5, code: 'ESP', name: 'España', form: 'A+' },
  { id: 6, code: 'POR', name: 'Portugal', form: 'A' },
  { id: 7, code: 'GER', name: 'Alemania', form: 'A' },
  { id: 8, code: 'NED', name: 'Países Bajos', form: 'A' },
  { id: 9, code: 'BEL', name: 'Bélgica', form: 'B+' },
  { id: 10, code: 'URU', name: 'Uruguay', form: 'B+' },
  { id: 11, code: 'COL', name: 'Colombia', form: 'B+' },
  { id: 12, code: 'USA', name: 'Estados Unidos', form: 'B' },
  { id: 13, code: 'MEX', name: 'México', form: 'B' },
  { id: 14, code: 'JPN', name: 'Japón', form: 'B' },
  { id: 15, code: 'KOR', name: 'Corea del Sur', form: 'C+' },
  { id: 16, code: 'SEN', name: 'Senegal', form: 'C+' },
  { id: 17, code: 'MAR', name: 'Marruecos', form: 'C+' },
  { id: 18, code: 'CAN', name: 'Canadá', form: 'C' },
  { id: 19, code: 'CHI', name: 'Chile', form: 'C' },
  { id: 20, code: 'PER', name: 'Perú', form: 'C' },
  { id: 21, code: 'AUS', name: 'Australia', form: 'D+' },
  { id: 22, code: 'CRC', name: 'Costa Rica', form: 'D+' },
  { id: 23, code: 'PAN', name: 'Panamá', form: 'D+' },
  { id: 24, code: 'ALG', name: 'Argelia', form: 'D' },
  { id: 25, code: 'RSA', name: 'Sudáfrica', form: 'D' },
  { id: 26, code: 'NGA', name: 'Nigeria', form: 'D' },
  { id: 27, code: 'CIV', name: 'Costa de Marfil', form: 'D' },
  { id: 28, code: 'KSA', name: 'Arabia Saudita', form: 'D' },
  { id: 29, code: 'IRN', name: 'Irán', form: 'D' },
  { id: 30, code: 'TUR', name: 'Turquía', form: 'D' },
  { id: 31, code: 'SRB', name: 'Serbia', form: 'D' },
  { id: 32, code: 'UKR', name: 'Ucrania', form: 'D' },
])

const emit = defineEmits(['update:modelValue'])

onMounted(() => {
  emit('update:modelValue', teams.value)
})

watch(teams, (nextTeams) => {
  emit('update:modelValue', nextTeams)
}, { deep: true })
</script>

<style scoped>
.team-list {
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
}

.team-item {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  min-height: 60px;
  border: 1px solid rgba(149, 211, 192, 0.12);
  border-radius: var(--radius-md);
  padding: 0.65rem 0.75rem;
  background: rgba(17, 28, 45, 0.68);
  cursor: default;
  user-select: none;
  touch-action: none;
  transition: border-color 180ms ease, background 180ms ease, transform 180ms ease;
}

.team-item:hover {
  border-color: rgba(210, 241, 0, 0.42);
  background: rgba(31, 42, 60, 0.78);
}

.position {
  width: 2rem;
  color: var(--energy);
  font-family: Inter, sans-serif;
  font-weight: 900;
  font-size: 0.85rem;
  text-align: center;
}

.drag-handle {
  width: 44px;
  height: 44px;
  border: 0;
  border-radius: 999px;
  background: rgba(149, 211, 192, 0.1);
  cursor: grab;
  display: grid;
  place-items: center;
  flex: 0 0 44px;
}

.drag-handle:active {
  cursor: grabbing;
}

.drag-handle span,
.drag-handle span::before,
.drag-handle span::after {
  display: block;
  width: 14px;
  height: 2px;
  border-radius: 99px;
  background: var(--primary);
}

.drag-handle span {
  position: relative;
}

.drag-handle span::before,
.drag-handle span::after {
  content: "";
  position: absolute;
  left: 0;
}

.drag-handle span::before {
  top: -5px;
}

.drag-handle span::after {
  top: 5px;
}

.team-code {
  width: 48px;
  height: 38px;
  border-radius: 999px;
  display: grid;
  place-items: center;
  background: rgba(15, 82, 68, 0.55);
  color: var(--primary);
  font-family: Lexend, sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
}

.name {
  min-width: 0;
  flex: 1;
  font-size: 1rem;
  font-weight: 800;
}

.odds {
  min-width: 38px;
  border-radius: 999px;
  padding: 0.35rem 0.45rem;
  background: rgba(210, 241, 0, 0.12);
  color: var(--energy);
  font-size: 0.72rem;
  font-weight: 900;
  text-align: center;
}

@media (max-width: 480px) {
  .team-item {
    gap: 0.45rem;
    padding-inline: 0.55rem;
  }

  .position {
    width: 1.45rem;
  }

  .team-code {
    width: 42px;
  }
}
</style>
