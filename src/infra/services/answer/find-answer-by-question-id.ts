import { FindAnswersByQuestionIdService } from '@/domain/application/services/answer/find-answer-by-question-id'
import { PrismaAnswerRepository } from '@/infra/database/repositories/prisma-answer-repository'
import { PrismaQuestionRepository } from '@/infra/database/repositories/prisma-question-repository'

const answerRepository = new PrismaAnswerRepository()
const questionRepository = new PrismaQuestionRepository()
const findAnswersByQuestionIdService = new FindAnswersByQuestionIdService(
  answerRepository,
  questionRepository,
)

export { findAnswersByQuestionIdService }
