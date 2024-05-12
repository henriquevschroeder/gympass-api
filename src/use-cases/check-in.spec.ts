import { expect, describe, it, beforeEach, afterEach, vi } from 'vitest'
import { Decimal } from '@prisma/client/runtime/library'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { CheckInUseCase } from './check-in'

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe('Check In Use Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(checkInsRepository, gymsRepository)

    gymsRepository.items.push({
      id: 'gym-id',
      title: 'Konohagakure Akademi',
      description: '',
      phone: '',
      latitude: new Decimal(35.6684103),
      longitude: new Decimal(139.5760607),
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
    ).rejects.toBeInstanceOf(Error)
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
    gymsRepository.items.push({
      id: 'gym-02',
      title: 'Shigakure Akademi',
      description: '',
      phone: '',
      latitude: new Decimal(34.6777115),
      longitude: new Decimal(135.4036368),
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-02',
        userId: 'user-id',
        userLatitude: 35.6684103,
        userLongitude: 139.5760607,
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
