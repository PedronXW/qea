import { EntityId } from '@/@shared/entities/entity-id'
import { Answer } from '@/domain/enterprise/entities/answer'
import { InMemoryAnswerRepository } from 'test/repositories/InMemoryAnswerRepository'
import { AnswerNonExistsError } from '../../errors/AnswerNonExistsError'
import { FindAnswerByIdService } from './find-answer-by-id'

let sut: FindAnswerByIdService
let inMemoryAnswerRepository: InMemoryAnswerRepository
describe('Find Answer By Id', () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswerRepository()
    sut = new FindAnswerByIdService(inMemoryAnswerRepository)
  })

  it('should be able to find an answer by id', async () => {
    const newAnswer = Answer.create({
      authorId: new EntityId('any_author_id'),
      content: 'any_content',
      questionId: new EntityId('any_question_id'),
    })

    inMemoryAnswerRepository.answers.push(newAnswer)

    const result = await sut.execute(newAnswer.id.getValue())

    expect(result.isRight()).toBe(true)
    expect(inMemoryAnswerRepository.answers[0].content).toBe('any_content')
  })

  it('should be able to return an answer non exists error', async () => {
    const result = await sut.execute('any_id')

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(AnswerNonExistsError)
  })
})
