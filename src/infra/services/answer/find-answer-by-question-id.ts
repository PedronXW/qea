import { FindAnswersByQuestionIdService } from '@/domain/application/services/answer/find-answer-by-question-id'
import { PrismaAnswerRepository } from '@/infra/database/repositories/prisma-answer-repository'

const answerRepository = new PrismaAnswerRepository()
const findAnswersByQuestionIdService = new FindAnswersByQuestionIdService(
  answerRepository,
)

export { findAnswersByQuestionIdService }
