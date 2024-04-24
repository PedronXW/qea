import { FetchClientByIdService } from '@/domain/application/services/user/fetch-client-by-id'
import { DynamoClientRepository } from '@/infra/database/repositories/DynamoClientRepository'

const clientRepository = new DynamoClientRepository()
const fetchClientByIdService = new FetchClientByIdService(clientRepository)

export { fetchClientByIdService }
