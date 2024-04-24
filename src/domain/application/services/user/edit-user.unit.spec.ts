import { makeUser } from 'test/factories/user-factory'
import { InMemoryUserRepository } from 'test/repositories/InMemoryUserRepository'
import { UserNonExistsError } from '../../errors/UserNonExists'
import { EditUserService } from './edit-user'

let sut: EditUserService
let inMemoryUserRepository: InMemoryUserRepository

describe('EditUser', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    sut = new EditUserService(inMemoryUserRepository)
  })

  it('should be able to edit a user', async () => {
    const user = makeUser({
      name: 'any_name',
      email: 'any_email@gmail.com',
    })

    await inMemoryUserRepository.createUser(user)

    const result = await sut.execute(user.id.getValue(), {
      name: 'any_name2',
      email: 'any_email2@gmail.com',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryUserRepository.users[0].name).toEqual('any_name2')
  })

  it('should be able to not edit a user because a wrong id', async () => {
    const user = makeUser({
      name: 'any_name',
      email: 'any_email@gmail.com',
    })

    await inMemoryUserRepository.createUser(user)

    const result = await sut.execute('wrong id', {
      name: 'any_name2',
      email: 'any_email2@gmail.com',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(UserNonExistsError)
    expect(inMemoryUserRepository.users[0].name).toEqual('any_name')
    expect(inMemoryUserRepository.users[0].email).toEqual('any_email@gmail.com')
  })
})
