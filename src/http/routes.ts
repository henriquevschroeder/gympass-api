import { FastifyInstance } from 'fastify'
import { verifyJwt } from './middlewares/verify-jwt'
import { register } from './controllers/register'
import { authenticate } from './controllers/authenticate'
import { profile } from './controllers/profile'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)

  /**
   * Authenticated
   */

  app.get('/me', { onRequest: [verifyJwt] }, profile)
}
