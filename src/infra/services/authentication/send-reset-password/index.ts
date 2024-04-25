import { SendResetPasswordService } from '@/domain/application/services/user/send-reset-password'
import { Encrypter } from '@/infra/cryptography/encrypter'
import { PrismaUserRepository } from '@/infra/database/repositories/PrismaUserRepository'

const userRepository = new PrismaUserRepository()
const encrypter = new Encrypter()
const sendResetPasswordService = new SendResetPasswordService(
  userRepository,
  encrypter,
)
export { sendResetPasswordService }
