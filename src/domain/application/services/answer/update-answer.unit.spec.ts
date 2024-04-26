import { EntityId } from '@/@shared/entities/entity-id'
import { Answer } from '@/domain/enterprise/entities/answer'
import { InMemoryAnswerRepository } from 'test/repositories/InMemoryAnswerRepository'
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
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryAnswerRepository.answers[0].content).toBe('new_content')
  })
})
