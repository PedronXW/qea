import { Crypto } from '@/infra/cryptography/crypto'
import { InMemoryUserRepository } from 'test/repositories/InMemoryUserRepository'
import { CreateUserService } from './create-user'

let sut: CreateUserService
let inMemoryUserRepository: InMemoryUserRepository
let crypto: Crypto

describe('CreateUser', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    crypto = new Crypto()
    sut = new CreateUserService(inMemoryUserRepository, crypto)
  })

  it('should be able to create a user', async () => {
    const result = await sut.execute({
      name: 'any_name',
      email: 'any_email@gmail.com',
      type: 'PARTICIPANT',
      password: 'any_password',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryUserRepository.users[0].name).toEqual('any_name')
  })
})
