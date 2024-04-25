import { FetchUserByIdService } from '@/domain/application/services/user/fetch-user-by-id'
import { UserPresenter } from '@/infra/http/presenters/presenter-user'
import { Response } from 'express'
import { z } from 'zod'

const fetchUserByIdZodSchema = z.object({
  id: z.string().uuid(),
})

export class FetchUserByIdController {
  constructor(private readonly fetchUserByIdService: FetchUserByIdService) {}

  async handle(req, res): Promise<Response> {
    const { id } = fetchUserByIdZodSchema.parse(req.params)

    const user = await this.fetchUserByIdService.execute({ id })

    if (user.isLeft()) {
      return res.status(400).send({ error: user.value.message })
    }

    return res.status(200).send({ user: UserPresenter.toHTTP(user.value) })
  }
}
