import { app } from '@/infra/http/app'
import request from 'supertest'

describe('FindAllQuestionController', () => {
  it('should be able to find all questions', async () => {
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

    expect(response.body).toEqual([question.body])
  })
})