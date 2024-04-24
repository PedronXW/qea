import { PrismaClient } from '@prisma/client'
import { execSync } from 'child_process'
import { randomUUID } from 'crypto'
import 'dotenv/config'

const prisma = new PrismaClient()

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not set')
}

function generateUniqueDatabaseURL(schemaId: string) {
  const url = new URL(process.env.DATABASE_URL!)
  url.searchParams.set('schema', schemaId)
  return url.toString()
}

const schemaId = randomUUID()

beforeAll(async () => {
  const databaseURL = generateUniqueDatabaseURL(schemaId)

  process.env.DATABASE_URL = databaseURL

  execSync('npx prisma migrate deploy')
})

afterAll(async () => {
  await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schemaId}" CASCADE`)
  await prisma.$disconnect()
})