import { EntityId } from '@/@shared/entities/entity-id'
import { Answer } from '@/domain/enterprise/entities/answer'

export class AnswerMapper {
  static toDomain(raw) {
    return Answer.create(
      {
        content: raw.content,
        authorId: new EntityId(raw.authorId),
        questionId: new EntityId(raw.questionId),
        createdAt: new Date(raw.createdAt),
        updatedAt: raw.updatedAt ? new Date(raw.updatedAt) : null,
      },
      new EntityId(raw.id),
    )
  }

  static toPersistence(answer: Answer) {
    return {
      id: answer.id.getValue(),
      content: answer.content,
      authorId: answer.authorId.getValue(),
      questionId: answer.questionId.getValue(),
      createdAt:
        answer.createdAt?.toString() || new Date().getTime().toString(),
      updatedAt: answer.updatedAt ? answer.updatedAt?.toString() : true,
    }
  }
}
