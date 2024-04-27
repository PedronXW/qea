import { app } from '@/infra/http/app'
import request from 'supertest'

describe('CreateQuestionController', () => {
  it('should be able to create a new question', async () => {
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

    expect(question.status).toBe(201)
    expect(question.body).toEqual({
      id: expect.any(String),
      title: 'Question title',
      content: 'Question content',
      authorId: expect.any(String),
      createdAt: expect.any(String),
      slug: expect.any(String),
      updatedAt: expect.any(String),
    })
  })

  it('should not be able to create a new question because a permission error', async () => {
    await request(app).post('/users').send({
      name: 'John Doe',
      email: 'johndoe@johndoe.com',
      type: 'PARTICIPANT',
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

    expect(question.status).toBe(401)
    expect(question.body).toEqual({
      error: 'User without permission to do that action',
    })
  })
})
