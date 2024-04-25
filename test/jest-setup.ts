import { PrismaClient } from '@prisma/client'
import { execSync } from 'child_process'
import { randomInt } from 'crypto'
import 'dotenv/config'

const prisma = new PrismaClient()

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not set')
}

const schemaId = randomInt(999999999).toString()

function generateUniqueDatabaseURL(schemaId: string) {
  const url = new URL(process.env.DATABASE_URL!)
  url.searchParams.set('schema', schemaId)
  return url.toString()
}

beforeEach(async () => {
  const databaseURL = generateUniqueDatabaseURL(schemaId)

  process.env.DATABASE_URL = databaseURL

  execSync(`export DATABASE_URL=${databaseURL} && npx prisma migrate deploy`)
})

afterEach(async () => {
  await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schemaId}" CASCADE`)
  await prisma.$disconnect()
})
