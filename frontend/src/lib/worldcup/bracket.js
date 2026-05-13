/**
 * @fileoverview Pure functions for the FIFA World Cup 2026 knockout bracket.
 *
 * Bracket structure:
 *   Round of 32 (16 matches) → Round of 16 (8) → Quarter-finals (4) →
 *   Semi-finals (2) → Third-place play-off (1) + Final (1)
 *
 * ── Round of 32 pairings (official FIFA 2026 bracket) ──────────────────────
 *
 * "Adjacent group" cross-pairings ensure no two teams from the same group
 * can meet again in the Round of 32.  Groups are paired as adjacent letter
 * pairs: A↔B, C↔D, E↔F, G↔H, I↔J, K↔L.
 *
 * Matches 01–12  (group winners vs. runners-up from the paired group):
 *   M01  1A vs 2B     M02  1C vs 2D     M03  1E vs 2F
 *   M04  1G vs 2H     M05  1I vs 2J     M06  1K vs 2L
 *   M07  1B vs 2A     M08  1D vs 2C     M09  1F vs 2E
 *   M10  1H vs 2G     M11  1J vs 2I     M12  1L vs 2K
 *
 * Matches 13–16  (8 best third-placed teams, ranked 1st–8th):
 *   M13  3rd#1 vs 3rd#2    M14  3rd#3 vs 3rd#4
 *   M15  3rd#5 vs 3rd#6    M16  3rd#7 vs 3rd#8
 *
 * ── Round of 16 / QF / SF / Final feeding ──────────────────────────────────
 *
 *   R16-1  W(M01) vs W(M02)    R16-2  W(M03) vs W(M04)
 *   R16-3  W(M05) vs W(M06)    R16-4  W(M07) vs W(M08)
 *   R16-5  W(M09) vs W(M10)    R16-6  W(M11) vs W(M12)
 *   R16-7  W(M13) vs W(M14)    R16-8  W(M15) vs W(M16)
 *
 *   QF-1  W(R16-1) vs W(R16-2)    QF-2  W(R16-3) vs W(R16-4)
 *   QF-3  W(R16-5) vs W(R16-6)    QF-4  W(R16-7) vs W(R16-8)
 *
 *   SF-1  W(QF-1) vs W(QF-2)    SF-2  W(QF-3) vs W(QF-4)
 *
 *   3rd-place  L(SF-1) vs L(SF-2)
 *   Final      W(SF-1) vs W(SF-2)
 */

/** @import { Team, Bracket, BracketMatch, Qualifiers } from './types.js' */

// ─────────────────────────────────────────────
// Constants — bracket graph (id → feeding info)
// ─────────────────────────────────────────────

/**
 * Static definition of every match in the bracket.
 * `homeSource` and `awaySource` are opaque label strings used for display and
 * for `initBracket` to resolve teams from the qualifiers object.
 *
 * Convention for source strings:
 *   '1A'        → winner of group A
 *   '2B'        → runner-up of group B
 *   '3rd-N'     → N-th best third-placed team (N = 1..8)
 *   'W:r32-3'   → winner of Round-of-32 match #3
 *   'W:r16-2'   → winner of Round-of-16 match #2
 *   etc.
 *
 * @type {Array<{id: string, round: import('./types.js').Round, matchNumber: number,
 *               homeSource: string, awaySource: string,
 *               nextMatchId: string, loserMatchId?: string}>}
 */
