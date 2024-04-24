import { Either, left, right } from '@/@shared/either'
import { User } from '@/domain/enterprise/entities/user'
import { UserNonExistsError } from '../../errors/UserNonExists'
import { UserRepository } from '../../repositories/user-repository'

type FetchUserByIdServiceRequest = {
  id: string
}

type FetchUserByIdServiceResponse = Either<UserNonExistsError, User>

export class FetchUserByIdService {
  constructor(private userRepository: UserRepository) {}

  async execute({
    id,
  }: FetchUserByIdServiceRequest): Promise<FetchUserByIdServiceResponse> {
    const user = await this.userRepository.getUserById(id)

    if (!user) {
      return left(new UserNonExistsError())
    }

    return right(user)
  }
}
