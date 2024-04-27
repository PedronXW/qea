import { Either, left, right } from '@/@shared/either'
import { EntityId } from '@/@shared/entities/entity-id'
import { Answer } from '@/domain/enterprise/entities/answer'
import { AnswerAndQuestionOwnerError } from '../../errors/AnswerAndQuestionOwnerError'
import { QuestionAnsweredError } from '../../errors/QuestionAnsweredError'
import { AnswerRepository } from '../../repositories/answer-repository'

export interface CreateAnswerServiceRequest {
  content: string
  authorId: string
  questionId: string
}

type CreateAnswerServiceResponse = Either<QuestionAnsweredError, Answer>

export class CreateAnswerService {
  constructor(private answerRepository: AnswerRepository) {}

  async execute({
    authorId,
    content,
    questionId,
  }: CreateAnswerServiceRequest): Promise<CreateAnswerServiceResponse> {
    const isAnswered =
      await this.answerRepository.findAnswerByAuthorIdInASpecificQuestion(
        authorId,
        questionId,
      )

    if (isAnswered?.authorId.getValue() === authorId) {
      return left(new AnswerAndQuestionOwnerError())
    }

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
