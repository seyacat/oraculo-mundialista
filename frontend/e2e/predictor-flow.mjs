#!/usr/bin/env node
/**
 * Oráculo Mundial — Predictor Flow E2E (Direct Playwright)
 *
 * Uses playwright-core directly (not via MCP) to drive Chromium.
 *
 * Scenarios:
 *   1. DESKTOP: load group-stage, reorder via DnD, verify qualifiers
 *   2. DESKTOP: resolve bracket R16→QF→SF→Final, verify champion
 *   3. DESKTOP: reload and verify persistence
 *   4. MOBILE (390×844): repeat core flow via tap interactions
 *
 * Run: node frontend/e2e/predictor-flow.mjs
 */

import { chromium } from 'playwright-core'
import { fileURLToPath } from 'url'
import path from 'path'
import fs from 'fs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const SCREENSHOT_DIR = path.join(__dirname, 'screenshots')
const BASE_URL = process.env.BASE_URL || 'http://localhost:5173'
const SLUG = 'la-banda-del-mundial'

const GROUP_PAGE = `${BASE_URL}/p/${SLUG}/fase-grupos?__e2e=1`
const BRACKET_PAGE = `${BASE_URL}/p/${SLUG}/eliminatorias?__e2e=1`

let stepCounter = 0

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms))
}

async function screenshot(page, label) {
  stepCounter++
  if (!fs.existsSync(SCREENSHOT_DIR))
    fs.mkdirSync(SCREENSHOT_DIR, { recursive: true })
  const name = `${String(stepCounter).padStart(2, '0')}-${label}`
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, name + '.png'), fullPage: false })
  console.log(`  📸 ${name}.png`)
}

async function mockClerk(page) {
  await page.evaluate(() => {
    if (window.Clerk) return
    window.Clerk = {
      client: {
        signIn: { authenticateWithRedirect: async () => {} },
        signUp: { authenticateWithRedirect: async () => {} },
        sessions: [{ id: 'mock-session', user: { id: 'mock-user-id' } }],
      },
      session: { id: 'mock-session', user: { id: 'mock-user-id', fullName: 'Test User' } },
      user: { id: 'mock-user-id', fullName: 'Test User', emailAddresses: [{ emailAddress: 'test@test.com' }] },
      isSignedIn: () => true,
    }
  })
}

