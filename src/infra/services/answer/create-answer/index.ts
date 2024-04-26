import { CreateAnswerService } from '@/domain/application/services/answer/create-answer'
import { PrismaAnswerRepository } from '@/infra/database/repositories/prisma-answer-repository'

const answerRepository = new PrismaAnswerRepository()
const createAnswerService = new CreateAnswerService(answerRepository)

export { createAnswerService }
