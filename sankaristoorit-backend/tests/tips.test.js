const supertest = require('supertest')
const app = require('../app')
const mongoose = require('mongoose')

const api = supertest(app)
const Tip = require('../models/Tip')

const initialTips = [
  {
    title: 'First test title'
  }, {
    title: 'Second test title'
  }
]

beforeEach(async () => {
  await Tip.deleteMany({})
  let tipObject = new Tip(initialTips[0])
  await tipObject.save()
  tipObject = new Tip(initialTips[1])
  await tipObject.save()
})

test('return status 200', async () => {
  await api
    .get('/tips')
    .expect(200)
})

afterAll(() => {
  mongoose.connection.close()
})