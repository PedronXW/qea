import { ServiceError } from '@/@shared/errors/service-error'

export class AnswerAndQuestionSameOwnerError
  extends Error
  implements ServiceError
{
  constructor() {
    super('Answer and Question has the same owner')
  }
}
