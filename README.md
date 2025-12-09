<p align="center">
  <img src="https://img.shields.io/badge/Nx-monorepo-000?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Next.js-14-black?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Prisma-SQLite-blue?style=for-the-badge" />
</p>

# Yellow Book NX (Лаб , бүрэн гүйцэт)

Бүрэн хийгдсэн лабораторийн даалгаврын төсөл:
- Nx workspace (`apps/web`, `apps/api`, `libs/contract`, `libs/config`)
- Next.js 14 App Router + Tailwind (stylish UI)
- Prisma + SQLite (seed ≥ 5)
- API `/yellow-books`, `/yellow-books/:id`
- Rendering стратегиуд:
  - `/yellow-books` → ISR(60s) + streamed `<Suspense>` хэсэг
  - `/yellow-books/[id]` → SSG + generateStaticParams + on‑demand revalidate route
  - `/yellow-books/search` → SSR + client map island
- CI: lint + typecheck + build green

## Хурдан эхлүүлэх

```bash
cp .env.example .env

npm i

npx prisma generate
npx prisma migrate dev --name init

# Seed (баталгаатай ажилладаг script)
npm run seed

# Dev (Web + API зэрэг)
npm run dev
```
- Web: http://localhost:3000  
- API: http://localhost:4000

## Дизайн сонголтууд
- NUM шар theme (#FFCB05) + gradient background
- Card hover animation, lucide icon-ууд
- Client‑only map island 

## Deliverables
- Репо линк
- Green CI
- Lighthouse screenshot-ууд
- `perf.md` (TTFB, LCP тайлан)


## CI & Docker status

> NOTE: доорх badge дээрх `YOUR_GITHUB_USERNAME` болон `YOUR_REPO_NAME`-ээ өөрийн GitHub-д тааруулж солиорой.

[![Docker ECR Deploy](https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPO_NAME/actions/workflows/ecr-deploy.yml/badge.svg)](https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPO_NAME/actions/workflows/ecr-deploy.yml)

