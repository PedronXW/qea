import { UpdateAnswerService } from '@/domain/application/services/answer/update-answer'
import { AnswerPresenter } from '@/infra/http/presenters/presenter-answer'
import { z } from 'zod'

const updateAnswerParamsSchema = z.object({
  id: z.string().uuid(),
})

const updateAnswerBodySchema = z.object({
  content: z.string(),
})

export class UpdateAnswerController {
  constructor(private updateAnswerUseCase: UpdateAnswerService) {}

  async handle(req, res): Promise<Response> {
    const { id } = updateAnswerParamsSchema.parse(req.params)

    const { content } = updateAnswerBodySchema.parse(req.body)

    const answer = await this.updateAnswerUseCase.execute({
      id,
      content,
    })

    if (answer.isLeft()) {
      return res.status(404).json(answer.value)
    }

    return res.status(200).json(AnswerPresenter.toHTTP(answer.value))
  }
}
