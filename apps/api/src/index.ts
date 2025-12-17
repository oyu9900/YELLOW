import express from 'express'
import { PrismaClient } from '@prisma/client'
import { YellowBookEntrySchema } from '@yellow-book/contract'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import cookieParser from 'cookie-parser'
import fs from 'fs'
import path from 'path'
import adminRoutes from "./admin/admin.controller";


const app = express()
const prisma = new PrismaClient()

app.use(express.json())
app.use(cookieParser())
app.use("/admin", adminRoutes);
const useDb = process.env.USE_DB !== 'false'

// ----------------------------
// Root (Health Check)
// ----------------------------
app.get('/', (_req, res) => {
  res.json({
    status: 'OK',
    service: 'YellowBook API',
  })
})

// ----------------------------
// Auth Middleware
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
// LIST: GET /yellow-books
// ----------------------------
app.get('/yellow-books', async (_req, res) => {
  try {
    if (useDb) {
      const rows = await prisma.yellowBookEntry.findMany({
        orderBy: { fullName: 'asc' },
      })

      return res.json(
        rows.map((r) => ({
          id: r.id,
          fullName: r.fullName,
          title: r.title,
          email: r.email,
          phone: r.phone ?? undefined,
          department: r.department,
          city: r.city,
          avatarUrl: r.avatarUrl ?? undefined,
        }))
      )
    }

    const filePath = path.join(__dirname, 'data', 'seed.json')
    return res.json(JSON.parse(fs.readFileSync(filePath, 'utf-8')))
  } catch (e) {
    console.error(e)
    res.status(500).json({ error: 'Internal error' })
  }
})

// ----------------------------
// DETAIL: GET /yellow-books/:id
// ----------------------------
app.get('/yellow-books/:id', async (req, res) => {
  try {
    const id = req.params.id

    if (useDb) {
      const r = await prisma.yellowBookEntry.findUnique({ where: { id } })
      if (!r) return res.status(404).json({ error: 'Not found' })

      return res.json({
        id: r.id,
        fullName: r.fullName,
        title: r.title,
        email: r.email,
        phone: r.phone ?? undefined,
        department: r.department,
        city: r.city,
        avatarUrl: r.avatarUrl ?? undefined,
      })
    }

    const filePath = path.join(__dirname, 'data', 'seed.json')
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
    const found = data.find((x: any) => x.id === id)

    return found
      ? res.json(found)
      : res.status(404).json({ error: 'Not found' })
  } catch (e) {
    console.error(e)
    res.status(500).json({ error: 'Internal error' })
  }
})

// ----------------------------
// AUTH
// ----------------------------
app.post('/auth/register', async (req, res) => {
  const { email, password } = req.body
  if (!email || !password)
    return res.status(400).json({ error: 'Email and password required' })

  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing)
    return res.status(400).json({ error: 'User already exists' })

  const hashed = await bcrypt.hash(password, 10)

  const user = await prisma.user.create({
    data: { email, passwordHash: hashed },
    select: { id: true, email: true },
  })

  res.json({ user })
})

app.post('/auth/login', async (req, res) => {
  const { email, password } = req.body
  const user = await prisma.user.findUnique({ where: { email } })

  if (!user || !(await bcrypt.compare(password, user.passwordHash)))
    return res.status(400).json({ error: 'Invalid credentials' })

  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET || 'secret123',
    { expiresIn: '7d' }
  )

  res.json({ token })
})

// ----------------------------
// START
// ----------------------------
const port = process.env.PORT || 4000
app.listen(port, () => {
  console.log(`🟡 YellowBook API → http://localhost:${port}`)
})
