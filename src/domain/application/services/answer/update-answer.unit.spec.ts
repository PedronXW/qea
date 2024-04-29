import { EntityId } from '@/@shared/entities/entity-id'
import { Answer } from '@/domain/enterprise/entities/answer'
import { InMemoryAnswerRepository } from 'test/repositories/InMemoryAnswerRepository'
import { AnswerNonExistsError } from '../../errors/AnswerNonExistsError'
import { PermissionError } from '../../errors/PermissionError'
import { UpdateAnswerService } from './update-answer'

let sut: UpdateAnswerService
let inMemoryAnswerRepository: InMemoryAnswerRepository

describe('Update Answer', () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswerRepository()
    sut = new UpdateAnswerService(inMemoryAnswerRepository)
  })

  it('should be able to update an answer', async () => {
    const newAnswer = Answer.create({
      authorId: new EntityId('any_author_id'),
      content: 'any_content',
      questionId: new EntityId('any_question_id'),
    })

    inMemoryAnswerRepository.answers.push(newAnswer)

    const result = await sut.execute({
      id: newAnswer.id.getValue(),
      content: 'new_content',
      userId: 'any_author_id',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryAnswerRepository.answers[0].content).toBe('new_content')
  })

  it('should be able to return an answer non exists error', async () => {
    const result = await sut.execute({
      id: 'any_id',
      content: 'any_content',
      userId: 'any_author_id',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(AnswerNonExistsError)
  })

  it('should be able to return a permission error', async () => {
    const newAnswer = Answer.create({
      authorId: new EntityId('any_author_id'),
      content: 'any_content',
      questionId: new EntityId('any_question_id'),
    })

    inMemoryAnswerRepository.answers.push(newAnswer)

    const result = await sut.execute({
      id: newAnswer.id.getValue(),
      content: 'new_content',
      userId: 'any_other_author_id',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(PermissionError)
  })
})
