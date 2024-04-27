import { Either, left, right } from '@/@shared/either'
import { Answer } from '@/domain/enterprise/entities/answer'
import { UserTypes } from '@/domain/enterprise/entities/user'
import { PermissionError } from '../../errors/PermissionError'
import { AnswerRepository } from '../../repositories/answer-repository'

type FindAnswersByQuestionIdServiceRequest = {
  questionId: string
  authorType: UserTypes
  page: number
  limit: number
}

type FindAnswersByQuestionIdServiceResponse = Either<PermissionError, Answer[]>

export class FindAnswersByQuestionIdService {
  constructor(private answerRepository: AnswerRepository) {}
  async execute({
    questionId,
    page,
    authorType,
    limit,
  }: FindAnswersByQuestionIdServiceRequest): Promise<FindAnswersByQuestionIdServiceResponse> {
    if (authorType !== 'ORGANIZER') {
      return left(new PermissionError())
    }

    const answers = await this.answerRepository.findAnswersByQuestionId(
      questionId,
      page,
      limit,
    )

    return right(answers)
  }
}
