import { Question } from '@/domain/enterprise/entities/question'

export type EditQuestionProps = {
  title: string
  content: string
}

export abstract class QuestionRepository {
  abstract createQuestion(question: Question): Promise<Question>
  abstract findQuestionBySlug(
    slug: string,
    page: number,
    limit: number,
  ): Promise<Question[]>

  abstract findQuestionById(id: string): Promise<Question | null>
  abstract deleteQuestion(id: string): Promise<boolean>
  abstract findAllQuestions(
    authorId: string,
    page: number,
    limit: number,
  ): Promise<Question[]>

  abstract updateQuestion(
    id: string,
    props: EditQuestionProps,
  ): Promise<Question>
}
