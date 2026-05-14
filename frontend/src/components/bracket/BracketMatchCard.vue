<template>
  <article
    class="bracket-match-card glass-card"
    :class="{
      'bracket-match-card--resolved': match.winner,
      'bracket-match-card--pending': !match.winner && match.homeTeam && match.awayTeam,
      'bracket-match-card--empty': !match.homeTeam || !match.awayTeam,
      'bracket-match-card--champion': isChampion,
    }"
    :aria-label="matchLabel"
  >
    <header class="bm-header">
      <span class="bm-round-label">{{ roundLabel }}</span>
      <span v-if="match.winner" class="bm-dot" aria-hidden="true"></span>
    </header>

    <div v-if="match.homeTeam && match.awayTeam" class="bm-teams">
      <button
        class="bm-team"
        :class="{
          'bm-team--winner': match.winner?.id === match.homeTeam.id,
          'bm-team--loser': match.winner && match.winner.id !== match.homeTeam.id,
        }"
        type="button"
        :disabled="!!match.winner"
        @click="selectWinner(match.homeTeam)"
      >
        <span class="bm-team-flag">{{ flag(match.homeTeam) }}</span>
        <span class="bm-team-code">{{ match.homeTeam.code }}</span>
        <span v-if="match.winner?.id === match.homeTeam.id" class="bm-crown" aria-hidden="true">★</span>
      </button>

      <div class="bm-vs">
        <span v-if="!match.winner" class="bm-vs-text">VS</span>
        <span v-else class="bm-vs-dash">—</span>
      </div>

      <button
        class="bm-team"
        :class="{
          'bm-team--winner': match.winner?.id === match.awayTeam.id,
          'bm-team--loser': match.winner && match.winner.id !== match.awayTeam.id,
        }"
        type="button"
        :disabled="!!match.winner"
        @click="selectWinner(match.awayTeam)"
      >
        <span class="bm-team-flag">{{ flag(match.awayTeam) }}</span>
        <span class="bm-team-code">{{ match.awayTeam.code }}</span>
        <span v-if="match.winner?.id === match.awayTeam.id" class="bm-crown" aria-hidden="true">★</span>
      </button>
    </div>

    <div v-else class="bm-teams bm-teams--tbd">
      <p class="bm-tbd-text">Por definir</p>
    </div>

    <footer v-if="isChampion && match.winner" class="bm-champion-strip">
      <span class="bm-champion-label">CAMPEÓN</span>
      <span class="bm-champion-name">{{ match.winner.name }}</span>
    </footer>
  </article>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  match: { type: Object, required: true },
  roundName: { type: String, default: '' },
  isChampion: { type: Boolean, default: false },
})

const emit = defineEmits(['pick-winner'])

const roundLabel = computed(() => {
  if (props.roundName) return props.roundName
  const round = props.match.round
  const labels = {
    r32: 'Dieciseisavos',
    r16: 'Octavos',
    qf: 'Cuartos',
    sf: 'Semifinal',
    third: '3er Puesto',
    final: 'Final',
  }
  return labels[round] || round
})

const matchLabel = computed(() => {
  const home = props.match.homeTeam?.name ?? 'TBD'
  const away = props.match.awayTeam?.name ?? 'TBD'
  return `${roundLabel.value}: ${home} vs ${away}`
})

function flag(team) {
  if (!team || !team.id) return ''
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
  const iso = isoMap[team.id] || team.id.slice(0, 2)
  return [...iso.toUpperCase()].map((c) =>
    String.fromCodePoint(0x1f1e6 + c.charCodeAt(0) - 65)
  ).join('')
}

function selectWinner(team) {
  if (props.match.winner) return
  emit('pick-winner', { matchId: props.match.id, winner: team })
}
</script>

<style scoped>
.bracket-match-card {
  border-radius: 14px;
  padding: 10px;
  min-width: 150px;
  max-width: 180px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  transition: border-color 220ms, box-shadow 220ms;
  position: relative;
}

.bracket-match-card--empty {
  opacity: 0.45;
  border-style: dashed;
}

.bracket-match-card--pending {
  border-color: rgba(210, 241, 0, 0.2);
}

.bracket-match-card--resolved {
  border-color: rgba(149, 211, 192, 0.35);
}

.bracket-match-card--champion {
  border-color: #ffd700;
  box-shadow: 0 0 20px rgba(255, 215, 0, 0.2), 0 0 0 1.5px rgba(255, 215, 0, 0.3);
  background: rgba(255, 215, 0, 0.06);
}

.bm-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
}

.bm-round-label {
  font-family: Lexend, 'Plus Jakarta Sans', sans-serif;
  font-size: 0.6rem;
  font-weight: 800;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--text-muted);
  white-space: nowrap;
}

.bm-dot {
  width: 6px;
  height: 6px;
  border-radius: 999px;
  background: var(--primary);
  flex-shrink: 0;
}

.bm-teams {
  display: flex;
  align-items: center;
  gap: 6px;
}

.bm-teams--tbd {
  justify-content: center;
  padding: 12px 0;
}

.bm-tbd-text {
  margin: 0;
  font-size: 0.72rem;
  color: var(--text-muted);
  font-style: italic;
}

.bm-team {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 8px;
  border: 1.5px solid rgba(149, 211, 192, 0.15);
  border-radius: 10px;
  background: rgba(17, 28, 45, 0.6);
  cursor: pointer;
  transition: border-color 180ms, background 180ms, transform 160ms;
  font: inherit;
  color: var(--text);
  text-align: left;
  min-height: 40px;
}

.bm-team:not(:disabled):hover {
  border-color: var(--energy);
  background: rgba(210, 241, 0, 0.08);
  transform: translateY(-1px);
}

.bm-team:not(:disabled):active {
  transform: scale(0.97);
}

.bm-team:disabled {
  cursor: default;
  opacity: 0.85;
}

.bm-team--winner {
  border-color: var(--primary) !important;
  background: rgba(15, 82, 68, 0.35) !important;
}

.bm-team--loser {
  opacity: 0.5;
  border-color: rgba(255, 180, 171, 0.2) !important;
  background: rgba(255, 100, 85, 0.05) !important;
}

.bm-team-flag {
  font-size: 1.1rem;
  line-height: 1;
}

.bm-team-code {
  font-family: Lexend, 'Plus Jakarta Sans', sans-serif;
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.03em;
  white-space: nowrap;
}

.bm-crown {
  margin-left: auto;
  color: #ffd700;
  font-size: 0.75rem;
  text-shadow: 0 0 6px rgba(255, 215, 0, 0.6);
}

.bm-vs {
  flex: 0 0 20px;
  text-align: center;
}

.bm-vs-text {
  font-family: Inter, sans-serif;
  font-size: 0.55rem;
  font-weight: 900;
  color: var(--text-muted);
  letter-spacing: 0.04em;
}

.bm-vs-dash {
  color: var(--primary);
  font-weight: 700;
}

.bm-champion-strip {
  margin: -10px -10px -10px;
  padding: 8px 12px;
  border-radius: 0 0 14px 14px;
  background: linear-gradient(135deg, rgba(255, 215, 0, 0.15), rgba(255, 215, 0, 0.05));
  border-top: 1px solid rgba(255, 215, 0, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

.bm-champion-label {
  font-family: Lexend, 'Plus Jakarta Sans', sans-serif;
  font-size: 0.55rem;
  font-weight: 900;
  letter-spacing: 0.1em;
  color: #ffd700;
  text-shadow: 0 0 8px rgba(255, 215, 0, 0.4);
}

.bm-champion-name {
  font-size: 0.75rem;
  font-weight: 800;
  color: var(--text);
}
</style>
