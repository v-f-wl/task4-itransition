import { NextResponse } from 'next/server';
import { db } from "@/database/drizzle"
import { user } from "@/database/schema"

export async function GET(req: Request) {

  try {
    const result = await db
      .select({
        id: user.id,
        fullName: user.fullName,
        isBlocked: user.isBlocked,
        email: user.email,
        lastActivityDate: user.lastActivityDate,
      })
      .from(user)

    if (result.length === 0) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 })
    }

    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json({ message: 'server error' }, { status: 500 })
  }
}
