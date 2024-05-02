import { execSync } from 'child_process'
import { env } from './env'
import { app } from './http/app'

app.listen(env.PORT, async () => {

  const result = execSync(`npx prisma generate && npx prisma migrate deploy`)
  if (result.toString().includes('Error')) {
    console.error('Error on Prisma migration')
    process.exit(1)
  }
  console.log(`Server listening on port ${env.PORT}`)
})
