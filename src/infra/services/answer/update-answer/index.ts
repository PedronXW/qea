import { UpdateAnswerService } from '@/domain/application/services/answer/update-answer'
import { PrismaAnswerRepository } from '@/infra/database/repositories/prisma-answer-repository'

const answerRepository = new PrismaAnswerRepository()
const updateAnswerService = new UpdateAnswerService(answerRepository)

export { updateAnswerService }
