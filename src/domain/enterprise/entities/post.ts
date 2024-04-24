import { AggregateRoot } from '@/@shared/entities/aggregate-root'
import { EntityId } from '@/@shared/entities/entity-id'

export type PostProps = {
  title: string
  content: string
  authorId: EntityId
  createdAt: Date | null
  updatedAt?: Date | null
}

export class Post extends AggregateRoot<PostProps> {
  get title(): string {
    return this.props.title
  }

  set title(title: string) {
    this.props.title = title
  }

  get content(): string {
    return this.props.content
  }

  set content(content: string) {
    this.props.content = content
  }

  get authorId(): EntityId {
    return this.props.authorId
  }

  set authorId(authorId: EntityId) {
    this.props.authorId = authorId
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

  static create(props: Omit<PostProps, 'createdAt' | 'updatedAt'>): Post {
    const post = new Post({
      ...props,
      createdAt: new Date(),
      updatedAt: null,
    })

    return post
  }
}
