import { app } from '@/infra/http/app'
import request from 'supertest'

describe('Edit User', () => {
  it('should be able to edit a user', async () => {
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

    const responseUpdate = await request(app)
      .put(`/users`)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${authentication.body.token}`)
      .send({
        name: 'John Doe2',
      })

    expect(responseUpdate.status).toBe(200)
  })

  it('should not be able to edit a user because a invalid name', async () => {
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

    const responseUpdate = await request(app)
      .put(`/users`)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${authentication.body.token}`)
      .send({
        name: 'J',
      })

    expect(responseUpdate.status).toBe(400)
    expect(responseUpdate.body).toEqual({
      error: ['name - String must contain at least 2 character(s)'],
    })
  })
})
