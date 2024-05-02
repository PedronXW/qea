import { AuthenticateUserService } from '@/domain/application/services/user/authenticate-user'
import { Crypto } from '@/infra/cryptography/crypto'
import { Encrypter } from '@/infra/cryptography/encrypter'
import { PrismaUserRepository } from '@/infra/database/repositories/prisma-user-repository'

const encrypter = new Encrypter()
const hashComparer = new Crypto()
const userRepository = new PrismaUserRepository()

const authenticateDeveloperService = new AuthenticateUserService(
  userRepository,
  hashComparer,
  encrypter,
)

export { authenticateDeveloperService }
