import { EditUserService } from '@/domain/application/services/user/edit-user'
import { UserPresenter } from '@/infra/http/presenters/presenter-user'
import { Response } from 'express'
import { z } from 'zod'

const editUserZodBodySchema = z.object({
  name: z.string().min(2).optional(),
  email: z.string().email().optional(),
})

export type EditUserBodySchema = z.infer<typeof editUserZodBodySchema>

const editUserZodParamsSchema = z.object({
  id: z.string().uuid(),
})

export class EditUserController {
  constructor(private readonly editUserService: EditUserService) {}

  async handle(req, res): Promise<Response> {
    const { id } = editUserZodParamsSchema.parse(req.user)

    const { name, email } = editUserZodBodySchema.parse(req.body)

    const editedUser = await this.editUserService.execute(id, {
      name,
      email,
    })

    if (editedUser.isLeft()) {
      return res.status(400).send({ error: editedUser.value.message })
    }

    return res.status(200).send(UserPresenter.toHTTP(editedUser.value))
  }
}