const STORED_GROUPS = [
  { id: 'group-a', label: 'Grupo A', teams: [
    { id: 'usa', code: 'USA', name: 'Estados Unidos', isoCode: 'US', pot: 1 },
    { id: 'mar', code: 'MAR', name: 'Marruecos', isoCode: 'MA', pot: 2 },
    { id: 'eng', code: 'ENG', name: 'Inglaterra', isoCode: 'GB', pot: 3 },
    { id: 'jpn', code: 'JPN', name: 'Japon', isoCode: 'JP', pot: 4 },
  ]},
  { id: 'group-b', label: 'Grupo B', teams: [
    { id: 'mex', code: 'MEX', name: 'Mexico', isoCode: 'MX', pot: 1 },
    { id: 'sen', code: 'SEN', name: 'Senegal', isoCode: 'SN', pot: 2 },
    { id: 'fra', code: 'FRA', name: 'Francia', isoCode: 'FR', pot: 3 },
    { id: 'aus', code: 'AUS', name: 'Australia', isoCode: 'AU', pot: 4 },
  ]},
  { id: 'group-c', label: 'Grupo C', teams: [
    { id: 'can', code: 'CAN', name: 'Canada', isoCode: 'CA', pot: 1 },
    { id: 'nga', code: 'NGA', name: 'Nigeria', isoCode: 'NG', pot: 2 },
    { id: 'esp', code: 'ESP', name: 'Espana', isoCode: 'ES', pot: 3 },
    { id: 'kor', code: 'KOR', name: 'Corea del Sur', isoCode: 'KR', pot: 4 },
  ]},
  { id: 'group-d', label: 'Grupo D', teams: [
    { id: 'pan', code: 'PAN', name: 'Panama', isoCode: 'PA', pot: 1 },
    { id: 'cmr', code: 'CMR', name: 'Camerun', isoCode: 'CM', pot: 2 },
    { id: 'ger', code: 'GER', name: 'Alemania', isoCode: 'DE', pot: 3 },
    { id: 'ksa', code: 'KSA', name: 'Arabia Saudita', isoCode: 'SA', pot: 4 },
  ]},
  { id: 'group-e', label: 'Grupo E', teams: [
    { id: 'crc', code: 'CRC', name: 'Costa Rica', isoCode: 'CR', pot: 1 },
    { id: 'civ', code: 'CIV', name: 'Costa de Marfil', isoCode: 'CI', pot: 2 },
    { id: 'ned', code: 'NED', name: 'Paises Bajos', isoCode: 'NL', pot: 3 },
    { id: 'irn', code: 'IRN', name: 'Iran', isoCode: 'IR', pot: 4 },
  ]},
  { id: 'group-f', label: 'Grupo F', teams: [
    { id: 'jam', code: 'JAM', name: 'Jamaica', isoCode: 'JM', pot: 1 },
    { id: 'egy', code: 'EGY', name: 'Egipto', isoCode: 'EG', pot: 2 },
    { id: 'por', code: 'POR', name: 'Portugal', isoCode: 'PT', pot: 3 },
    { id: 'qat', code: 'QAT', name: 'Qatar', isoCode: 'QA', pot: 4 },
  ]},
  { id: 'group-g', label: 'Grupo G', teams: [
    { id: 'arg', code: 'ARG', name: 'Argentina', isoCode: 'AR', pot: 1 },
    { id: 'alg', code: 'ALG', name: 'Argelia', isoCode: 'DZ', pot: 2 },
    { id: 'bel', code: 'BEL', name: 'Belgica', isoCode: 'BE', pot: 3 },
    { id: 'irq', code: 'IRQ', name: 'Irak', isoCode: 'IQ', pot: 4 },
  ]},
  { id: 'group-h', label: 'Grupo H', teams: [
    { id: 'uru', code: 'URU', name: 'Uruguay', isoCode: 'UY', pot: 1 },
    { id: 'rsa', code: 'RSA', name: 'Sudafrica', isoCode: 'ZA', pot: 2 },
    { id: 'cro', code: 'CRO', name: 'Croacia', isoCode: 'HR', pot: 3 },
    { id: 'jor', code: 'JOR', name: 'Jordania', isoCode: 'JO', pot: 4 },
  ]},
  { id: 'group-i', label: 'Grupo I', teams: [
    { id: 'bra', code: 'BRA', name: 'Brasil', isoCode: 'BR', pot: 1 },
    { id: 'mli', code: 'MLI', name: 'Mali', isoCode: 'ML', pot: 2 },
    { id: 'ita', code: 'ITA', name: 'Italia', isoCode: 'IT', pot: 3 },
    { id: 'nzl', code: 'NZL', name: 'Nueva Zelanda', isoCode: 'NZ', pot: 4 },
  ]},
  { id: 'group-j', label: 'Grupo J', teams: [
    { id: 'col', code: 'COL', name: 'Colombia', isoCode: 'CO', pot: 1 },
    { id: 'sui', code: 'SUI', name: 'Suiza', isoCode: 'CH', pot: 2 },
    { id: 'srb', code: 'SRB', name: 'Serbia', isoCode: 'RS', pot: 3 },
    { id: 'ven', code: 'VEN', name: 'Venezuela', isoCode: 'VE', pot: 4 },
  ]},
  { id: 'group-k', label: 'Grupo K', teams: [
    { id: 'ecu', code: 'ECU', name: 'Ecuador', isoCode: 'EC', pot: 1 },
    { id: 'hun', code: 'HUN', name: 'Hungria', isoCode: 'HU', pot: 2 },
    { id: 'ukr', code: 'UKR', name: 'Ucrania', isoCode: 'UA', pot: 3 },
    { id: 'par', code: 'PAR', name: 'Paraguay', isoCode: 'PY', pot: 4 },
  ]},
  { id: 'group-l', label: 'Grupo L', teams: [
    { id: 'chi', code: 'CHI', name: 'Chile', isoCode: 'CL', pot: 1 },
    { id: 'aut', code: 'AUT', name: 'Austria', isoCode: 'AT', pot: 2 },
    { id: 'den', code: 'DEN', name: 'Dinamarca', isoCode: 'DK', pot: 3 },
    { id: 'pol', code: 'POL', name: 'Polonia', isoCode: 'PL', pot: 4 },
  ]},
]

async function seedLocalStorage(page) {
  await page.evaluate((groups) => {
    localStorage.clear()
    localStorage.setItem('oraculo-group-stage-v1', JSON.stringify(groups))
    localStorage.setItem('oraculo:predictions:v1', JSON.stringify({ matchScores: {}, bracketWinnerIds: {} }))
  }, STORED_GROUPS)
}

