/**
 * @fileoverview Tests for worldcup/data.js
 *
 * Covers:
 *  - TEAMS / GROUPS constants integrity
 *  - Group reordering: moving a team preserves all 4 team members
 *  - generateGroupMatches: generates 6 matches with correct pairings
 *  - generateAllGroupMatches: generates 72 total matches
 */

import { describe, it, expect } from 'vitest'
import {
  TEAMS,
  GROUPS,
  GROUP_BY_ID,
  TEAM_BY_ID,
  getTeam,
  generateGroupMatches,
  generateAllGroupMatches,
} from '../data.js'

describe('TEAMS catalogue', () => {
  it('contains exactly 48 teams', () => {
    expect(TEAMS).toHaveLength(48)
  })

  it('every team has required fields', () => {
    for (const team of TEAMS) {
      expect(team).toHaveProperty('id')
      expect(team).toHaveProperty('code')
      expect(team).toHaveProperty('name')
      expect(team).toHaveProperty('confederation')
      expect(team.id).toBe(team.code) // id === code convention
    }
  })

  it('all team IDs are unique', () => {
    const ids = TEAMS.map((t) => t.id)
    expect(new Set(ids).size).toBe(TEAMS.length)
  })

  it('host nations (USA, CAN, MEX) are marked isHost: true', () => {
    for (const code of ['USA', 'CAN', 'MEX']) {
      const team = TEAM_BY_ID.get(code)
      expect(team?.isHost).toBe(true)
    }
  })

  it('non-host teams do not have isHost: true', () => {
    const nonHosts = TEAMS.filter((t) => !['USA', 'CAN', 'MEX'].includes(t.id))
    for (const team of nonHosts) {
      expect(team.isHost).toBeUndefined()
    }
  })
})

describe('getTeam()', () => {
  it('returns the correct team for a valid code', () => {
    const arg = getTeam('ARG')
    expect(arg.name).toBe('Argentina')
    expect(arg.confederation).toBe('CONMEBOL')
  })

  it('throws for an unknown code', () => {
    expect(() => getTeam('XYZ')).toThrow('Team not found: XYZ')
  })
})

