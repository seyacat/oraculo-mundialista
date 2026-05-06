import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { clerkMiddleware, requireAuth, getAuth } from '@clerk/express'

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors({ origin: 'http://localhost:5173' }))
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
