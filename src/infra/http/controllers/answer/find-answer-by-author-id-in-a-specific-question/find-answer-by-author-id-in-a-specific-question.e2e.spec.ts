import { app } from '@/infra/http/app'
import request from 'supertest'

describe('FindAnswerByAuthorIdInASpecificQuestionController', () => {
  it('should be able to find an answer by author id in a specific question', async () => {
    await request(app).post('/users').send({
      name: 'John Doe',
      email: 'johndoe@johndoe.com',
      type: 'ORGANIZER',
      password: '12345678',
    })

    const authentication = await request(app).post('/sessions').send({
      email: 'johndoe@johndoe.com',
      password: '12345678',
    })

    const question = await request(app)
      .post('/questions')
      .set('Authorization', `Bearer ${authentication.body.token}`)
      .send({
        title: 'Question title',
        content: 'Question content',
      })

    await request(app).post('/users').send({
      name: 'John Doe',
      email: 'johndoe2@johndoe.com',
      type: 'ORGANIZER',
      password: '12345678',
    })

    const authenticationSecondUser = await request(app).post('/sessions').send({
      email: 'johndoe2@johndoe.com',
      password: '12345678',
    })

    const response = await request(app)
      .post('/answers')
      .set('Authorization', `Bearer ${authenticationSecondUser.body.token}`)
      .send({
        questionId: question.body.id,
        content: 'Answer content',
      })

    const findResponse = await request(app)
      .get(`/answers/question/${question.body.id}/specific`)
      .set('Authorization', `Bearer ${authenticationSecondUser.body.token}`)
      .send()

    console.log(findResponse.body)

    expect(findResponse.status).toBe(200)
    expect(findResponse.body).toEqual({
      id: expect.any(String),
      questionId: question.body.id,
      content: 'Answer content',
      authorId: response.body.authorId,
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    })
  })
})
