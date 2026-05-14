<template>
  <div
    class="drop-slot"
    :class="{
      'drop-slot--active': isDragOver,
      'drop-slot--filled': !!assignedTeam,
      'drop-slot--highlight': highlight,
    }"
    data-testid="bracket-drop-slot"
    :data-match-id="matchId"
    :data-slot="slot"
    @dragover.prevent="onDragOver"
    @dragleave="onDragLeave"
    @drop.prevent="onDrop"
  >
    <div v-if="assignedTeam" class="ds-team">
      <span class="ds-team-flag">{{ flag(assignedTeam) }}</span>
      <span class="ds-team-code">{{ assignedTeam.code }}</span>
      <button
        class="ds-clear-btn"
        type="button"
        :aria-label="`Quitar ${assignedTeam.name}`"
        data-testid="clear-drop-slot-btn"
        @click="$emit('clear-team', slot)"
      >
        ✕
      </button>
    </div>
    <div v-else class="ds-placeholder">
      <span class="ds-arrow">{{ arrow }}</span>
      <span class="ds-label">Soltar ganador</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  matchId: { type: String, required: true },
  slot: { type: String, default: 'home' },
  assignedTeam: { type: Object, default: null },
  highlight: { type: Boolean, default: false },
  arrow: { type: String, default: '↓' },
})

const emit = defineEmits(['drop-team', 'clear-team'])
const isDragOver = ref(false)

const isoMap = {
  USA: 'US', CAN: 'CA', MEX: 'MX', PAN: 'PA', JAM: 'JM', HON: 'HN',
  ARG: 'AR', BRA: 'BR', COL: 'CO', URU: 'UY', ECU: 'EC', VEN: 'VE', PAR: 'PY',
  GER: 'DE', FRA: 'FR', ENG: 'GB', ESP: 'ES', POR: 'PT', NED: 'NL',
  BEL: 'BE', CRO: 'HR', SRB: 'RS', SUI: 'CH', AUT: 'AT', TUR: 'TR',
  POL: 'PL', ROU: 'RO', UKR: 'UA', ALB: 'AL',
  JPN: 'JP', KOR: 'KR', IRN: 'IR', KSA: 'SA', IRQ: 'IQ', JOR: 'JO',
  AUS: 'AU', UZB: 'UZ',
  MAR: 'MA', NGA: 'NG', SEN: 'SN', EGY: 'EG', COD: 'CD', MLI: 'ML',
  CMR: 'CM', GHA: 'GH', RSA: 'ZA',
  NZL: 'NZ', CRC: 'CR',
}

function flag(team) {
  if (!team || !team.id) return ''
  const iso = isoMap[team.id] || team.id.slice(0, 2)
  return [...iso.toUpperCase()].map((c) =>
    String.fromCodePoint(0x1f1e6 + c.charCodeAt(0) - 65)
  ).join('')
}

function onDragOver(event) {
  if (props.assignedTeam) return
  isDragOver.value = true
  event.dataTransfer.dropEffect = 'move'
}

function onDragLeave() {
  isDragOver.value = false
}

function onDrop(event) {
  isDragOver.value = false
  if (props.assignedTeam) return
  const raw = event.dataTransfer.getData('text/plain')
  if (!raw) return
  const data = JSON.parse(raw)
  const team = {
    id: data.teamId,
    name: data.teamName,
    code: data.teamCode,
    confederation: data.confederation,
  }
  emit('drop-team', { matchId: props.matchId, slot: props.slot, team })
}
</script>

<style scoped>
.drop-slot {
  border: 1.5px dashed rgba(149, 211, 192, 0.2);
  border-radius: 10px;
  padding: 6px 8px;
  min-height: 40px;
  display: flex;
  align-items: center;
  transition: border-color 200ms, background 200ms, box-shadow 200ms;
  background: rgba(17, 28, 45, 0.3);
}

.drop-slot--highlight {
  border-color: rgba(210, 241, 0, 0.3);
  background: rgba(210, 241, 0, 0.04);
}

.drop-slot--active {
  border-color: var(--energy) !important;
  background: rgba(210, 241, 0, 0.08);
  box-shadow: 0 0 16px rgba(210, 241, 0, 0.15), inset 0 0 8px rgba(210, 241, 0, 0.04);
}

.drop-slot--filled {
  border-style: solid;
  border-color: rgba(149, 211, 192, 0.25);
  background: rgba(15, 82, 68, 0.2);
}

.ds-team {
  display: flex;
  align-items: center;
  gap: 6px;
  width: 100%;
}

.ds-team-flag {
  font-size: 1rem;
  line-height: 1;
}

.ds-team-code {
  font-family: Lexend, 'Plus Jakarta Sans', sans-serif;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.03em;
  color: var(--text);
}

.ds-clear-btn {
  margin-left: auto;
  width: 22px;
  height: 22px;
  border: 1px solid rgba(255, 180, 171, 0.25);
  border-radius: 999px;
  background: transparent;
  color: var(--coral);
  font-size: 0.6rem;
  cursor: pointer;
  display: grid;
  place-items: center;
  transition: background 160ms, border-color 160ms;
  flex-shrink: 0;
}

.ds-clear-btn:hover {
  background: rgba(255, 100, 85, 0.12);
  border-color: var(--coral);
}

.ds-placeholder {
  display: flex;
  align-items: center;
  gap: 6px;
  width: 100%;
  justify-content: center;
}

.ds-arrow {
  font-size: 0.75rem;
  color: var(--energy);
  animation: bounceArrow 1.6s ease-in-out infinite;
}

.ds-label {
  font-size: 0.6rem;
  color: var(--text-muted);
  font-style: italic;
  white-space: nowrap;
}

@keyframes bounceArrow {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(3px); }
}
</style>
