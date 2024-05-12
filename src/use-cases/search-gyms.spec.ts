import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { SearchGymsUseCase } from './search-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymsUseCase

describe('Search Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymsUseCase(gymsRepository)
  })

  it('should be able to search for gyms', async () => {
    await gymsRepository.create({
      title: 'Konohagakure Akademi',
      description: null,
      phone: null,
      latitude: 35.6684103,
      longitude: 139.5760607,
    })

    await gymsRepository.create({
      id: 'gym-02',
      title: 'Shigakure Akademi',
      description: '',
      phone: '',
      latitude: 34.6777115,
      longitude: 135.4036368,
    })

    const { gyms } = await sut.execute({
      query: 'Konohagakure',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
  })

  it('should be able to fetch paginated gym search', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `Konohagakure Akademi - ${i}`,
        description: null,
        phone: null,
        latitude: 35.6684103,
        longitude: 139.5760607,
      })
    }

    const { gyms } = await sut.execute({
      query: `Konohagakure`,
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({
        title: 'Konohagakure Akademi - 21',
      }),
      expect.objectContaining({
        title: 'Konohagakure Akademi - 22',
      }),
    ])
  })
})
