import { Answer } from '@/domain/enterprise/entities/answer';

export abstract class AnswerRepository {
  abstract createAnswer(answer: Answer): Promise<Answer>
  abstract findAnswersByQuestionId(
    questionId: string,
    page: number,
    limit: number,
  ): Promise<Answer[]>

  abstract findAnswerById(id: string): Promise<Answer | null>
  abstract deleteAnswer(id: string): Promise<boolean>
  abstract updateAnswer(id: string, content: string): Promise<Answer>
}
