import { Either, left, right } from '@/@shared/either'
import { Answer } from '@/domain/enterprise/entities/answer'
import { AnswerNonExistsError } from '../../errors/AnswerNonExistsError'
import { AnswerRepository } from '../../repositories/answer-repository'

type UpdateAnswerServiceRequest = {
  id: string
  content: string
}

type UpdateAnswerServiceResponse = Either<AnswerNonExistsError, Answer>

export class UpdateAnswerService {
  constructor(private answerRepository: AnswerRepository) {}

  async execute({
    id,
    content,
  }: UpdateAnswerServiceRequest): Promise<UpdateAnswerServiceResponse> {
    const answer = await this.answerRepository.findAnswerById(id)

    if (!answer) {
      return left(new AnswerNonExistsError())
    }

    const updatedAnswer = await this.answerRepository.updateAnswer(id, content)

    return right(updatedAnswer)
  }
}
