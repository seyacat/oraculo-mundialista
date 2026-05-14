<template>
  <article class="group-card glass-card" :class="{ 'group-card--dragging-over': isDragging }" :aria-label="`${group.label} — predicción de clasificación`" data-testid="group-card">
    <header class="group-header">
      <h3 class="group-label">{{ group.label }}</h3>

      <div class="qualifier-pills">
        <span class="pill pill--qualifies">Top 2 clasifica</span>
        <span class="pill pill--possible">3ro posible</span>
      </div>

      <button
        class="reset-btn"
        type="button"
        :aria-label="`Restablecer orden de ${group.label}`"
        data-testid="reset-group-btn"
        @click="$emit('reset')"
      >
        ↺
      </button>
    </header>

    <draggable
      v-model="localTeams"
      item-key="id"
      handle=".drag-handle"
      :animation="220"
      ghost-class="team-ghost"
      chosen-class="team-chosen"
      drag-class="team-dragging"
      class="team-list"
      tag="ol"
      :component-data="{ type: 'transition-group', name: 'team-slide' }"
      @change="onOrderChange"
      @start="onDragStart"
      @end="onDragEnd"
    >
      <template #item="{ element, index }">
        <li
          class="team-row"
          :class="[
            `pos-${index}`,
            positionStatus(index),
            { 'team-row--qualifier-glow': index < 2 }
          ]"
          :data-position="index"
        >
          <span class="pos-badge" :class="positionStatus(index)" :aria-label="`Posición ${index + 1}`">
            {{ positionMeta(index).label }}
          </span>

          <span v-if="index < 2" class="qualifier-star" aria-hidden="true">★</span>

          <span
            v-if="index < 3"
            class="status-badge"
            :class="positionStatus(index)"
          >
            {{ positionMeta(index).badge }}
          </span>
          <span v-else class="status-badge pos-out">
            {{ positionMeta(index).badge }}
          </span>

          <span class="team-flag" aria-hidden="true">{{ flag(element.isoCode) }}</span>
          <span class="team-code">{{ element.code }}</span>
          <span class="team-name">{{ element.name }}</span>

          <button
            class="drag-handle"
            type="button"
            :aria-label="`Arrastrar ${element.name} para cambiar posición`"
          >
            <span class="handle-icon" aria-hidden="true">
              <span></span><span></span><span></span>
            </span>
          </button>
        </li>
      </template>
    </draggable>

    <div class="drop-hint" :class="{ 'drop-hint--active': isDragging }" aria-hidden="true">
      <span class="drop-hint-icon"></span>
      Suelta aquí para reordenar
    </div>
  </article>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import draggable from 'vuedraggable'
import { countryFlag, positionMeta } from '../../lib/mock-data/groups'

const isDragging = ref(false)
const draggedGroupId = ref(null)

const props = defineProps({
  group: { type: Object, required: true },
  draggingGroupId: { type: String, default: null },
})

const emit = defineEmits(['update:teams', 'reset', 'drag-start', 'drag-end'])

const localTeams = ref([...props.group.teams])

watch(
  () => props.group.teams,
  (next) => {
    localTeams.value = [...next]
  },
  { deep: true }
)

function onOrderChange() {
  emit('update:teams', localTeams.value)
}

function onDragStart() {
  isDragging.value = true
  emit('drag-start', props.group.id)
}

function onDragEnd() {
  isDragging.value = false
  emit('drag-end')
}

function flag(isoCode) {
  return countryFlag(isoCode)
}

function positionStatus(index) {
  return positionMeta(index).status
}
</script>

<style scoped>
.group-card {
  border-radius: 20px;
  padding: 0;
  overflow: hidden;
  transition: box-shadow 220ms ease, border-color 220ms ease;
  border-color: rgba(149, 211, 192, 0.14);
}

.group-card:focus-within {
  box-shadow: 0 0 0 2px var(--primary);
}

.group-card--dragging-over {
  box-shadow: 0 0 20px rgba(210, 241, 0, 0.15);
  border-color: rgba(210, 241, 0, 0.3);
}

.group-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 14px 10px;
  border-bottom: 1px solid rgba(149, 211, 192, 0.1);
  background: rgba(15, 82, 68, 0.18);
}

