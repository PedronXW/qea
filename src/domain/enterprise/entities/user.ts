import { Entity } from '../../../@shared/entities/entity'
import { EntityId } from '../../../@shared/entities/entity-id'
import { Optional } from '../../../@shared/types/optional'
import { CreateUserEvent } from '../events/CreateUserEvent'

type UserTypes = 'ORGANIZER' | 'PARTICIPANT'

type UserProps = {
  name: string
  email: string
  type: UserTypes
  password?: string
  createdAt: Date | null
  updatedAt?: Date | null
}

export class User extends Entity<UserProps> {
  get name(): string {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
  }

  get email(): string {
    return this.props.email
  }

  set email(email: string) {
    this.props.email = email
  }

  get password(): string | undefined {
    return this.props.password
  }

  set password(password: string) {
    this.props.password = password
  }

  get type(): UserTypes {
    return this.props.type
  }

  set type(type: UserTypes) {
    this.props.type = type
  }

  get createdAt(): Date | null {
    return this.props.createdAt
  }

  set createdAt(createdAt: Date | null) {
    this.props.createdAt = createdAt
  }

  get updatedAt(): Date | null | undefined {
    return this.props.updatedAt
  }

  set updatedAt(updatedAt: Date | null | undefined) {
    this.props.updatedAt = updatedAt
  }

  static create(props: Optional<UserProps, 'createdAt'>, id?: EntityId): User {
    const user = new User(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.updatedAt ?? null,
      },
      id,
    )

    if (!id) {
      user.addDomainEvent(new CreateUserEvent(user))
    }

    return user
  }
}
