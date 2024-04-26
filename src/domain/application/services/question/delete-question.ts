import { Either, left, right } from '@/@shared/either'
import { QuestionNonExistsError } from '../../errors/QuestionNonExistsError'
import { QuestionRepository } from '../../repositories/question-repository'

type DeleteQuestionServiceResponse = Either<QuestionNonExistsError, boolean>

export class DeleteQuestionService {
  constructor(private questionRepository: QuestionRepository) {}

  async execute(questionId: string): Promise<DeleteQuestionServiceResponse> {
    const question = await this.questionRepository.findQuestionById(questionId)
    if (!question) {
      return left(new QuestionNonExistsError())
    }
    await this.questionRepository.deleteQuestion(questionId)

    return right(true)
  }
}
