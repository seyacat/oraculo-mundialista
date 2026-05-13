/**
 * useGroupStage — reactive composable for World Cup 2026 Group Stage predictions.
 *
 * Users drag teams within each group to predict their final standings.
 * The top-2 teams in each group automatically qualify; the 3rd-place team
 * is a "possible" qualifier (best 8 third-place advance in WC 2026);
 * the 4th-place team is eliminated.
 *
 * State is persisted in localStorage under the key provided so refreshes
 * retain the user's prediction without a backend.
 */

import { computed, ref, watch } from 'vue'
import { wc2026Groups } from '../lib/mock-data/groups'

const STORAGE_KEY = 'oraculo-group-stage-v1'

/** Deep-clone groups to avoid mutating the original mock data */
function cloneGroups(source) {
  return source.map((g) => ({
    ...g,
    teams: g.teams.map((t) => ({ ...t })),
  }))
}

/** Load persisted state from localStorage (if any) */
function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const stored = JSON.parse(raw)
    // Validate: must be an array of length 12 with the same group IDs
    if (!Array.isArray(stored) || stored.length !== wc2026Groups.length) return null
    const storedIds = stored.map((g) => g.id).sort().join(',')
    const expectedIds = wc2026Groups.map((g) => g.id).sort().join(',')
    if (storedIds !== expectedIds) return null
    return stored
  } catch {
    return null
  }
}

/** Persist state to localStorage */
function saveToStorage(groups) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(groups))
  } catch {
    // Ignore quota errors
  }
}

// Module-level singleton so all components share the same state
const groups = ref(loadFromStorage() || cloneGroups(wc2026Groups))

// Persist whenever groups change
watch(groups, (val) => saveToStorage(val), { deep: true })

export function useGroupStage() {
  /**
   * Flat list of directly qualifying teams:
   * position 0 and 1 from every group → 24 teams.
   */
  const directQualifiers = computed(() =>
    groups.value.flatMap((g) => g.teams.slice(0, 2))
  )

  /**
   * Flat list of all third-place teams (12 total):
   * best 8 of these will qualify in WC 2026, but we mark all as "possible".
   */
  const thirdPlaceTeams = computed(() =>
    groups.value.map((g) => ({ groupId: g.id, groupLabel: g.label, team: g.teams[2] }))
  )

  /**
   * Set of IDs that directly qualify — used for fast membership checks in templates.
   */
  const qualifierIds = computed(() =>
    new Set(directQualifiers.value.map((t) => t.id))
  )

  /**
   * Set of IDs in 3rd place — "possibly" qualifying.
   */
  const possibleIds = computed(() =>
    new Set(thirdPlaceTeams.value.map((e) => e.team?.id).filter(Boolean))
  )

  /**
   * Update the ordered team list for a single group after a drag.
   * @param {string} groupId
   * @param {Array}  newTeams  — full new teams array from vuedraggable
   */
  function updateGroupOrder(groupId, newTeams) {
    const idx = groups.value.findIndex((g) => g.id === groupId)
    if (idx !== -1) {
      groups.value[idx] = { ...groups.value[idx], teams: newTeams }
    }
  }

  /**
   * Reset a single group to the original mock data order.
   */
  function resetGroup(groupId) {
    const original = wc2026Groups.find((g) => g.id === groupId)
    if (!original) return
    updateGroupOrder(groupId, original.teams.map((t) => ({ ...t })))
  }

  /**
   * Reset ALL groups to the original order.
   */
  function resetAll() {
    groups.value = cloneGroups(wc2026Groups)
  }

  /**
   * Summary counts for display.
   */
  const summary = computed(() => ({
    total: groups.value.length * 4,
    direct: directQualifiers.value.length,          // 24
    possible: thirdPlaceTeams.value.length,          // 12
    eliminated: groups.value.length,                 // 12 (one per group, position 4)
  }))

  return {
    groups,
    directQualifiers,
    thirdPlaceTeams,
    qualifierIds,
    possibleIds,
    summary,
    updateGroupOrder,
    resetGroup,
    resetAll,
  }
}
