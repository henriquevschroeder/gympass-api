import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Search Gyms (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to search for a gym', async () => {
    const { token } = await createAndAuthenticateUser(app)

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Konoha Academy',
        description: 'Located in Leaf Village',
        phone: '123456789',
        latitude: 35.6684103,
        longitude: 139.5760607,
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Myoboku Gym',
        description: '',
        phone: '123456789',
        latitude: 45.6684103,
        longitude: 149.5760607,
      })

    const response = await request(app.server)
      .get('/gyms/search')
      .query({
        q: 'Myoboku',
      })
      .set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toBe(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: 'Myoboku Gym',
      }),
    ])
  })
})
