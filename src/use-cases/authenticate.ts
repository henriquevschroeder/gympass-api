import { UsersRepository } from '@/repositories/users-repository'
import { InvalidCredentialsError } from './errors/invalid-credentials.error'
import { compare } from 'bcryptjs'
import { User } from '@prisma/client'

interface AuthenticateUsecaseParams {
  email: string
  password: string
}

interface AuthenticateUseCaseResponse {
  user: User
}

export class AuthenticateUseCase {
  constructor(private readonly userRepository: UsersRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUsecaseParams): Promise<AuthenticateUseCaseResponse> {
    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatch = await compare(password, user.passwordHash)

    if (!doesPasswordMatch) {
      throw new InvalidCredentialsError()
    }

    return {
      user,
    }
  }
}
