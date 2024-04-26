import { Either, left, right } from '@/@shared/either'
import { Question } from '@/domain/enterprise/entities/question'
import { QuestionNonExistsError } from '../../errors/QuestionNonExistsError'
import { QuestionRepository } from '../../repositories/question-repository'

type UpdateQuestionServiceRequest = {
  questionId: string
  title?: string
  content?: string
}

export type UpdateQuestionServiceResponse = Either<
  QuestionNonExistsError,
  Question
>

export class UpdateQuestionService {
  constructor(private questionRepository: QuestionRepository) {}

  async execute({
    questionId,
    title,
    content,
  }: UpdateQuestionServiceRequest): Promise<UpdateQuestionServiceResponse> {
    const question = await this.questionRepository.findQuestionById(questionId)

    if (!question) {
      return left(new QuestionNonExistsError())
    }

    const questionUpdated = await this.questionRepository.updateQuestion(
      questionId,
      { title, content },
    )

    return right(questionUpdated)
  }
}
