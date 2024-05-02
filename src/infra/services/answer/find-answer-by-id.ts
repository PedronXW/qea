import { FindAnswerByIdService } from '@/domain/application/services/answer/find-answer-by-id'
import { PrismaAnswerRepository } from '@/infra/database/repositories/prisma-answer-repository'

const answerRepository = new PrismaAnswerRepository()
const findAnswerByIdService = new FindAnswerByIdService(answerRepository)

export { findAnswerByIdService }