const MATCH_GRAPH = [
  // ── Round of 32 ─────────────────────────────
  { id: 'r32-1',  round: 'r32', matchNumber: 1,  homeSource: '1A',     awaySource: '2B',    nextMatchId: 'r16-1' },
  { id: 'r32-2',  round: 'r32', matchNumber: 2,  homeSource: '1C',     awaySource: '2D',    nextMatchId: 'r16-1' },
  { id: 'r32-3',  round: 'r32', matchNumber: 3,  homeSource: '1E',     awaySource: '2F',    nextMatchId: 'r16-2' },
  { id: 'r32-4',  round: 'r32', matchNumber: 4,  homeSource: '1G',     awaySource: '2H',    nextMatchId: 'r16-2' },
  { id: 'r32-5',  round: 'r32', matchNumber: 5,  homeSource: '1I',     awaySource: '2J',    nextMatchId: 'r16-3' },
  { id: 'r32-6',  round: 'r32', matchNumber: 6,  homeSource: '1K',     awaySource: '2L',    nextMatchId: 'r16-3' },
  { id: 'r32-7',  round: 'r32', matchNumber: 7,  homeSource: '1B',     awaySource: '2A',    nextMatchId: 'r16-4' },
  { id: 'r32-8',  round: 'r32', matchNumber: 8,  homeSource: '1D',     awaySource: '2C',    nextMatchId: 'r16-4' },
  { id: 'r32-9',  round: 'r32', matchNumber: 9,  homeSource: '1F',     awaySource: '2E',    nextMatchId: 'r16-5' },
  { id: 'r32-10', round: 'r32', matchNumber: 10, homeSource: '1H',     awaySource: '2G',    nextMatchId: 'r16-5' },
  { id: 'r32-11', round: 'r32', matchNumber: 11, homeSource: '1J',     awaySource: '2I',    nextMatchId: 'r16-6' },
  { id: 'r32-12', round: 'r32', matchNumber: 12, homeSource: '1L',     awaySource: '2K',    nextMatchId: 'r16-6' },
  { id: 'r32-13', round: 'r32', matchNumber: 13, homeSource: '3rd-1',  awaySource: '3rd-2', nextMatchId: 'r16-7' },
  { id: 'r32-14', round: 'r32', matchNumber: 14, homeSource: '3rd-3',  awaySource: '3rd-4', nextMatchId: 'r16-7' },
  { id: 'r32-15', round: 'r32', matchNumber: 15, homeSource: '3rd-5',  awaySource: '3rd-6', nextMatchId: 'r16-8' },
  { id: 'r32-16', round: 'r32', matchNumber: 16, homeSource: '3rd-7',  awaySource: '3rd-8', nextMatchId: 'r16-8' },

  // ── Round of 16 ─────────────────────────────
  { id: 'r16-1', round: 'r16', matchNumber: 1, homeSource: 'W:r32-1',  awaySource: 'W:r32-2',  nextMatchId: 'qf-1' },
  { id: 'r16-2', round: 'r16', matchNumber: 2, homeSource: 'W:r32-3',  awaySource: 'W:r32-4',  nextMatchId: 'qf-1' },
  { id: 'r16-3', round: 'r16', matchNumber: 3, homeSource: 'W:r32-5',  awaySource: 'W:r32-6',  nextMatchId: 'qf-2' },
  { id: 'r16-4', round: 'r16', matchNumber: 4, homeSource: 'W:r32-7',  awaySource: 'W:r32-8',  nextMatchId: 'qf-2' },
  { id: 'r16-5', round: 'r16', matchNumber: 5, homeSource: 'W:r32-9',  awaySource: 'W:r32-10', nextMatchId: 'qf-3' },
  { id: 'r16-6', round: 'r16', matchNumber: 6, homeSource: 'W:r32-11', awaySource: 'W:r32-12', nextMatchId: 'qf-3' },
  { id: 'r16-7', round: 'r16', matchNumber: 7, homeSource: 'W:r32-13', awaySource: 'W:r32-14', nextMatchId: 'qf-4' },
  { id: 'r16-8', round: 'r16', matchNumber: 8, homeSource: 'W:r32-15', awaySource: 'W:r32-16', nextMatchId: 'qf-4' },

  // ── Quarter-finals ───────────────────────────
  { id: 'qf-1', round: 'qf', matchNumber: 1, homeSource: 'W:r16-1', awaySource: 'W:r16-2', nextMatchId: 'sf-1' },
  { id: 'qf-2', round: 'qf', matchNumber: 2, homeSource: 'W:r16-3', awaySource: 'W:r16-4', nextMatchId: 'sf-1' },
  { id: 'qf-3', round: 'qf', matchNumber: 3, homeSource: 'W:r16-5', awaySource: 'W:r16-6', nextMatchId: 'sf-2' },
  { id: 'qf-4', round: 'qf', matchNumber: 4, homeSource: 'W:r16-7', awaySource: 'W:r16-8', nextMatchId: 'sf-2' },

  // ── Semi-finals ──────────────────────────────
  { id: 'sf-1', round: 'sf', matchNumber: 1, homeSource: 'W:qf-1', awaySource: 'W:qf-2', nextMatchId: 'final',  loserMatchId: 'third' },
  { id: 'sf-2', round: 'sf', matchNumber: 2, homeSource: 'W:qf-3', awaySource: 'W:qf-4', nextMatchId: 'final',  loserMatchId: 'third' },

  // ── Third-place & Final ──────────────────────
  { id: 'third', round: 'third', matchNumber: 1, homeSource: 'L:sf-1', awaySource: 'L:sf-2', nextMatchId: '' },
  { id: 'final', round: 'final', matchNumber: 1, homeSource: 'W:sf-1', awaySource: 'W:sf-2', nextMatchId: '' },
]

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