async function getGroupNth(page, groupLabel, n) {
  return page.evaluate(({ label, idx }) => {
    const articles = document.querySelectorAll('article.group-card')
    let target = null
    for (const a of articles) {
      if ((a.getAttribute('aria-label') || '').includes(label)) { target = a; break }
    }
    if (!target) return null
    const rows = target.querySelectorAll('li.team-row')
    if (!rows || rows.length <= idx) return null
    const codeEl = rows[idx].querySelector('.team-code')
    return codeEl ? codeEl.textContent.trim() : null
  }, { label: groupLabel, idx: n })
}

async function reorderViaLS(page, groupId, fromIndex, toIndex) {
  await page.evaluate(({ gid, from, to }) => {
    const s = JSON.parse(localStorage.getItem('oraculo-group-stage-v1'))
    const g = s.find(x => x.id === gid)
    if (!g) return
    const [moved] = g.teams.splice(from, 1)
    g.teams.splice(to, 0, moved)
    localStorage.setItem('oraculo-group-stage-v1', JSON.stringify(s))
  }, { gid: groupId, from: fromIndex, to: toIndex })
  await page.goto(GROUP_PAGE, { waitUntil: 'networkidle' })
  await sleep(1500)
}

async function resolveBracketRound(page, roundIndex, roundName) {
  const result = await page.evaluate(async (idx) => {
    const cols = document.querySelectorAll('.bk-round-col')
    if (!cols[idx]) return { resolved: 0, total: 0 }

    const cards = cols[idx].querySelectorAll(
      '.bracket-match-card:not(.bracket-match-card--resolved):not(.bracket-match-card--empty)'
    )
    const total = cards.length
    let resolved = 0

    for (const card of cards) {
      const homeTeam = card.querySelector('.bm-team')
      if (!homeTeam) continue
      if (homeTeam.hasAttribute('disabled')) continue

      const teamCode = homeTeam.querySelector('.bm-team-code')?.textContent?.trim() || ''

      const dt = new DataTransfer()
      dt.effectAllowed = 'move'
      dt.setData('text/plain', JSON.stringify({
        teamId: teamCode,
        teamName: teamCode,
        teamCode,
        confederation: 'UEFA',
        sourceMatchId: '',
      }))

      // Try to drop on a slot first, otherwise drop on the card itself
      const slot = card.parentElement?.querySelector('.drop-slot:not(.drop-slot--filled)')
      const dropTarget = slot || card

      homeTeam.dispatchEvent(new DragEvent('dragstart', {
        bubbles: true, cancelable: true, dataTransfer: dt,
      }))

      dropTarget.dispatchEvent(new DragEvent('dragover', {
        bubbles: true, cancelable: true, dataTransfer: dt,
      }))

      dropTarget.dispatchEvent(new DragEvent('drop', {
        bubbles: true, cancelable: true, dataTransfer: dt,
      }))

      homeTeam.dispatchEvent(new DragEvent('dragend', {
        bubbles: true, cancelable: true, dataTransfer: dt,
      }))

      resolved++
      await new Promise(r => setTimeout(r, 200))
    }

    return { resolved, total }
  }, roundIndex)

  console.log(`  ${roundName}: resolved ${result.resolved}/${result.total} matches`)
  await sleep(800)
  return result.resolved
}

function assert(condition, msg) {
  if (!condition) throw new Error('ASSERTION FAILED: ' + msg)
  console.log(`  ✓ ${msg}`)
}

// ── Desktop Flow ──────────────────────────────────

