import { EditUserService } from '@/domain/application/services/user/edit-user'
import { PrismaUserRepository } from '@/infra/database/repositories/prisma-user-repository'

const usersRepository = new PrismaUserRepository()
const editUserService = new EditUserService(usersRepository)

export { editUserService }
