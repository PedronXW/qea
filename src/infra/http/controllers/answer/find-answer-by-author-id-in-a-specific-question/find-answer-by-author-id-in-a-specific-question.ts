import { FindAnswerByAuthorIdInASpecificQuestionService } from '@/domain/application/services/answer/find-answer-by-author-id-in-a-specific-question'
import { AnswerPresenter } from '@/infra/http/presenters/presenter-answer'
import { z } from 'zod'

const findAnswerByAuthorIdInASpecificQuestionZodSchema = z.object({
  authorId: z.string().uuid(),
  questionId: z.string().uuid(),
})

export class FindAnswerByAuthorIdInASpecificQuestionController {
  constructor(
    private findAnswerByAuthorIdInASpecificQuestionService: FindAnswerByAuthorIdInASpecificQuestionService,
  ) {}

  async handle(req, res): Promise<Response> {
    const { authorId, questionId } =
      findAnswerByAuthorIdInASpecificQuestionZodSchema.parse(req.body)

    const answers =
      await this.findAnswerByAuthorIdInASpecificQuestionService.execute(
        authorId,
        questionId,
      )

    if (answers.isLeft()) {
      return res.status(404).send()
    }

    return res.status(200).json(AnswerPresenter.toHTTP(answers.value))
  }
}
