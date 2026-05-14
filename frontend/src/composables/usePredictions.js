import { reactive, watch, readonly } from 'vue'

const STORAGE_KEY = 'oraculo:predictions:v1'

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (!parsed || typeof parsed !== 'object') return null
    return parsed
  } catch {
    return null
  }
}

function saveToStorage(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch {
  }
}

function buildKey(matchId) {
  return `match:${matchId}`
}

function buildBracketKey() {
  return 'bracket:winnerIds'
}

const stored = loadFromStorage()

const matchScores = reactive(stored?.matchScores ?? {})
const bracketWinnerIds = reactive(stored?.bracketWinnerIds ?? {})

let autoSaveHandle = null

function scheduleSave() {
  if (autoSaveHandle) clearTimeout(autoSaveHandle)
  autoSaveHandle = setTimeout(() => {
    saveToStorage({
      matchScores: { ...matchScores },
      bracketWinnerIds: { ...bracketWinnerIds },
    })
  }, 300)
}

function setMatchScore(matchId, homeScore, awayScore) {
  matchScores[buildKey(matchId)] = { homeScore, awayScore }
  scheduleSave()
}

function getMatchScore(matchId) {
  return matchScores[buildKey(matchId)] ?? null
}

function setBracketWinner(matchId, winnerTeamId) {
  bracketWinnerIds[matchId] = winnerTeamId
  scheduleSave()
}

function getBracketWinner(matchId) {
  return bracketWinnerIds[matchId] ?? null
}

function getBracketWinners() {
  return { ...bracketWinnerIds }
}

function resetAll() {
  Object.keys(matchScores).forEach((k) => delete matchScores[k])
  Object.keys(bracketWinnerIds).forEach((k) => delete bracketWinnerIds[k])
  saveToStorage({ matchScores: {}, bracketWinnerIds: {} })
}

function resetMatchScores() {
  Object.keys(matchScores).forEach((k) => delete matchScores[k])
  scheduleSave()
}

function resetBracketWinners() {
  Object.keys(bracketWinnerIds).forEach((k) => delete bracketWinnerIds[k])
  scheduleSave()
}

export function usePredictions() {
  return {
    matchScores: readonly(matchScores),
    bracketWinnerIds: readonly(bracketWinnerIds),
    setMatchScore,
    getMatchScore,
    setBracketWinner,
    getBracketWinner,
    getBracketWinners,
    resetAll,
    resetMatchScores,
    resetBracketWinners,
  }
}
