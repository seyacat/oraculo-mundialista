/**
 * @fileoverview JSDoc type definitions for the Oráculo Mundial domain model.
 *
 * These types describe the FIFA World Cup 2026 data model used throughout
 * the worldcup/ library. Because the project is plain JS (no TypeScript),
 * all types are defined here via @typedef so editors and tools provide
 * autocompletion, param checking and hover-documentation.
 */

// ─────────────────────────────────────────────
// Teams
// ─────────────────────────────────────────────

/**
 * FIFA confederation identifier.
 * @typedef {'UEFA' | 'CONMEBOL' | 'CONCACAF' | 'AFC' | 'CAF' | 'OFC' | 'PLAYOFF'} Confederation
 */

/**
 * A national team participating in the World Cup.
 *
 * @typedef {Object} Team
 * @property {string}        id            - Unique identifier (same as `code`).
 * @property {string}        code          - FIFA 3-letter code, e.g. 'ARG'.
 * @property {string}        name          - Display name in Spanish.
 * @property {Confederation} confederation - Confederation the team belongs to.
 * @property {boolean}       [isHost]      - Whether this is a host nation (USA, CAN, MEX).
 */

// ─────────────────────────────────────────────
// Groups
// ─────────────────────────────────────────────

/**
 * One of the 12 groups (A–L) in the FIFA World Cup 2026 group stage.
 *
 * @typedef {Object} Group
 * @property {string} id    - Single letter identifier: 'A'–'L'.
 * @property {string} name  - Display name, e.g. 'Grupo A'.
 * @property {Team[]} teams - Exactly 4 teams.
 */

/**
 * Standing record for a single team within a group after some or all
 * group-stage matches have been played.
 *
 * @typedef {Object} GroupRecord
 * @property {Team}   team           - The team this record belongs to.
 * @property {number} played         - Matches played.
 * @property {number} won            - Matches won.
 * @property {number} drawn          - Matches drawn.
 * @property {number} lost           - Matches lost.
 * @property {number} goalsFor       - Goals scored.
 * @property {number} goalsAgainst   - Goals conceded.
 * @property {number} goalDifference - goalsFor − goalsAgainst.
 * @property {number} points         - Accumulated points (W=3, D=1, L=0).
 * @property {number} [position]     - 1-based final standing within the group (set after sort).
 */

// ─────────────────────────────────────────────
// Matches
// ─────────────────────────────────────────────

/**
 * Status of a match.
 * @typedef {'scheduled' | 'live' | 'finished'} MatchStatus
 */

/**
 * Score in a match. Both values are 0 or positive integers.
 * @typedef {Object} MatchScore
 * @property {number} home - Goals scored by the home team.
 * @property {number} away - Goals scored by the away team.
 */

/**
 * Which round of the tournament a match belongs to.
 * @typedef {'group' | 'r32' | 'r16' | 'qf' | 'sf' | 'third' | 'final'} Round
 */

/**
 * A single football match, in either the group stage or the knockout stage.
 *
 * @typedef {Object} Match
 * @property {string}          id         - Unique match identifier.
 * @property {Round}           round      - Tournament round.
 * @property {string | null}   groupId    - Group letter ('A'–'L') for group-stage
 *                                          matches; null for knockout matches.
 * @property {Team | null}     homeTeam   - null when not yet determined.
 * @property {Team | null}     awayTeam   - null when not yet determined.
 * @property {MatchScore|null} score      - null when match is not finished.
 * @property {MatchStatus}     status     - Lifecycle status.
 * @property {string}          [venue]    - Stadium / host city.
 * @property {string}          [kickoff]  - ISO-8601 datetime string.
 */

// ─────────────────────────────────────────────
// Knockout Bracket
// ─────────────────────────────────────────────

/**
 * Describes from where a bracket slot's team is sourced.
 * Examples: '1A' (winner of Group A), '2B' (runner-up of Group B),
 * '3rd-1' (best third-placed team ranked #1), 'W:r32-3' (winner of R32 match 3).
 * @typedef {string} SlotSource
 */

/**
 * One match slot inside the knockout bracket.
 *
 * @typedef {Object} BracketMatch
 * @property {string}       id           - Unique identifier, e.g. 'r32-1', 'r16-4', 'final'.
 * @property {Round}        round        - Which round this slot belongs to.
 * @property {number}       matchNumber  - 1-based position within the round.
 * @property {SlotSource}   homeSource   - Logical description of where the home team comes from.
 * @property {SlotSource}   awaySource   - Logical description of where the away team comes from.
 * @property {Team | null}  homeTeam     - Resolved home team once qualifiers are known.
 * @property {Team | null}  awayTeam     - Resolved away team once qualifiers are known.
 * @property {Team | null}  winner       - null until the match is played.
 * @property {Team | null}  loser        - null until the match is played (used for 3rd-place).
 * @property {string}       nextMatchId  - ID of the match the winner feeds into.
 * @property {string}       [loserMatchId] - ID of the match the loser feeds into (SF losers → 3rd place).
 */

/**
 * Full knockout bracket for the FIFA World Cup 2026.
 *
 * @typedef {Object} Bracket
 * @property {BracketMatch[]} r32   - 16 Round-of-32 matches.
 * @property {BracketMatch[]} r16   - 8  Round-of-16 matches.
 * @property {BracketMatch[]} qf    - 4  Quarter-final matches.
 * @property {BracketMatch[]} sf    - 2  Semi-final matches.
 * @property {BracketMatch}   third - 1  Third-place play-off match.
 * @property {BracketMatch}   final - 1  Final match.
 */

// ─────────────────────────────────────────────
// Qualifier output
// ─────────────────────────────────────────────

/**
 * Third-placed team entry, augmented with its group standing record for
 * comparison across groups.
 *
 * @typedef {Object} ThirdPlacedEntry
 * @property {Team}        team    - The third-placed team.
 * @property {string}      groupId - The group they finished third in ('A'–'L').
 * @property {GroupRecord} record  - Their group-stage stats (for tiebreakers).
 */

/**
 * The 32 teams that advance to the knockout stage.
 *
 * @typedef {Object} Qualifiers
 * @property {Record<string, Team>} groupWinners    - Keyed by group id ('A'–'L').
 * @property {Record<string, Team>} groupRunnersUp  - Keyed by group id.
 * @property {ThirdPlacedEntry[]}   thirdPlaced     - Exactly 8 entries, sorted best-first.
 */

// ─────────────────────────────────────────────
// Prediction
// ─────────────────────────────────────────────

/**
 * A user's prediction for a single match.
 *
 * @typedef {Object} Prediction
 * @property {string}      id          - Unique prediction id.
 * @property {string}      userId      - Clerk user id.
 * @property {string}      communityId - Community the prediction belongs to.
 * @property {string}      matchId     - The match being predicted.
 * @property {number}      homeScore   - Predicted home goals.
 * @property {number}      awayScore   - Predicted away goals.
 * @property {string|null} powerId     - Optional strategic power applied.
 * @property {boolean}     saved       - Whether the prediction has been persisted.
 * @property {string}      createdAt   - ISO-8601 datetime string.
 */

export {}
