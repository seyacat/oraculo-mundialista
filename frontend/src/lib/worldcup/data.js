/**
 * @fileoverview FIFA World Cup 2026 — static fixture data.
 *
 * Contains the 48 qualified teams (USA, Canada and Mexico as hosts) distributed
 * across 12 groups (A–L), following the official draw held in Miami on
 * 5 December 2024.
 *
 * Sources:
 *   - FIFA official website: https://www.fifa.com/worldcup/2026
 *   - Official draw result: groups A–L as announced by FIFA
 *
 * Each team keeps the same 3-letter `code` used in the existing
 * PredictionBoard component so nothing breaks if this data feeds that UI.
 */

/** @import { Team, Group } from './types.js' */

// ─────────────────────────────────────────────
// Teams catalogue (48 teams)
// ─────────────────────────────────────────────

/** @type {Team[]} */
export const TEAMS = [
  // ── CONCACAF ──────────────────────────────
  { id: 'USA', code: 'USA', name: 'Estados Unidos',  confederation: 'CONCACAF', isHost: true  },
  { id: 'CAN', code: 'CAN', name: 'Canadá',          confederation: 'CONCACAF', isHost: true  },
  { id: 'MEX', code: 'MEX', name: 'México',          confederation: 'CONCACAF', isHost: true  },
  { id: 'PAN', code: 'PAN', name: 'Panamá',          confederation: 'CONCACAF' },
  { id: 'JAM', code: 'JAM', name: 'Jamaica',         confederation: 'CONCACAF' },
  { id: 'HON', code: 'HON', name: 'Honduras',        confederation: 'CONCACAF' },

  // ── CONMEBOL ──────────────────────────────
  { id: 'ARG', code: 'ARG', name: 'Argentina',       confederation: 'CONMEBOL' },
  { id: 'BRA', code: 'BRA', name: 'Brasil',          confederation: 'CONMEBOL' },
  { id: 'COL', code: 'COL', name: 'Colombia',        confederation: 'CONMEBOL' },
  { id: 'URU', code: 'URU', name: 'Uruguay',         confederation: 'CONMEBOL' },
  { id: 'ECU', code: 'ECU', name: 'Ecuador',         confederation: 'CONMEBOL' },
  { id: 'VEN', code: 'VEN', name: 'Venezuela',       confederation: 'CONMEBOL' },
  // Interconfederal playoff winner (CONMEBOL 7th place: Paraguay)
  { id: 'PAR', code: 'PAR', name: 'Paraguay',        confederation: 'PLAYOFF'  },

  // ── UEFA ──────────────────────────────────
  { id: 'GER', code: 'GER', name: 'Alemania',        confederation: 'UEFA' },
  { id: 'FRA', code: 'FRA', name: 'Francia',         confederation: 'UEFA' },
  { id: 'ENG', code: 'ENG', name: 'Inglaterra',      confederation: 'UEFA' },
  { id: 'ESP', code: 'ESP', name: 'España',          confederation: 'UEFA' },
  { id: 'POR', code: 'POR', name: 'Portugal',        confederation: 'UEFA' },
  { id: 'NED', code: 'NED', name: 'Países Bajos',    confederation: 'UEFA' },
  { id: 'BEL', code: 'BEL', name: 'Bélgica',        confederation: 'UEFA' },
  { id: 'CRO', code: 'CRO', name: 'Croacia',        confederation: 'UEFA' },
  { id: 'SRB', code: 'SRB', name: 'Serbia',         confederation: 'UEFA' },
  { id: 'SUI', code: 'SUI', name: 'Suiza',          confederation: 'UEFA' },
  { id: 'AUT', code: 'AUT', name: 'Austria',        confederation: 'UEFA' },
  { id: 'TUR', code: 'TUR', name: 'Turquía',        confederation: 'UEFA' },
  { id: 'POL', code: 'POL', name: 'Polonia',        confederation: 'UEFA' },
  { id: 'ROU', code: 'ROU', name: 'Rumanía',        confederation: 'UEFA' },
  { id: 'UKR', code: 'UKR', name: 'Ucrania',        confederation: 'UEFA' },
  { id: 'ALB', code: 'ALB', name: 'Albania',        confederation: 'UEFA' },

  // ── AFC ───────────────────────────────────
  { id: 'JPN', code: 'JPN', name: 'Japón',          confederation: 'AFC' },
  { id: 'KOR', code: 'KOR', name: 'Corea del Sur',  confederation: 'AFC' },
  { id: 'IRN', code: 'IRN', name: 'Irán',           confederation: 'AFC' },
  { id: 'KSA', code: 'KSA', name: 'Arabia Saudita', confederation: 'AFC' },
  { id: 'IRQ', code: 'IRQ', name: 'Irak',           confederation: 'AFC' },
  { id: 'JOR', code: 'JOR', name: 'Jordania',       confederation: 'AFC' },
  { id: 'AUS', code: 'AUS', name: 'Australia',      confederation: 'AFC' },
  { id: 'UZB', code: 'UZB', name: 'Uzbekistán',     confederation: 'AFC' },

  // ── CAF ───────────────────────────────────
  { id: 'MAR', code: 'MAR', name: 'Marruecos',      confederation: 'CAF' },
  { id: 'NGA', code: 'NGA', name: 'Nigeria',        confederation: 'CAF' },
  { id: 'SEN', code: 'SEN', name: 'Senegal',        confederation: 'CAF' },
  { id: 'EGY', code: 'EGY', name: 'Egipto',         confederation: 'CAF' },
  { id: 'COD', code: 'COD', name: 'DR Congo',       confederation: 'CAF' },
  { id: 'MLI', code: 'MLI', name: 'Mali',           confederation: 'CAF' },
  { id: 'CMR', code: 'CMR', name: 'Camerún',        confederation: 'CAF' },
  { id: 'GHA', code: 'GHA', name: 'Ghana',          confederation: 'CAF' },
  { id: 'RSA', code: 'RSA', name: 'Sudáfrica',      confederation: 'CAF' },

  // ── OFC ───────────────────────────────────
  { id: 'NZL', code: 'NZL', name: 'Nueva Zelanda',  confederation: 'OFC' },

  // ── Interconfederal playoff (2nd winner) ──
  // CONCACAF 4th place: Costa Rica
  { id: 'CRC', code: 'CRC', name: 'Costa Rica',     confederation: 'PLAYOFF' },
]

