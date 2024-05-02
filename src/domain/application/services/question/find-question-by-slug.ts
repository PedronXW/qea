import { Either, left, right } from '@/@shared/either'
import { PaginationError } from '../../errors/PaginationError'
import {
  FindQuestionsResponse,
  QuestionRepository,
} from '../../repositories/question-repository'

type FindQuestionBySlugServiceResponse = Either<
  PaginationError,
  FindQuestionsResponse
>

type FindQuestionBySlugServiceRequest = {
  slug: string
  authorId: string
  page: number
  limit: number
}

export class FindQuestionBySlugService {
  constructor(private questionRepository: QuestionRepository) {}

  async execute({
    limit,
    authorId,
    page,
    slug,
  }: FindQuestionBySlugServiceRequest): Promise<FindQuestionBySlugServiceResponse> {
    if (page <= 0 || limit <= 0) {
      return left(new PaginationError())
    }

    const questions = await this.questionRepository.findQuestionBySlug(
      slug,
      authorId,
      page,
      limit,
    )

    return right(questions)
  }
}
