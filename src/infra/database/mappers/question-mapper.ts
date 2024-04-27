import { EntityId } from '@/@shared/entities/entity-id'
import { Question } from '@/domain/enterprise/entities/question'

export class QuestionMapper {
  static toDomain(raw): Question {
    return Question.create(
      {
        title: raw.title,
        content: raw.content,
        authorId: new EntityId(raw.authorId),
        answeredByCurrentUser: raw.answers ? raw.answers.length > 0 : undefined,
        createdAt: new Date(raw.createdAt),
        updatedAt: raw.updatedAt ? new Date(raw.updatedAt) : null,
      },
      new EntityId(raw.id),
    )
  }

  static toPersistence(question: Question) {
    return {
      id: question.id.getValue(),
      title: question.title,
      content: question.content,
      slug: question.slug.value,
      authorId: question.authorId.getValue(),
      createdAt:
        question.createdAt?.toString() || new Date().getTime().toString(),
      updatedAt: question.updatedAt ? question.updatedAt?.toString() : true,
    }
  }
}
