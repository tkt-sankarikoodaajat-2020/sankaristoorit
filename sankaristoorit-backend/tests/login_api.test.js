const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const User = require('../models/User')

describe('When user is registered', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('precious', 10)
    const user = new User({ username: 'DildoBaggins', passwordHash })

    await user.save()
  })

  test('login fails with wrong password', async () => {
    const fakeUser = {
      username: 'DildoBaggins',
      password: 'sssssssssh',
    }

    const result = await api
      .post('/login')
      .send(fakeUser)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('invalid username or password')
  })

  test('login successful with correct credentials', async () => {
    const realUser = {
      username: 'DildoBaggins',
      password: 'precious',
    }
    const result = await api
      .post('/login')
      .send(realUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const returnedObject = result.body

    expect(returnedObject.username).toContain('DildoBaggins')
  })

  afterAll(() => {
    mongoose.connection.close()
  })
})