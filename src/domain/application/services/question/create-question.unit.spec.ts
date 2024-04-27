import { InMemoryQuestionRepository } from 'test/repositories/InMemoryQuestionRepository'
import { CreateQuestionService } from './create-question'

let sut: CreateQuestionService
let inMemoryQuestionRepository: InMemoryQuestionRepository

describe('Create Question', () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository()
    sut = new CreateQuestionService(inMemoryQuestionRepository)
  })

  it('should be able to create a new question', async () => {
    const response = await sut.execute({
      authorId: 'author-id',
      content: 'Question content',
      authorType: 'ORGANIZER',
      title: 'Question title',
    })

    expect(response.isRight()).toBeTruthy()
    expect(response.value).toHaveProperty('id')
    expect(response.value).toHaveProperty('title', 'Question title')
    expect(response.value).toHaveProperty('content', 'Question content')
    expect(response.value).toHaveProperty('authorId', { value: 'author-id' })
  })
})
