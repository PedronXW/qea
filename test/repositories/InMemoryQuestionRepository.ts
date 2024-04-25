import {
  QuestionEditProps,
  QuestionRepository,
} from '@/domain/application/repositories/question-repository'
import { Question } from '@/domain/enterprise/entities/question'

export class InMemoryQuestionRepository implements QuestionRepository {
  questions: Question[] = []

  async create(question: Question): Promise<Question> {
    this.questions.push(question)
    return question
  }

  async findBySlug(
    slug: string,
    page: number,
    limit: number,
  ): Promise<Question[]> {
    const startIndex = (page - 1) * limit

    const endIndex = page * limit

    return this.questions
      .filter((question) => question.slug.value === slug)
      .slice(startIndex, endIndex)
  }

  async findById(id: string): Promise<Question | null> {
    return (
      this.questions.find((question) => question.id.getValue() === id) || null
    )
  }

  async delete(id: string): Promise<boolean> {
    this.questions = this.questions.filter(
      (question) => question.id.getValue() !== id,
    )

    return true
  }

  async findAll(page: number, limit: number): Promise<Question[]> {
    const startIndex = (page - 1) * limit

    const endIndex = page * limit

    return this.questions.slice(startIndex, endIndex)
  }

  async update(
    id: string,
    { content, title }: QuestionEditProps,
  ): Promise<void> {
    const question = this.questions.find(
      (question) => question.id.getValue() === id,
    )

    question!.content = content
    question!.title = title
  }
}