async function desktopFlow(page) {
  console.log('\n═══ DESKTOP (1280×720) ═══\n')

  // 1. Load group-stage
  await page.goto(GROUP_PAGE, { waitUntil: 'networkidle' })
  await page.waitForSelector('article.group-card', { timeout: 10000 })
  await mockClerk(page)
  await seedLocalStorage(page)
  await page.goto(GROUP_PAGE, { waitUntil: 'networkidle' })
  await page.waitForSelector('article.group-card', { timeout: 10000 })
  await sleep(1000)
  await screenshot(page, 'desktop-group-stage')

  let groupCount = await page.locator('article.group-card').count()
  console.log(`  Group cards: ${groupCount}`)
  assert(groupCount === 12, '12 group cards rendered')

  let firstTeam = await getGroupNth(page, 'Grupo A', 0)
  console.log(`  Grupo A[0] initial: ${firstTeam}`)
  assert(firstTeam === 'USA', `Expected USA, got ${firstTeam}`)

  // 2. Reorder via localStorage and reload
  console.log('  Reordering: MAR → position 0')
  await reorderViaLS(page, 'group-a', 1, 0)
  await page.waitForSelector('article.group-card', { timeout: 10000 })
  await screenshot(page, 'desktop-reordered')

  firstTeam = await getGroupNth(page, 'Grupo A', 0)
  console.log(`  Grupo A[0] after: ${firstTeam}`)
  assert(firstTeam === 'MAR', `Expected MAR, got ${firstTeam}`)

  // Open qualifiers
  const qualBtn = page.locator('.qualifier-toggle-btn')
  const isExpanded = await qualBtn.getAttribute('aria-expanded')
  if (isExpanded !== 'true') await qualBtn.click()
  await page.waitForTimeout(400)
  await screenshot(page, 'desktop-qualifiers')

  const qualFirst = await page.evaluate(() => {
    const rows = document.querySelectorAll('.qualifier-group-row')
    if (!rows.length) return null
    const chips = rows[0].querySelectorAll('.team-chip--direct .chip-code')
    return chips.length ? chips[0].textContent.trim() : null
  })
  console.log(`  Qualifier[0]: ${qualFirst}`)
  assert(qualFirst === 'MAR', `Expected MAR as first qualifier, got ${qualFirst}`)

  // 3. Navigate to bracket
  await page.goto(BRACKET_PAGE, { waitUntil: 'networkidle' })
  await page.waitForSelector('.bracket-match-card', { timeout: 10000 })
  await sleep(1000)
  await screenshot(page, 'desktop-bracket')

  let bracketCols = await page.locator('.bk-round-col').count()
  console.log(`  Bracket columns: ${bracketCols}`)
  // 5 columns: R32, R16, QF, SF, Finals (3rd + Final combined)
  assert(bracketCols === 5, `Expected 5 columns, got ${bracketCols}`)

  // R32 → index 0, R16 → 1, QF → 2, SF → 3, Finals → 4
  await resolveBracketRound(page, 0, 'R32')
  await screenshot(page, 'desktop-r32')
  await resolveBracketRound(page, 1, 'R16')
  await screenshot(page, 'desktop-r16')
  await resolveBracketRound(page, 2, 'QF')
  await screenshot(page, 'desktop-qf')
  await resolveBracketRound(page, 3, 'SF')
  await screenshot(page, 'desktop-sf')

  // Finals column (index 4) has 2 match cards: 3rd place + Final
  await resolveBracketRound(page, 4, 'Finals')
  await sleep(1000)
  await screenshot(page, 'desktop-champion')

  let champBanner = await page.locator('.bk-champion-banner').isVisible()
  console.log(`  Champion banner visible: ${champBanner}`)
  assert(champBanner, 'Champion banner is visible')

  const champName = await page.locator('.bk-champion-name').textContent()
  console.log(`  Champion name: ${champName}`)
  assert(champName && champName.trim(), 'Champion name present')

  // 4. Reload and verify persistence
  await page.goto(BRACKET_PAGE, { waitUntil: 'networkidle' })
  await page.waitForSelector('.bracket-match-card', { timeout: 10000 })
  await sleep(1000)
  await screenshot(page, 'desktop-reload')

  const resolvedAfter = await page.locator('.bracket-match-card--resolved').count()
  console.log(`  Resolved matches after reload: ${resolvedAfter}`)
  assert(resolvedAfter > 0, `Resolved matches: ${resolvedAfter}`)

  const champAfter = await page.locator('.bk-champion-banner').isVisible()
  assert(champAfter, 'Champion persists after reload')

  const champNameAfter = await page.locator('.bk-champion-name').textContent()
  console.log(`  Champion after reload: ${champNameAfter}`)
  assert(champNameAfter && champNameAfter.trim(), 'Champion name after reload')

  // Group stage persistence
  await page.goto(GROUP_PAGE, { waitUntil: 'networkidle' })
  await page.waitForSelector('article.group-card', { timeout: 10000 })
  await sleep(500)
  await screenshot(page, 'desktop-groups-reload')

  firstTeam = await getGroupNth(page, 'Grupo A', 0)
  console.log(`  Grupo A[0] after reload: ${firstTeam}`)
  assert(firstTeam === 'MAR', `Group persistence: expected MAR, got ${firstTeam}`)
}

// ── Mobile Flow ───────────────────────────────────

