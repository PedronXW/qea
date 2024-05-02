import { EntityId } from '@/@shared/entities/entity-id'
import { Answer } from '@/domain/enterprise/entities/answer'
import { Question } from '@/domain/enterprise/entities/question'
import { InMemoryAnswerRepository } from 'test/repositories/InMemoryAnswerRepository'
import { InMemoryQuestionRepository } from 'test/repositories/InMemoryQuestionRepository'
import { AnswerNonExistsError } from '../../errors/AnswerNonExistsError'
import { FindAnswerByAuthorIdInASpecificQuestionService } from './find-answer-by-author-id-in-a-specific-question'

let sut: FindAnswerByAuthorIdInASpecificQuestionService
let inMemoryAnswerRepository: InMemoryAnswerRepository
let inMemoryQuestionRepository: InMemoryQuestionRepository

describe('Find Answer By Author Id In A Specific Question', () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswerRepository()
    inMemoryQuestionRepository = new InMemoryQuestionRepository()
    sut = new FindAnswerByAuthorIdInASpecificQuestionService(
      inMemoryAnswerRepository,
      inMemoryQuestionRepository,
    )
  })

  it('should return an answer if it exists', async () => {
    const question = Question.create({
      title: 'any_title',
      content: 'any_content',
      authorId: new EntityId('any_author_id'),
    })

    await inMemoryQuestionRepository.createQuestion(question)

    const answer = Answer.create({
      content: 'any_content',
      authorId: new EntityId('any_author_id'),
      questionId: question.id,
    })

    await inMemoryAnswerRepository.createAnswer(answer)

    const response = await sut.execute('any_author_id', question.id.getValue())

    expect(response.isRight()).toBeTruthy()
    expect(response.value).toEqual(answer)
  })

  it('should return an error if the answer does not exist', async () => {
    const question = Question.create({
      title: 'any_title',
      content: 'any_content',
      authorId: new EntityId('any_author_id'),
    })

    await inMemoryQuestionRepository.createQuestion(question)

    const response = await sut.execute('any_author_id', question.id.getValue())

    expect(response.isLeft()).toBeTruthy()
    expect(response.value).toEqual(new AnswerNonExistsError())
  })
})
