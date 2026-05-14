import { config as dotenvConfig } from 'dotenv'
dotenvConfig({ override: true })

import express from 'express'
import cors from 'cors'
import { clerkMiddleware, getAuth } from '@clerk/express'

const app = express()
const PORT = process.env.PORT || 3000
const allowedOrigins = (process.env.CORS_ORIGINS || process.env.FRONTEND_ORIGIN || 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean)

app.use(cors({ origin: allowedOrigins }))
app.use(express.json())
app.use(clerkMiddleware())

app.get('/api/health', (_req, res) => {
  res.json({ ok: true })
})

app.get('/api/me', (req, res) => {
  const { userId } = getAuth(req)
  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  res.json({ userId })
})

// Express 5 requires an explicit 4-argument error handler
// Without it, errors from clerkMiddleware propagate to Express's default 500 handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const status = err.status || err.statusCode || 500
  const message = err.message || 'Internal Server Error'
  console.error(`[error] ${req.method} ${req.url} → ${status}: ${message}`)
  res.status(status).json({ error: message })
})

app.listen(PORT, () => {
  console.log(`Backend corriendo en http://localhost:${PORT}`)
})
