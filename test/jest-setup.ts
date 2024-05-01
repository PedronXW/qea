import { env } from '@/infra/env'
import { PrismaClient } from '@prisma/client'
import { execSync } from 'child_process'
import { randomInt } from 'crypto'
import 'dotenv/config'
import { Redis } from 'ioredis'

const prisma = new PrismaClient()

process.env.NODE_ENV = 'test'

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not set')
}

const schemaId = randomInt(999999999).toString()

function generateUniqueDatabaseURL(schemaId: string) {
  const url = new URL(process.env.DATABASE_URL!)
  url.searchParams.set('schema', schemaId)
  return url.toString()
}

const redis = new Redis({
  host: env.REDIS_HOST,
  port: Number(env.REDIS_PORT),
  db: Number(9),
})

beforeEach(async () => {
  const databaseURL = generateUniqueDatabaseURL(schemaId)

  process.env.DATABASE_URL = databaseURL

  await redis.flushdb()

  execSync(`export DATABASE_URL=${databaseURL} && npx prisma migrate deploy`)
})

afterEach(async () => {
  await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schemaId}" CASCADE`)
  await prisma.$disconnect()
})

afterAll(async () => {
  await redis.quit()
})
