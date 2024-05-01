import { app } from '@/infra/http/app'
import request from 'supertest'
import { createAuthenticatedUserOrganizer } from 'test/factories/e2e/authenticated-user'

describe('Delete User', () => {
  it('should be able to delete a user', async () => {
    const user = await createAuthenticatedUserOrganizer()

    const response = await request(app)
      .delete(`/users`)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${user.authentication.body.token}`)
      .send()

    expect(response.status).toBe(204)
  })
})
