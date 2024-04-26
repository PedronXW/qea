import { Either, right } from '@/@shared/either'
import { Answer } from '@/domain/enterprise/entities/answer'
import { AnswerRepository } from '../../repositories/answer-repository'

type FindAnswerByQuestionIdServiceRequest = {
  questionId: string
  page: number
  limit: number
}

type FindAnswerByQuestionIdServiceResponse = Either<null, Answer[]>

export class FindAnswerByQuestionIdService {
  constructor(private answerRepository: AnswerRepository) {}
  async execute({
    questionId,
    page,
    limit,
  }: FindAnswerByQuestionIdServiceRequest): Promise<FindAnswerByQuestionIdServiceResponse> {
    const answers = await this.answerRepository.findAnswersByQuestionId(
      questionId,
      page,
      limit,
    )

    return right(answers)
  }
}
