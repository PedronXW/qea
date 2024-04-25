import { DeleteUserService } from '@/domain/application/services/user/delete-user'
import { PrismaUserRepository } from '@/infra/database/repositories/prisma-user-repository'

const userRepository = new PrismaUserRepository()
const deleteUserService = new DeleteUserService(userRepository)
export { deleteUserService }
