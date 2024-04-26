import { EntityId } from '@/@shared/entities/entity-id'
import { Answer } from '@/domain/enterprise/entities/answer'
import { InMemoryAnswerRepository } from 'test/repositories/InMemoryAnswerRepository'
import { DeleteAnswerService } from './delete-answer'

let sut: DeleteAnswerService
let inMemoryAnswerRepository: InMemoryAnswerRepository

describe('Delete Answer', () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswerRepository()
    sut = new DeleteAnswerService(inMemoryAnswerRepository)
  })
  it('should be able to delete an answer', async () => {
    const newAnswer = Answer.create({
      authorId: new EntityId('any_author_id'),
      content: 'any_content',
      questionId: new EntityId('any_question_id'),
    })

    inMemoryAnswerRepository.answers.push(newAnswer)

    const result = await sut.execute(newAnswer.id.getValue())

    expect(result.isRight()).toBe(true)
    expect(inMemoryAnswerRepository.answers.length).toBe(0)
  })
})
