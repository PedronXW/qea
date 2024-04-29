import { app } from '@/infra/http/app'
import request from 'supertest'

describe('Find User By Id', () => {
  it('should be able to find a user by id', async () => {
    await request(app).post('/users').send({
      name: 'John Doe',
      type: 'ORGANIZER',
      email: 'johndoe@johndoe.com',
      password: '12345678',
    })

    const authentication = await request(app).post('/sessions').send({
      email: 'johndoe@johndoe.com',
      password: '12345678',
    })

    const findResponse = await request(app)
      .get(`/users`)
      .set('Authorization', `Bearer ${authentication.body.token}`)

    expect(findResponse.status).toBe(200)
  })
})
