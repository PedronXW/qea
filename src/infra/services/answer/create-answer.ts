import { CreateAnswerService } from '@/domain/application/services/answer/create-answer'
import { PrismaAnswerRepository } from '@/infra/database/repositories/prisma-answer-repository'
import { PrismaQuestionRepository } from '@/infra/database/repositories/prisma-question-repository'

const answerRepository = new PrismaAnswerRepository()
const questionRepository = new PrismaQuestionRepository()
const createAnswerService = new CreateAnswerService(
  answerRepository,
  questionRepository,
)

export { createAnswerService }
