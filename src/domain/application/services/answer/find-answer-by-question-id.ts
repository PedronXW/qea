import { Either, right } from '@/@shared/either'
import { Answer } from '@/domain/enterprise/entities/answer'
import { AnswerRepository } from '../../repositories/answer-repository'

type FindAnswersByQuestionIdServiceRequest = {
  questionId: string
  page: number
  limit: number
}

type FindAnswersByQuestionIdServiceResponse = Either<null, Answer[]>

export class FindAnswersByQuestionIdService {
  constructor(private answerRepository: AnswerRepository) {}
  async execute({
    questionId,
    page,
    limit,
  }: FindAnswersByQuestionIdServiceRequest): Promise<FindAnswersByQuestionIdServiceResponse> {
    const answers = await this.answerRepository.findAnswersByQuestionId(
      questionId,
      page,
      limit,
    )

    return right(answers)
  }
}
