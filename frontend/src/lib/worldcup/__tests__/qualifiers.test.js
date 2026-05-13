/**
 * @fileoverview Tests for worldcup/qualifiers.js
 *
 * Covers:
 *  - computeQualifiers returns correct top-2 per group
 *  - computeQualifiers picks the best 8 third-placed teams
 *  - Correct handling of third-place tiebreakers (pts → GD → GF → alpha)
 *  - qualifiersToList returns 32 entries
 *  - Works with full GROUPS / generateAllGroupMatches fixture
 */

import { describe, it, expect } from 'vitest'
import { computeQualifiers, qualifiersToList } from '../qualifiers.js'
import { GROUPS, generateGroupMatches } from '../data.js'

// ─────────────────────────────────────────────
// Helpers (shared with standings tests)
// ─────────────────────────────────────────────

function makeTeam(id, name) {
  return { id, code: id, name: name ?? id, confederation: 'UEFA' }
}

function makeGroup(id, teams) {
  return { id, name: `Grupo ${id}`, teams }
}

function finishedMatch(groupId, home, away, hg, ag) {
  return {
    id: `${groupId}-${home.id}vs${away.id}`,
    round: 'group',
    groupId,
    homeTeam: home,
    awayTeam: away,
    score: { home: hg, away: ag },
    status: 'finished',
  }
}

/**
 * Builds a minimal set of 12 groups (4 teams each, letter IDs A–L)
 * and a complete round-robin result that gives each group a clear winner.
 *
 * Team naming convention: `{groupId}-{1..4}` where `{groupId}-1` wins.
 */
function buildMinimalFixture() {
  const groups = []
  const matches = []

  for (const letter of 'ABCDEFGHIJKL') {
    const t = [
      makeTeam(`${letter}1`, `${letter} Team1`),
      makeTeam(`${letter}2`, `${letter} Team2`),
      makeTeam(`${letter}3`, `${letter} Team3`),
      makeTeam(`${letter}4`, `${letter} Team4`),
    ]
    groups.push(makeGroup(letter, t))

    // Team1 wins all, Team2 draws with Team3, Team4 loses all
    // → standings: T1 (9pts) > T2 (3+1) > T3 (1+1) > T4 (0pts)
    // T1: W W W = 9 pts
    // T2: L D W = 4 pts  (loses to T1, draws T3, beats T4)
    // T3: L D L = 1 pt   (loses to T1, draws T2, loses T4... wait)
    // Let's make T2 (4pts) > T3 (1pt) > T4 (0pts) clearly:
    matches.push(
      finishedMatch(letter, t[0], t[1], 3, 0), // T1 beats T2
      finishedMatch(letter, t[0], t[2], 2, 0), // T1 beats T3
      finishedMatch(letter, t[0], t[3], 1, 0), // T1 beats T4
      finishedMatch(letter, t[1], t[2], 1, 0), // T2 beats T3
      finishedMatch(letter, t[1], t[3], 1, 0), // T2 beats T4
      finishedMatch(letter, t[2], t[3], 1, 0), // T3 beats T4
    )
  }

  return { groups, matches }
}

// ─────────────────────────────────────────────
// Tests
// ─────────────────────────────────────────────

