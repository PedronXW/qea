import { EntityId } from '@/@shared/entities/entity-id'
import { Answer } from '@/domain/enterprise/entities/answer'
import { Question } from '@/domain/enterprise/entities/question'
import { InMemoryAnswerRepository } from 'test/repositories/InMemoryAnswerRepository'
import { InMemoryQuestionRepository } from 'test/repositories/InMemoryQuestionRepository'
import { PermissionError } from '../../errors/PermissionError'
import { QuestionNonExistsError } from '../../errors/QuestionNonExistsError'
import { FindAnswersByQuestionIdService } from './find-answer-by-question-id'

let sut: FindAnswersByQuestionIdService
let inMemoryAnswerRepository: InMemoryAnswerRepository
let inMemoryQuestionRepository: InMemoryQuestionRepository

describe('Find Answer By Question Id', () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswerRepository()
    inMemoryQuestionRepository = new InMemoryQuestionRepository()
    sut = new FindAnswersByQuestionIdService(
      inMemoryAnswerRepository,
      inMemoryQuestionRepository,
    )
  })

  it('should be able to find an answer by question id', async () => {
    const question = Question.create({
      title: 'any_title',
      content: 'any_content',
      authorId: new EntityId('any_author_id'),
    })

    await inMemoryQuestionRepository.createQuestion(question)

    const newAnswer = Answer.create({
      authorId: new EntityId('any_author_id'),
      content: 'any_content',
      questionId: question.id,
    })

    inMemoryAnswerRepository.answers.push(newAnswer)

    const result = await sut.execute({
      questionId: question.id.getValue(),
      authorType: 'ORGANIZER',
      authorId: 'any_author_id',
      page: 1,
      limit: 10,
    })

    expect(result.isRight()).toBeTruthy()
    expect(result.value).toHaveProperty('answers')
    expect(result.value).toHaveProperty('answersCount')
  })

  it('should be able to return a permission error', async () => {
    const question = Question.create({
      title: 'any_title',
      content: 'any_content',
      authorId: new EntityId('any_author_id'),
    })

    await inMemoryQuestionRepository.createQuestion(question)

    const newAnswer = Answer.create({
      authorId: new EntityId('any_author_id'),
      content: 'any_content',
      questionId: question.id,
    })

    inMemoryAnswerRepository.answers.push(newAnswer)

    const result = await sut.execute({
      questionId: question.id.getValue(),
      authorType: 'PARTICIPANT',
      authorId: 'any_author_id',
      page: 1,
      limit: 10,
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(PermissionError)
  })

  it('should be able to return a question non exists error', async () => {
    const newAnswer = Answer.create({
      authorId: new EntityId('any_author_id'),
      content: 'any_content',
      questionId: new EntityId('any_question_id'),
    })

    inMemoryAnswerRepository.answers.push(newAnswer)

    const result = await sut.execute({
      questionId: 'any_id',
      authorType: 'ORGANIZER',
      authorId: 'any_author_id',
      page: 1,
      limit: 10,
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(QuestionNonExistsError)
  })
})
