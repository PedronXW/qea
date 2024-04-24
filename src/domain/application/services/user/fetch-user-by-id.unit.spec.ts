import { makeUser } from 'test/factories/user-factory'
import { InMemoryUserRepository } from 'test/repositories/InMemoryUserRepository'
import { UserNonExistsError } from '../../errors/UserNonExists'
import { FetchUserByIdService } from './fetch-user-by-id'

let sut: FetchUserByIdService
let inMemoryUserRepository: InMemoryUserRepository

describe('Fetch User By ID', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    sut = new FetchUserByIdService(inMemoryUserRepository)
  })

  it('should be able to fetch a user by id', async () => {
    const user = makeUser({
      name: 'any_name',
      email: 'any_email@gmail.com',
    })

    await inMemoryUserRepository.createUser(user)

    const result = await sut.execute({ id: user.id.getValue() })

    expect(result.isRight()).toBe(true)
    expect(inMemoryUserRepository.users[0].name).toEqual('any_name')
  })

  it('should be able to not fetch a user because a wrong id', async () => {
    const user = makeUser({
      name: 'any_name',
      email: 'any_email@gmail.com',
    })

    await inMemoryUserRepository.createUser(user)

    const result = await sut.execute({ id: 'wrong id' })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(UserNonExistsError)
  })
})
