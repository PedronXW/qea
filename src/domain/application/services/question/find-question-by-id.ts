import { Either, left, right } from '@/@shared/either'
import { Question } from '@/domain/enterprise/entities/question'
import { QuestionNonExistsError } from '../../errors/QuestionNonExistsError'
import { QuestionRepository } from '../../repositories/question-repository'

type FindQuestionByIdServiceResponse = Either<QuestionNonExistsError, Question>

export class FindQuestionByIdService {
  constructor(private questionRepository: QuestionRepository) {}

  async execute(questionId: string): Promise<FindQuestionByIdServiceResponse> {
    const question = await this.questionRepository.findQuestionById(questionId)
    if (!question) {
      return left(new QuestionNonExistsError())
    }

    return right(question)
  }
}
