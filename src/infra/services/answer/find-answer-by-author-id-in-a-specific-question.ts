import { FindAnswerByAuthorIdInASpecificQuestionService } from '@/domain/application/services/answer/find-answer-by-author-id-in-a-specific-question'
import { PrismaAnswerRepository } from '@/infra/database/repositories/prisma-answer-repository'
import { PrismaQuestionRepository } from '@/infra/database/repositories/prisma-question-repository'

const answerRepository = new PrismaAnswerRepository()
const questionRepository = new PrismaQuestionRepository()
const findAnswerByAuthorIdInASpecificQuestionService =
  new FindAnswerByAuthorIdInASpecificQuestionService(
    answerRepository,
    questionRepository,
  )

export { findAnswerByAuthorIdInASpecificQuestionService }
