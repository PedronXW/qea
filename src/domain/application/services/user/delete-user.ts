import { Either, left, right } from '@/@shared/either'
import { UserNonExistsError } from '../../errors/UserNonExists'
import { UserRepository } from '../../repositories/user-repository'

type DeleteUserServiceRequest = {
  id: string
}

type DeleteUserServiceResponse = Either<UserNonExistsError, boolean>

export class DeleteUserService {
  constructor(private userRepository: UserRepository) {}

  async execute({
    id,
  }: DeleteUserServiceRequest): Promise<DeleteUserServiceResponse> {
    const user = await this.userRepository.getUserById(id)

    if (!user) {
      return left(new UserNonExistsError())
    }

    const result = await this.userRepository.deleteUser(id)

    return right(result)
  }
}
