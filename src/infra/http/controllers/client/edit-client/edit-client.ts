import { EditClientService } from '@/domain/application/services/edit-client'
import { ClientPresenter } from '@/infra/http/presenters/presenter-client'
import { Response } from 'express'
import { z } from 'zod'

const editClientZodBodySchema = z.object({
  name: z.string().min(2).optional(),
  email: z.string().email().optional(),
})

export type EditClientBodySchema = z.infer<typeof editClientZodBodySchema>

const editClientZodParamsSchema = z.object({
  id: z.string().uuid(),
})

export class EditClientController {
  constructor(private readonly editClientService: EditClientService) {}

  async handle(req, res): Promise<Response> {
    const { id } = editClientZodParamsSchema.parse(req.user)

    const { name, email } = editClientZodBodySchema.parse(req.body)

    const editedClient = await this.editClientService.execute(id, {
      name,
      email,
    })

    if (editedClient.isLeft()) {
      return res.status(400).send({ error: editedClient.value.message })
    }

    return res.status(200).send(ClientPresenter.toHTTP(editedClient.value))
  }
}
