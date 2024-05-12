import { expect, describe, it, beforeEach, afterEach, vi } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { CheckInUseCase } from './check-in'
import { MaxDistanceError } from './errors/max-distance-error'
import { MaxNumberOfCheckInsError } from './errors/max-number-of-check-ins-error'

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe('Check In Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(checkInsRepository, gymsRepository)

    await gymsRepository.create({
      id: 'gym-id',
      title: 'Konohagakure Akademi',
      description: '',
      phone: '',
      latitude: 35.6684103,
      longitude: 139.5760607,
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-id',
      userId: 'user-id',
      userLatitude: 35.6684103,
      userLongitude: 139.5760607,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice a day', async () => {
    vi.setSystemTime(new Date(2024, 0, 20, 8, 0, 0)) // 2024-01-20 08:00:00

    await sut.execute({
      gymId: 'gym-id',
      userId: 'user-id',
      userLatitude: 35.6684103,
      userLongitude: 139.5760607,
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-id',
        userId: 'user-id',
        userLatitude: 35.6684103,
        userLongitude: 139.5760607,
      }),
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
  })

  it('should not be able to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2024, 0, 20, 8, 0, 0)) // 2024-01-20 08:00:00

    await sut.execute({
      gymId: 'gym-id',
      userId: 'user-id',
      userLatitude: 35.6684103,
      userLongitude: 139.5760607,
    })

    vi.setSystemTime(new Date(2024, 0, 21, 8, 0, 0)) // 2024-01-21 08:00:00

    const { checkIn } = await sut.execute({
      gymId: 'gym-id',
      userId: 'user-id',
      userLatitude: 35.6684103,
      userLongitude: 139.5760607,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in on distant gym', async () => {
    gymsRepository.create({
      id: 'gym-02',
      title: 'Shigakure Akademi',
      description: '',
      phone: '',
      latitude: 34.6777115,
      longitude: 135.4036368,
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-02',
        userId: 'user-id',
        userLatitude: 35.6684103,
        userLongitude: 139.5760607,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError)
  })
})
