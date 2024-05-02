import { ChangePasswordService } from '@/domain/application/services/user/change-password'
import { Crypto } from '@/infra/cryptography/crypto'
import { PrismaUserRepository } from '@/infra/database/repositories/prisma-user-repository'

const userRepository = new PrismaUserRepository()
const crypto = new Crypto()
const changePasswordService = new ChangePasswordService(
  userRepository,
  crypto,
  crypto,
)

export { changePasswordService }