/**
 * Resolves a team from the qualifiers object given a source label string
 * used during bracket initialisation (group-stage sources only).
 *
 * @param {string}     source
 * @param {Qualifiers} qualifiers
 * @returns {Team | null}
 */
function resolveInitialSource(source, qualifiers) {
  // '1A' → group winner of group A
  const winnerMatch = source.match(/^1([A-L])$/)
  if (winnerMatch) return qualifiers.groupWinners[winnerMatch[1]] ?? null

  // '2B' → runner-up of group B
  const runnerMatch = source.match(/^2([A-L])$/)
  if (runnerMatch) return qualifiers.groupRunnersUp[runnerMatch[1]] ?? null

  // '3rd-N' → N-th best third-placed team (1-indexed)
  const thirdMatch = source.match(/^3rd-(\d+)$/)
  if (thirdMatch) {
    const idx = parseInt(thirdMatch[1], 10) - 1
    return qualifiers.thirdPlaced[idx]?.team ?? null
  }

  // Knockout-round sources ('W:r32-3', 'L:sf-1') are not resolved at init time
  return null
}

/**
 * Creates an empty BracketMatch from a static graph definition.
 * @param {typeof MATCH_GRAPH[0]} def
 * @returns {BracketMatch}
 */
function emptyBracketMatch(def) {
  return {
    id:          def.id,
    round:       def.round,
    matchNumber: def.matchNumber,
    homeSource:  def.homeSource,
    awaySource:  def.awaySource,
    homeTeam:    null,
    awayTeam:    null,
    winner:      null,
    loser:       null,
    nextMatchId: def.nextMatchId,
    ...(def.loserMatchId ? { loserMatchId: def.loserMatchId } : {}),
  }
}

/**
 * Groups matches by round label.
 * @param {BracketMatch[]} matches
 * @returns {Bracket}
 */
function groupByRound(matches) {
  /** @type {Record<string, BracketMatch[]>} */
  const byRound = {}
  for (const m of matches) {
    ;(byRound[m.round] ??= []).push(m)
  }
  return {
    r32:   byRound['r32']   ?? [],
    r16:   byRound['r16']   ?? [],
    qf:    byRound['qf']    ?? [],
    sf:    byRound['sf']    ?? [],
    third: byRound['third']?.[0] ?? emptyBracketMatch(MATCH_GRAPH.find((d) => d.id === 'third')),
    final: byRound['final']?.[0] ?? emptyBracketMatch(MATCH_GRAPH.find((d) => d.id === 'final')),
  }
}

// ─────────────────────────────────────────────
// Public API
// ─────────────────────────────────────────────

/**
 * Builds the initial knockout bracket with all R32 teams resolved from
 * the qualifiers computed after the group stage.
 *
 * All knockout-round slots are initialised with `homeTeam = null` and
 * `awayTeam = null` (they become known only as results come in).
 *
 * @param {Qualifiers} qualifiers - Output of `computeQualifiers`.
 * @returns {Bracket}
 *
 * @example
 * const bracket = initBracket(computeQualifiers(GROUPS, allMatches))
 * bracket.r32[0].homeTeam  // e.g. Team "Estados Unidos" (1A)
 */
