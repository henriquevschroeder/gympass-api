import { makeGetUserProfileUseCase } from '@/use-cases/factories/make-get-user-profile-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify()

  const getUserProfile = makeGetUserProfileUseCase()

  const { user } = await getUserProfile.execute({ userId: request.user.sub })

  const { id, name, email, createdAt } = user

  return reply.status(200).send({
    user: {
      id,
      name,
      email,
      createdAt,
    },
  })
}
