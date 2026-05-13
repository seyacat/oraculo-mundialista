/**
 * @fileoverview Pure function to compute the 32 teams that advance to the
 * FIFA World Cup 2026 knockout stage.
 *
 * Rule summary (official FIFA 2026 regulations):
 *   • The top 2 teams from each of the 12 groups qualify automatically → 24 teams.
 *   • The best 8 third-placed teams from the 12 groups also advance → 8 more teams.
 *   • Total knockout participants: 32.
 *
 * Tiebreakers for ranking the 12 third-placed teams against each other
 * (to select the best 8), applied in order:
 *   1. Points
 *   2. Goal difference
 *   3. Goals scored
 *   4. Fair play record (yellow/red card points) — simplified: not tracked,
 *      falls through to next tiebreaker.
 *   5. FIFA World Ranking — simplified: alphabetical fallback (deterministic).
 *
 * @see https://www.fifa.com/worldcup/2026/regulations
 */

/** @import { Group, Match, Team, GroupRecord, Qualifiers, ThirdPlacedEntry } from './types.js' */

import { groupStanding } from './standings.js'

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

/**
 * Extracts the finished matches that belong to a given group.
 *
 * @param {string}  groupId
 * @param {Match[]} allMatches
 * @returns {Match[]}
 */
function matchesForGroup(groupId, allMatches) {
  return allMatches.filter((m) => m.groupId === groupId && m.round === 'group')
}

/**
 * Compares two third-placed entries and returns a negative number if `a`
 * is ranked higher (better) than `b`, following FIFA tiebreaker rules.
 *
 * @param {ThirdPlacedEntry} a
 * @param {ThirdPlacedEntry} b
 * @returns {number}
 */
function compareThirdPlaced(a, b) {
  const ra = a.record
  const rb = b.record

  // 1. Points
  if (rb.points !== ra.points) return rb.points - ra.points
  // 2. Goal difference
  if (rb.goalDifference !== ra.goalDifference) return rb.goalDifference - ra.goalDifference
  // 3. Goals scored
  if (rb.goalsFor !== ra.goalsFor) return rb.goalsFor - ra.goalsFor
  // 4. Fair play (not tracked here — fall through)
  // 5. Alphabetical by team name (deterministic stand-in for FIFA ranking / lots)
  return a.team.name.localeCompare(b.team.name, 'es')
}

// ─────────────────────────────────────────────
// Public API
// ─────────────────────────────────────────────

/**
 * Computes the 32 teams that advance to the knockout stage.
 *
 * Takes the group definitions and all group-stage matches (finished or not).
 * If a group has not finished yet, the current partial standings are used
 * (which is valid for live tournament state or simulations).
 *
 * @param {Group[]} groups     - The 12 groups (A–L).
 * @param {Match[]} allMatches - All group-stage matches (any status).
 * @returns {Qualifiers}
 *
 * @example
 * const { groupWinners, groupRunnersUp, thirdPlaced } =
 *   computeQualifiers(GROUPS, finishedGroupMatches)
 *
 * console.log(groupWinners['A'].name)  // e.g. "Estados Unidos"
 * console.log(thirdPlaced[0].team.name) // best 3rd-placed team
 */
export function computeQualifiers(groups, allMatches) {
  /** @type {Record<string, Team>} */
  const groupWinners = {}
  /** @type {Record<string, Team>} */
  const groupRunnersUp = {}
  /** @type {ThirdPlacedEntry[]} */
  const allThirdPlaced = []

  for (const group of groups) {
    const matches = matchesForGroup(group.id, allMatches)
    const standing = groupStanding(group.teams, matches)

    // standing[0] = 1st, [1] = 2nd, [2] = 3rd, [3] = 4th
    groupWinners[group.id]   = standing[0].team
    groupRunnersUp[group.id] = standing[1].team

    allThirdPlaced.push({
      team:    standing[2].team,
      groupId: group.id,
      record:  standing[2],
    })
  }

  // Rank all 12 third-placed teams; keep the best 8
  const sortedThird = [...allThirdPlaced].sort(compareThirdPlaced)
  const thirdPlaced = sortedThird.slice(0, 8)

  return { groupWinners, groupRunnersUp, thirdPlaced }
}

/**
 * Returns a flat array of all 32 knockout-stage qualifiers in the order
 * they appear in the official bracket (useful for display).
 *
 * @param {Qualifiers} qualifiers - Result of `computeQualifiers`.
 * @returns {Team[]}
 */
export function qualifiersToList(qualifiers) {
  const { groupWinners, groupRunnersUp, thirdPlaced } = qualifiers
  const groupIds = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L']
  return [
    ...groupIds.map((id) => groupWinners[id]).filter(Boolean),
    ...groupIds.map((id) => groupRunnersUp[id]).filter(Boolean),
    ...thirdPlaced.map((e) => e.team),
  ]
}
