import { ServiceError } from '@/@shared/errors/service-error'

export class UserEmailNotVerifiedError extends Error implements ServiceError {
  constructor() {
    super(`User email not verified`)
  }
}
