import { fetchUserByIdService } from '@/infra/services/user/fetch-user-by-id'
import { FetchUserByIdController } from './fetch-user-by-id'

const fetchUserByIdController = new FetchUserByIdController(
  fetchUserByIdService,
)

export { fetchUserByIdController }
