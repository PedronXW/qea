import { User } from '@/domain/enterprise/entities/user'
import { RabbitMQModule } from '@/infra/rabbitmq/rabbitmqModule'
import { InMemoryUserRepository } from 'test/repositories/InMemoryUserRepository'
import { OnUserCreated } from './on-user-created'

let inMemoryUserRepository: InMemoryUserRepository

describe('On Answer Created', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
  })

  it('should  send a notification when an answer is created', async () => {
    new OnUserCreated(new RabbitMQModule())

    const user = User.create({
      name: 'any_name',
      type: 'ORGANIZER',
      email: 'anyemail@email.com',
    })

    inMemoryUserRepository.createUser(user)
  })
})
