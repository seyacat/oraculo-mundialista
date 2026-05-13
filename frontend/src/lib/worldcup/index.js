/**
 * @fileoverview Public API for the worldcup domain module.
 *
 * Import from this file to access all World Cup 2026 data and pure-logic
 * functions.  Internal files (types.js, standings.js, etc.) can be imported
 * directly when you need a specific subset, but this barrel export is the
 * recommended entry point.
 *
 * @example
 * import {
 *   GROUPS, TEAMS, getTeam,
 *   groupStanding,
 *   computeQualifiers,
 *   initBracket, propagateWinner, computeBracket, getChampion,
 * } from '@/lib/worldcup'
 */

// ── Data ──────────────────────────────────────────────────────────────────────
export {
  TEAMS,
  TEAM_BY_ID,
  getTeam,
  GROUPS,
  GROUP_BY_ID,
  generateGroupMatches,
  generateAllGroupMatches,
} from './data.js'

// ── Standings ─────────────────────────────────────────────────────────────────
export {
  computeRawStandings,
  sortGroupStandings,
  groupStanding,
} from './standings.js'

// ── Qualifiers ────────────────────────────────────────────────────────────────
export {
  computeQualifiers,
  qualifiersToList,
} from './qualifiers.js'

// ── Bracket ───────────────────────────────────────────────────────────────────
export {
  initBracket,
  propagateWinner,
  computeBracket,
  flattenBracket,
  getBracketMatch,
  getChampion,
  getR32Pairings,
} from './bracket.js'
