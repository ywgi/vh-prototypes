// scripts/create-user.ts
import { MongoClient } from 'mongodb'
import bcrypt from 'bcrypt'
import { env } from 'node:process'

const uri = process.env.MONGODB_URI || "";

async function main() {
  const client = new MongoClient(uri)
  await client.connect()
  const db = client.db('verhoef')

  const passwordHash = await bcrypt.hash('test123', 10)

  await db.collection('users').insertOne({
    email: 'youremail@verhoefautomotive.com',
    passwordHash,
    name: 'Your Name'
  })

  console.log('User created')
  await client.close()
}

main();