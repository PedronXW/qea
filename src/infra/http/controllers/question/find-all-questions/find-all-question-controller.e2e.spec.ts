import { app } from '@/infra/http/app'
import request from 'supertest'

describe('FindAllQuestionController', () => {
  it('should be able to find all questions with a false result to answered question', async () => {
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
      .get(`/questions`)
      .set('Authorization', `Bearer ${authentication.body.token}`)
      .query({
        page: 0,
        limit: 10,
      })
      .send()

    expect(response.status).toBe(200)

    expect(response.body).toEqual([
      {
        id: question.body.id,
        title: 'Question title',
        content: 'Question content',
        authorId: question.body.authorId,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        answeredByCurrentUser: false,
        slug: expect.any(String),
      },
    ])
  })

  it('should be able to find all questions with a true result to answered question', async () => {
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

    const authenticationSecondAccount = await request(app)
      .post('/sessions')
      .send({
        email: 'johndoe2@johndoe.com',
        password: '12345678',
      })

    await request(app)
      .post('/answers')
      .set('Authorization', `Bearer ${authenticationSecondAccount.body.token}`)
      .send({
        questionId: question.body.id,
        content: 'Answer content',
      })

    const response = await request(app)
      .get(`/questions`)
      .set('Authorization', `Bearer ${authenticationSecondAccount.body.token}`)
      .query({
        page: 0,
        limit: 10,
      })
      .send()

    expect(response.status).toBe(200)

    expect(response.body).toEqual([
      {
        id: question.body.id,
        title: 'Question title',
        content: 'Question content',
        authorId: question.body.authorId,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        answeredByCurrentUser: true,
        slug: expect.any(String),
      },
    ])
  })
})