export function initBracket(qualifiers) {
  const matches = MATCH_GRAPH.map((def) => {
    const slot = emptyBracketMatch(def)
    // Only group-stage references can be resolved immediately
    slot.homeTeam = resolveInitialSource(def.homeSource, qualifiers)
    slot.awayTeam = resolveInitialSource(def.awaySource, qualifiers)
    return slot
  })

  return groupByRound(matches)
}

/**
 * Applies a single match result to the bracket and propagates the winner
 * (and loser for semi-finals) to the appropriate next match slot.
 *
 * Returns a NEW bracket object — the input is not mutated.
 *
 * @param {Bracket} bracket      - Current bracket state.
 * @param {string}  matchId      - ID of the match that just finished.
 * @param {Team}    winner       - The team that won (after 90 min or extra/penalties).
 * @param {Team}    loser        - The team that lost.
 * @returns {Bracket}
 *
 * @example
 * const nextBracket = propagateWinner(bracket, 'r32-1', argentinaTeam, franceTeam)
 */
export function propagateWinner(bracket, matchId, winner, loser) {
  // Flatten all matches to a mutable Map for easy lookup
  const allMatches = flattenBracket(bracket)
  const matchMap = new Map(allMatches.map((m) => [m.id, { ...m }]))

  const match = matchMap.get(matchId)
  if (!match) throw new Error(`Match not found in bracket: ${matchId}`)

  // Record result
  match.winner = winner
  match.loser  = loser

  // Propagate winner to the home or away slot of the next match
  if (match.nextMatchId) {
    const next = matchMap.get(match.nextMatchId)
    if (next) {
      if (next.homeSource === `W:${matchId}`) next.homeTeam = winner
      else if (next.awaySource === `W:${matchId}`) next.awayTeam = winner
    }
  }

  // Propagate loser for semi-finals (→ third-place match)
  if (match.loserMatchId) {
    const thirdMatch = matchMap.get(match.loserMatchId)
    if (thirdMatch) {
      if (thirdMatch.homeSource === `L:${matchId}`) thirdMatch.homeTeam = loser
      else if (thirdMatch.awaySource === `L:${matchId}`) thirdMatch.awayTeam = loser
    }
  }

  return groupByRound([...matchMap.values()])
}

/**
 * Applies a batch of match results to the bracket in order.
 * Each result must include the match id, winner, and loser.
 *
 * Results are applied sequentially so that propagated teams are
 * available for later matches in the list.
 *
 * @param {Bracket} bracket
 * @param {Array<{matchId: string, winner: Team, loser: Team}>} results
 * @returns {Bracket}
 *
 * @example
 * const finalBracket = computeBracket(initBracket(qualifiers), knockoutResults)
 */
export function computeBracket(bracket, results) {
  return results.reduce(
    (current, { matchId, winner, loser }) => propagateWinner(current, matchId, winner, loser),
    bracket,
  )
}

/**
 * Flattens all BracketMatch objects from a Bracket into a single array.
 * Useful for iteration, serialisation, or lookup.
 *
 * @param {Bracket} bracket
 * @returns {BracketMatch[]}
 */
export function flattenBracket(bracket) {
  return [
    ...bracket.r32,
    ...bracket.r16,
    ...bracket.qf,
    ...bracket.sf,
    bracket.third,
    bracket.final,
  ]
}

/**
 * Returns the BracketMatch for a given matchId, or null if not found.
 *
 * @param {Bracket} bracket
 * @param {string}  matchId
 * @returns {BracketMatch | null}
 */
export function getBracketMatch(bracket, matchId) {
  return flattenBracket(bracket).find((m) => m.id === matchId) ?? null
}

/**
 * Returns the champion (the winner of the Final), or null if the Final
 * has not been played yet.
 *
 * @param {Bracket} bracket
 * @returns {Team | null}
 */
export function getChampion(bracket) {
  return bracket.final.winner ?? null
}

/**
 * Exposes the static R32 pairing table so consumers can show the expected
 * bracket structure before the group stage ends (useful for prediction UI).
 *
 * @returns {ReadonlyArray<{id: string, homeSource: string, awaySource: string}>}
 */
export function getR32Pairings() {
  return MATCH_GRAPH
    .filter((d) => d.round === 'r32')
    .map(({ id, homeSource, awaySource }) => ({ id, homeSource, awaySource }))
}
