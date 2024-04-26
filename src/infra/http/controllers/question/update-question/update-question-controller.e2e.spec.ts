import { app } from '@/infra/http/app'
import request from 'supertest'

describe('UpdateQuestionController', () => {
  it('should be able to update a question', async () => {
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
      .patch(`/questions/${question.body.id}`)
      .set('Authorization', `Bearer ${authentication.body.token}`)
      .send({
        title: 'Question title updated',
        content: 'Question content updated',
      })

    expect(response.status).toBe(200)

    expect(response.body).toEqual({
      id: question.body.id,
      authorId: question.body.authorId,
      title: 'Question title updated',
      content: 'Question content updated',
      slug: expect.any(String),
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    })
  })
})
