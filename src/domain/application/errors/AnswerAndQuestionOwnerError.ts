import { ServiceError } from '@/@shared/errors/service-error'

export class AnswerAndQuestionOwnerError extends Error implements ServiceError {
  constructor() {
    super('Answer and Question has the same owner')
  }
}
