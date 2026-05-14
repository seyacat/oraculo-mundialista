import { Router } from 'express'
import { getAuth } from '@clerk/express'
import { supabase } from '../supabase.js'

const router = Router()

const TABLE_NAME = 'predictions'

/**
 * GET /api/predictions
 * Returns all predictions for the authenticated user.
 */
router.get('/', async (req, res, next) => {
  try {
    const { userId } = getAuth(req)
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select('*')
      .eq('user_id', userId)
      .order('updated_at', { ascending: false })

    if (error) {
      console.error('[predictions] GET error:', error)
      return res.status(500).json({ error: 'Failed to fetch predictions' })
    }

    res.json({ predictions: data ?? [] })
  } catch (err) {
    next(err)
  }
})

/**
 * PATCH /api/predictions
 * Upserts the user's full prediction state (match scores + bracket winners).
 * Body: { matchScores: Record<string, {homeScore, awayScore}>, bracketWinnerIds: Record<string, string> }
 */
router.patch('/', async (req, res, next) => {
  try {
    const { userId } = getAuth(req)
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    const { matchScores, bracketWinnerIds } = req.body

    const payload = {
      user_id: userId,
      match_scores: matchScores ?? {},
      bracket_winner_ids: bracketWinnerIds ?? {},
      updated_at: new Date().toISOString(),
    }

    const { data, error } = await supabase
      .from(TABLE_NAME)
      .upsert(payload, { onConflict: 'user_id' })
      .select()
      .single()

    if (error) {
      console.error('[predictions] PATCH error:', error)
      return res.status(500).json({ error: 'Failed to save predictions' })
    }

    res.json({ prediction: data })
  } catch (err) {
    next(err)
  }
})

/**
 * DELETE /api/predictions
 * Removes all predictions for the authenticated user.
 */
router.delete('/', async (req, res, next) => {
  try {
    const { userId } = getAuth(req)
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    const { error } = await supabase
      .from(TABLE_NAME)
      .delete()
      .eq('user_id', userId)

    if (error) {
      console.error('[predictions] DELETE error:', error)
      return res.status(500).json({ error: 'Failed to reset predictions' })
    }

    res.json({ ok: true })
  } catch (err) {
    next(err)
  }
})

export default router
