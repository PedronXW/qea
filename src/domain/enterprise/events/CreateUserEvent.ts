import { EntityId } from '@/@shared/entities/entity-id'
import { DomainEvent } from '@/@shared/events/domain-event'
import { User } from '../entities/user'

export class CreateUserEvent implements DomainEvent {
  public ocurredAt: Date
  public user: User

  constructor(user: User) {
    this.ocurredAt = new Date()
    this.user = user
  }

  getAggregateId(): EntityId {
    return this.user.id
  }
}
