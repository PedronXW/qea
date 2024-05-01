import { Either, left, right } from '@/@shared/either'
import { EntityId } from '@/@shared/entities/entity-id'
import { Answer } from '@/domain/enterprise/entities/answer'
import { AnswerAndQuestionSameOwnerError } from '../../errors/AnswerAndQuestionSameOwnerError'
import { QuestionAnsweredError } from '../../errors/QuestionAnsweredError'
import { QuestionNonExistsError } from '../../errors/QuestionNonExistsError'
import { AnswerRepository } from '../../repositories/answer-repository'
import { QuestionRepository } from '../../repositories/question-repository'

export interface CreateAnswerServiceRequest {
  content: string
  authorId: string
  questionId: string
}

type CreateAnswerServiceResponse = Either<
  | QuestionAnsweredError
  | QuestionNonExistsError
  | AnswerAndQuestionSameOwnerError,
  Answer
>

export class CreateAnswerService {
  constructor(
    private answerRepository: AnswerRepository,
    private questionRepository: QuestionRepository,
  ) {}

  async execute({
    authorId,
    content,
    questionId,
  }: CreateAnswerServiceRequest): Promise<CreateAnswerServiceResponse> {
    const question = await this.questionRepository.findQuestionById(
      questionId,
      authorId,
    )

    if (!question) {
      return left(new QuestionNonExistsError())
    }

    if (question!.authorId.getValue() === authorId) {
      return left(new AnswerAndQuestionSameOwnerError())
    }

    const isAnswered =
      await this.answerRepository.findAnswerByAuthorIdInASpecificQuestion(
        authorId,
        questionId,
      )

    if (isAnswered) {
      return left(new QuestionAnsweredError())
    }

    const answer = Answer.create({
      content,
      authorId: new EntityId(authorId),
      questionId: new EntityId(questionId),
    })

    const newAnswer = await this.answerRepository.createAnswer(answer)

    return right(newAnswer)
  }
}
