import {
  EditQuestionProps,
  FindQuestionsResponse,
  QuestionRepository,
} from '@/domain/application/repositories/question-repository'
import { Question } from '@/domain/enterprise/entities/question'

export class InMemoryQuestionRepository implements QuestionRepository {
  questions: Question[] = []

  async createQuestion(question: Question): Promise<Question> {
    this.questions.push(question)
    return question
  }

  async findQuestionBySlug(
    slug: string,
    authorId: string,
    page: number,
    limit: number,
  ): Promise<FindQuestionsResponse> {
    const startIndex = (page - 1) * limit

    const endIndex = page * limit

    return {
      questions: this.questions
        .filter((question) => question.slug.value === slug)
        .slice(startIndex, endIndex),
      questionsCount: this.questions.filter(
        (question) => question.slug.value === slug,
      ).length,
    }
  }

  async findQuestionById(
    id: string,
    authorId: string,
  ): Promise<Question | null> {
    return (
      this.questions.find((question) => question.id.getValue() === id) || null
    )
  }

  async deleteQuestion(id: string): Promise<boolean> {
    this.questions = this.questions.filter(
      (question) => question.id.getValue() !== id,
    )

    return true
  }

  async findAllQuestions(
    authorId: string,
    page: number,
    limit: number,
  ): Promise<FindQuestionsResponse> {
    const startIndex = (page - 1) * limit

    const endIndex = page * limit

    return {
      questions: this.questions.slice(startIndex, endIndex),
      questionsCount: this.questions.length,
    }
  }

  async updateQuestion(
    id: string,
    { content, title }: EditQuestionProps,
  ): Promise<Question> {
    const question = this.questions.find(
      (question) => question.id.getValue() === id,
    )

    question!.content = content || question!.content
    question!.title = title || question!.title

    return question!
  }
}