.group-label {
  font-family: Inter, sans-serif;
  font-size: 1rem;
  font-weight: 900;
  letter-spacing: -0.01em;
  color: var(--primary);
  margin: 0;
  flex: 1;
}

.qualifier-pills {
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
}

.pill {
  border-radius: 999px;
  padding: 3px 7px;
  font-size: 0.6rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.pill--qualifies {
  background: rgba(149, 211, 192, 0.18);
  color: var(--primary);
  border: 1px solid rgba(149, 211, 192, 0.28);
}

.pill--possible {
  background: rgba(210, 241, 0, 0.1);
  color: var(--energy);
  border: 1px solid rgba(210, 241, 0, 0.22);
}

.reset-btn {
  width: 30px;
  height: 30px;
  border: 1px solid rgba(149, 211, 192, 0.2);
  border-radius: 999px;
  background: transparent;
  color: var(--text-muted);
  cursor: pointer;
  font-size: 0.85rem;
  display: grid;
  place-items: center;
  transition: color 180ms, border-color 180ms;
}

.reset-btn:hover {
  color: var(--primary);
  border-color: var(--primary);
}

.team-list {
  list-style: none;
  margin: 0;
  padding: 6px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  contain: content;
}

.team-row {
  display: flex;
  align-items: center;
  gap: 8px;
  min-height: 52px;
  border-radius: 12px;
  padding: 6px 8px 6px 6px;
  border: 1.5px solid transparent;
  background: rgba(17, 28, 45, 0.6);
  cursor: default;
  user-select: none;
  -webkit-user-select: none;
  transition: border-color 180ms ease, background 180ms ease, transform 160ms ease, box-shadow 180ms ease;
  position: relative;
}

.team-row::before {
  content: '';
  position: absolute;
  left: 0;
  top: 6px;
  bottom: 6px;
  width: 3px;
  border-radius: 999px;
  transition: background 180ms;
}

.team-row.qualifies {
  border-color: rgba(149, 211, 192, 0.3);
  background: rgba(15, 82, 68, 0.25);
}
.team-row.qualifies::before { background: var(--primary); }

.team-row--qualifier-glow {
  box-shadow: 0 0 12px rgba(149, 211, 192, 0.15), inset 0 0 6px rgba(149, 211, 192, 0.04);
  border-color: rgba(149, 211, 192, 0.45) !important;
  background: rgba(15, 82, 68, 0.32) !important;
}

.team-row.possible {
  border-color: rgba(210, 241, 0, 0.18);
  background: rgba(210, 241, 0, 0.05);
}
.team-row.possible::before { background: var(--energy); }

.team-row.out {
  border-color: rgba(255, 180, 171, 0.14);
  background: rgba(255, 100, 85, 0.05);
}
.team-row.out::before { background: var(--coral); }

.team-row:hover {
  background: rgba(31, 42, 60, 0.85);
  border-color: rgba(210, 241, 0, 0.3);
  transform: translateY(-1px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
}

.team-row--qualifier-glow:hover {
  border-color: var(--primary) !important;
  box-shadow: 0 0 20px rgba(149, 211, 192, 0.25), 0 4px 16px rgba(0, 0, 0, 0.25);
}

:deep(.team-ghost) {
  opacity: 0;
  border-style: dashed !important;
  border-color: rgba(149, 211, 192, 0.6) !important;
  background: rgba(149, 211, 192, 0.1) !important;
}

:deep(.team-dragging) {
  opacity: 0.96;
  transform: rotate(1.5deg) scale(1.03) !important;
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.5) !important;
  border-color: var(--energy) !important;
  background: rgba(82, 94, 0, 0.55) !important;
  z-index: 9999;
}

:deep(.team-chosen) {
  border-color: rgba(210, 241, 0, 0.65) !important;
  box-shadow: 0 0 0 3px rgba(210, 241, 0, 0.25), 0 0 16px rgba(210, 241, 0, 0.1);
}

.drop-hint {
  display: none;
  margin: 0 6px 8px;
  border: 1.5px dashed rgba(149, 211, 192, 0.3);
  border-radius: 10px;
  padding: 12px;
  color: var(--text-muted);
  font-size: 0.75rem;
  text-align: center;
  pointer-events: none;
  background: rgba(149, 211, 192, 0.03);
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: border-color 200ms, background 200ms, color 200ms;
}

.drop-hint--active {
  display: flex;
  border-color: rgba(210, 241, 0, 0.4);
  background: rgba(210, 241, 0, 0.06);
  color: var(--energy);
  animation: dropHintPulse 1.4s ease-in-out infinite;
}

@keyframes dropHintPulse {
  0%, 100% { border-color: rgba(210, 241, 0, 0.4); }
  50% { border-color: rgba(210, 241, 0, 0.7); }
}

.drop-hint-icon {
  width: 10px;
  height: 10px;
  border: 2px solid var(--energy);
  border-radius: 2px;
  position: relative;
  display: inline-block;
}

.drop-hint-icon::after {
  content: '';
  position: absolute;
  top: -4px;
  left: -4px;
  right: -4px;
  bottom: -4px;
  border: 1.5px dashed var(--energy);
  border-radius: 4px;
  opacity: 0.5;
}

.pos-badge {
  flex: 0 0 24px;
  text-align: center;
  font-family: Inter, sans-serif;
  font-size: 0.72rem;
  font-weight: 900;
}

.pos-badge.qualifies { color: var(--primary); }
.pos-badge.possible  { color: var(--energy);  }
.pos-badge.out       { color: var(--coral);    }

.qualifier-star {
  flex: 0 0 auto;
  color: #ffd700;
  font-size: 0.7rem;
  line-height: 1;
  text-shadow: 0 0 6px rgba(255, 215, 0, 0.5);
  margin-right: -4px;
}

.status-badge {
  margin-left: auto;
  border-radius: 999px;
  padding: 2px 6px;
  font-size: 0.55rem;
  font-weight: 900;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  white-space: nowrap;
}

.status-badge.qualifies {
  background: rgba(149, 211, 192, 0.18);
  color: var(--primary);
}

.status-badge.possible {
  background: rgba(210, 241, 0, 0.12);
  color: var(--energy);
}

.status-badge.pos-out {
  background: rgba(255, 180, 171, 0.12);
  color: var(--coral);
}

.team-flag {
  font-size: 1.35rem;
  line-height: 1;
  flex: 0 0 auto;
}

.team-code {
  flex: 0 0 auto;
  min-width: 36px;
  padding: 3px 6px;
  border-radius: 6px;
  background: rgba(149, 211, 192, 0.1);
  color: var(--primary);
  font-family: Lexend, 'Plus Jakarta Sans', sans-serif;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-align: center;
}

.team-name {
  flex: 1;
  min-width: 0;
  font-size: 0.88rem;
  font-weight: 700;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.drag-handle {
  flex: 0 0 40px;
  width: 40px;
  height: 40px;
  border: 0;
  border-radius: 10px;
  background: rgba(149, 211, 192, 0.08);
  cursor: grab;
  display: grid;
  place-items: center;
  touch-action: none;
  transition: background 160ms, transform 160ms;
}

.drag-handle:hover {
  background: rgba(149, 211, 192, 0.2);
  transform: scale(1.08);
}

.drag-handle:active {
  cursor: grabbing;
  background: rgba(149, 211, 192, 0.28);
}

.handle-icon {
  display: flex;
  flex-direction: column;
  gap: 3px;
  pointer-events: none;
}

.handle-icon span {
  display: block;
  width: 14px;
  height: 2px;
  border-radius: 999px;
  background: var(--primary);
  opacity: 0.7;
}

.team-slide-enter-active,
.team-slide-leave-active {
  transition: all 220ms ease;
}

.team-slide-enter-from {
  opacity: 0;
  transform: translateY(-6px);
}

.team-slide-leave-to {
  opacity: 0;
  transform: translateY(6px);
}

@media (max-width: 380px) {
  .team-name { font-size: 0.8rem; }

  .status-badge { display: none; }

  .qualifier-pills { display: none; }
}

@media (min-width: 600px) {
  .team-flag { font-size: 1.5rem; }

  .team-name { font-size: 0.92rem; }
}
</style>
