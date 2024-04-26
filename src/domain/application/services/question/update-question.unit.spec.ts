import { EntityId } from '@/@shared/entities/entity-id'
import { Question } from '@/domain/enterprise/entities/question'
import { InMemoryQuestionRepository } from 'test/repositories/InMemoryQuestionRepository'
import { UpdateQuestionService } from './update-question'

let sut: UpdateQuestionService
let inMemoryQuestionRepository: InMemoryQuestionRepository

describe('Update Question', () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository()
    sut = new UpdateQuestionService(inMemoryQuestionRepository)
  })

  it('should be able to update a question', async () => {
    const newQuestion = Question.create({
      authorId: new EntityId('author-id'),
      content: 'Question content',
      title: 'Question title',
    })

    const question =
      await inMemoryQuestionRepository.createQuestion(newQuestion)

    const response = await sut.execute({
      questionId: question.id.getValue(),
      content: 'New question content',
      title: 'New question title',
    })

    expect(response.isRight()).toBeTruthy()
    expect(response.value).toHaveProperty('id')
    expect(response.value).toHaveProperty('title', 'New question title')
    expect(response.value).toHaveProperty('content', 'New question content')
    expect(response.value).toHaveProperty('authorId', { value: 'author-id' })

    expect(inMemoryQuestionRepository.questions).toHaveLength(1)
    expect(inMemoryQuestionRepository.questions[0]).toHaveProperty('id')
    expect(inMemoryQuestionRepository.questions[0]).toHaveProperty(
      'title',
      'New question title',
    )
    expect(inMemoryQuestionRepository.questions[0]).toHaveProperty(
      'content',
      'New question content',
    )
    expect(inMemoryQuestionRepository.questions[0]).toHaveProperty('authorId', {
      value: 'author-id',
    })
  })

  it('should not be able to update a question that does not exist', async () => {
    const response = await sut.execute({
      questionId: 'non-existing-id',
      content: 'New question content',
      title: 'New question title',
    })

    expect(response.isLeft()).toBeTruthy()
  })
})
