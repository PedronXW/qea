import {
  EditUserType,
  UserRepository,
} from '@/domain/application/repositories/user-repository'
import { User } from '@/domain/enterprise/entities/user'
import { prisma } from '..'

export class PrismaUserRepository implements UserRepository {
  async createUser(user: User): Promise<User> {
    await prisma.user.create({
      data: {
        id: user.id.getValue(),
        name: user.name,
        email: user.email,
        password: user.password as string,
        type: user.type,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    })

    return user
  }

  async changePassword(id: string, password: string): Promise<User> {
    const user = await prisma.user.update({
      where: { id },
      data: {
        password,
        updatedAt: new Date(),
      },
      select: {
        id: true,
        name: true,
        email: true,
        type: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    return User.create(user)
  }

  async deleteUser(id: string): Promise<boolean> {
    await prisma.user.delete({
      where: { id },
    })

    return true
  }

  async editUser(id: string, user: EditUserType): Promise<User> {
    const data = {} as EditUserType

    if (user.name) {
      data.name = user.name
    }

    if (user.email) {
      data.email = user.email
    }

    const editedUser = await prisma.user.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date(),
      },
      select: {
        id: true,
        name: true,
        email: true,
        type: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    return User.create(editedUser)
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        type: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    if (!user) {
      return null
    }

    return User.create(user)
  }

  async getUserById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        type: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    if (!user) {
      return null
    }

    return User.create(user)
  }
}
