import { DeleteQuestionService } from '@/domain/application/services/question/delete-question'
import { z } from 'zod'

const deleteQuestionZodSchema = z.object({
  id: z.string().uuid(),
})

export class DeleteQuestionController {
  constructor(private deleteQuestionService: DeleteQuestionService) {}

  async handle(req, res): Promise<Response> {
    const { id } = deleteQuestionZodSchema.parse(req.params)

    const question = await this.deleteQuestionService.execute(id)

    if (question.isLeft()) {
      return res.status(400).send({ error: question.value.message })
    }

    return res.status(204).send()
  }
}
