import { Either, left, right } from '@/@shared/either'
import { AnswerNonExistsError } from '../../errors/AnswerNonExistsError'
import { PermissionError } from '../../errors/PermissionError'
import { AnswerRepository } from '../../repositories/answer-repository'

type DeleteAnswerServiceResponse = Either<
  AnswerNonExistsError | PermissionError,
  boolean
>

export class DeleteAnswerService {
  constructor(private readonly answerRepository: AnswerRepository) {}

  async execute(
    id: string,
    userId: string,
  ): Promise<DeleteAnswerServiceResponse> {
    const answer = await this.answerRepository.findAnswerById(id)

    if (!answer) {
      return left(new AnswerNonExistsError())
    }

    if (answer.authorId.getValue() !== userId) {
      return left(new PermissionError())
    }

    return right(await this.answerRepository.deleteAnswer(id))
  }
}
