import { EntityId } from '@/@shared/entities/entity-id'
import { Question } from '@/domain/enterprise/entities/question'
import { InMemoryQuestionRepository } from 'test/repositories/InMemoryQuestionRepository'
import { QuestionNonExistsError } from '../../errors/QuestionNonExistsError'
import { FindQuestionByIdService } from './find-question-by-id'

let sut: FindQuestionByIdService
let inMemoryQuestionRepository: InMemoryQuestionRepository

describe('Find Question By Id', () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository()
    sut = new FindQuestionByIdService(inMemoryQuestionRepository)
  })

  it('should be able to find a question by id', async () => {
    const question = Question.create({
      authorId: new EntityId('author-id'),
      content: 'Question content',
      title: 'Question title',
    })

    await inMemoryQuestionRepository.createQuestion(question)

    const response = await sut.execute(question.id.getValue(), 'author-id')

    expect(response.isRight()).toBeTruthy()
    expect(response.value).toBeInstanceOf(Question)
  })

  it('should not be able to find a question that does not exist', async () => {
    const response = await sut.execute('non-existing-id', 'author-id')

    expect(response.isLeft()).toBeTruthy()
    expect(response.value).toBeInstanceOf(QuestionNonExistsError)
  })
})
