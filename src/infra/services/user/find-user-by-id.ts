import { FindUserByIdService } from '@/domain/application/services/user/find-user-by-id'
import { PrismaUserRepository } from '@/infra/database/repositories/prisma-user-repository'

const userRepository = new PrismaUserRepository()
const findUserByIdService = new FindUserByIdService(userRepository)

export { findUserByIdService }
