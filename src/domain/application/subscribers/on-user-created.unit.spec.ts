import { RabbitMQModule } from '@/infra/rabbitmq/rabbitmqModule'
import { makeUser } from 'test/factories/user-factory'
import { InMemoryUserRepository } from 'test/repositories/InMemoryUserRepository'
import { OnUserCreated } from './on-user-created'

let inMemoryUserRepository: InMemoryUserRepository

describe('On Answer Created', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
  })

  it('should  send a notification when an answer is created', async () => {
    new OnUserCreated(new RabbitMQModule())

    const user = makeUser()

    inMemoryUserRepository.createUser(user)
  })
})
