import { Crypto } from '@/infra/cryptography/crypto'
import { makeUser } from 'test/factories/user-factory'
import { InMemoryUserRepository } from 'test/repositories/InMemoryUserRepository'
import { WrongCredentialError } from '../../errors/WrongCredentialsError'
import { ChangePasswordService } from './change-password'

let sut: ChangePasswordService
let inMemoryUserRepository: InMemoryUserRepository
let crypto: Crypto

describe('ChangePassword', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    crypto = new Crypto()
    sut = new ChangePasswordService(inMemoryUserRepository, crypto, crypto)
  })

  it('should be able to change a user password', async () => {
    const user = makeUser({
      name: 'any_name',
      email: 'any_email@gmail.com',
      password: await crypto.hash('any_password'),
    })

    await inMemoryUserRepository.createUser(user)

    const result = await sut.execute(
      user.id.getValue(),
      'any_password',
      'new_password',
    )

    expect(result.isRight()).toBe(true)
    expect(
      await crypto.compare(
        'new_password',
        inMemoryUserRepository.users[0].password!.toString(),
      ),
    ).toBe(true)
  })

  it('should be able to not change a user password with a credential error', async () => {
    const user = makeUser({
      name: 'any_name',
      email: 'any_email@gmail.com',
      password: await crypto.hash('any_password'),
    })

    await inMemoryUserRepository.createUser(user)

    const result = await sut.execute(
      user.id.getValue(),
      'any_p',
      'new_password',
    )

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(WrongCredentialError)
  })
})
