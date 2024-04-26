import { app } from '@/infra/http/app'
import request from 'supertest'

describe('DeleteAnswerController', () => {
  it('should be able to delete an answer', async () => {
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

    const deleteResponse = await request(app)
      .delete(`/answers/${response.body.id}`)
      .set('Authorization', `Bearer ${authentication.body.token}`)
      .send()

    expect(deleteResponse.status).toBe(204)
  })
})
