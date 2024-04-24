import { Either, left, right } from '@/@shared/either'
import { User } from '@/domain/enterprise/entities/user'
import { UserNonExistsError } from '../../errors/UserNonExists'
import { UserRepository } from '../../repositories/user-repository'

type EditUserServiceRequest = {
  name?: string
  email?: string
}

type EditUserServiceResponse = Either<UserNonExistsError, User>

export class EditUserService {
  constructor(private userRepository: UserRepository) {}

  async execute(
    id: string,
    { name, email }: EditUserServiceRequest,
  ): Promise<EditUserServiceResponse> {
    const user = await this.userRepository.getUserById(id)

    if (!user) {
      return left(new UserNonExistsError())
    }

    const updatedUser = await this.userRepository.editUser(id, {
      name,
      email,
    })

    return right(updatedUser)
  }
}
