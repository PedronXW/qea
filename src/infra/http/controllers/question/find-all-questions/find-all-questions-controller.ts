import { FindAllQuestionsService } from '@/domain/application/services/question/find-all-questions'
import { QuestionPresenter } from '@/infra/http/presenters/presenter-question'
import { z } from 'zod'

const findAllQuestionsZodPassSchema = z.object({
  id: z.string().uuid(),
})

const findAllQuestionsZodQuerySchema = z.object({
  page: z.string().transform(Number),
  limit: z.string().transform(Number),
})

export class FindAllQuestionsController {
  constructor(private findAllQuestionsService: FindAllQuestionsService) {}

  async handle(req, res): Promise<Response> {
    const { id } = findAllQuestionsZodPassSchema.parse(req.user)

    const { page, limit } = findAllQuestionsZodQuerySchema.parse(req.query)

    const questions = await this.findAllQuestionsService.execute(
      id,
      page,
      limit,
    )

    return res.status(200).send(questions.value?.map(QuestionPresenter.toHTTP))
  }
}
