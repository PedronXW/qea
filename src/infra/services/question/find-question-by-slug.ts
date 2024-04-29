import { FindQuestionBySlugService } from '@/domain/application/services/question/find-question-by-slug'
import { PrismaQuestionRepository } from '@/infra/database/repositories/prisma-question-repository'

const questionRepository = new PrismaQuestionRepository()
const findQuestionBySlugService = new FindQuestionBySlugService(
  questionRepository,
)

export { findQuestionBySlugService }
