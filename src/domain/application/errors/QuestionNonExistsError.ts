import { ServiceError } from '@/@shared/errors/service-error'

export class QuestionNonExistsError extends Error implements ServiceError {
  constructor() {
    super(`Question non exists`)
  }
}
