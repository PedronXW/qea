import { Either, right } from '@/@shared/either'
import { AnswerRepository } from '../../repositories/answer-repository'

type DeleteAnswerServiceResponse = Either<Error, boolean>

export class DeleteAnswerService {
  constructor(private readonly answerRepository: AnswerRepository) {}

  async execute(id: string): Promise<DeleteAnswerServiceResponse> {
    return right(await this.answerRepository.deleteAnswer(id))
  }
}
