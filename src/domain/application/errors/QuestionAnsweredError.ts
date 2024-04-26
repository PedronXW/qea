import { ServiceError } from '@/@shared/errors/service-error'

export class QuestionAnsweredError extends Error implements ServiceError {
  constructor() {
    super('Question already answered')
  }
}
