import { EntityId } from '@/@shared/entities/entity-id'
import { Question } from '@/domain/enterprise/entities/question'
import { InMemoryQuestionRepository } from 'test/repositories/InMemoryQuestionRepository'
import { FindQuestionBySlugService } from './find-question-by-slug'

let sut: FindQuestionBySlugService
let inMemoryQuestionRepository: InMemoryQuestionRepository

describe('Find Question By Slug', () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository()
    sut = new FindQuestionBySlugService(inMemoryQuestionRepository)
  })

  it('should be able to find a question by slug', async () => {
    const question = Question.create({
      authorId: new EntityId('author-id'),
      content: 'Question content',
      title: 'Question title',
    })

    await inMemoryQuestionRepository.createQuestion(question)

    const response = await sut.execute({
      slug: question.slug.value,
      authorId: 'author-id',
      page: 1,
      limit: 10,
    })

    expect(response.isRight()).toBeTruthy()
    expect(response.value).toEqual({
      questions: [
        expect.objectContaining({
          title: 'Question title',
          content: 'Question content',
        }),
      ],
      questionsCount: 1,
    })
  })
})
