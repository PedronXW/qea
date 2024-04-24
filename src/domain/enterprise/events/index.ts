import { OnUserCreated } from '@/domain/application/subscribers/on-user-created'
import { RabbitMQModule } from '@/infra/rabbitmq/rabbitmqModule'

export const setupEvents = () => {
  new OnUserCreated(new RabbitMQModule())
}
