// app/api/auth/login/route.ts
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import { randomUUID } from 'crypto'
import clientPromise from '@/lib/mongodb'

export async function POST(request: NextRequest) {
  const { email, password } = await request.json()

  if (!email || !password) {
    return NextResponse.json(
      { error: 'Email and password are required' },
      { status: 400 }
    )
  }

  if (!email.endsWith('@verhoefautomotive.com')) {
    return NextResponse.json(
      { error: 'Invalid credentials' },
      { status: 401 }
    )
  }

  const db = (await clientPromise).db(process.env.DB_NAME)
  const user = await db.collection('users').findOne({ email })

  if (!user) {
    return NextResponse.json(
      { error: 'Invalid credentials' },
      { status: 401 }
    )
  }

  const isValid = await bcrypt.compare(password, user.passwordHash)

  if (!isValid) {
    return NextResponse.json(
      { error: 'Invalid credentials' },
      { status: 401 }
    )
  }

  // Create session
  const sessionId = randomUUID()
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 1 week

  await db.collection('sessions').insertOne({
    sessionId,
    userId: user._id,
    createdAt: new Date(),
    expiresAt
  })

  const response = NextResponse.json({ success: true })

  response.cookies.set('session_id', sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    expires: expiresAt
  })

  return response
}