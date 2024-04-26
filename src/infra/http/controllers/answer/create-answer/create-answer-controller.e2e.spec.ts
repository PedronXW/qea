import { app } from '@/infra/http/app'
import request from 'supertest'

describe('CreateAnswerController', () => {
  it('should be able to create a new answer', async () => {
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

    const response = await request(app)
      .post('/answers')
      .set('Authorization', `Bearer ${authentication.body.token}`)
      .send({
        questionId: question.body.id,
        content: 'Answer content',
      })

    expect(response.status).toBe(201)
    expect(response.body).toEqual({
      id: expect.any(String),
      questionId: question.body.id,
      content: 'Answer content',
      authorId: expect.any(String),
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    })
  })
})
