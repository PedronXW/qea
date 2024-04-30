import { Either, left, right } from '@/@shared/either'
import { Answer } from '@/domain/enterprise/entities/answer'
import { AnswerNonExistsError } from '../../errors/AnswerNonExistsError'
import { QuestionNonExistsError } from '../../errors/QuestionNonExistsError'
import { AnswerRepository } from '../../repositories/answer-repository'
import { QuestionRepository } from '../../repositories/question-repository'

type FindAnswerByAuthorIdInASpecificQuestionServiceResponse = Either<
  AnswerNonExistsError,
  Answer
>

export class FindAnswerByAuthorIdInASpecificQuestionService {
  constructor(
    private answerRepository: AnswerRepository,
    private questionRepository: QuestionRepository,
  ) {}

  async execute(
    authorId: string,
    questionId: string,
  ): Promise<FindAnswerByAuthorIdInASpecificQuestionServiceResponse> {
    const question = await this.questionRepository.findQuestionById(questionId)

    if (!question) {
      return left(new QuestionNonExistsError())
    }

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
