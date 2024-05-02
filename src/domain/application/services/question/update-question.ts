import { Either, left, right } from '@/@shared/either'
import { Question } from '@/domain/enterprise/entities/question'
import { PermissionError } from '../../errors/PermissionError'
import { QuestionNonExistsError } from '../../errors/QuestionNonExistsError'
import { QuestionRepository } from '../../repositories/question-repository'

type UpdateQuestionServiceRequest = {
  userId: string
  questionId: string
  title?: string
  content?: string
}

export type UpdateQuestionServiceResponse = Either<
  QuestionNonExistsError | PermissionError,
  Question
>

export class UpdateQuestionService {
  constructor(private questionRepository: QuestionRepository) {}

  async execute({
    userId,
    questionId,
    title,
    content,
  }: UpdateQuestionServiceRequest): Promise<UpdateQuestionServiceResponse> {
    const question = await this.questionRepository.findQuestionById(
      questionId,
      userId,
    )

    if (!question) {
      return left(new QuestionNonExistsError())
    }

    if (question.authorId.getValue() !== userId) {
      return left(new PermissionError())
    }

    const questionUpdated = await this.questionRepository.updateQuestion(
      questionId,
      { title, content },
    )

    return right(questionUpdated)
  }
}
