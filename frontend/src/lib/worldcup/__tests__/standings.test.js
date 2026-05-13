/**
 * @fileoverview Tests for worldcup/standings.js
 *
 * Covers:
 *  - groupStanding: basic win/draw/loss accumulation
 *  - sortGroupStandings: correct ordering by pts → GD → GF
 *  - Tiebreaker chain: H2H pts, H2H GD, H2H GF, alphabetical
 *  - computeRawStandings: unordered records
 *  - Edge cases: all draws, perfect record, partial standings
 */

import { describe, it, expect } from 'vitest'
import { groupStanding, computeRawStandings, sortGroupStandings } from '../standings.js'

// ─────────────────────────────────────────────
// Test helpers
// ─────────────────────────────────────────────

/**
 * Creates a minimal Team object for tests.
 * @param {string} id
 * @param {string} [name]
 * @returns {import('../types.js').Team}
 */
function makeTeam(id, name) {
  return { id, code: id, name: name ?? id, confederation: 'UEFA' }
}

/**
 * Creates a finished match.
 * @param {string} groupId
 * @param {import('../types.js').Team} home
 * @param {import('../types.js').Team} away
 * @param {number} homeGoals
 * @param {number} awayGoals
 * @returns {import('../types.js').Match}
 */
function makeMatch(groupId, home, away, homeGoals, awayGoals) {
  return {
    id: `${groupId}-${home.id}vs${away.id}`,
    round: 'group',
    groupId,
    homeTeam: home,
    awayTeam: away,
    score: { home: homeGoals, away: awayGoals },
    status: 'finished',
  }
}

describe('computeRawStandings()', () => {
  it('all teams start at zero when no matches are finished', () => {
    const teams = [makeTeam('A'), makeTeam('B'), makeTeam('C'), makeTeam('D')]
    const scheduledMatch = {
      id: 'x',
      round: 'group',
      groupId: 'Z',
      homeTeam: teams[0],
      awayTeam: teams[1],
      score: null,
      status: 'scheduled',
    }
    const records = computeRawStandings(teams, [scheduledMatch])
    for (const rec of records) {
      expect(rec.played).toBe(0)
      expect(rec.points).toBe(0)
    }
  })

  it('correctly accumulates a win and a loss', () => {
    const [home, away, c, d] = [
      makeTeam('HOM'),
      makeTeam('AWY'),
      makeTeam('CCC'),
      makeTeam('DDD'),
    ]
    const match = makeMatch('Z', home, away, 3, 1)
    const records = computeRawStandings([home, away, c, d], [match])

    const homeRec = records.find((r) => r.team.id === 'HOM')
    const awayRec = records.find((r) => r.team.id === 'AWY')

    expect(homeRec.points).toBe(3)
    expect(homeRec.won).toBe(1)
    expect(homeRec.goalsFor).toBe(3)
    expect(homeRec.goalsAgainst).toBe(1)
    expect(homeRec.goalDifference).toBe(2)

    expect(awayRec.points).toBe(0)
    expect(awayRec.lost).toBe(1)
    expect(awayRec.goalsFor).toBe(1)
    expect(awayRec.goalsAgainst).toBe(3)
    expect(awayRec.goalDifference).toBe(-2)
  })

  it('correctly accumulates a draw', () => {
    const [a, b, c, d] = [makeTeam('A'), makeTeam('B'), makeTeam('C'), makeTeam('D')]
    const match = makeMatch('Z', a, b, 1, 1)
    const records = computeRawStandings([a, b, c, d], [match])

    const aRec = records.find((r) => r.team.id === 'A')
    const bRec = records.find((r) => r.team.id === 'B')

    expect(aRec.points).toBe(1)
    expect(aRec.drawn).toBe(1)
    expect(bRec.points).toBe(1)
    expect(bRec.drawn).toBe(1)
  })
})

