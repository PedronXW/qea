import { FindAnswerByAuthorIdInASpecificQuestionService } from '@/domain/application/services/answer/find-answer-by-author-id-in-a-specific-question'
import { PrismaAnswerRepository } from '@/infra/database/repositories/prisma-answer-repository'

const answerRepository = new PrismaAnswerRepository()
const findAnswerByAuthorIdInASpecificQuestionService =
  new FindAnswerByAuthorIdInASpecificQuestionService(answerRepository)

export { findAnswerByAuthorIdInASpecificQuestionService }
