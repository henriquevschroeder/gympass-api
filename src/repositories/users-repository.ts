import { Prisma, User } from '@prisma/client'

export interface UsersRepository {
  findByEmail(email: string): Promise<User | null>
  create(params: Prisma.UserCreateInput): Promise<User>
}