describe('groupStanding() — basic standings', () => {
  it('returns records for all 4 teams', () => {
    const teams = [makeTeam('A'), makeTeam('B'), makeTeam('C'), makeTeam('D')]
    const standing = groupStanding(teams, [])
    expect(standing).toHaveLength(4)
  })

  it('stamps 1-based positions', () => {
    const teams = [makeTeam('A'), makeTeam('B'), makeTeam('C'), makeTeam('D')]
    const standing = groupStanding(teams, [])
    const positions = standing.map((r) => r.position)
    expect(positions).toEqual([1, 2, 3, 4])
  })

  it('correctly ranks teams by points (W=3, D=1)', () => {
    const [a, b, c, d] = [makeTeam('A'), makeTeam('B'), makeTeam('C'), makeTeam('D')]
    const matches = [
      makeMatch('G', a, b, 2, 0), // A wins (3pts), B (0pts)
      makeMatch('G', a, c, 1, 0), // A wins (6pts), C (0pts)
      makeMatch('G', a, d, 1, 1), // A draws (7pts), D (1pt)
      makeMatch('G', b, c, 1, 0), // B wins (3pts), C (0pts)
      makeMatch('G', b, d, 0, 2), // D wins (4pts), B (3pts)
      makeMatch('G', c, d, 1, 1), // C (1pt), D (5pts)
    ]

    const standing = groupStanding([a, b, c, d], matches)
    expect(standing[0].team.id).toBe('A') // 7 pts
    expect(standing[1].team.id).toBe('D') // 5 pts
    expect(standing[2].team.id).toBe('B') // 3 pts
    expect(standing[3].team.id).toBe('C') // 1 pt
  })

  it('sorts by goal difference when points are equal', () => {
    // A and B both win 2, draw 0, lose 1 → 6 pts each
    // But A has better GD
    const [a, b, c, d] = [makeTeam('A'), makeTeam('B'), makeTeam('C'), makeTeam('D')]
    const matches = [
      makeMatch('G', a, c, 3, 0), // A: +3 GD
      makeMatch('G', b, d, 2, 0), // B: +2 GD
      makeMatch('G', a, d, 2, 0), // A: +2 more GD (total +5)
      makeMatch('G', b, c, 1, 0), // B: +1 more GD (total +3)
      makeMatch('G', c, a, 1, 0), // A loses, c wins
      makeMatch('G', d, b, 1, 0), // B loses, d wins
    ]

    const standing = groupStanding([a, b, c, d], matches)
    // Both A and B have 6 pts.  A: GF=5 GA=1 GD=+4; B: GF=3 GA=1 GD=+2
    expect(standing[0].team.id).toBe('A')
    expect(standing[1].team.id).toBe('B')
  })

  it('sorts by goals scored when pts and GD are equal', () => {
    // A and B both have same pts and GD but A has more GF
    const [a, b, c, d] = [makeTeam('A'), makeTeam('B'), makeTeam('C'), makeTeam('D')]
    // Give A and B the same pts (3) and same GD (+2) but different GF
    const matches = [
      makeMatch('G', a, c, 3, 1), // A: 3pts, GD +2, GF=3
      makeMatch('G', b, d, 2, 0), // B: 3pts, GD +2, GF=2
      makeMatch('G', a, d, 0, 1), // A loses
      makeMatch('G', b, c, 0, 1), // B loses
      makeMatch('G', c, b, 0, 0),
      makeMatch('G', d, a, 0, 0),
    ]
    const standing = groupStanding([a, b, c, d], matches)
    const aRec = standing.find((r) => r.team.id === 'A')
    const bRec = standing.find((r) => r.team.id === 'B')
    expect(aRec.position).toBeLessThan(bRec.position) // A ranks higher
  })

  it('all draws scenario — all teams tied at 3 points → sorted alphabetically as tiebreaker', () => {
    // 4 teams, all 6 matches drawn → each team 3 pts, 0 GD, same GF (2)
    const alpha = makeTeam('ZZZ', 'Zambia')
    const beta = makeTeam('AAA', 'Albania')
    const gamma = makeTeam('MMM', 'Moldova')
    const delta = makeTeam('BBB', 'Belarus')

    const teams = [alpha, beta, gamma, delta]
    const matches = [
      makeMatch('X', alpha, beta,  0, 0),
      makeMatch('X', alpha, gamma, 0, 0),
      makeMatch('X', alpha, delta, 0, 0),
      makeMatch('X', beta,  gamma, 0, 0),
      makeMatch('X', beta,  delta, 0, 0),
      makeMatch('X', gamma, delta, 0, 0),
    ]

    const standing = groupStanding(teams, matches)
    // When all else is equal, alphabetical order applies (deterministic)
    const names = standing.map((r) => r.team.name)
    const sortedNames = [...names].sort((a, b) => a.localeCompare(b, 'es'))
    expect(names).toEqual(sortedNames)
  })
})

