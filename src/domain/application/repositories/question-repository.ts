import { Question } from '@/domain/enterprise/entities/question'

export type EditQuestionProps = {
  title?: string
  content?: string
}

export type FindQuestionsResponse = {
  questions: Question[]
  questionsCount: number
}

export abstract class QuestionRepository {
  abstract createQuestion(question: Question): Promise<Question>
  abstract findQuestionBySlug(
    slug: string,
    authorId: string,
    page: number,
    limit: number,
  ): Promise<FindQuestionsResponse>

  abstract findQuestionById(
    id: string,
    authorId: string,
  ): Promise<Question | null>

  abstract deleteQuestion(id: string): Promise<boolean>
  abstract findAllQuestions(
    authorId: string,
    page: number,
    limit: number,
  ): Promise<FindQuestionsResponse>

  abstract updateQuestion(
    id: string,
    props: EditQuestionProps,
  ): Promise<Question>
}
