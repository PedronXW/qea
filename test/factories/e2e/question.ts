import { Question } from '@/domain/enterprise/entities/question'
import { app } from '@/infra/http/app'
import { faker } from '@faker-js/faker'
import request from 'supertest'

type QuestionFactory = {
  question: { body: Question }
}

const createQuestionFactory = async (
  authToken?: string,
): Promise<QuestionFactory> => {
  const password = faker.internet.password()

  let authentication = authToken

  if (!authToken) {
    const user = await request(app).post('/users').send({
      name: faker.person.firstName(),
      email: faker.internet.email(),
      type: 'ORGANIZER',
      password,
    })

    const auth = await request(app).post('/sessions').send({
      email: user.body.email,
      password,
    })

    authentication = auth.body.token
  }

  const question = await request(app)
    .post('/questions')
    .set('Authorization', `Bearer ${authentication}`)
    .send({
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraph(),
    })

  return {
    question,
  }
}

export { createQuestionFactory }
