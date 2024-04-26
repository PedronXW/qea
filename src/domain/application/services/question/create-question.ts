import { Either, right } from '@/@shared/either'
import { EntityId } from '@/@shared/entities/entity-id'
import { Question } from '@/domain/enterprise/entities/question'
import { QuestionRepository } from '../../repositories/question-repository'

export type CreateQuestionServiceRequest = {
  title: string
  content: string
  authorId: string
}

export type CreateQuestionServiceResponse = Either<null, Question>

export class CreateQuestionService {
  constructor(private readonly questionRepository: QuestionRepository) {}

  async execute({
    authorId,
    content,
    title,
  }: CreateQuestionServiceRequest): Promise<CreateQuestionServiceResponse> {
    const question = Question.create({
      authorId: new EntityId(authorId),
      content,
      title,
    })

    const newQuestion = await this.questionRepository.createQuestion(question)

    return right(newQuestion)
  }
}
