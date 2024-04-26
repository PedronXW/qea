import { EntityId } from '@/@shared/entities/entity-id'
import { Answer } from '@/domain/enterprise/entities/answer'
import { InMemoryAnswerRepository } from 'test/repositories/InMemoryAnswerRepository'
import { QuestionAnsweredError } from '../../errors/QuestionAnsweredError'
import { CreateAnswerService } from './create-answer'

let sut: CreateAnswerService
let inMemoryAnswerRepository: InMemoryAnswerRepository

describe('Create Answer', () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswerRepository()
    sut = new CreateAnswerService(inMemoryAnswerRepository)
  })

  it('should be able to create an answer', async () => {
    const result = await sut.execute({
      authorId: 'any_author_id',
      content: 'any_content',
      questionId: 'any_question_id',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryAnswerRepository.answers[0].content).toBe('any_content')
  })

  it('should be able to return a question answered error', async () => {
    const newAnswer = Answer.create({
      authorId: new EntityId('any_author_id'),
      content: 'any_content',
      questionId: new EntityId('any_question_id'),
    })

    inMemoryAnswerRepository.answers.push(newAnswer)

    const result = await sut.execute({
      authorId: 'any_author_id',
      content: 'any_content',
      questionId: 'any_question_id',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(QuestionAnsweredError)
  })
})
