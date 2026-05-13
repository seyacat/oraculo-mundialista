<template>
  <article class="group-card glass-card" :aria-label="`${group.label} — predicción de clasificación`">
    <!-- ── Header ── -->
    <header class="group-header">
      <h3 class="group-label">{{ group.label }}</h3>

      <div class="qualifier-pills">
        <span class="pill pill--qualifies" title="Clasifican directamente">Top 2 clasifica</span>
        <span class="pill pill--possible"  title="Puede clasificar como mejor 3ro">3ro posible</span>
      </div>

      <button
        class="reset-btn"
        type="button"
        :aria-label="`Restablecer orden de ${group.label}`"
        @click="$emit('reset')"
      >
        ↺
      </button>
    </header>

    <!-- ── Draggable team list ── -->
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
      @start="isDragging = true"
      @end="isDragging = false"
    >
      <template #item="{ element, index }">
        <li
          class="team-row"
          :class="[`pos-${index}`, positionStatus(index)]"
          :data-position="index"
        >
          <!-- Position badge -->
          <span class="pos-badge" :class="positionStatus(index)" :aria-label="`Posición ${index + 1}`">
            {{ positionMeta(index).label }}
          </span>

          <!-- Qualifier / status badge (top-right on the row) -->
          <span
            v-if="index < 3"
            class="status-badge"
            :class="positionStatus(index)"
            :aria-hidden="true"
          >
            {{ positionMeta(index).badge }}
          </span>
          <span v-else class="status-badge pos-out" aria-hidden="true">
            {{ positionMeta(index).badge }}
          </span>

          <!-- Flag + team info -->
          <span class="team-flag" aria-hidden="true">{{ flag(element.isoCode) }}</span>
          <span class="team-code">{{ element.code }}</span>
          <span class="team-name">{{ element.name }}</span>

          <!-- Drag handle — 44 × 44 tap target -->
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

    <!-- ── Drop zone indicator (shown while dragging) ── -->
    <div class="drop-hint" :class="{ 'drop-hint--active': isDragging }" aria-hidden="true">Suelta aquí para reordenar</div>
  </article>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import draggable from 'vuedraggable'
import { countryFlag, positionMeta } from '../../lib/mock-data/groups'

const isDragging = ref(false)

const props = defineProps({
  group: {
    type: Object,
    required: true,
    // { id, label, teams: [{ id, code, name, isoCode, pot }] }
  },
})

const emit = defineEmits(['update:teams', 'reset'])

// Local reactive copy so vuedraggable can mutate it freely
const localTeams = ref([...props.group.teams])

// Keep in sync if parent updates group.teams externally (e.g., resetAll)
watch(
  () => props.group.teams,
  (next) => {
    localTeams.value = [...next]
  },
  { deep: true }
)

// After every reorder, emit the new order to the parent
function onOrderChange() {
  emit('update:teams', localTeams.value)
}

function flag(isoCode) {
  return countryFlag(isoCode)
}

function positionStatus(index) {
  return positionMeta(index).status
}
</script>

<style scoped>
/* ── Card shell ── */
.group-card {
  border-radius: 20px;
  padding: 0;
  overflow: hidden;
  transition: box-shadow 200ms ease;
}

.group-card:focus-within {
  box-shadow: 0 0 0 2px var(--primary);
}

/* ── Header ── */
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

/* ── Team list ── */
.team-list {
  list-style: none;
  margin: 0;
  padding: 6px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  /* Tell the browser this element is the scroll ancestor for drag */
  contain: content;
}

/* ── Team row ── */
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
  /* Prevent text-selection flicker on mobile drag */
  -webkit-user-select: none;
  transition: border-color 180ms ease, background 180ms ease, transform 160ms ease, box-shadow 180ms ease;
  position: relative;
}

/* Position-based left accent stripe */
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

/* qualifies → green */
.team-row.qualifies {
  border-color: rgba(149, 211, 192, 0.3);
  background: rgba(15, 82, 68, 0.25);
}
.team-row.qualifies::before { background: var(--primary); }

/* possible → energy yellow */
.team-row.possible {
  border-color: rgba(210, 241, 0, 0.18);
  background: rgba(210, 241, 0, 0.05);
}
.team-row.possible::before { background: var(--energy); }

/* out → coral red */
.team-row.out {
  border-color: rgba(255, 180, 171, 0.14);
  background: rgba(255, 100, 85, 0.05);
}
.team-row.out::before { background: var(--coral); }

/* hover / focus-visible */
.team-row:hover {
  background: rgba(31, 42, 60, 0.85);
  border-color: rgba(210, 241, 0, 0.3);
  transform: translateY(-1px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
}

/* ── SortableJS drag states ── */

/* The "ghost" placeholder left behind while dragging */
:deep(.team-ghost) {
  opacity: 0;
  border-style: dashed !important;
  border-color: rgba(149, 211, 192, 0.45) !important;
  background: rgba(149, 211, 192, 0.07) !important;
}

/* The row being dragged (airborne) */
:deep(.team-dragging) {
  opacity: 0.96;
  transform: rotate(1.5deg) scale(1.03) !important;
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.5) !important;
  border-color: var(--primary) !important;
  background: rgba(15, 82, 68, 0.55) !important;
  z-index: 9999;
}

/* The row while selected / pressed */
:deep(.team-chosen) {
  border-color: rgba(210, 241, 0, 0.55) !important;
  box-shadow: 0 0 0 3px rgba(210, 241, 0, 0.2);
}

/* ── Drop zone hint ── */
.drop-hint {
  display: none;
  margin: 4px 6px 6px;
  border: 1.5px dashed rgba(149, 211, 192, 0.3);
  border-radius: 10px;
  padding: 10px;
  color: var(--text-muted);
  font-size: 0.72rem;
  text-align: center;
  pointer-events: none;
}

.drop-hint--active {
  display: block;
}

/* ── Position badge ── */
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

/* ── Inline status badge (floated right) ── */
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

/* ── Flag ── */
.team-flag {
  font-size: 1.35rem;
  line-height: 1;
  flex: 0 0 auto;
}

/* ── Code chip ── */
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

/* ── Team name ── */
.team-name {
  flex: 1;
  min-width: 0;
  font-size: 0.88rem;
  font-weight: 700;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* ── Drag handle ── */
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
  transition: background 160ms;
}

.drag-handle:hover {
  background: rgba(149, 211, 192, 0.2);
}

.drag-handle:active {
  cursor: grabbing;
  background: rgba(149, 211, 192, 0.28);
}

/* Three-line hamburger icon */
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

/* ── Team slide transition ── */
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

/* ── Responsive tweaks ── */
@media (max-width: 380px) {
  .team-name {
    font-size: 0.8rem;
  }

  .status-badge {
    display: none; /* hide on very small screens to avoid overflow */
  }

  .qualifier-pills {
    display: none;
  }
}

@media (min-width: 600px) {
  .team-flag {
    font-size: 1.5rem;
  }

  .team-name {
    font-size: 0.92rem;
  }
}
</style>
