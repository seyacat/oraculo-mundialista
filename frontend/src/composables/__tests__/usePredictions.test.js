import { describe, it, expect, beforeEach, vi } from 'vitest'

const STORAGE_KEY = 'oraculo:predictions:v1'

function createMockLocalStorage() {
  let store = {}
  return {
    getItem: vi.fn((key) => store[key] ?? null),
    setItem: vi.fn((key, val) => { store[key] = val }),
    removeItem: vi.fn((key) => { delete store[key] }),
    clear: vi.fn(() => { store = {} }),
    _getStore: () => store,
  }
}

describe('usePredictions localStorage round-trip', () => {
  let mockStorage

  beforeEach(() => {
    mockStorage = createMockLocalStorage()
    vi.stubGlobal('localStorage', mockStorage)
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  async function loadFreshUsePredictions() {
    vi.resetModules()
    const mod = await import('../usePredictions.js')
    return mod.usePredictions()
  }

  it('starts with empty matchScores and bracketWinnerIds', async () => {
    const { matchScores, bracketWinnerIds } = await loadFreshUsePredictions()
    expect(Object.keys(matchScores)).toHaveLength(0)
    expect(Object.keys(bracketWinnerIds)).toHaveLength(0)
  })

  it('setMatchScore persists and is retrievable via getMatchScore', async () => {
    const { setMatchScore, getMatchScore } = await loadFreshUsePredictions()
    setMatchScore('match-1', '2', '1')
    const saved = getMatchScore('match-1')
    expect(saved).toEqual({ homeScore: '2', awayScore: '1' })
  })

  it('setBracketWinner persists and is retrievable via getBracketWinner', async () => {
    const { setBracketWinner, getBracketWinner } = await loadFreshUsePredictions()
    setBracketWinner('r32-1', 'USA')
    expect(getBracketWinner('r32-1')).toBe('USA')
  })

  it('getBracketWinners returns all winners as a plain object', async () => {
    const { setBracketWinner, getBracketWinners } = await loadFreshUsePredictions()
    setBracketWinner('r32-1', 'USA')
    setBracketWinner('r32-2', 'ARG')
    setBracketWinner('final', 'BRA')
    const all = getBracketWinners()
    expect(all).toEqual({ 'r32-1': 'USA', 'r32-2': 'ARG', 'final': 'BRA' })
  })

  it('resetMatchScores clears only match scores', async () => {
    const { setMatchScore, getMatchScore, resetMatchScores } = await loadFreshUsePredictions()
    setMatchScore('match-a', '3', '0')
    setMatchScore('match-b', '1', '2')
    resetMatchScores()
    expect(getMatchScore('match-a')).toBeNull()
    expect(getMatchScore('match-b')).toBeNull()
  })

  it('resetBracketWinners clears only bracket winners', async () => {
    const { setBracketWinner, getBracketWinner, resetBracketWinners } = await loadFreshUsePredictions()
    setBracketWinner('r32-1', 'USA')
    resetBracketWinners()
    expect(getBracketWinner('r32-1')).toBeNull()
  })

  it('resetAll clears everything', async () => {
    const { setMatchScore, getMatchScore, setBracketWinner, getBracketWinner, resetAll } = await loadFreshUsePredictions()
    setMatchScore('match-1', '2', '1')
    setBracketWinner('final', 'ARG')
    resetAll()
    expect(getMatchScore('match-1')).toBeNull()
    expect(getBracketWinner('final')).toBeNull()
  })

  it('persists to localStorage on set', async () => {
    const { setMatchScore, setBracketWinner } = await loadFreshUsePredictions()
    setMatchScore('match-x', '0', '0')
    setBracketWinner('final', 'GER')

    vi.advanceTimersByTime(400)
    const savedRaw = localStorage.getItem(STORAGE_KEY)
    expect(savedRaw).not.toBeNull()
    const parsed = JSON.parse(savedRaw)
    expect(parsed.matchScores).toEqual({ 'match:match-x': { homeScore: '0', awayScore: '0' } })
    expect(parsed.bracketWinnerIds).toEqual({ 'final': 'GER' })
  })

  it('loads previously persisted data from localStorage on init', async () => {
    const preexisting = {
      matchScores: { 'match:abc': { homeScore: '1', awayScore: '1' } },
      bracketWinnerIds: { 'r16-3': 'FRA' },
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(preexisting))

    const { matchScores, bracketWinnerIds } = await loadFreshUsePredictions()
    expect(matchScores['match:abc']).toEqual({ homeScore: '1', awayScore: '1' })
    expect(bracketWinnerIds['r16-3']).toBe('FRA')
  })

  it('ignores corrupted localStorage gracefully', async () => {
    localStorage.setItem(STORAGE_KEY, 'not-valid-json')
    const { matchScores, bracketWinnerIds } = await loadFreshUsePredictions()
    expect(Object.keys(matchScores)).toHaveLength(0)
    expect(Object.keys(bracketWinnerIds)).toHaveLength(0)
  })

  it('setMatchScore overwrites previous score for the same match', async () => {
    const { setMatchScore, getMatchScore } = await loadFreshUsePredictions()
    setMatchScore('match-1', '2', '1')
    setMatchScore('match-1', '3', '3')
    const saved = getMatchScore('match-1')
    expect(saved).toEqual({ homeScore: '3', awayScore: '3' })
  })

  it('setBracketWinner overwrites previous winner for the same match', async () => {
    const { setBracketWinner, getBracketWinner } = await loadFreshUsePredictions()
    setBracketWinner('final', 'ARG')
    setBracketWinner('final', 'BRA')
    expect(getBracketWinner('final')).toBe('BRA')
  })

  it('resetAll persists empty state to localStorage', async () => {
    const { setMatchScore, resetAll } = await loadFreshUsePredictions()
    setMatchScore('match-1', '1', '0')
    resetAll()
    const savedRaw = localStorage.getItem(STORAGE_KEY)
    const parsed = JSON.parse(savedRaw)
    expect(parsed.matchScores).toEqual({})
    expect(parsed.bracketWinnerIds).toEqual({})
  })

  it('getMatchScore returns null for unsaved match', async () => {
    const { getMatchScore } = await loadFreshUsePredictions()
    expect(getMatchScore('nonexistent')).toBeNull()
  })

  it('getBracketWinner returns null for unsaved match', async () => {
    const { getBracketWinner } = await loadFreshUsePredictions()
    expect(getBracketWinner('nonexistent')).toBeNull()
  })
})
