import { Answer } from '@/domain/enterprise/entities/answer'

export type FindAnswersResponse = {
  answers: Answer[]
  answersCount: number
}

export abstract class AnswerRepository {
  abstract createAnswer(answer: Answer): Promise<Answer>
  abstract findAnswersByQuestionId(
    questionId: string,
    page: number,
    limit: number,
  ): Promise<FindAnswersResponse>

  abstract findAnswerById(id: string): Promise<Answer | null>
  abstract findAnswerByAuthorIdInASpecificQuestion(
    authorId: string,
    questionId: string,
  ): Promise<Answer | null>

  abstract deleteAnswer(id: string): Promise<boolean>
  abstract updateAnswer(id: string, content: string): Promise<Answer>
}
