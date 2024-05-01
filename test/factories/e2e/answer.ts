import { app } from '@/infra/http/app'
import request from 'supertest'

type AnswerFactory = {
  answer: { body: { id: string } }
}

const createAnswerFactory = async (
  authToken?: string,
  questionId?: string,
): Promise<AnswerFactory> => {
  const answer = await request(app)
    .post('/answers')
    .set('Authorization', `Bearer ${authToken}`)
    .send({
      questionId,
      content: 'Answer content',
    })

  return {
    answer,
  }
}

export { createAnswerFactory }
