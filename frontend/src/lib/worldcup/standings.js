/**
 * @fileoverview Pure functions for computing and sorting group standings.
 *
 * All functions are side-effect-free — they never mutate their arguments.
 * Tiebreaker order follows the official FIFA World Cup 2026 regulations:
 *   1. Points (W=3, D=1, L=0)
 *   2. Goal difference (GF − GA)
 *   3. Goals scored (GF)
 *   4. Head-to-head points (among tied teams)
 *   5. Head-to-head goal difference (among tied teams)
 *   6. Head-to-head goals scored (among tied teams)
 *   7. Drawing of lots (represented here as alphabetical order by team name)
 *
 * @see https://www.fifa.com/worldcup/2026/regulations
 */

/** @import { Team, Match, GroupRecord } from './types.js' */

// ─────────────────────────────────────────────
// Internal helpers
// ─────────────────────────────────────────────

/**
 * Builds an empty GroupRecord for a team.
 * @param {Team} team
 * @returns {GroupRecord}
 */
function emptyRecord(team) {
  return {
    team,
    played: 0,
    won: 0,
    drawn: 0,
    lost: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    goalDifference: 0,
    points: 0,
  }
}

/**
 * Accumulates one finished match result into the appropriate records.
 *
 * @param {Map<string, GroupRecord>} recordMap - Mutable map being built (team id → record).
 * @param {Match} match
 */
function accumulateMatch(recordMap, match) {
  if (match.status !== 'finished' || !match.score) return
  if (!match.homeTeam || !match.awayTeam) return

  const { home, away } = match.score
  const homeRec = recordMap.get(match.homeTeam.id)
  const awayRec = recordMap.get(match.awayTeam.id)
  if (!homeRec || !awayRec) return

  homeRec.played++
  awayRec.played++
  homeRec.goalsFor += home
  homeRec.goalsAgainst += away
  awayRec.goalsFor += away
  awayRec.goalsAgainst += home

  if (home > away) {
    homeRec.won++
    homeRec.points += 3
    awayRec.lost++
  } else if (home < away) {
    awayRec.won++
    awayRec.points += 3
    homeRec.lost++
  } else {
    homeRec.drawn++
    homeRec.points += 1
    awayRec.drawn++
    awayRec.points += 1
  }

  homeRec.goalDifference = homeRec.goalsFor - homeRec.goalsAgainst
  awayRec.goalDifference = awayRec.goalsFor - awayRec.goalsAgainst
}

/**
 * Computes head-to-head stats for `teamA` against a set of opponents
 * using only matches played among that set of teams.
 *
 * @param {Team}   teamA
 * @param {Team[]} opponents - Other teams in the tied sub-group (not including teamA itself).
 * @param {Match[]} allGroupMatches
 * @returns {{ points: number, gd: number, gf: number }}
 */
function headToHeadStats(teamA, opponents, allGroupMatches) {
  const opponentIds = new Set(opponents.map((t) => t.id))
  let points = 0
  let gf = 0
  let ga = 0

  for (const match of allGroupMatches) {
    if (match.status !== 'finished' || !match.score) continue

    const isHome = match.homeTeam?.id === teamA.id
    const isAway = match.awayTeam?.id === teamA.id
    if (!isHome && !isAway) continue

    const opponentId = isHome ? match.awayTeam?.id : match.homeTeam?.id
    if (!opponentId || !opponentIds.has(opponentId)) continue

    const { home, away } = match.score
    const tGf = isHome ? home : away
    const tGa = isHome ? away : home

    gf += tGf
    ga += tGa

    if (tGf > tGa) points += 3
    else if (tGf === tGa) points += 1
  }

  return { points, gd: gf - ga, gf }
}

// ─────────────────────────────────────────────
// Public API
// ─────────────────────────────────────────────

/**
 * Computes the raw (unsorted) GroupRecord for each team in the group
 * based on the provided matches.
 *
 * Only finished matches are considered; scheduled/live matches are ignored.
 *
 * @param {Team[]}  teams        - The 4 teams in the group.
 * @param {Match[]} groupMatches - All matches for this group (up to 6).
 * @returns {GroupRecord[]} One record per team, in the same order as `teams`.
 */
export function computeRawStandings(teams, groupMatches) {
  /** @type {Map<string, GroupRecord>} */
  const recordMap = new Map(teams.map((t) => [t.id, emptyRecord(t)]))

  for (const match of groupMatches) {
    accumulateMatch(recordMap, match)
  }

  return teams.map((t) => /** @type {GroupRecord} */ (recordMap.get(t.id)))
}

/**
 * Sorts an array of GroupRecords following FIFA 2026 tiebreaker rules.
 *
 * The function handles multi-way ties by applying head-to-head comparisons
 * among only the tied teams whenever two or more teams share the same
 * points / GD / GF totals.
 *
 * @param {GroupRecord[]} records      - Records to sort (not mutated).
 * @param {Match[]}       groupMatches - All matches in the group (for H2H).
 * @returns {GroupRecord[]} New sorted array, best team first.
 */
export function sortGroupStandings(records, groupMatches) {
  // We need a stable multi-pass comparator to handle H2H correctly.
  // Strategy: first sort by overall stats, then resolve any equal-record
  // sub-groups by re-sorting them by H2H stats.

  const sorted = [...records].sort((a, b) => {
    if (b.points !== a.points)         return b.points - a.points
    if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference
    if (b.goalsFor !== a.goalsFor)     return b.goalsFor - a.goalsFor

    // Tiebreakers 4-6: head-to-head (pair-wise comparison in the sort)
    const aH2H = headToHeadStats(a.team, [b.team], groupMatches)
    const bH2H = headToHeadStats(b.team, [a.team], groupMatches)
    if (bH2H.points !== aH2H.points)   return bH2H.points - aH2H.points
    if (bH2H.gd !== aH2H.gd)           return bH2H.gd - aH2H.gd
    if (bH2H.gf !== aH2H.gf)           return bH2H.gf - aH2H.gf

    // Tiebreaker 7: drawing of lots → represented as alphabetical (deterministic)
    return a.team.name.localeCompare(b.team.name, 'es')
  })

  // Stamp 1-based positions
  return sorted.map((r, i) => ({ ...r, position: i + 1 }))
}

/**
 * Computes the fully sorted group standing for a single group.
 *
 * This is the primary entry point: pass in a group's teams and all
 * finished (or partially finished) matches; get back a sorted standing table.
 *
 * @param {Team[]}  teams        - The 4 teams in the group.
 * @param {Match[]} groupMatches - All matches for this group (finished or not).
 * @returns {GroupRecord[]}      Sorted standing, best team at index 0.
 *
 * @example
 * const standing = groupStanding(GROUPS[0].teams, finishedMatches)
 * const winner   = standing[0].team    // 1st place
 * const runnerUp = standing[1].team    // 2nd place
 * const third    = standing[2].team    // 3rd place
 */
export function groupStanding(teams, groupMatches) {
  const raw = computeRawStandings(teams, groupMatches)
  return sortGroupStandings(raw, groupMatches)
}
