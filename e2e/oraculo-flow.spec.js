/**
 * End-to-End Test: El Oráculo Mundial — Predictor Flow
 *
 * Uses local @playwright/test (not MCP server) to drive Chromium through:
 *   1. Desktop: load group stage → reorder teams via drag → verify qualifiers update
 *   2. Desktop: load bracket → click winners R32→R16→QF→SF→Final → verify champion
 *   3. Desktop: reload bracket → verify persistence
 *   4. Desktop: reload group stage → verify persistence
 *   5. Mobile (390×844): repeat core flow via tap interactions
 *
 * Prerequisite: frontend dev server on http://localhost:5173
 *
 * Run: npx playwright test --config e2e/playwright.config.js
 */

import { test, expect } from '@playwright/test'

const E2E_QP = '__e2e=1'
const BASE = 'http://localhost:5173'
const GROUP_STAGE_URL = `${BASE}/p/la-banda-del-mundial/fase-grupos?${E2E_QP}`
const BRACKET_URL = `${BASE}/p/la-banda-del-mundial/eliminatorias?${E2E_QP}`

// ── Helpers ────────────────────────────────────────────────────────────────

const SCREENSHOT_DIR = 'e2e/screenshots'

async function screenshot(page, name) {
  await page.screenshot({ path: `${SCREENSHOT_DIR}/${name}`, fullPage: true })
}

/**
 * Reorder a team within a group card using drag-and-drop.
 * Dragging by the .drag-handle button from source li to target li.
 */
async function dragTeamInGroup(page, groupLabel, sourceCode, targetCode) {
  // Locate the group card article
  const card = page.locator(`article[aria-label*="${groupLabel}"]`)
  await card.scrollIntoViewIfNeeded()

  const sourceRow = card.locator('li.team-row', { hasText: sourceCode })
  const targetRow = card.locator('li.team-row', { hasText: targetCode })
  const handle = sourceRow.locator('.drag-handle')

  await sourceRow.scrollIntoViewIfNeeded()
  await handle.dragTo(targetRow, { force: true })
  await page.waitForTimeout(600)
}

/**
 * Click the home team button in every match card of a given round.
 */
async function pickHomeTeamForAll(page, roundName) {
  const cards = page.locator('article.bracket-match-card--pending').filter({
    has: page.locator('.bm-round-label', { hasText: roundName }),
  })
  const count = await cards.count()
  for (let i = 0; i < count; i++) {
    const card = cards.nth(i)
    await card.scrollIntoViewIfNeeded()
    const homeBtn = card.locator('button.bm-team').first()
    const isDisabled = await homeBtn.isDisabled()
    if (!isDisabled) {
      await homeBtn.click()
      await page.waitForTimeout(120)
    }
  }
}

async function pickHomeTeamForAllTap(page, roundName) {
  const cards = page.locator('article.bracket-match-card--pending').filter({
    has: page.locator('.bm-round-label', { hasText: roundName }),
  })
  const count = await cards.count()
  for (let i = 0; i < count; i++) {
    const card = cards.nth(i)
    await card.scrollIntoViewIfNeeded()
    const homeBtn = card.locator('button.bm-team').first()
    const isDisabled = await homeBtn.isDisabled()
    if (!isDisabled) {
      await homeBtn.tap()
      await page.waitForTimeout(150)
    }
  }
}

// ── Desktop Tests ──────────────────────────────────────────────────────────

