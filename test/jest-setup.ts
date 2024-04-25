import { PrismaClient } from '@prisma/client'
import { execSync } from 'child_process'
import { randomInt } from 'crypto'
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

beforeEach(async () => {
  const schemaId = randomInt(999999).toString()

  process.env.SCHEMA_ID = schemaId

  const databaseURL = generateUniqueDatabaseURL(schemaId)

  await prisma.$executeRawUnsafe(`CREATE SCHEMA IF NOT EXISTS test_${schemaId}`)

  process.env.DATABASE_URL = databaseURL

  execSync('npx prisma migrate deploy')
})

afterEach(async () => {
  const schemaId = process.env.SCHEMA_ID

  await prisma.$executeRawUnsafe(
    `DROP SCHEMA IF EXISTS test_${schemaId} CASCADE`,
  )
  await prisma.$disconnect()
})
