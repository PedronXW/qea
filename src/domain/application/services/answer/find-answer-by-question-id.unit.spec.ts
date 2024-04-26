import { EntityId } from '@/@shared/entities/entity-id'
import { Answer } from '@/domain/enterprise/entities/answer'
import { InMemoryAnswerRepository } from 'test/repositories/InMemoryAnswerRepository'
import { FindAnswerByQuestionIdService } from './find-answer-by-question-id'

let sut: FindAnswerByQuestionIdService
let inMemoryAnswerRepository: InMemoryAnswerRepository

describe('Find Answer By Question Id', () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswerRepository()
    sut = new FindAnswerByQuestionIdService(inMemoryAnswerRepository)
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
      page: 1,
      limit: 10,
    })

    expect(result.isRight()).toBe(true)
    expect(result.value![0].content).toBe('any_content')
  })
})
