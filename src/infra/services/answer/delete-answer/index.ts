import { DeleteAnswerService } from '@/domain/application/services/answer/delete-answer'
import { PrismaAnswerRepository } from '@/infra/database/repositories/prisma-answer-repository'

const answerRepository = new PrismaAnswerRepository()
const deleteAnswerService = new DeleteAnswerService(answerRepository)

export { deleteAnswerService }
