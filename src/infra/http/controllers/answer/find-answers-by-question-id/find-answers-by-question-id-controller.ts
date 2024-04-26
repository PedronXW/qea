import { FindAnswersByQuestionIdService } from '@/domain/application/services/answer/find-answer-by-question-id'
import { AnswerPresenter } from '@/infra/http/presenters/presenter-answer'
import { z } from 'zod'

const findAnswersByQuestionIdQuerySchema = z.object({
  page: z.string().transform(Number),
  limit: z.string().transform(Number),
})

const findAnswersByQuestionIdParamsSchema = z.object({
  id: z.string(),
})

export class FindAnswersByQuestionIdController {
  constructor(
    private findAnswersByQuestionIdUseCase: FindAnswersByQuestionIdService,
  ) {}

  async handle(req, res): Promise<Response> {
    const { page, limit } = findAnswersByQuestionIdQuerySchema.parse(req.query)

    const { id } = findAnswersByQuestionIdParamsSchema.parse(req.params)

    const answers = await this.findAnswersByQuestionIdUseCase.execute({
      questionId: id,
      page,
      limit,
    })

    if (answers.isLeft()) {
      return res.status(404).json(answers.value)
    }

    return res.status(200).json(answers.value!.map(AnswerPresenter.toHTTP))
  }
}