describe('computeQualifiers() — minimal fixture (12 groups, clear winner)', () => {
  it('returns correct top-2 for each group', () => {
    const { groups, matches } = buildMinimalFixture()
    const { groupWinners, groupRunnersUp } = computeQualifiers(groups, matches)

    for (const letter of 'ABCDEFGHIJKL') {
      expect(groupWinners[letter].id).toBe(`${letter}1`)
      expect(groupRunnersUp[letter].id).toBe(`${letter}2`)
    }
  })

  it('returns exactly 8 third-placed teams', () => {
    const { groups, matches } = buildMinimalFixture()
    const { thirdPlaced } = computeQualifiers(groups, matches)
    expect(thirdPlaced).toHaveLength(8)
  })

  it('thirdPlaced entries include team + groupId + record', () => {
    const { groups, matches } = buildMinimalFixture()
    const { thirdPlaced } = computeQualifiers(groups, matches)
    for (const entry of thirdPlaced) {
      expect(entry).toHaveProperty('team')
      expect(entry).toHaveProperty('groupId')
      expect(entry).toHaveProperty('record')
      expect(typeof entry.groupId).toBe('string')
    }
  })

  it('third-placed teams are ordered best first (by pts then GD then GF then alpha)', () => {
    const { groups, matches } = buildMinimalFixture()
    const { thirdPlaced } = computeQualifiers(groups, matches)

    // In our minimal fixture every T3 has exactly 1 pt, GD=0, GF=1 — all equal.
    // Alphabetical fallback must hold.
    for (let i = 0; i < thirdPlaced.length - 1; i++) {
      const a = thirdPlaced[i]
      const b = thirdPlaced[i + 1]
      const cmpPts = b.record.points - a.record.points
      const cmpGD  = b.record.goalDifference - a.record.goalDifference
      const cmpGF  = b.record.goalsFor - a.record.goalsFor
      const cmpAlpha = a.team.name.localeCompare(b.team.name, 'es')

      // The first non-zero comparator determines order; must favour `a` (≤ 0)
      const decisive = cmpPts !== 0 ? cmpPts
        : cmpGD !== 0 ? cmpGD
        : cmpGF !== 0 ? cmpGF
        : cmpAlpha
      expect(decisive).toBeLessThanOrEqual(0)
    }
  })

  it('third-placed teams come from distinct groups', () => {
    const { groups, matches } = buildMinimalFixture()
    const { thirdPlaced } = computeQualifiers(groups, matches)
    const groupIds = thirdPlaced.map((e) => e.groupId)
    expect(new Set(groupIds).size).toBe(8)
  })
})

describe('computeQualifiers() — third-place tiebreaker priority', () => {
  it('higher-points third-placed team beats lower-points one', () => {
    // Build 12 groups where:
    //   Group A:  T1 draws T3 (T3 gets 1pt from that) + T3 beats T4 = 4pts for T3 (3rd place)
    //             T1=7pts, T2=6pts, T3=4pts, T4=0pts
    //   Others:   T4 beats T3 so T4 is 3rd with 3pts, T3 is 4th
    //
    // Result: A3 (4pts) outranks all other 3rd-placed teams (3pts each)
    // → A3 must be thirdPlaced[0]

    const groupIds = 'ABCDEFGHIJKL'.split('')
    const specialGroups = []
    const specialMatches = []

    for (const letter of groupIds) {
      const t = [
        makeTeam(`${letter}1`, `${letter} Team1`),
        makeTeam(`${letter}2`, `${letter} Team2`),
        makeTeam(`${letter}3`, `${letter} Team3`),
        makeTeam(`${letter}4`, `${letter} Team4`),
      ]
      specialGroups.push(makeGroup(letter, t))

      if (letter === 'A') {
        // T1 draws T3 → T3 gets 1pt; T3 also beats T4 → T3 gets 3pts total = 4pts
        // T1: beats T2 (3) + draws T3 (1) + beats T4 (3) = 7pts  → 1st
        // T2: beats T3 (3) + beats T4 (3) + loses T1 (0)  = 6pts → 2nd
        // T3: draws T1 (1) + loses T2 (0) + beats T4 (3)  = 4pts → 3rd ✓
        // T4: 0pts → 4th
        specialMatches.push(
          finishedMatch(letter, t[0], t[1], 2, 0), // T1 beats T2
          finishedMatch(letter, t[0], t[2], 0, 0), // T1 draws T3 (T3 gets 1pt)
          finishedMatch(letter, t[0], t[3], 1, 0), // T1 beats T4
          finishedMatch(letter, t[1], t[2], 1, 0), // T2 beats T3
          finishedMatch(letter, t[1], t[3], 1, 0), // T2 beats T4
          finishedMatch(letter, t[2], t[3], 1, 0), // T3 beats T4 → T3 has 4pts total
        )
      } else {
        // T4 beats T3 → T4 is 3rd with 3pts; T3 is 4th with 0pts
        // T1=9pts, T2=6pts, T4=3pts (3rd), T3=0pts (4th)
        specialMatches.push(
          finishedMatch(letter, t[0], t[1], 2, 0), // T1 beats T2
          finishedMatch(letter, t[0], t[2], 1, 0), // T1 beats T3
          finishedMatch(letter, t[0], t[3], 1, 0), // T1 beats T4
          finishedMatch(letter, t[1], t[2], 1, 0), // T2 beats T3
          finishedMatch(letter, t[1], t[3], 1, 0), // T2 beats T4
          finishedMatch(letter, t[3], t[2], 1, 0), // T4 beats T3 → T3 gets 0pts
        )
      }
    }

    const { thirdPlaced } = computeQualifiers(specialGroups, specialMatches)

    // A3 has 4 pts; all other 3rd-placed teams have 3 pts.
    // A3 must be ranked #1 in the third-placed list.
    expect(thirdPlaced[0].team.id).toBe('A3')
    expect(thirdPlaced[0].record.points).toBe(4)

    // All others should have 3 pts
    for (const entry of thirdPlaced.slice(1)) {
      expect(entry.record.points).toBe(3)
    }
  })
})

