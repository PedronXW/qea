import {
  EditQuestionProps,
  QuestionRepository,
} from '@/domain/application/repositories/question-repository'
import { Question } from '@/domain/enterprise/entities/question'
import { PrismaClient } from '@prisma/client'
import { QuestionMapper } from '../mappers/question-mapper'

export class PrismaQuestionRepository implements QuestionRepository {
  prisma = new PrismaClient()

  async createQuestion(question: Question): Promise<Question> {
    const createdQuestion = await this.prisma.question.create({
      data: {
        id: question.id.getValue(),
        title: question.title,
        content: question.content,
        slug: question.slug.value,
        authorId: question.authorId.getValue(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    })
    return QuestionMapper.toDomain(createdQuestion)
  }

  async findQuestionBySlug(
    slug: string,
    page: number,
    limit: number,
  ): Promise<Question[]> {
    const questions = await this.prisma.question.findMany({
      where: {
        slug,
      },
      skip: page,
      take: limit,
    })

    return questions.map(QuestionMapper.toDomain)
  }

  async findQuestionById(id: string): Promise<Question | null> {
    const question = await this.prisma.question.findUnique({
      where: {
        id,
      },
    })

    if (!question) return null

    return QuestionMapper.toDomain(question)
  }

  async deleteQuestion(id: string): Promise<boolean> {
    await this.prisma.question.delete({
      where: {
        id,
      },
    })

    return true
  }

  async findAllQuestions(
    authorId: string,
    page: number,
    limit: number,
  ): Promise<Question[]> {
    const questions = await this.prisma.question.findMany({
      skip: page,
      take: limit,
      include: {
        answers: {
          where: {
            authorId,
          },
        },
      },
    })

    return questions.map(QuestionMapper.toDomain)
  }

  async updateQuestion(
    id: string,
    props: EditQuestionProps,
  ): Promise<Question> {
    const data = {} as EditQuestionProps

    if (props.title) {
      data.title = props.title
    }

    if (props.content) {
      data.content = props.content
    }

    const newQuestion = await this.prisma.question.update({
      where: {
        id,
      },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    })

    return QuestionMapper.toDomain(newQuestion)
  }
}
