import { Either, right } from '@/@shared/either'
import {
  FindQuestionsResponse,
  QuestionRepository,
} from '../../repositories/question-repository'

type FindAllQuestionsServiceResponse = Either<null, FindQuestionsResponse>

export class FindAllQuestionsService {
  constructor(private questionRepository: QuestionRepository) {}

  async execute(
    authorId: string,
    page: number,
    limit: number,
  ): Promise<FindAllQuestionsServiceResponse> {
    const questions = await this.questionRepository.findAllQuestions(
      authorId,
      page,
      limit,
    )

    return right(questions)
  }
}
