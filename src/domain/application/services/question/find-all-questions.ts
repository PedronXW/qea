import { Either, left, right } from '@/@shared/either'
import { PaginationError } from '../../errors/PaginationError'
import {
  FindQuestionsResponse,
  QuestionRepository,
} from '../../repositories/question-repository'

type FindAllQuestionsServiceResponse = Either<
  PaginationError,
  FindQuestionsResponse
>

export class FindAllQuestionsService {
  constructor(private questionRepository: QuestionRepository) {}

  async execute(
    authorId: string,
    page: number,
    limit: number,
  ): Promise<FindAllQuestionsServiceResponse> {
    if (page <= 0 || limit <= 0) {
      return left(new PaginationError())
    }

    const questions = await this.questionRepository.findAllQuestions(
      authorId,
      page,
      limit,
    )

    return right(questions)
  }
}
