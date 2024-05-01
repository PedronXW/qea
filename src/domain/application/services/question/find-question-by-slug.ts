import { Either, right } from '@/@shared/either'
import { Question } from '@/domain/enterprise/entities/question'
import { QuestionRepository } from '../../repositories/question-repository'

type FindQuestionBySlugServiceResponse = Either<null, Question[]>

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
    const questions = await this.questionRepository.findQuestionBySlug(
      slug,
      authorId,
      page,
      limit,
    )

    return right(questions)
  }
}
