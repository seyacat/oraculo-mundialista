import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { clerkMiddleware, requireAuth, getAuth } from '@clerk/express'

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

app.get('/api/me', requireAuth(), (req, res) => {
  const { userId } = getAuth(req)
  res.json({ userId })
})

app.listen(PORT, () => {
  console.log(`Backend corriendo en http://localhost:${PORT}`)
})
