import { User } from '@/domain/enterprise/entities/user'

export type EditUser = {
  name?: string
  email?: string
}

export abstract class UserRepository {
  abstract createUser(user: User): Promise<User>

  abstract changePassword(id: string, password: string): Promise<User>

  abstract deleteUser(id: string): Promise<boolean>

  abstract editUser(id: string, user: EditUser): Promise<User>

  abstract getUserByEmail(email: string): Promise<User | null>

  abstract getUserById(id: string): Promise<User | null>
}
