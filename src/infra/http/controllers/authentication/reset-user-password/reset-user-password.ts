import { ResetUserPasswordService } from '@/domain/application/services/user/reset-user-password'
import { z } from 'zod'

const resetUserPasswordZodSchema = z.object({
  id: z.string(),
  newPassword: z.string(),
})

export class ResetUserPasswordController {
  constructor(
    private readonly resetUserPasswordService: ResetUserPasswordService,
  ) {}

  async handle(req, res): Promise<Response> {
    const { id, newPassword } = resetUserPasswordZodSchema.parse(req.body)

    const code = await this.resetUserPasswordService.execute({
      id,
      password: newPassword,
    })

    if (code.isLeft()) {
      return res.status(400).send({ error: code.value.message })
    }

    return res.status(200).send()
  }
}
