import express from 'express'
import { PrismaClient } from '@prisma/client'
import { YellowBookEntrySchema } from '@yellow-book/contract'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import cookieParser from "cookie-parser";


const app = express()
const prisma = new PrismaClient()
app.use(express.json())
app.use(cookieParser());


// ----------------------------
//  Auth Middleware
// ----------------------------
function auth(req: any, res: any, next: any) {
  const header = req.headers.authorization
  if (!header) return res.status(401).json({ error: 'No token provided' })

  const token = header.split(' ')[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret123')
    req.user = decoded
    next()
  } catch {
    return res.status(401).json({ error: 'Invalid or expired token' })
  }
}

// ----------------------------
//  Root
// ----------------------------
app.get('/', (_req, res) => {
  res.send('🟡 YellowBook API is running')
})

// ----------------------------
//  Register User
// ----------------------------
// REGISTER
app.post('/auth/register', async (req, res) => {
  try {
    const { email, password } = req.body as { email?: string; password?: string }

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' })
    }

    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      return res.status(400).json({ error: 'User already exists' })
    }

    const hashed = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: {
        email,
        passwordHash: hashed,
      },
      select: { id: true, email: true, createdAt: true },
    })

    return res.json({ user })
  } catch (e) {
    console.error('REGISTER ERROR', e)
    return res.status(500).json({ error: 'Internal server error' })
  }
})

// LOGIN
// LOGIN
app.post('/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' })
    }

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user || !user.passwordHash) {
      return res.status(400).json({ error: 'Invalid credentials' })
    }

    const valid = await bcrypt.compare(password, user.passwordHash)
    if (!valid) {
      return res.status(400).json({ error: 'Invalid credentials' })
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || 'secret123',
      { expiresIn: '7d' },
    )

    return res.json({ token })
  } catch (e) {
    console.error('LOGIN ERROR', e)
    return res.status(500).json({ error: 'Internal server error' })
  }
})


// ----------------------------
//  Protected Test Route
// ----------------------------
app.get('/auth/me', auth, async (req: any, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user.userId },
    select: { id: true, email: true, createdAt: true },
  })

  return res.json(user)
})

// ----------------------------
//  YellowBook API
// ----------------------------

const useDb = process.env.USE_DB !== 'false' // default true

// LIST PAGE
app.get('/yellow-books', async (_req, res) => {
  try {
    if (useDb) {
      const rows = await prisma.yellowBookEntry.findMany({ orderBy: { fullName: 'asc' } })

      const mapped = rows.map((r) => ({
        id: r.id,
        fullName: r.fullName,
        title: r.title,
        email: r.email,
        phone: r.phone ?? undefined,
        department: r.department,
        city: r.city,
        location:
          r.lat != null && r.lng != null ? { lat: r.lat, lng: r.lng } : undefined,
        avatarUrl: r.avatarUrl ?? undefined,
      }))

      return res.json(mapped)
    } else {
      const data = (
        await import('./data/seed.json', { assert: { type: 'json' } })
      ).default
      return res.json(data)
    }
  } catch (e) {
    console.error(e)
    return res.status(500).json({ error: 'Internal error' })
  }
})

// DETAIL PAGE
app.get('/yellow-books/:id', async (req, res) => {
  const id = req.params.id

  try {
    if (useDb) {
      const r = await prisma.yellowBookEntry.findUnique({ where: { id } })

      if (!r) return res.status(404).json({ error: 'Not found' })

      const data = {
        id: r.id,
        fullName: r.fullName,
        title: r.title,
        email: r.email,
        phone: r.phone ?? undefined,
        department: r.department,
        city: r.city,
        location:
          r.lat != null && r.lng != null ? { lat: r.lat, lng: r.lng } : undefined,
        avatarUrl: r.avatarUrl ?? undefined,
      }

      return res.json(data)
    } else {
      const data = (
        await import('./data/seed.json', { assert: { type: 'json' } })
      ).default
      const found = (data as any[]).find((x) => x.id === id)
      return found ? res.json(found) : res.status(404).json({ error: 'Not found' })
    }
  } catch (e) {
    console.error(e)
    return res.status(500).json({ error: 'Internal error' })
  }
})

// CREATE ITEM
app.post('/yellow-books', auth, async (req, res) => {
  const parsed = YellowBookEntrySchema.safeParse(req.body)
  if (!parsed.success) return res.status(400).json({ error: parsed.error.issues })

  const e = parsed.data

  try {
    if (useDb) {
      const created = await prisma.yellowBookEntry.create({
        data: {
          id: e.id,
          fullName: e.fullName,
          title: e.title,
          email: e.email,
          phone: e.phone,
          department: e.department,
          city: e.city,
          lat: e.location?.lat,
          lng: e.location?.lng,
          avatarUrl: e.avatarUrl,
        },
      })

      return res.status(201).json(created)
    } else {
      return res.status(501).json({ error: 'Not implemented in JSON mode' })
    }
  } catch (e) {
    console.error(e)
    return res.status(500).json({ error: 'Internal error' })
  }
})

// ----------------------------
// Start Server
// ----------------------------
const port = process.env.PORT || 4000
app.listen(port, () => {
  console.log(`🟡 YellowBook API → http://localhost:${port}`)
})
