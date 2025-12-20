import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";
import prisma from "../../../../lib/prisma";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { code } = await req.json();

  if (code !== process.env.ADMIN_ACCESS_CODE) {
    return NextResponse.json({ error: "Invalid code" }, { status: 403 });
  }

  await prisma.user.update({
    where: { email: session.user.email },
    data: { role: "ADMIN" },
  });

  return NextResponse.json({ ok: true });
}
