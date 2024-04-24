import { Either, left, right } from '@/@shared/either'
import { Client } from '@/domain/enterprise/entities/client'
import { ClientNonExistsError } from '../errors/ClientNonExists'
import { ClientRepository } from '../repositories/client-repository'

type FetchClientByEmailServiceRequest = {
  email: string
}

type FetchClientByEmailServiceResponse = Either<ClientNonExistsError, Client>

export class FetchClientByEmailService {
  constructor(private clientRepository: ClientRepository) {}

  async execute({
    email,
  }: FetchClientByEmailServiceRequest): Promise<FetchClientByEmailServiceResponse> {
    const client = await this.clientRepository.getClientByEmail(email)

    if (!client) {
      return left(new ClientNonExistsError())
    }

    return right(client)
  }
}
