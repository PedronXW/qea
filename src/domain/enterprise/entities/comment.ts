import { Entity } from '@/@shared/entities/entity'
import { EntityId } from '@/@shared/entities/entity-id'
import { Optional } from '@/@shared/types/optional'

type CommentProps = {
  content: string
  authorId: EntityId
  postId: EntityId
  createdAt: Date | null
  updatedAt?: Date | null
}

export class Comment extends Entity<CommentProps> {
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

  get postId(): EntityId {
    return this.props.postId
  }

  set postId(postId: EntityId) {
    this.props.postId = postId
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

  static create(
    props: Optional<CommentProps, 'createdAt' | 'updatedAt'>,
  ): Comment {
    const comment = new Comment({
      ...props,
      createdAt: new Date(),
      updatedAt: null,
    })
    return comment
  }
}
