import { CheckIn } from '@prisma/client'
import { CheckInsRepository } from '@/repositories/check-ins-repository'

interface CheckInUsecaseParams {
  userId: string
  gymId: string
}

interface CheckInUseCaseResponse {
  checkIn: CheckIn
}

export class CheckInUseCase {
  constructor(private readonly checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
    gymId,
  }: CheckInUsecaseParams): Promise<CheckInUseCaseResponse> {
    // TODO: Validate if the given gymId and userId are valid
    const checkIn = await this.checkInsRepository.create({
      gymId,
      userId,
    })

    return {
      checkIn,
    }
  }
}
