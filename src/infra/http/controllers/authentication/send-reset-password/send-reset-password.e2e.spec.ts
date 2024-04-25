import { app } from '@/infra/http/app'
import request from 'supertest'

describe('Send Reset Password Email', () => {
  it('should be able to send a reset password email', async () => {
    await request(app).post('/users').send({
      name: 'John Doe',
      email: 'johndoe@johndoe.com',
      type: 'ORGANIZER',
      password: '12345678',
    })

    await request(app).post('/sessions').send({
      email: 'johndoe@johndoe.com',
      password: '12345678',
    })

    const getResetPassword = await request(app)
      .post('/sessions/reset-password')
      .send({
        email: 'johndoe@johndoe.com',
      })

    const response = await request(app).put('/sessions/reset-password').send({
      id: getResetPassword.body.validatorCode,
      newPassword: '123456789',
    })

    expect(response.status).toBe(200)
  })

  it('should not be able to send a reset password email because a wrong email', async () => {
    await request(app).post('/users').send({
      name: 'John Doe',
      type: 'ORGANIZER',
      email: 'johndoe@johndoe.com',
      password: '12345678',
    })

    await request(app).post('/sessions').send({
      email: 'johndoe@johndoe.com',
      password: '12345678',
    })

    const sendMail = await request(app).post('/sessions/reset-password').send({
      email: 'wrongemail@wrong.com',
    })

    expect(sendMail.status).toBe(400)
    expect(sendMail.body).toEqual({ error: 'User non exists' })
  })
})
