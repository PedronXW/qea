import { EntityId } from '@/@shared/entities/entity-id'
import { Question } from '@/domain/enterprise/entities/question'
import { InMemoryQuestionRepository } from 'test/repositories/InMemoryQuestionRepository'
import { FindAllQuestionsService } from './find-all-questions'

let sut: FindAllQuestionsService
let inMemoryQuestionRepository: InMemoryQuestionRepository

describe('Find All Questions', () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository()
    sut = new FindAllQuestionsService(inMemoryQuestionRepository)
  })

  it('should be able to find all questions', async () => {
    const question = Question.create({
      authorId: new EntityId('author-id'),
      content: 'Question content',
      title: 'Question title',
    })

    await inMemoryQuestionRepository.createQuestion(question)

    const response = await sut.execute(1, 10)

    expect(response.isRight()).toBeTruthy()
    expect(response.value).toHaveLength(1)
  })
})
