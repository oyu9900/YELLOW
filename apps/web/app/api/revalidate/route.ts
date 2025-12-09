import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath, revalidateTag } from 'next/cache'

export async function POST(req: NextRequest) {
  const secret = process.env.REVALIDATE_SECRET
  const body = await req.json().catch(() => ({} as any))

  // 1) Secret шалгах
  if (!secret || body?.secret !== secret) {
    return NextResponse.json(
      { revalidated: false, message: 'Invalid secret' },
      { status: 401 }
    )
  }

  // 2) Хэрвээ path ирсэн бол тухайн path-ийг revalidate хийх
  if (body.path && typeof body.path === 'string') {
    await revalidatePath(body.path)
  }

  // 3) Хэрвээ tag ирсэн бол тухайн tag-тай бүх cache-ийг revalidate хийх
  if (body.tag && typeof body.tag === 'string') {
    await revalidateTag(body.tag)
  }

  return NextResponse.json({
    revalidated: true,
    path: body.path ?? null,
    tag: body.tag ?? null,
  })
}
