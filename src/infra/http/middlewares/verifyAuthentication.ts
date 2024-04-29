import { verify } from 'jsonwebtoken'

import { UserTypes } from '@/domain/enterprise/entities/user'
import { env } from '@/infra/env'
import { AppError } from '../errors/AppError'

interface IPayload {
  id: string
  type: UserTypes
}

export async function verifyAuthentication(request, response, next) {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    throw new AppError('Token missing', 401)
  }

  const [, token] = authHeader.split(' ')

  try {
    const { id, type } = verify(token, env.JWT_SECRET) as IPayload

    request.user = {
      id,
    }

    request.permission = {
      type,
    }

    next()
  } catch (error) {
    throw new AppError('Invalid token', 401)
  }
}
