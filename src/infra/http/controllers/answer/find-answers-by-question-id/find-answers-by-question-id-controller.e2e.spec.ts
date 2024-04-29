import { app } from '@/infra/http/app'
import request from 'supertest'

describe('FindAnswersByQuestionIdController', () => {
  it('should be able to find answers by question id', async () => {
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

    const response = await request(app)
      .post('/answers')
      .set('Authorization', `Bearer ${authenticationSecondAccount.body.token}`)
      .send({
        questionId: question.body.id,
        content: 'Answer content',
      })

    const findResponse = await request(app)
      .get(`/answers/question/${question.body.id}`)
      .set('Authorization', `Bearer ${authentication.body.token}`)
      .query({
        page: 1,
        limit: 10,
      })
      .send()

    expect(findResponse.status).toBe(200)

    expect(findResponse.body).toEqual([
      {
        id: response.body.id,
        questionId: question.body.id,
        content: 'Answer content',
        authorId: response.body.authorId,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      },
    ])
  })

  it('should not be able to find answers by question id because a permission error', async () => {
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

    const findResponse = await request(app)
      .get(`/answers/question/${question.body.id}`)
      .set('Authorization', `Bearer ${authentication.body.token}`)
      .query({
        page: 1,
        limit: 10,
      })
      .send()

    expect(findResponse.status).toBe(401)

    expect(findResponse.body).toEqual({
      error: 'User without permission to do that action',
    })
  })
})