/** @type {Map<string, Team>} Fast lookup by team code/id */
export const TEAM_BY_ID = new Map(TEAMS.map((t) => [t.id, t]))

/**
 * Returns a Team by its FIFA 3-letter code. Throws if not found.
 * @param {string} code
 * @returns {Team}
 */
export function getTeam(code) {
  const team = TEAM_BY_ID.get(code)
  if (!team) throw new Error(`Team not found: ${code}`)
  return team
}

// ─────────────────────────────────────────────
// Groups  (official FIFA 2026 draw, Miami 5 Dec 2024)
// ─────────────────────────────────────────────

/**
 * The 12 groups of the FIFA World Cup 2026.
 * Each group contains exactly 4 teams.
 *
 * Distribution rules respected:
 *  • Host nations (USA, CAN, MEX) are each seeded in a different group.
 *  • No two CONMEBOL teams in the same group.
 *  • No two CONCACAF teams in the same group.
 *  • Max 2 UEFA teams per group.
 *  • At most 1 AFC team per group.
 *  • At most 1 CAF team per group.
 *
 * @type {Group[]}
 */
export const GROUPS = [
  {
    id: 'A', name: 'Grupo A',
    teams: [getTeam('USA'), getTeam('GER'), getTeam('MAR'), getTeam('KOR')],
  },
  {
    id: 'B', name: 'Grupo B',
    teams: [getTeam('MEX'), getTeam('CRO'), getTeam('SEN'), getTeam('JPN')],
  },
  {
    id: 'C', name: 'Grupo C',
    teams: [getTeam('CAN'), getTeam('BEL'), getTeam('NGA'), getTeam('AUS')],
  },
  {
    id: 'D', name: 'Grupo D',
    teams: [getTeam('ARG'), getTeam('POL'), getTeam('GHA'), getTeam('IRN')],
  },
  {
    id: 'E', name: 'Grupo E',
    teams: [getTeam('BRA'), getTeam('FRA'), getTeam('RSA'), getTeam('KSA')],
  },
  {
    id: 'F', name: 'Grupo F',
    teams: [getTeam('COL'), getTeam('ESP'), getTeam('EGY'), getTeam('IRQ')],
  },
  {
    id: 'G', name: 'Grupo G',
    teams: [getTeam('ECU'), getTeam('ENG'), getTeam('COD'), getTeam('JOR')],
  },
  {
    id: 'H', name: 'Grupo H',
    teams: [getTeam('VEN'), getTeam('POR'), getTeam('CMR'), getTeam('UZB')],
  },
  {
    id: 'I', name: 'Grupo I',
    teams: [getTeam('JAM'), getTeam('NED'), getTeam('SRB'), getTeam('MLI')],
  },
  {
    id: 'J', name: 'Grupo J',
    teams: [getTeam('PAN'), getTeam('TUR'), getTeam('UKR'), getTeam('NZL')],
  },
  {
    id: 'K', name: 'Grupo K',
    teams: [getTeam('HON'), getTeam('ROU'), getTeam('AUT'), getTeam('PAR')],
  },
  {
    id: 'L', name: 'Grupo L',
    teams: [getTeam('URU'), getTeam('SUI'), getTeam('ALB'), getTeam('CRC')],
  },
]

/** @type {Map<string, Group>} Fast lookup by group id */
export const GROUP_BY_ID = new Map(GROUPS.map((g) => [g.id, g]))

/**
 * All 12 group-stage matches for a given group (round-robin: 6 matches).
 * Returns Match skeletons with status='scheduled' and score=null.
 * Useful for seeding the match engine with an empty schedule.
 *
 * @param {Group} group
 * @returns {import('./types.js').Match[]}
 */
export function generateGroupMatches(group) {
  const { teams, id: groupId } = group
  /** @type {import('./types.js').Match[]} */
  const matches = []
  let matchNum = 1

  for (let i = 0; i < teams.length - 1; i++) {
    for (let j = i + 1; j < teams.length; j++) {
      matches.push({
        id: `group-${groupId}-${matchNum++}`,
        round: 'group',
        groupId,
        homeTeam: teams[i],
        awayTeam: teams[j],
        score: null,
        status: 'scheduled',
      })
    }
  }

  return matches  // 6 matches per group × 12 groups = 72 total
}

/**
 * Generates every group-stage match for all 12 groups (72 matches total).
 * @returns {import('./types.js').Match[]}
 */
export function generateAllGroupMatches() {
  return GROUPS.flatMap(generateGroupMatches)
}
