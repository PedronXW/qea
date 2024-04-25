import { Router } from 'express'
import { authenticationRoutes } from './authentication'
import { usersRouter } from './users'

const router = Router()

router.use('/sessions', authenticationRoutes)

router.use('/users', usersRouter)

router.get('/healthz', (req, res) => {
  const data = {
    uptime: process.uptime(),
    message: 'Ok',
    date: new Date(),
  }

  res.status(200).send(data)
})

export { router }
