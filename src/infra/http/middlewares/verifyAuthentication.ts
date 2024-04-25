import { verify } from 'jsonwebtoken'

import { UserEmailNotVerifiedError } from '@/domain/application/errors/UserEmailNotVerifiedError'
import { env } from '@/infra/env'
import { AppError } from '../errors/AppError'

interface IPayload {
  sub: string
}

export async function verifyAuthentication(request, response, next) {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    throw new AppError('Token missing', 401)
  }

  const [, token] = authHeader.split(' ')

  try {
    const { sub: id } = verify(token, env.JWT_SECRET) as IPayload

    request.user = {
      id,
    }

    next()
  } catch (error) {
    if (error instanceof UserEmailNotVerifiedError) {
      throw new AppError('User e-mail not verified', 401)
    } else {
      throw new AppError('Invalid token', 401)
    }
  }
}
