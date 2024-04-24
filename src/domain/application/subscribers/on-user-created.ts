import { DomainEvents } from '@/@shared/events/event-dispatcher'
import { EventHandler } from '@/@shared/events/event-handler'
import { CreateUserEvent } from '@/domain/enterprise/events/CreateUserEvent'
import { env } from '@/infra/env'
import { RabbitMQOptions } from '@/infra/rabbitmq/rabbitmqModule'
import { Broker } from '../brokers/broker'

export class OnUserCreated implements EventHandler {
  constructor(private rabbitProducer: Broker<RabbitMQOptions>) {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendNewUserNotification.bind(this),
      CreateUserEvent.name,
    )
  }

  private async sendNewUserNotification({ user }: CreateUserEvent) {
    if (env.NODE_ENV === 'test') {
      console.log(`New user created: ${user.name}`)
    } else {
      await this.rabbitProducer.connect(
        'amqp://guest:guest@rabbitmq-cluster:5672/',
      )
      await this.rabbitProducer.send(
        {
          queue: 'user-created',
          exchange: 'user',
          exchangeType: 'fanout',
        },
        JSON.stringify(user),
      )
    }
  }
}
