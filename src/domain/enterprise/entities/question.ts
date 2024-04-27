import { AggregateRoot } from '@/@shared/entities/aggregate-root'
import { EntityId } from '@/@shared/entities/entity-id'
import { Optional } from '@/@shared/types/optional'
import { Slug } from './value-objects/slug'

export type QuestionProps = {
  title: string
  content: string
  slug: Slug
  authorId: EntityId
  answeredByCurrentUser?: boolean
  createdAt: Date | null
  updatedAt?: Date | null
}

export class Question extends AggregateRoot<QuestionProps> {
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

  get slug(): Slug {
    return this.props.slug
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

  get answeredByCurrentUser(): boolean | undefined {
    return this.props.answeredByCurrentUser
  }

  set answeredByCurrentUser(answeredByCurrentUser: boolean | undefined) {
    this.props.answeredByCurrentUser = answeredByCurrentUser
  }

  static create(
    props: Optional<
      QuestionProps,
      'createdAt' | 'slug' | 'updatedAt' | 'answeredByCurrentUser'
    >,
    id?: EntityId,
  ): Question {
    const question = new Question(
      {
        ...props,
        answeredByCurrentUser: props.answeredByCurrentUser ?? undefined,
        slug: props.slug ?? Slug.createFromText(props.title),
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.updatedAt ?? null,
      },
      id,
    )

    return question
  }
}