test.describe('Oráculo Mundial — Desktop Flow', () => {

  test('1- Group Stage: reorder teams and verify qualifiers update', async ({ page }) => {
    await page.goto(GROUP_STAGE_URL)
    await page.waitForLoadState('networkidle')
    await page.waitForSelector('article.group-card')
    await screenshot(page, '01-group-stage-initial.png')

    // Read initial qualifiers
    await page.click('button:has-text("Ver clasificados")')
    await page.waitForTimeout(400)

    const groupARow = page.locator('.qualifier-group-row').first()
    const chipsBefore = await groupARow.locator('.team-chip--direct .chip-code').allTextContents()
    console.log('[Step 1] Grupo A direct qualifiers before:', chipsBefore)

    // close qualifier preview
    await page.click('button:has-text("Ocultar clasificados")')
    await page.waitForTimeout(200)

    // Reorder Grupo A: drag MAR (position 2) over USA (position 1)
    await dragTeamInGroup(page, 'Grupo A', 'MAR', 'USA')

    // Re-open qualifier preview
    await page.click('button:has-text("Ver clasificados")')
    await page.waitForTimeout(400)

    const chipsAfter = await groupARow.locator('.team-chip--direct .chip-code').allTextContents()
    console.log('[Step 1] Grupo A direct qualifiers after:', chipsAfter)

    expect(chipsAfter[0].trim()).toBe('MAR')

    await screenshot(page, '02-group-stage-reordered.png')
  })

  test('2- Bracket: click winners through R32→R16→QF→SF→Final and verify champion', async ({ page }) => {
    await page.goto(BRACKET_URL)
    await page.waitForLoadState('networkidle')
    await page.waitForSelector('article.bracket-match-card')
    await screenshot(page, '03-bracket-initial.png')

    // Click home team for each pending match, round by round
    await pickHomeTeamForAll(page, 'R32')
    await page.waitForTimeout(400)
    await screenshot(page, '04-bracket-r32-done.png')

    await pickHomeTeamForAll(page, 'R16')
    await page.waitForTimeout(400)

    await pickHomeTeamForAll(page, 'QF')
    await page.waitForTimeout(400)

    await pickHomeTeamForAll(page, 'SF')
    await page.waitForTimeout(400)

    // Final
    const finalCard = page.locator('article.bracket-match-card').filter({
      has: page.locator('.bm-round-label', { hasText: /Final/i }),
    }).first()
    await finalCard.scrollIntoViewIfNeeded()
    const finalHomeBtn = finalCard.locator('button.bm-team').first()
    if (!(await finalHomeBtn.isDisabled())) {
      await finalHomeBtn.click()
      await page.waitForTimeout(200)
    }

    await page.waitForTimeout(500)

    // Verify champion banner in BracketView
    const championBanner = page.locator('.bk-champion-banner')
    await expect(championBanner).toBeVisible({ timeout: 5000 })
    const championName = await championBanner.locator('.bk-champion-name').textContent()
    console.log('[Step 2] Champion:', championName)
    expect(championName).toBeTruthy()

    await screenshot(page, '05-bracket-complete-champion.png')

    // store for persistence test
    await page.evaluate((name) => { window.__e2eChampion = name }, championName)
  })

  test('3- Bracket persistence after reload', async ({ page }) => {
    await page.goto(BRACKET_URL)
    await page.waitForLoadState('networkidle')
    await page.waitForSelector('article.bracket-match-card')
    await screenshot(page, '06-bracket-after-reload.png')

    const championBanner = page.locator('.bk-champion-banner')
    await expect(championBanner).toBeVisible({ timeout: 5000 })
    const championName = await championBanner.locator('.bk-champion-name').textContent()
    console.log('[Step 3] Champion after reload:', championName)
    expect(championName).toBeTruthy()

    const resolvedCards = page.locator('article.bracket-match-card--resolved')
    const resolvedCount = await resolvedCards.count()
    console.log('[Step 3] Resolved matches after reload:', resolvedCount)
    expect(resolvedCount).toBeGreaterThan(0)
  })

  test('4- Group Stage persistence after reload', async ({ page }) => {
    await page.goto(GROUP_STAGE_URL)
    await page.waitForLoadState('networkidle')
    await page.waitForSelector('article.group-card')

    await page.click('button:has-text("Ver clasificados")')
    await page.waitForTimeout(400)

    const groupARow = page.locator('.qualifier-group-row').first()
    const chips = await groupARow.locator('.team-chip--direct .chip-code').allTextContents()
    console.log('[Step 4] Grupo A qualifiers after reload:', chips)
    expect(chips[0].trim()).toBe('MAR')

    await screenshot(page, '07-group-stage-after-reload.png')
  })
})

// ── Mobile Tests (390×844) ─────────────────────────────────────────────────