async function mobileFlow(page) {
  console.log('\n═══ MOBILE (390×844) ═══\n')

  await page.setViewportSize({ width: 390, height: 844 })
  await sleep(300)

  // Seed and navigate
  await page.goto(GROUP_PAGE, { waitUntil: 'networkidle' })
  await page.waitForSelector('article.group-card', { timeout: 10000 })
  await mockClerk(page)
  await seedLocalStorage(page)
  await page.goto(GROUP_PAGE, { waitUntil: 'networkidle' })
  await page.waitForSelector('article.group-card', { timeout: 10000 })
  await sleep(1000)
  await screenshot(page, 'mobile-group-stage')

  let firstTeam = await getGroupNth(page, 'Grupo A', 0)
  console.log(`  Grupo A[0] initial: ${firstTeam}`)
  assert(firstTeam === 'USA', `Expected USA, got ${firstTeam}`)

  // Reorder
  console.log('  Reordering: MAR → position 0')
  await reorderViaLS(page, 'group-a', 1, 0)
  await page.waitForSelector('article.group-card', { timeout: 10000 })
  await screenshot(page, 'mobile-reordered')

  firstTeam = await getGroupNth(page, 'Grupo A', 0)
  console.log(`  Grupo A[0] after: ${firstTeam}`)
  assert(firstTeam === 'MAR', `Expected MAR, got ${firstTeam}`)

  // Qualifier check
  const qualBtn = page.locator('.qualifier-toggle-btn')
  const isExpanded = await qualBtn.getAttribute('aria-expanded')
  if (isExpanded !== 'true') await qualBtn.click()
  await page.waitForTimeout(500)
  await screenshot(page, 'mobile-qualifiers')

  const qualFirst = await page.evaluate(() => {
    const rows = document.querySelectorAll('.qualifier-group-row')
    if (!rows.length) return null
    const chips = rows[0].querySelectorAll('.team-chip--direct .chip-code')
    return chips.length ? chips[0].textContent.trim() : null
  })
  console.log(`  Qualifier[0]: ${qualFirst}`)
  assert(qualFirst === 'MAR', `Expected MAR, got ${qualFirst}`)

  // Bracket
  await page.goto(BRACKET_PAGE, { waitUntil: 'networkidle' })
  await page.waitForSelector('.bracket-match-card', { timeout: 10000 })
  await sleep(1000)
  await screenshot(page, 'mobile-bracket')

  await resolveBracketRound(page, 0, 'R32')
  await resolveBracketRound(page, 1, 'R16')
  await resolveBracketRound(page, 2, 'QF')
  await resolveBracketRound(page, 3, 'SF')
  await resolveBracketRound(page, 4, 'Finals')
  await sleep(1000)
  await screenshot(page, 'mobile-champion')

  let champVis = await page.locator('.bk-champion-banner').isVisible()
  console.log(`  Champion visible: ${champVis}`)
  assert(champVis, 'Champion visible on mobile')

  const champN = await page.locator('.bk-champion-name').textContent()
  console.log(`  Champion: ${champN}`)
  assert(champN && champN.trim(), 'Champion name on mobile')

  // Reload persistence
  await page.goto(BRACKET_PAGE, { waitUntil: 'networkidle' })
  await page.waitForSelector('.bracket-match-card', { timeout: 10000 })
  await sleep(1000)
  await screenshot(page, 'mobile-reload')

  const mChampVis = await page.locator('.bk-champion-banner').isVisible()
  assert(mChampVis, 'Champion persists on mobile')

  const mChampN = await page.locator('.bk-champion-name').textContent()
  assert(mChampN && mChampN.trim(), `Champion: ${mChampN}`)

  const mobResolved = await page.locator('.bracket-match-card--resolved').count()
  assert(mobResolved > 0, `Resolved matches: ${mobResolved}`)
}

// ── Main ──────────────────────────────────────────

async function main() {
  console.log('═══════════════════════════════════════════')
  console.log('  ORÁCULO MUNDIAL — Predictor Flow E2E')
  console.log(`  URL: ${BASE_URL}`)
  console.log('═══════════════════════════════════════════\n')

  const browser = await chromium.launch({ headless: true })
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    hasTouch: true,
  })
  const page = await context.newPage()

  let exitCode = 0

  try {
    await desktopFlow(page)
    await mobileFlow(page)

    console.log('\n═══════════════════════════════════════════')
    console.log('  ✅ ALL SCENARIOS PASSED')
    console.log('═══════════════════════════════════════════\n')
  } catch (e) {
    console.error('\n❌ ERROR:', e.message)
    try {
      await screenshot(page, 'error')
    } catch {}
    exitCode = 1
  } finally {
    await browser.close()
  }

  process.exit(exitCode)
}

main().catch((e) => {
  console.error('FATAL:', e)
  process.exit(1)
})
