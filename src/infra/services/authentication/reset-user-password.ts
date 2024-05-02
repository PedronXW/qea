import { ResetUserPasswordService } from '@/domain/application/services/user/reset-user-password'
import { Crypto } from '@/infra/cryptography/crypto'
import { Encrypter } from '@/infra/cryptography/encrypter'
import { PrismaUserRepository } from '@/infra/database/repositories/prisma-user-repository'

const userRepository = new PrismaUserRepository()
const crypto = new Crypto()
const encrypter = new Encrypter()
const resetUserPasswordService = new ResetUserPasswordService(
  userRepository,
  crypto,
  encrypter,
)
export { resetUserPasswordService }
