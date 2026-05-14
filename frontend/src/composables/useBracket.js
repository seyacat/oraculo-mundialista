import { computed, ref, watch, onMounted } from 'vue'
import { useGroupStage } from './useGroupStage'
import { usePredictions } from './usePredictions'
import { computeQualifiers } from '../lib/worldcup/qualifiers'
import { initBracket, propagateWinner, flattenBracket, getBracketMatch, getChampion } from '../lib/worldcup/bracket'

function toWorldCupTeam(t) {
  return { id: t.id.toUpperCase(), code: t.code, name: t.name, confederation: 'UEFA' }
}

function toWorldCupMatch(groupsSnapshot) {
  const all = []
  for (const g of groupsSnapshot) {
    const groupId = g.label.replace('Grupo ', '')
    const teams = g.teams.map(toWorldCupTeam)
    for (let i = 0; i < teams.length - 1; i++) {
      for (let j = i + 1; j < teams.length; j++) {
        all.push({
          id: `generated-${groupId}-${i}-${j}`,
          round: 'group',
          groupId,
          homeTeam: teams[i],
          awayTeam: teams[j],
          score: { home: i < j ? 2 : 1, away: i < j ? 1 : 2 },
          status: 'finished',
        })
      }
    }
  }
  return all
}

export function useBracket() {
  const { groups } = useGroupStage()
  const { getBracketWinners, setBracketWinner, resetBracketWinners } = usePredictions()

  const bracket = ref(null)
  const selectedMatchId = ref(null)
  const pickedWinners = ref(new Set())

  let initialRestoreDone = false

  watch(
    groups,
    (val) => {
      pickedWinners.value = new Set()
      const wcGroups = val.map((g) => {
        const groupId = g.label.replace('Grupo ', '')
        return {
          id: groupId,
          name: g.label,
          teams: g.teams.map(toWorldCupTeam),
        }
      })
      const matches = toWorldCupMatch(val)
      const qualifiers = computeQualifiers(wcGroups, matches)
      bracket.value = initBracket(qualifiers)

      if (!initialRestoreDone) {
        initialRestoreDone = true
        const savedWinners = getBracketWinners()
        for (const [matchId, winnerId] of Object.entries(savedWinners)) {
          const match = getBracketMatch(bracket.value, matchId)
          if (match && match.homeTeam && match.awayTeam) {
            const winner = match.homeTeam.id === winnerId ? match.homeTeam : match.awayTeam
            const loser = winner.id === match.homeTeam.id ? match.awayTeam : match.homeTeam
            bracket.value = propagateWinner(bracket.value, matchId, winner, loser)
            pickedWinners.value.add(matchId)
          }
        }
      }
    },
    { immediate: true, deep: true },
  )

  const allMatches = computed(() => {
    if (!bracket.value) return []
    return flattenBracket(bracket.value)
  })

  const champion = computed(() => {
    if (!bracket.value) return null
    return getChampion(bracket.value)
  })

  function pickWinner(matchId, winner) {
    if (!bracket.value) return
    const match = getBracketMatch(bracket.value, matchId)
    if (!match) return
    const loser = winner.id === match.homeTeam?.id ? match.awayTeam : match.homeTeam
    if (!loser) return
    bracket.value = propagateWinner(bracket.value, matchId, winner, loser)
    pickedWinners.value.add(matchId)
    setBracketWinner(matchId, winner.id)
  }

  const pendingMatches = computed(() => {
    return allMatches.value.filter((m) => m.homeTeam && m.awayTeam && !m.winner)
  })

  const completedMatches = computed(() => {
    return allMatches.value.filter((m) => m.winner)
  })

  const completedCount = computed(() => completedMatches.value.length)
  const totalBracketMatches = computed(() => allMatches.value.filter((m) => m.homeTeam && m.awayTeam).length)
  const progressPercent = computed(() => {
    if (totalBracketMatches.value === 0) return 0
    return Math.round((completedCount.value / totalBracketMatches.value) * 100)
  })

  function resetBracket() {
    pickedWinners.value = new Set()
    resetBracketWinners()
    const val = groups.value
    const wcGroups = val.map((g) => {
      const groupId = g.label.replace('Grupo ', '')
      return {
        id: groupId,
        name: g.label,
        teams: g.teams.map(toWorldCupTeam),
      }
    })
    const matches = toWorldCupMatch(val)
    const qualifiers = computeQualifiers(wcGroups, matches)
    bracket.value = initBracket(qualifiers)
  }

  return {
    bracket,
    allMatches,
    champion,
    pickWinner,
    pendingMatches,
    completedMatches,
    completedCount,
    totalBracketMatches,
    progressPercent,
    selectedMatchId,
    resetBracket,
    pickedWinners,
  }
}
