import { Either, left, right } from '@/@shared/either'
import { Answer } from '@/domain/enterprise/entities/answer'
import { UserTypes } from '@/domain/enterprise/entities/user'
import { PermissionError } from '../../errors/PermissionError'
import { QuestionNonExistsError } from '../../errors/QuestionNonExistsError'
import { AnswerRepository } from '../../repositories/answer-repository'
import { QuestionRepository } from '../../repositories/question-repository'

type FindAnswersByQuestionIdServiceRequest = {
  questionId: string
  authorType: UserTypes
  page: number
  limit: number
}

type FindAnswersByQuestionIdServiceResponse = Either<
  PermissionError | QuestionNonExistsError,
  Answer[]
>

export class FindAnswersByQuestionIdService {
  constructor(
    private answerRepository: AnswerRepository,
    private questionRepository: QuestionRepository,
  ) {}

  async execute({
    questionId,
    page,
    authorType,
    limit,
  }: FindAnswersByQuestionIdServiceRequest): Promise<FindAnswersByQuestionIdServiceResponse> {
    if (authorType !== 'ORGANIZER') {
      return left(new PermissionError())
    }

    const question = await this.questionRepository.findQuestionById(questionId)

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
