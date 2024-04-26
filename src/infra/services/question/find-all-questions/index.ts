import { FindAllQuestionsService } from '@/domain/application/services/question/find-all-questions'
import { PrismaQuestionRepository } from '@/infra/database/repositories/prisma-question-repository'

const questionRepository = new PrismaQuestionRepository()
const findAllQuestionsService = new FindAllQuestionsService(questionRepository)

export { findAllQuestionsService }
