import { EntityId } from '@/@shared/entities/entity-id'
import { Answer } from '@/domain/enterprise/entities/answer'
import { InMemoryAnswerRepository } from 'test/repositories/InMemoryAnswerRepository'
import { AnswerNonExistsError } from '../../errors/AnswerNonExistsError'
import { FindAnswerByAuthorIdInASpecificQuestionService } from './find-answer-by-author-id-in-a-specific-question'

let sut: FindAnswerByAuthorIdInASpecificQuestionService
let inMemoryAnswerRepository: InMemoryAnswerRepository

describe('Find Answer By Author Id In A Specific Question', () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswerRepository()
    sut = new FindAnswerByAuthorIdInASpecificQuestionService(
      inMemoryAnswerRepository,
    )
  })

  it('should return an answer if it exists', async () => {
    const answer = Answer.create({
      content: 'any_content',
      authorId: new EntityId('any_author_id'),
      questionId: new EntityId('any_question_id'),
    })

    await inMemoryAnswerRepository.createAnswer(answer)

    const response = await sut.execute('any_author_id', 'any_question_id')

    expect(response.isRight()).toBeTruthy()
    expect(response.value).toEqual(answer)
  })

  it('should return an error if the answer does not exist', async () => {
    const response = await sut.execute('any_author_id', 'any_question_id')

    expect(response.isLeft()).toBeTruthy()
    expect(response.value).toEqual(new AnswerNonExistsError())
  })
})
