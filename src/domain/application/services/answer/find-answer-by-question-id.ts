import { Either, left, right } from '@/@shared/either'
import { UserTypes } from '@/domain/enterprise/entities/user'
import { PaginationError } from '../../errors/PaginationError'
import { PermissionError } from '../../errors/PermissionError'
import { QuestionNonExistsError } from '../../errors/QuestionNonExistsError'
import {
  AnswerRepository,
  FindAnswersResponse,
} from '../../repositories/answer-repository'
import { QuestionRepository } from '../../repositories/question-repository'

type FindAnswersByQuestionIdServiceRequest = {
  questionId: string
  authorId: string
  authorType: UserTypes
  page: number
  limit: number
}

type FindAnswersByQuestionIdServiceResponse = Either<
  PermissionError | QuestionNonExistsError | PaginationError,
  FindAnswersResponse
>

export class FindAnswersByQuestionIdService {
  constructor(
    private answerRepository: AnswerRepository,
    private questionRepository: QuestionRepository,
  ) {}

  async execute({
    questionId,
    page,
    authorId,
    authorType,
    limit,
  }: FindAnswersByQuestionIdServiceRequest): Promise<FindAnswersByQuestionIdServiceResponse> {
    if (authorType !== 'ORGANIZER') {
      return left(new PermissionError())
    }

    if (page <= 0 || limit <= 0) {
      return left(new PaginationError())
    }

    const question = await this.questionRepository.findQuestionById(
      questionId,
      authorId,
    )

    if (!question) {
      return left(new QuestionNonExistsError())
    }

    const answers = await this.answerRepository.findAnswersByQuestionId(
      questionId,
      page,
      limit,
    )

    return right(answers)
  }
}
