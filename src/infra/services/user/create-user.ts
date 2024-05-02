import { CreateUserService } from '@/domain/application/services/user/create-user'
import { Crypto } from '@/infra/cryptography/crypto'
import { PrismaUserRepository } from '@/infra/database/repositories/prisma-user-repository'

const userRepository = new PrismaUserRepository()
const crypto = new Crypto()
const createUserService = new CreateUserService(userRepository, crypto)

export { createUserService }
