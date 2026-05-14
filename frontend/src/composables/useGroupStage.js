import { computed, ref, watch } from 'vue'
import { wc2026Groups } from '../lib/mock-data/groups'

const STORAGE_KEY = 'oraculo-group-stage-v1'

function cloneGroups(source) {
  return source.map((g) => ({
    ...g,
    teams: g.teams.map((t) => ({ ...t })),
  }))
}

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const stored = JSON.parse(raw)
    if (!Array.isArray(stored) || stored.length !== wc2026Groups.length) return null
    const storedIds = stored.map((g) => g.id).sort().join(',')
    const expectedIds = wc2026Groups.map((g) => g.id).sort().join(',')
    if (storedIds !== expectedIds) return null
    return stored
  } catch {
    return null
  }
}

function saveToStorage(groups) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(groups))
  } catch {
  }
}

const groups = ref(loadFromStorage() || cloneGroups(wc2026Groups))

watch(groups, (val) => saveToStorage(val), { deep: true })

export function useGroupStage() {
  const directQualifiers = computed(() =>
    groups.value.flatMap((g) => g.teams.slice(0, 2))
  )

  const thirdPlaceTeams = computed(() =>
    groups.value.map((g) => ({ groupId: g.id, groupLabel: g.label, team: g.teams[2] }))
  )

  const qualifierIds = computed(() =>
    new Set(directQualifiers.value.map((t) => t.id))
  )

  const possibleIds = computed(() =>
    new Set(thirdPlaceTeams.value.map((e) => e.team?.id).filter(Boolean))
  )

  const qualifierNames = computed(() => {
    const names = []
    for (const g of groups.value) {
      const first = g.teams[0]
      const second = g.teams[1]
      names.push({
        groupLabel: g.label,
        first: { id: first.id, code: first.code, name: first.name, isoCode: first.isoCode },
        second: { id: second.id, code: second.code, name: second.name, isoCode: second.isoCode },
        third: { id: g.teams[2].id, code: g.teams[2].code, name: g.teams[2].name, isoCode: g.teams[2].isoCode },
      })
    }
    return names
  })

  function updateGroupOrder(groupId, newTeams) {
    const idx = groups.value.findIndex((g) => g.id === groupId)
    if (idx !== -1) {
      groups.value[idx] = { ...groups.value[idx], teams: newTeams }
    }
  }

  function resetGroup(groupId) {
    const original = wc2026Groups.find((g) => g.id === groupId)
    if (!original) return
    updateGroupOrder(groupId, original.teams.map((t) => ({ ...t })))
  }

  function resetAll() {
    groups.value = cloneGroups(wc2026Groups)
  }

  const summary = computed(() => ({
    total: groups.value.length * 4,
    direct: directQualifiers.value.length,
    possible: thirdPlaceTeams.value.length,
    eliminated: groups.value.length,
  }))

  return {
    groups,
    directQualifiers,
    thirdPlaceTeams,
    qualifierIds,
    possibleIds,
    qualifierNames,
    summary,
    updateGroupOrder,
    resetGroup,
    resetAll,
  }
}
