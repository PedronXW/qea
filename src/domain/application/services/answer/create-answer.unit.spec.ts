import { EntityId } from '@/@shared/entities/entity-id'
import { Answer } from '@/domain/enterprise/entities/answer'
import { Question } from '@/domain/enterprise/entities/question'
import { InMemoryAnswerRepository } from 'test/repositories/InMemoryAnswerRepository'
import { InMemoryQuestionRepository } from 'test/repositories/InMemoryQuestionRepository'
import { AnswerAndQuestionSameOwnerError } from '../../errors/AnswerAndQuestionSameOwnerError'
import { QuestionAnsweredError } from '../../errors/QuestionAnsweredError'
import { QuestionNonExistsError } from '../../errors/QuestionNonExistsError'
import { CreateAnswerService } from './create-answer'

let sut: CreateAnswerService
let inMemoryAnswerRepository: InMemoryAnswerRepository
let inMemoryQuestionRepository: InMemoryQuestionRepository

describe('Create Answer', () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswerRepository()
    inMemoryQuestionRepository = new InMemoryQuestionRepository()
    sut = new CreateAnswerService(
      inMemoryAnswerRepository,
      inMemoryQuestionRepository,
    )
  })

  it('should be able to create an answer', async () => {
    const newQuestion = Question.create({
      authorId: new EntityId('any_author'),
      content: 'any_content',
      title: 'any_title',
    })

    inMemoryQuestionRepository.questions.push(newQuestion)

    const result = await sut.execute({
      authorId: 'any_author_id',
      content: 'any_content',
      questionId: newQuestion.id.getValue(),
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryAnswerRepository.answers[0].content).toBe('any_content')
  })

  it('should be able to return a question answered error', async () => {
    const newQuestion = Question.create({
      authorId: new EntityId('any_author'),
      content: 'any_content',
      title: 'any_title',
    })

    inMemoryQuestionRepository.questions.push(newQuestion)

    const newAnswer = Answer.create({
      authorId: new EntityId('any_author_id'),
      content: 'any_content',
      questionId: new EntityId(newQuestion.id.getValue()),
    })

    inMemoryAnswerRepository.answers.push(newAnswer)

    const result = await sut.execute({
      authorId: 'any_author_id',
      content: 'any_content',
      questionId: newQuestion.id.getValue(),
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(QuestionAnsweredError)
  })

  it('should be able to return a question and answer same owner error', async () => {
    const newQuestion = Question.create({
      authorId: new EntityId('any_author_id'),
      content: 'any_content',
      title: 'any_title',
    })

    inMemoryQuestionRepository.questions.push(newQuestion)

    const result = await sut.execute({
      authorId: 'any_author_id',
      content: 'any_content',
      questionId: newQuestion.id.getValue(),
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(AnswerAndQuestionSameOwnerError)
  })

  it('should be able to return a question non exists error', async () => {
    const result = await sut.execute({
      authorId: 'any_author_id',
      content: 'any_content',
      questionId: 'any_question_id',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(QuestionNonExistsError)
  })
})
