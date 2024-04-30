import { EntityId } from '@/@shared/entities/entity-id'
import { Answer } from '@/domain/enterprise/entities/answer'
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
    const newAnswer = Answer.create({
      authorId: new EntityId('any_author_id'),
      content: 'any_content',
      questionId: new EntityId('any_question_id'),
    })

    inMemoryAnswerRepository.answers.push(newAnswer)

    const result = await sut.execute({
      questionId: newAnswer.questionId.getValue(),
      authorType: 'ORGANIZER',
      page: 1,
      limit: 10,
    })

    expect(result.isRight()).toBe(true)
    expect(result.value![0].content).toBe('any_content')
  })

  it('should be able to return a permission error', async () => {
    const newAnswer = Answer.create({
      authorId: new EntityId('any_author_id'),
      content: 'any_content',
      questionId: new EntityId('any_question_id'),
    })

    inMemoryAnswerRepository.answers.push(newAnswer)

    const result = await sut.execute({
      questionId: newAnswer.questionId.getValue(),
      authorType: 'PARTICIPANT',
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
      authorType: 'PARTICIPANT',
      page: 1,
      limit: 10,
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(QuestionNonExistsError)
  })
})
