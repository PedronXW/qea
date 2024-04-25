import { app } from '@/infra/http/app'
import request from 'supertest'

describe('Fetch User By Id', () => {
  it('should be able to fetch a user by id', async () => {
    const response = await request(app).post('/users').send({
      name: 'John Doe',
      type: 'ORGANIZER',
      email: 'johndoe@johndoe.com',
      password: '12345678',
    })

    const { id } = response.body

    jest.setTimeout(20000)

    const authentication = await request(app).post('/sessions').send({
      email: 'johndoe@johndoe.com',
      password: '12345678',
    })

    const fetchResponse = await request(app)
      .get(`/users/${id}`)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${authentication.body.token}`)

    console.log(fetchResponse.body)

    console.log(id)

    expect(fetchResponse.status).toBe(200)
  })

  it('should not be able to fetch a user by id because a wrong id', async () => {
    await request(app).post('/users').send({
      name: 'John Doe',
      type: 'ORGANIZER',
      email: 'johndoe@johndoe.com',
      password: '12345678',
    })

    jest.setTimeout(20000)

    const authentication = await request(app).post('/sessions').send({
      email: 'johndoe@johndoe.com',
      password: '12345678',
    })

    const fetchResponse = await request(app)
      .get(`/users/${'wrong_id'}`)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${authentication.body.token}`)

    expect(fetchResponse.status).toBe(400)
    expect(fetchResponse.body).toEqual({ error: ['id - Invalid uuid'] })
  })
})
