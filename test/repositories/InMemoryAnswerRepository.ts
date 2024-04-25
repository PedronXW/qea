import { AnswerRepository } from '@/domain/application/repositories/answer-repository'
import { Answer } from '@/domain/enterprise/entities/answer'

export class InMemoryAnswerRepository implements AnswerRepository {
  answers: Answer[] = []

  async create(answer: Answer): Promise<Answer> {
    this.answers.push(answer)
    return answer
  }

  async findByQuestionId(
    questionId: string,
    page: number,
    limit: number,
  ): Promise<Answer[]> {
    const startIndex = (page - 1) * limit

    const endIndex = page * limit

    return this.answers
      .filter((answer) => answer.questionId.getValue() === questionId)
      .slice(startIndex, endIndex)
  }

  async findById(id: string): Promise<Answer | null> {
    return this.answers.find((answer) => answer.id.getValue() === id) || null
  }

  async delete(id: string): Promise<boolean> {
    this.answers = this.answers.filter((answer) => answer.id.getValue() !== id)

    return true
  }

  async update(content: string): Promise<Answer> {
    const answer = this.answers.find((answer) => answer.content === content)

    answer!.content = content

    return answer!
  }
}