describe('qualifiersToList()', () => {
  it('returns exactly 32 teams', () => {
    const { groups, matches } = buildMinimalFixture()
    const qualifiers = computeQualifiers(groups, matches)
    const list = qualifiersToList(qualifiers)
    expect(list).toHaveLength(32)
  })

  it('all 32 entries are defined (no undefined/null)', () => {
    const { groups, matches } = buildMinimalFixture()
    const qualifiers = computeQualifiers(groups, matches)
    const list = qualifiersToList(qualifiers)
    for (const team of list) {
      expect(team).toBeDefined()
      expect(team).not.toBeNull()
    }
  })

  it('list contains 12 group winners + 12 runners-up + 8 third-placed', () => {
    const { groups, matches } = buildMinimalFixture()
    const qualifiers = computeQualifiers(groups, matches)
    const { groupWinners, groupRunnersUp, thirdPlaced } = qualifiers
    const list = qualifiersToList(qualifiers)

    const winnerIds = new Set(Object.values(groupWinners).map((t) => t.id))
    const runnerIds = new Set(Object.values(groupRunnersUp).map((t) => t.id))
    const thirdIds  = new Set(thirdPlaced.map((e) => e.team.id))

    let winnerCount = 0, runnerCount = 0, thirdCount = 0
    for (const team of list) {
      if (winnerIds.has(team.id)) winnerCount++
      else if (runnerIds.has(team.id)) runnerCount++
      else if (thirdIds.has(team.id)) thirdCount++
    }

    expect(winnerCount).toBe(12)
    expect(runnerCount).toBe(12)
    expect(thirdCount).toBe(8)
  })
})

describe('computeQualifiers() — with real GROUPS data', () => {
  /**
   * Builds a complete set of finished group matches where team[0] in each
   * group wins all 3 games and team[1] beats team[2] and team[3].
   */
  function buildRealGroupMatches() {
    return GROUPS.flatMap((group) => {
      const [t0, t1, t2, t3] = group.teams
      return [
        finishedMatch(group.id, t0, t1, 2, 0),
        finishedMatch(group.id, t0, t2, 2, 0),
        finishedMatch(group.id, t0, t3, 2, 0),
        finishedMatch(group.id, t1, t2, 1, 0),
        finishedMatch(group.id, t1, t3, 1, 0),
        finishedMatch(group.id, t2, t3, 1, 0),
      ]
    })
  }

  it('group winners are team[0] from each real group', () => {
    const matches = buildRealGroupMatches()
    const { groupWinners } = computeQualifiers(GROUPS, matches)

    for (const group of GROUPS) {
      expect(groupWinners[group.id].id).toBe(group.teams[0].id)
    }
  })

  it('group runners-up are team[1] from each real group', () => {
    const matches = buildRealGroupMatches()
    const { groupRunnersUp } = computeQualifiers(GROUPS, matches)

    for (const group of GROUPS) {
      expect(groupRunnersUp[group.id].id).toBe(group.teams[1].id)
    }
  })

  it('exactly 8 third-placed teams qualify', () => {
    const matches = buildRealGroupMatches()
    const { thirdPlaced } = computeQualifiers(GROUPS, matches)
    expect(thirdPlaced).toHaveLength(8)
  })

  it('total of 32 qualifiers', () => {
    const matches = buildRealGroupMatches()
    const qualifiers = computeQualifiers(GROUPS, matches)
    const list = qualifiersToList(qualifiers)
    expect(list).toHaveLength(32)
  })
})
