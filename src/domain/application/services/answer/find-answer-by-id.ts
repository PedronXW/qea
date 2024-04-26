import { Either, left, right } from '@/@shared/either'
import { Answer } from '@/domain/enterprise/entities/answer'
import { AnswerNonExistsError } from '../../errors/AnswerNonExistsError'
import { AnswerRepository } from '../../repositories/answer-repository'

type FindAnswerByIdResponse = Either<AnswerNonExistsError, Answer>

export class FindAnswerByIdService {
  constructor(private answerRepository: AnswerRepository) {}
  async execute(id: string): Promise<FindAnswerByIdResponse> {
    const answer = await this.answerRepository.findAnswerById(id)
    if (!answer) {
      return left(new AnswerNonExistsError())
    }
    return right(answer)
  }
}
