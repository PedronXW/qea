import { CreateQuestionService } from '@/domain/application/services/question/create-question'
import { QuestionPresenter } from '@/infra/http/presenters/presenter-question'
import { z } from 'zod'

const createQuestionZodSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
})

const createQuestionZodPassSchema = z.object({
  id: z.string().uuid(),
})

export class CreateQuestionController {
  constructor(private createQuestionService: CreateQuestionService) {}

  async handle(req, res): Promise<Response> {
    const { title, content } = createQuestionZodSchema.parse(req.body)
    const { id } = createQuestionZodPassSchema.parse(req.user)

    const question = await this.createQuestionService.execute({
      title,
      content,
      authorId: id,
    })

    if (question.isLeft()) {
      return res.status(400).send(question.value)
    }

    return res.status(201).send(QuestionPresenter.toHTTP(question.value!))
  }
}
