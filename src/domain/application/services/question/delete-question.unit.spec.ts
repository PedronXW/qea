import { EntityId } from '@/@shared/entities/entity-id'
import { Question } from '@/domain/enterprise/entities/question'
import { InMemoryQuestionRepository } from 'test/repositories/InMemoryQuestionRepository'
import { PermissionError } from '../../errors/PermissionError'
import { QuestionNonExistsError } from '../../errors/QuestionNonExistsError'
import { DeleteQuestionService } from './delete-question'

let sut: DeleteQuestionService
let inMemoryQuestionRepository: InMemoryQuestionRepository

describe('Create Question', () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository()
    sut = new DeleteQuestionService(inMemoryQuestionRepository)
  })

  it('should be able to delete a question', async () => {
    const question = Question.create({
      authorId: new EntityId('author-id'),
      content: 'Question content',
      title: 'Question title',
    })

    await inMemoryQuestionRepository.createQuestion(question)

    const response = await sut.execute(question.id.getValue(), 'author-id')

    expect(response.isRight()).toBeTruthy()
    expect(response.value).toBe(true)
  })

  it('should not be able to delete a question that does not exist', async () => {
    const response = await sut.execute('non-existing-id', 'author-id')

    expect(response.isLeft()).toBeTruthy()
    expect(response.value).toBeInstanceOf(QuestionNonExistsError)
  })

  it('should not be able to delete a question that is not from the user', async () => {
    const question = Question.create({
      authorId: new EntityId('author-id'),
      content: 'Question content',
      title: 'Question title',
    })

    await inMemoryQuestionRepository.createQuestion(question)

    const response = await sut.execute(
      question.id.getValue(),
      'another-author-id',
    )

    expect(response.isLeft()).toBeTruthy()
    expect(response.value).toBeInstanceOf(PermissionError)
  })
})
