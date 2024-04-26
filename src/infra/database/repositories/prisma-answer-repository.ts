import { AnswerRepository } from '@/domain/application/repositories/answer-repository'
import { Answer } from '@/domain/enterprise/entities/answer'
import { PrismaClient } from '@prisma/client'
import { AnswerMapper } from '../mappers/answer-mapper'

export class PrismaAnswerRepository implements AnswerRepository {
  prisma = new PrismaClient()

  async createAnswer(answer: Answer): Promise<Answer> {
    const newAnswer = await this.prisma.answer.create({
      data: {
        id: answer.id.getValue(),
        content: answer.content,
        authorId: answer.authorId.getValue(),
        questionId: answer.questionId.getValue(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    })

    return AnswerMapper.toDomain(newAnswer)
  }

  async findAnswerByAuthorIdInASpecificQuestion(
    authorId: string,
    questionId: string,
  ): Promise<Answer | null> {
    const answer = await this.prisma.answer.findFirst({
      where: {
        authorId,
        questionId,
      },
    })

    if (!answer) {
      return null
    }

    return AnswerMapper.toDomain(answer)
  }

  async deleteAnswer(id: string): Promise<boolean> {
    await this.prisma.answer.delete({
      where: { id },
    })

    return true
  }

  async updateAnswer(id: string, content: string): Promise<Answer> {
    const updatedAnswer = await this.prisma.answer.update({
      where: { id },
      data: {
        content,
        updatedAt: new Date(),
      },
      select: {
        id: true,
        content: true,
        authorId: true,
        questionId: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    return AnswerMapper.toDomain(updatedAnswer)
  }

  async findAnswerById(id: string): Promise<Answer | null> {
    const answer = await this.prisma.answer.findUnique({
      where: { id },
    })

    if (!answer) {
      return null
    }

    return AnswerMapper.toDomain(answer)
  }

  async findAnswersByQuestionId(
    questionId: string,
    page: number,
    limit: number,
  ): Promise<Answer[]> {
    const answers = await this.prisma.answer.findMany({
      where: { questionId },
      skip: (page - 1) * limit,
      take: limit,
    })

    return answers.map((answer) => AnswerMapper.toDomain(answer))
  }
}
