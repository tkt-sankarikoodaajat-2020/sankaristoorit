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

describe('GET TIPS TESTS', () => {
  test('return status 200', async () => {
    await api
      .get('/tips')
      .expect(200)
  })

  test('initial tips returned', async () => {
    const response = await api.get('/tips')
    expect(response.body[0].title).toBe('First test title')
    expect(response.body[1].title).toBe('Second test title')
  })
})
describe('DELETE TIPS TESTS', () => {
  test('delete the second tip', async() => {
    const response = await api.get('/tips')
    const id = response.body[1].id
    await api.delete('/tips/' + id)
    const responseAfterDelete = await api.get('/tips')
    console.log(responseAfterDelete.body)
    expect(responseAfterDelete.body.length).toBe(1)
  })
})


describe('POST TIPS TESTS', () => {
  test('a valid tip can be added', async () => {
    const newTip = {
      title: 'Sankaristoori',
    }

    await api
        .post('/tips')
        .send(newTip)
        .expect(200)
        .expect('Content-Type', /application\/json/)
    
      const response = await api.get('/tips')
      const contents = response.body.map(r => r.title)
 
      expect(response.body).toHaveLength(initialTips.length + 1) 
      expect(contents).toContain(
          'Sankaristoori'
      ) 
  })

  test('post fails without a title', async () => {
    const newTip = { 
    }

    await api
        .post('/tips')
        .send(newTip)
        .expect(400)     
  })
})

afterAll(() => {
  mongoose.connection.close()
})