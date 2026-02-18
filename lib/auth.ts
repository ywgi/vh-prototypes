// lib/auth.ts
import { cookies } from 'next/headers';
import clientPromise from '@/lib/mongodb';

export async function getSession() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get('session_id')?.value;

  if (!sessionId) return null

  const db = (await clientPromise).db(process.env.DB_NAME)
  const session = await db.collection('sessions').findOne({
    sessionId,
    expiresAt: { $gt: new Date() }
  })

  if (!session) return null

  const user = await db.collection('users').findOne({ _id: session.userId });
  return user;
}