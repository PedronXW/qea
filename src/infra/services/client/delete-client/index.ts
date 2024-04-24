import { DeleteClientService } from '@/domain/application/services/user/delete-client'
import { DynamoClientRepository } from '@/infra/database/repositories/DynamoClientRepository'

const clientRepository = new DynamoClientRepository()
const deleteClientService = new DeleteClientService(clientRepository)
export { deleteClientService }
