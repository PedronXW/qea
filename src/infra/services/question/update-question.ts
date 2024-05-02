import { UpdateQuestionService } from '@/domain/application/services/question/update-question'
import { PrismaQuestionRepository } from '@/infra/database/repositories/prisma-question-repository'

const questionRepository = new PrismaQuestionRepository()
const updateQuestionService = new UpdateQuestionService(questionRepository)

export { updateQuestionService }
