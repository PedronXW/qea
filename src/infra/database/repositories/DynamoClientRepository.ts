import {
  ClientRepository,
  EditClient,
} from '@/domain/application/repositories/client-repository'
import { Client } from '@/domain/enterprise/entities/client'

export class DynamoClientRepository implements ClientRepository {
  createClient(client: Client): Promise<Client> {
    throw new Error('Method not implemented.')
  }

  changePassword(id: string, password: string): Promise<Client> {
    throw new Error('Method not implemented.')
  }

  deleteClient(id: string): Promise<boolean> {
    throw new Error('Method not implemented.')
  }

  editClient(id: string, client: EditClient): Promise<Client> {
    throw new Error('Method not implemented.')
  }

  getClientByEmail(email: string): Promise<Client | null> {
    throw new Error('Method not implemented.')
  }

  getClientById(id: string): Promise<Client | null> {
    throw new Error('Method not implemented.')
  }

  getAllClients(page: number, limit: number): Promise<Client[]> {
    throw new Error('Method not implemented.')
  }

  verifyClientEmail(id: string): Promise<Client> {
    throw new Error('Method not implemented.')
  }
}
