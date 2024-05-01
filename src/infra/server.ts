import { env } from './env'
import { app } from './http/app'

app.listen(env.PORT, async () => {
  console.log(`Server listening on port ${env.PORT}`)
})
