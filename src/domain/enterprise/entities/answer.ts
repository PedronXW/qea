import { Entity } from '@/@shared/entities/entity'
import { EntityId } from '@/@shared/entities/entity-id'
import { Optional } from '@/@shared/types/optional'

type AnswerProps = {
  content: string
  authorId: EntityId
  questionId: EntityId
  createdAt: Date | null
  updatedAt?: Date | null
}

export class Answer extends Entity<AnswerProps> {
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

  get questionId(): EntityId {
    return this.props.questionId
  }

  set questionId(questionId: EntityId) {
    this.props.questionId = questionId
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
    props: Optional<AnswerProps, 'createdAt' | 'updatedAt'>,
    id?: EntityId,
  ): Answer {
    const answer = new Answer(
      {
        ...props,
        createdAt: new Date(),
        updatedAt: null,
      },
      id,
    )
    return answer
  }
}
