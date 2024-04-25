import { Either, left, right } from '@/@shared/either'
import { Encrypter } from '../../criptography/encrypter'
import { HashComparer } from '../../criptography/hash-comparer'
import { WrongCredentialError } from '../../errors/WrongCredentialsError'
import { UserRepository } from '../../repositories/user-repository'

type AuthenticateUserServiceRequest = {
  email: string
  password: string
}

type AuthenticateUserServiceResponse = Either<
  WrongCredentialError,
  { token: string }
>

export class AuthenticateUserService {
  constructor(
    private userRepository: UserRepository,
    private hashComparer: HashComparer,
    private encrypter: Encrypter,
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateUserServiceRequest): Promise<AuthenticateUserServiceResponse> {
    const user = await this.userRepository.getUserByEmail(email)

    if (!user) {
      return left(new WrongCredentialError())
    }

    const passwordMatch = await this.hashComparer.compare(
      password,
      user.password!,
    )

    if (!passwordMatch) {
      return left(new WrongCredentialError())
    }

    const token = await this.encrypter.encrypt({
      id: user.id.getValue(),
    })

    return right({ token })
  }
}
