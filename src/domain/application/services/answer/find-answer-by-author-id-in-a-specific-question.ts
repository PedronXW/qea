import { Either, left, right } from '@/@shared/either'
import { Answer } from '@/domain/enterprise/entities/answer'
import { AnswerNonExistsError } from '../../errors/AnswerNonExistsError'
import { AnswerRepository } from '../../repositories/answer-repository'

type FindAnswerByAuthorIdInASpecificQuestionServiceResponse = Either<
  AnswerNonExistsError,
  Answer
>

export class FindAnswerByAuthorIdInASpecificQuestionService {
  constructor(private answerRepository: AnswerRepository) {}

  async execute(
    authorId: string,
    questionId: string,
  ): Promise<FindAnswerByAuthorIdInASpecificQuestionServiceResponse> {
    const answer =
      await this.answerRepository.findAnswerByAuthorIdInASpecificQuestion(
        authorId,
        questionId,
      )

    if (!answer) {
      return left(new AnswerNonExistsError())
    }

    return right(answer)
  }
}
