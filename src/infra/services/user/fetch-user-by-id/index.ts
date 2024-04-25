import { FetchUserByIdService } from '@/domain/application/services/user/fetch-user-by-id'
import { PrismaUserRepository } from '@/infra/database/repositories/prisma-user-repository'

const userRepository = new PrismaUserRepository()
const fetchUserByIdService = new FetchUserByIdService(userRepository)

export { fetchUserByIdService }
