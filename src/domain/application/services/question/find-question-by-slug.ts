import { Either, right } from '@/@shared/either'
import { Question } from '@/domain/enterprise/entities/question'
import { QuestionRepository } from '../../repositories/question-repository'

type FindQuestionBySlugServiceResponse = Either<null, Question[]>

type FindQuestionBySlugServiceRequest = {
  slug: string
  page: number
  limit: number
}

export class FindQuestionBySlugService {
  constructor(private questionRepository: QuestionRepository) {}

  async execute({
    limit,
    page,
    slug,
  }: FindQuestionBySlugServiceRequest): Promise<FindQuestionBySlugServiceResponse> {
    const question = await this.questionRepository.findQuestionBySlug(
      slug,
      page,
      limit,
    )

    return right(question)
  }
}
