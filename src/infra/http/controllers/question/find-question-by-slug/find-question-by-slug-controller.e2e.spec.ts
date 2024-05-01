import { app } from '@/infra/http/app'
import request from 'supertest'

describe('FindQuestionBySlugController', () => {
  it('should be able to find a question by slug', async () => {
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
      .get(`/questions/slug/${question.body.slug}`)
      .set('Authorization', `Bearer ${authentication.body.token}`)
      .query({
        page: 0,
        limit: 10,
      })
      .send()

    expect(response.status).toBe(200)

    expect(response.body).toEqual({
      questions: [{ ...question.body, answeredByCurrentUser: false }],
      questionsCount: 1,
    })
  })
})