describe('GROUPS', () => {
  it('contains exactly 12 groups', () => {
    expect(GROUPS).toHaveLength(12)
  })

  it('group IDs are A–L', () => {
    const ids = GROUPS.map((g) => g.id)
    expect(ids).toEqual(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'])
  })

  it('every group has exactly 4 teams', () => {
    for (const group of GROUPS) {
      expect(group.teams).toHaveLength(4)
    }
  })

  it('every team object in a group is a valid Team (has id, code, name)', () => {
    for (const group of GROUPS) {
      for (const team of group.teams) {
        expect(team).toHaveProperty('id')
        expect(team).toHaveProperty('code')
        expect(team).toHaveProperty('name')
      }
    }
  })

  it('no two groups share the same team', () => {
    const seen = new Set()
    for (const group of GROUPS) {
      for (const team of group.teams) {
        expect(seen.has(team.id)).toBe(false)
        seen.add(team.id)
      }
    }
  })

  it('all 48 teams appear across groups exactly once', () => {
    const allGroupTeamIds = GROUPS.flatMap((g) => g.teams.map((t) => t.id))
    expect(new Set(allGroupTeamIds).size).toBe(48)
    expect(allGroupTeamIds).toHaveLength(48)
  })

  it('GROUP_BY_ID provides fast lookup', () => {
    const groupA = GROUP_BY_ID.get('A')
    expect(groupA?.id).toBe('A')
    expect(GROUP_BY_ID.get('Z')).toBeUndefined()
  })
})

describe('group reordering preserves all 4 teams', () => {
  /**
   * Simulates a drag-and-drop reorder: moves the element at fromIndex
   * to toIndex within the array — same operation as vuedraggable.
   *
   * @param {any[]} arr
   * @param {number} fromIndex
   * @param {number} toIndex
   * @returns {any[]}
   */
  function reorder(arr, fromIndex, toIndex) {
    const result = [...arr]
    const [removed] = result.splice(fromIndex, 1)
    result.splice(toIndex, 0, removed)
    return result
  }

  it('reordering group A teams preserves all 4 members (move 0→3)', () => {
    const group = GROUP_BY_ID.get('A')
    const original = group.teams.map((t) => t.id)
    const reordered = reorder(group.teams, 0, 3).map((t) => t.id)

    expect(reordered).toHaveLength(4)
    expect(new Set(reordered)).toEqual(new Set(original))
  })

  it('reordering group B teams preserves all 4 members (move 2→0)', () => {
    const group = GROUP_BY_ID.get('B')
    const original = group.teams.map((t) => t.id)
    const reordered = reorder(group.teams, 2, 0).map((t) => t.id)

    expect(reordered).toHaveLength(4)
    expect(new Set(reordered)).toEqual(new Set(original))
  })

  it('reordering changes positional order but keeps team set intact', () => {
    const group = GROUP_BY_ID.get('D')
    const original = group.teams.map((t) => t.id)

    // Move last to first
    const reordered = reorder(group.teams, 3, 0).map((t) => t.id)

    // First element changed
    expect(reordered[0]).toBe(original[3])
    // All same teams
    expect(new Set(reordered)).toEqual(new Set(original))
  })

  it('multiple sequential reorders always preserve all 4 teams', () => {
    let teams = [...GROUP_BY_ID.get('L').teams]
    const original = teams.map((t) => t.id)

    // Apply several reorders
    teams = reorder(teams, 0, 2)
    teams = reorder(teams, 3, 1)
    teams = reorder(teams, 1, 0)

    expect(teams).toHaveLength(4)
    expect(new Set(teams.map((t) => t.id))).toEqual(new Set(original))
  })
})

describe('generateGroupMatches()', () => {
  it('generates exactly 6 matches for a 4-team group', () => {
    const group = GROUP_BY_ID.get('A')
    const matches = generateGroupMatches(group)
    expect(matches).toHaveLength(6)
  })

  it('every match is in the correct group', () => {
    const group = GROUP_BY_ID.get('E')
    const matches = generateGroupMatches(group)
    for (const match of matches) {
      expect(match.groupId).toBe('E')
      expect(match.round).toBe('group')
    }
  })

  it('every match has status "scheduled" and score null initially', () => {
    const group = GROUP_BY_ID.get('C')
    const matches = generateGroupMatches(group)
    for (const match of matches) {
      expect(match.status).toBe('scheduled')
      expect(match.score).toBeNull()
    }
  })

  it('all team pairings are unique (no duplicate matchups)', () => {
    const group = GROUP_BY_ID.get('B')
    const matches = generateGroupMatches(group)

    const pairings = matches.map((m) =>
      [m.homeTeam.id, m.awayTeam.id].sort().join('-'),
    )
    expect(new Set(pairings).size).toBe(6)
  })

  it('every team plays exactly 3 matches', () => {
    const group = GROUP_BY_ID.get('F')
    const matches = generateGroupMatches(group)
    const playCount = {}

    for (const match of matches) {
      playCount[match.homeTeam.id] = (playCount[match.homeTeam.id] ?? 0) + 1
      playCount[match.awayTeam.id] = (playCount[match.awayTeam.id] ?? 0) + 1
    }

    for (const team of group.teams) {
      expect(playCount[team.id]).toBe(3)
    }
  })

  it('match IDs are unique within a group', () => {
    const group = GROUP_BY_ID.get('A')
    const matches = generateGroupMatches(group)
    const ids = matches.map((m) => m.id)
    expect(new Set(ids).size).toBe(matches.length)
  })
})

describe('generateAllGroupMatches()', () => {
  it('generates exactly 72 matches (12 groups × 6)', () => {
    const all = generateAllGroupMatches()
    expect(all).toHaveLength(72)
  })

  it('all match IDs are globally unique', () => {
    const all = generateAllGroupMatches()
    const ids = all.map((m) => m.id)
    expect(new Set(ids).size).toBe(72)
  })

  it('each group contributes exactly 6 matches', () => {
    const all = generateAllGroupMatches()
    for (const groupId of 'ABCDEFGHIJKL') {
      const count = all.filter((m) => m.groupId === groupId).length
      expect(count).toBe(6)
    }
  })
})
