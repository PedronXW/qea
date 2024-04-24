import { makeUser } from 'test/factories/user-factory'
import { InMemoryUserRepository } from 'test/repositories/InMemoryUserRepository'
import { UserNonExistsError } from '../../errors/UserNonExists'
import { FetchUserByEmailService } from './fetch-user-by-email'

let sut: FetchUserByEmailService
let inMemoryUserRepository: InMemoryUserRepository

describe('Fetch User By Email', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    sut = new FetchUserByEmailService(inMemoryUserRepository)
  })

  it('should be able to fetch a user by email', async () => {
    const user = makeUser({
      name: 'any_name',
      email: 'any_email@gmail.com',
    })

    await inMemoryUserRepository.createUser(user)

    const result = await sut.execute({ email: user.email })

    expect(result.isRight()).toBe(true)
    expect(inMemoryUserRepository.users[0].name).toEqual('any_name')
  })

  it('should be able to not fetch a user by email because a wrong email', async () => {
    const user = makeUser({
      name: 'any_name',
      email: 'any_email@gmail.com',
    })

    await inMemoryUserRepository.createUser(user)

    const result = await sut.execute({ email: 'wrongemail@wrong.com' })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(UserNonExistsError)
  })
})
