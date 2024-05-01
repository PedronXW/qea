import { CreateQuestionService } from '@/domain/application/services/question/create-question'
import { PrismaQuestionRepository } from '@/infra/database/repositories/prisma-question-repository'

const questionRepository = new PrismaQuestionRepository()

const createQuestionService = new CreateQuestionService(questionRepository)

export { createQuestionService }
