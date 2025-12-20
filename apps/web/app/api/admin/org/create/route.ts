import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../../auth/[...nextauth]/options";
import prisma from "../../../../../../lib/prisma";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (session.user.role !== "ADMIN") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const body = await req.json();

  const created = await prisma.yellowBookEntry.create({
    data: {
      fullName: body.fullName,
      title: body.title,
      email: body.email,
      phone: body.phone || null,
      department: body.department,
      city: body.city,
      lat: body.lat ? Number(body.lat) : null,
      lng: body.lng ? Number(body.lng) : null,
      avatarUrl: body.avatarUrl || null,
    },
  });

  return NextResponse.json({ ok: true, id: created.id });
}
