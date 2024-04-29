import { Either, left, right } from '@/@shared/either'
import { Answer } from '@/domain/enterprise/entities/answer'
import { AnswerNonExistsError } from '../../errors/AnswerNonExistsError'
import { PermissionError } from '../../errors/PermissionError'
import { AnswerRepository } from '../../repositories/answer-repository'

type UpdateAnswerServiceRequest = {
  id: string
  content: string
  userId: string
}

type UpdateAnswerServiceResponse = Either<
  AnswerNonExistsError | PermissionError,
  Answer
>

export class UpdateAnswerService {
  constructor(private answerRepository: AnswerRepository) {}

  async execute({
    id,
    content,
    userId,
  }: UpdateAnswerServiceRequest): Promise<UpdateAnswerServiceResponse> {
    const answer = await this.answerRepository.findAnswerById(id)

    if (!answer) {
      return left(new AnswerNonExistsError())
    }

    if (answer.authorId.getValue() !== userId) {
      return left(new PermissionError())
    }

    const updatedAnswer = await this.answerRepository.updateAnswer(id, content)

    return right(updatedAnswer)
  }
}
