import { describe, it, expect, beforeEach, vi } from 'vitest'
import { wc2026Groups } from '../../lib/mock-data/groups'

const STORAGE_KEY = 'oraculo-group-stage-v1'

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

describe('useGroupStage localStorage round-trip', () => {
  let mockStorage

  beforeEach(() => {
    mockStorage = createMockLocalStorage()
    vi.stubGlobal('localStorage', mockStorage)
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  async function loadFresh() {
    vi.resetModules()
    const mod = await import('../useGroupStage.js')
    return mod.useGroupStage()
  }

  it('initialises with all 12 groups and 48 teams', async () => {
    const { groups } = await loadFresh()
    expect(groups.value).toHaveLength(12)
    const totalTeams = groups.value.reduce((sum, g) => sum + g.teams.length, 0)
    expect(totalTeams).toBe(48)
  })

  it('saves to localStorage when a group is reordered', async () => {
    const { updateGroupOrder } = await loadFresh()
    const newOrder = [
      { id: 'usa', code: 'USA', name: 'Estados Unidos', isoCode: 'US', pot: 1 },
      { id: 'eng', code: 'ENG', name: 'Inglaterra', isoCode: 'GB', pot: 3 },
      { id: 'mar', code: 'MAR', name: 'Marruecos', isoCode: 'MA', pot: 2 },
      { id: 'jpn', code: 'JPN', name: 'Japón', isoCode: 'JP', pot: 4 },
    ]
    updateGroupOrder('group-a', newOrder)

    await vi.waitFor(() => {
      const savedRaw = localStorage.getItem(STORAGE_KEY)
      expect(savedRaw).not.toBeNull()
    })
    const savedRaw = localStorage.getItem(STORAGE_KEY)
    const parsed = JSON.parse(savedRaw)
    const groupA = parsed.find((g) => g.id === 'group-a')
    expect(groupA.teams[0].id).toBe('usa')
    expect(groupA.teams[1].id).toBe('eng')
  })

  it('loads previously persisted group stage data', async () => {
    const original = JSON.parse(JSON.stringify(wc2026Groups))
    original.find((g) => g.id === 'group-a').teams = [
      { id: 'mar', code: 'MAR', name: 'Marruecos', isoCode: 'MA', pot: 2 },
      { id: 'usa', code: 'USA', name: 'Estados Unidos', isoCode: 'US', pot: 1 },
      { id: 'jpn', code: 'JPN', name: 'Japón', isoCode: 'JP', pot: 4 },
      { id: 'eng', code: 'ENG', name: 'Inglaterra', isoCode: 'GB', pot: 3 },
    ]
    localStorage.setItem(STORAGE_KEY, JSON.stringify(original))

    const { groups } = await loadFresh()
    const groupA = groups.value.find((g) => g.id === 'group-a')
    expect(groupA.teams[0].id).toBe('mar')
    expect(groupA.teams[1].id).toBe('usa')
  })

  it('resetAll reverts groups to initial state', async () => {
    const { updateGroupOrder, resetAll, groups } = await loadFresh()
    const newOrder = [
      { id: 'jpn', code: 'JPN', name: 'Japón', isoCode: 'JP', pot: 4 },
      { id: 'usa', code: 'USA', name: 'Estados Unidos', isoCode: 'US', pot: 1 },
      { id: 'mar', code: 'MAR', name: 'Marruecos', isoCode: 'MA', pot: 2 },
      { id: 'eng', code: 'ENG', name: 'Inglaterra', isoCode: 'GB', pot: 3 },
    ]
    updateGroupOrder('group-a', newOrder)
    resetAll()

    const groupA = groups.value.find((g) => g.id === 'group-a')
    expect(groupA.teams[0].id).toBe('usa')
    expect(groupA.teams[1].id).toBe('mar')
    expect(groupA.teams[2].id).toBe('eng')
    expect(groupA.teams[3].id).toBe('jpn')
  })

  it('ignores corrupted localStorage gracefully', async () => {
    localStorage.setItem(STORAGE_KEY, 'not-valid-json')
    const { groups } = await loadFresh()
    expect(groups.value).toHaveLength(12)
  })

  it('ignores localStorage with wrong number of groups', async () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([{ id: 'group-a', teams: [] }]))
    const { groups } = await loadFresh()
    expect(groups.value).toHaveLength(12)
  })

  it('resetGroup reverts a single group', async () => {
    const { updateGroupOrder, resetGroup, groups } = await loadFresh()
    updateGroupOrder('group-b', [
      { id: 'fra', code: 'FRA', name: 'Francia', isoCode: 'FR', pot: 3 },
      { id: 'mex', code: 'MEX', name: 'México', isoCode: 'MX', pot: 1 },
      { id: 'sen', code: 'SEN', name: 'Senegal', isoCode: 'SN', pot: 2 },
      { id: 'aus', code: 'AUS', name: 'Australia', isoCode: 'AU', pot: 4 },
    ])
    resetGroup('group-b')
    const groupB = groups.value.find((g) => g.id === 'group-b')
    expect(groupB.teams[0].id).toBe('mex')
    expect(groupB.teams[1].id).toBe('sen')
    expect(groupB.teams[2].id).toBe('fra')
    expect(groupB.teams[3].id).toBe('aus')
  })
})
