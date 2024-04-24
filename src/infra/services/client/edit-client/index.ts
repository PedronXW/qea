import { EditClientService } from '@/domain/application/services/user/edit-client'
import { DynamoClientRepository } from '@/infra/database/repositories/DynamoClientRepository'

const clientsRepository = new DynamoClientRepository()
const editClientService = new EditClientService(clientsRepository)

export { editClientService }
