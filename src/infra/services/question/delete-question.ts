import { DeleteQuestionService } from '@/domain/application/services/question/delete-question'
import { PrismaQuestionRepository } from '@/infra/database/repositories/prisma-question-repository'

const questionRepository = new PrismaQuestionRepository()
const deleteQuestionService = new DeleteQuestionService(questionRepository)

export { deleteQuestionService }
