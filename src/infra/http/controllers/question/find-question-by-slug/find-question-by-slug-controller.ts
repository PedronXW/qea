import { FindQuestionBySlugService } from '@/domain/application/services/question/find-question-by-slug'
import { QuestionPresenter } from '@/infra/http/presenters/presenter-question'
import { z } from 'zod'

const findQuestionBySlugZodParamSchema = z.object({
  slug: z.string(),
})

const findAllQuestionsZodQuerySchema = z.object({
  page: z.string().transform(Number),
  limit: z.string().transform(Number),
})

export class FindQuestionBySlugController {
  constructor(private findQuestionBySlugService: FindQuestionBySlugService) {}

  async handle(req, res): Promise<Response> {
    const { slug } = findQuestionBySlugZodParamSchema.parse(req.params)

    const { page, limit } = findAllQuestionsZodQuerySchema.parse(req.query)

    const question = await this.findQuestionBySlugService.execute({
      slug,
      page,
      limit,
    })

    return res.status(200).send(question.value!.map(QuestionPresenter.toHTTP))
  }
}
