import dayjs from 'dayjs'
import { CheckIn, Prisma } from '@prisma/client'
import { CheckInsRepository } from '../check-ins-repository'
import { prisma } from '@/lib/prisma'

export class PrismaCheckInsRepository implements CheckInsRepository {
  async findById(id: string) {
    return await prisma.checkIn.findUnique({
      where: {
        id,
      },
    })
  }

  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf('date')
    const endOfTheDay = dayjs(date).endOf('date')

    return await prisma.checkIn.findFirst({
      where: {
        userId,
        createdAt: {
          gte: startOfTheDay.toDate(),
          lte: endOfTheDay.toDate(),
        },
      },
    })
  }

  async findManyByUserId(userId: string, page: number) {
    return await prisma.checkIn.findMany({
      where: {
        userId,
      },
      take: 20,
      skip: (page - 1) * 20,
    })
  }

  async countByUserId(userId: string) {
    return await prisma.checkIn.count({
      where: {
        userId,
      },
    })
  }

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    return await prisma.checkIn.create({
      data,
    })
  }

  async save(checkIn: CheckIn) {
    return await prisma.checkIn.update({
      where: {
        id: checkIn.id,
      },
      data: checkIn,
    })
  }
}
