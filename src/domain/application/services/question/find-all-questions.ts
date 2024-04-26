import { Either, right } from '@/@shared/either'
import { Question } from '@/domain/enterprise/entities/question'
import { QuestionRepository } from '../../repositories/question-repository'

type FindAllQuestionsServiceResponse = Either<null, Question[]>

export class FindAllQuestionsService {
  constructor(private readonly questionRepository: QuestionRepository) {}

  async execute(
    page: number,
    limit: number,
  ): Promise<FindAllQuestionsServiceResponse> {
    const questions = await this.questionRepository.findAllQuestions(
      page,
      limit,
    )

    return right(questions)
  }
}