test.describe('Oráculo Mundial — Mobile Flow (390×844)', () => {

  test.use({ viewport: { width: 390, height: 844 } })

  test('Mobile: reorder group and complete bracket with tap interactions', async ({ page }) => {
    // --- Group Stage ---
    await page.goto(GROUP_STAGE_URL)
    await page.waitForLoadState('networkidle')
    await page.waitForSelector('article.group-card')
    await screenshot(page, '08-mobile-group-stage-initial.png')

    // Open qualifier preview
    await page.locator('button:has-text("Ver clasificados")').tap()
    await page.waitForTimeout(500)

    const groupARow = page.locator('.qualifier-group-row').first()
    const chipsBefore = await groupARow.locator('.team-chip--direct .chip-code').allTextContents()
    console.log('[Mobile Step 1] Grupo A qualifiers before:', chipsBefore)

    await page.locator('button:has-text("Ocultar clasificados")').tap()
    await page.waitForTimeout(300)

    // Reorder on mobile via dragTo (Playwright simulates touch)
    await dragTeamInGroup(page, 'Grupo A', 'MAR', 'USA')

    // Reopen qualifiers
    await page.locator('button:has-text("Ver clasificados")').tap()
    await page.waitForTimeout(500)

    const chipsAfter = await groupARow.locator('.team-chip--direct .chip-code').allTextContents()
    console.log('[Mobile Step 1] Grupo A qualifiers after:', chipsAfter)
    expect(chipsAfter[0].trim()).toBe('MAR')

    await screenshot(page, '09-mobile-group-stage-reordered.png')

    // --- Bracket ---
    await page.goto(BRACKET_URL)
    await page.waitForLoadState('networkidle')
    await page.waitForSelector('article.bracket-match-card')
    await screenshot(page, '10-mobile-bracket-initial.png')

    // Tap through all rounds
    await pickHomeTeamForAllTap(page, 'R32')
    await page.waitForTimeout(400)

    await pickHomeTeamForAllTap(page, 'R16')
    await page.waitForTimeout(400)

    await pickHomeTeamForAllTap(page, 'QF')
    await page.waitForTimeout(400)

    await pickHomeTeamForAllTap(page, 'SF')
    await page.waitForTimeout(400)

    // Final
    const finalCard = page.locator('article.bracket-match-card').filter({
      has: page.locator('.bm-round-label', { hasText: /Final/i }),
    }).first()
    await finalCard.scrollIntoViewIfNeeded()
    const finalHomeBtn = finalCard.locator('button.bm-team').first()
    if (!(await finalHomeBtn.isDisabled())) {
      await finalHomeBtn.tap()
      await page.waitForTimeout(300)
    }

    await page.waitForTimeout(500)

    const championBanner = page.locator('.bk-champion-banner')
    await expect(championBanner).toBeVisible({ timeout: 5000 })
    const championName = await championBanner.locator('.bk-champion-name').textContent()
    console.log('[Mobile] Champion:', championName)
    expect(championName).toBeTruthy()

    await screenshot(page, '11-mobile-bracket-complete.png')
  })

  test('Mobile: reload and verify persistence', async ({ page }) => {
    await page.goto(BRACKET_URL)
    await page.waitForLoadState('networkidle')
    await page.waitForSelector('article.bracket-match-card')

    const championBanner = page.locator('.bk-champion-banner')
    await expect(championBanner).toBeVisible({ timeout: 5000 })
    const championName = await championBanner.locator('.bk-champion-name').textContent()
    console.log('[Mobile Persist] Champion after reload:', championName)
    expect(championName).toBeTruthy()

    const resolvedCards = page.locator('article.bracket-match-card--resolved')
    const resolvedCount = await resolvedCards.count()
    console.log('[Mobile Persist] Resolved matches after reload:', resolvedCount)
    expect(resolvedCount).toBeGreaterThan(0)

    // Also verify group stage persistence on mobile
    await page.goto(GROUP_STAGE_URL)
    await page.waitForLoadState('networkidle')
    await page.waitForSelector('article.group-card')

    await page.locator('button:has-text("Ver clasificados")').tap()
    await page.waitForTimeout(400)

    const groupARow = page.locator('.qualifier-group-row').first()
    const chips = await groupARow.locator('.team-chip--direct .chip-code').allTextContents()
    console.log('[Mobile Persist] Grupo A qualifiers after reload:', chips)
    expect(chips[0].trim()).toBe('MAR')

    await screenshot(page, '12-mobile-persistence-verified.png')
  })
})
