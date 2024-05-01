import {
  AnswerRepository,
  FindAnswersResponse,
} from '@/domain/application/repositories/answer-repository'
import { Answer } from '@/domain/enterprise/entities/answer'

export class InMemoryAnswerRepository implements AnswerRepository {
  answers: Answer[] = []

  async createAnswer(answer: Answer): Promise<Answer> {
    this.answers.push(answer)
    return answer
  }

  async findAnswerByAuthorIdInASpecificQuestion(
    authorId: string,
    questionId: string,
  ): Promise<Answer> {
    return this.answers.filter(
      (answer) =>
        answer.authorId.getValue() === authorId &&
        answer.questionId.getValue() === questionId,
    )[0]
  }

  async findAnswersByQuestionId(
    questionId: string,
    page: number,
    limit: number,
  ): Promise<FindAnswersResponse> {
    const startIndex = (page - 1) * limit

    const endIndex = page * limit

    return {
      answers: this.answers
        .filter((answer) => answer.questionId.getValue() === questionId)
        .slice(startIndex, endIndex),
      answersCount: this.answers.filter(
        (answer) => answer.questionId.getValue() === questionId,
      ).length,
    }
  }

  async findAnswerById(id: string): Promise<Answer | null> {
    return this.answers.find((answer) => answer.id.getValue() === id) || null
  }

  async deleteAnswer(id: string): Promise<boolean> {
    this.answers = this.answers.filter((answer) => answer.id.getValue() !== id)

    return true
  }

  async updateAnswer(id: string, content: string): Promise<Answer> {
    const answer = this.answers.find((answer) => answer.id.getValue() === id)

    answer!.content = content

    return answer!
  }
}
