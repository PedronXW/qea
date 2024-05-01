import { DeleteUserService } from '@/domain/application/services/user/delete-user'
import { RedisCacheRepository } from '@/infra/cache/redis-repository'
import { PrismaUserRepository } from '@/infra/database/repositories/prisma-user-repository'

const userRepository = new PrismaUserRepository()
const cacheRepository = new RedisCacheRepository()
const deleteUserService = new DeleteUserService(userRepository, cacheRepository)
export { deleteUserService }
