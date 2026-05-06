<template>
  <draggable
    v-model="teams"
    item-key="id"
    handle=".drag-handle"
    animation="200"
    class="team-list"
  >
    <template #item="{ element, index }">
      <div class="team-item">
        <span class="position">{{ index + 1 }}</span>
        <span class="drag-handle">☰</span>
        <span class="flag">{{ element.flag }}</span>
        <span class="name">{{ element.name }}</span>
      </div>
    </template>
  </draggable>
</template>

<script setup>
import { ref } from 'vue'
import draggable from 'vuedraggable'

const teams = ref([
  { id: 1,  flag: '🇦🇷', name: 'Argentina' },
  { id: 2,  flag: '🇫🇷', name: 'Francia' },
  { id: 3,  flag: '🇧🇷', name: 'Brasil' },
  { id: 4,  flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', name: 'Inglaterra' },
  { id: 5,  flag: '🇪🇸', name: 'España' },
  { id: 6,  flag: '🇵🇹', name: 'Portugal' },
  { id: 7,  flag: '🇩🇪', name: 'Alemania' },
  { id: 8,  flag: '🇳🇱', name: 'Países Bajos' },
  { id: 9,  flag: '🇧🇪', name: 'Bélgica' },
  { id: 10, flag: '🇺🇾', name: 'Uruguay' },
  { id: 11, flag: '🇨🇴', name: 'Colombia' },
  { id: 12, flag: '🇺🇸', name: 'Estados Unidos' },
  { id: 13, flag: '🇲🇽', name: 'México' },
  { id: 14, flag: '🇯🇵', name: 'Japón' },
  { id: 15, flag: '🇰🇷', name: 'Corea del Sur' },
  { id: 16, flag: '🇸🇳', name: 'Senegal' },
  { id: 17, flag: '🇲🇦', name: 'Marruecos' },
  { id: 18, flag: '🇨🇦', name: 'Canadá' },
  { id: 19, flag: '🇨🇱', name: 'Chile' },
  { id: 20, flag: '🇵🇪', name: 'Perú' },
  { id: 21, flag: '🇦🇺', name: 'Australia' },
  { id: 22, flag: '🇨🇷', name: 'Costa Rica' },
  { id: 23, flag: '🇵🇦', name: 'Panamá' },
  { id: 24, flag: '🇩🇿', name: 'Argelia' },
  { id: 25, flag: '🇿🇦', name: 'Sudáfrica' },
  { id: 26, flag: '🇳🇬', name: 'Nigeria' },
  { id: 27, flag: '🇨🇮', name: 'Costa de Marfil' },
  { id: 28, flag: '🇸🇦', name: 'Arabia Saudita' },
  { id: 29, flag: '🇮🇷', name: 'Irán' },
  { id: 30, flag: '🇹🇷', name: 'Turquía' },
  { id: 31, flag: '🇷🇸', name: 'Serbia' },
  { id: 32, flag: '🇺🇦', name: 'Ucrania' },
])
</script>

<style scoped>
.team-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.team-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: #2a2a3e;
  border-radius: 10px;
  padding: 0.75rem 1rem;
  cursor: default;
  user-select: none;
  touch-action: none;
}
.position {
  width: 1.5rem;
  font-weight: 700;
  font-size: 0.85rem;
  color: #aaa;
  text-align: center;
}
.drag-handle {
  cursor: grab;
  font-size: 1.1rem;
  color: #666;
  padding: 0 0.25rem;
}
.flag {
  font-size: 1.5rem;
}
.name {
  font-size: 1rem;
  font-weight: 500;
}
</style>