describe('Head-to-head tiebreaker', () => {
  it('resolves tie between two teams by H2H result', () => {
    // Construct a scenario where A and B both end at 4pts, GD=0, GF=2
    // but A beat B head-to-head.
    //
    // A: beats B 1-0 (3pts), draws C 1-1 (1pt), loses to D 0-1 (0pts)
    //    → 4pts, GF=2, GA=2, GD=0
    // B: loses to A 0-1 (0pts), beats C 2-1 (3pts), draws D 0-0 (1pt)
    //    → 4pts, GF=2, GA=2, GD=0
    // D: beats A 1-0 (3pts), draws B 0-0 (1pt), beats C 1-0 (3pts)
    //    → 7pts (clear 1st)
    // C: draws A 1-1 (1pt), loses B 1-2 (0pts), loses D 0-1 (0pts)
    //    → 1pt (clear 4th)
    const [a, b, c, d] = [makeTeam('A'), makeTeam('B'), makeTeam('C'), makeTeam('D')]
    const matches = [
      makeMatch('G', a, b, 1, 0), // A beats B  (H2H advantage for A)
      makeMatch('G', a, c, 1, 1), // A draws C
      makeMatch('G', d, a, 1, 0), // D beats A
      makeMatch('G', b, c, 2, 1), // B beats C
      makeMatch('G', b, d, 0, 0), // B draws D
      makeMatch('G', d, c, 1, 0), // D beats C
    ]
    const standing = groupStanding([a, b, c, d], matches)

    // Verify the base stats are equal for A and B
    const aRec = standing.find((r) => r.team.id === 'A')
    const bRec = standing.find((r) => r.team.id === 'B')
    expect(aRec.points).toBe(4)
    expect(bRec.points).toBe(4)
    expect(aRec.goalDifference).toBe(0)
    expect(bRec.goalDifference).toBe(0)
    expect(aRec.goalsFor).toBe(2)
    expect(bRec.goalsFor).toBe(2)

    // D is 1st (7 pts), then A (H2H over B), then B, then C
    expect(standing[0].team.id).toBe('D')
    expect(standing[1].team.id).toBe('A')
    expect(standing[2].team.id).toBe('B')
    expect(standing[3].team.id).toBe('C')
  })
})

describe('Edge cases', () => {
  it('ignores scheduled matches (only counts finished)', () => {
    const [a, b, c, d] = [makeTeam('A'), makeTeam('B'), makeTeam('C'), makeTeam('D')]
    const finished = makeMatch('G', a, b, 2, 0)
    const scheduled = {
      id: 'sched',
      round: 'group',
      groupId: 'G',
      homeTeam: c,
      awayTeam: d,
      score: null,
      status: 'scheduled',
    }
    const records = computeRawStandings([a, b, c, d], [finished, scheduled])
    const cRec = records.find((r) => r.team.id === 'C')
    const dRec = records.find((r) => r.team.id === 'D')
    expect(cRec.played).toBe(0)
    expect(dRec.played).toBe(0)
  })

  it('champion path — team that wins all 3 group matches tops the group', () => {
    const [a, b, c, d] = [makeTeam('A'), makeTeam('B'), makeTeam('C'), makeTeam('D')]
    const matches = [
      makeMatch('G', a, b, 1, 0),
      makeMatch('G', a, c, 2, 0),
      makeMatch('G', a, d, 3, 0),
      makeMatch('G', b, c, 0, 0),
      makeMatch('G', b, d, 0, 0),
      makeMatch('G', c, d, 0, 0),
    ]
    const standing = groupStanding([a, b, c, d], matches)
    expect(standing[0].team.id).toBe('A')
    expect(standing[0].points).toBe(9)
    expect(standing[0].won).toBe(3)
  })
})
