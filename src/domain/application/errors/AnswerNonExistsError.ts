import { ServiceError } from '@/@shared/errors/service-error'

export class AnswerNonExistsError extends Error implements ServiceError {
  constructor() {
    super('Answer does not exists')
  }
}
