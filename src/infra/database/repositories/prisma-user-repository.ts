import { UserRepository } from '@/domain/application/repositories/user-repository'
import { User } from '@/domain/enterprise/entities/user'
import { PrismaClient } from '@prisma/client'
import { UserMapper } from '../mappers/user-mapper'

export class PrismaUserRepository implements UserRepository {
  prisma = new PrismaClient()

  async createUser(user: User): Promise<User> {
    await this.prisma.user.create({
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
    const user = await this.prisma.user.update({
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

    return UserMapper.toDomain(user)
  }

  async deleteUser(id: string): Promise<boolean> {
    await this.prisma.user.update({
      where: { id },
      data: {
        active: false,
      },
    })

    return true
  }

  async editUser(id: string, name: string): Promise<User> {
    const editedUser = await this.prisma.user.update({
      where: { id },
      data: {
        name,
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

    return UserMapper.toDomain(editedUser)
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
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

    return UserMapper.toDomain(user)
  }

  async getUserById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
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

    return UserMapper.toDomain(user)
  }
}
