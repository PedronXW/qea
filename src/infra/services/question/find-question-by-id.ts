import { FindQuestionByIdService } from '@/domain/application/services/question/find-question-by-id'
import { PrismaQuestionRepository } from '@/infra/database/repositories/prisma-question-repository'

const questionRepository = new PrismaQuestionRepository()
const findQuestionByIdService = new FindQuestionByIdService(questionRepository)

export { findQuestionByIdService }
