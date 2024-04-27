import { Either, left, right } from '@/@shared/either'
import { EntityId } from '@/@shared/entities/entity-id'
import { Question } from '@/domain/enterprise/entities/question'
import { UserTypes } from '@/domain/enterprise/entities/user'
import { PermissionError } from '../../errors/PermissionError'
import { QuestionRepository } from '../../repositories/question-repository'

export type CreateQuestionServiceRequest = {
  title: string
  content: string
  authorId: string
  authorType: UserTypes
}

export type CreateQuestionServiceResponse = Either<PermissionError, Question>

export class CreateQuestionService {
  constructor(private readonly questionRepository: QuestionRepository) {}

  async execute({
    authorId,
    authorType,
    content,
    title,
  }: CreateQuestionServiceRequest): Promise<CreateQuestionServiceResponse> {
    if (authorType !== 'ORGANIZER') {
      return left(new PermissionError())
    }

    const question = Question.create({
      authorId: new EntityId(authorId),
      content,
      title,
    })

    const newQuestion = await this.questionRepository.createQuestion(question)

    return right(newQuestion)
  }
}
