import { ServiceError } from '@/@shared/errors/service-error'

export class UserEmailAlreadyVerifiedError
  extends Error
  implements ServiceError
{
  constructor() {
    super(`User email already verified`)
  }
}
