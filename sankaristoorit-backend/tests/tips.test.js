const supertest = require('supertest')
const app = require('../app')
const mongoose = require('mongoose')

const api = supertest(app)
const Tip = require('../models/Tip')
const helper = require('./test_helper')

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
  test('delete the second tip', async () => {
    const response = await api.get('/tips')
    const id = response.body[1].id
    await api.delete('/tips/' + id)
    const responseAfterDelete = await api.get('/tips')
    expect(responseAfterDelete.body.length).toBe(1)
  })
})


describe('POST TIPS TESTS', () => {
  test('a valid tip can be added', async () => {
    const username = 'jussi'
    const password = 'testipassu'
    await helper.createUser(username, password)
    const token = await api.post('/login').send({ username, password })
    const newTip = {
      title: 'Sankaristoori',
      url: 'https://github.com/tkt-sankarikoodaajat-2020/sankaristoorit'
    }

    await api
      .post('/tips')
      .set({ 'Authorization': 'bearer ' + token.body.token })
      .send(newTip)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/tips')
    const titles = response.body.map(r => r.title)
    const urls = response.body.map(u => u.url)

    expect(response.body).toHaveLength(initialTips.length + 1)
    expect(titles).toContain(
      'Sankaristoori'
    )
    expect(urls).toContain('https://github.com/tkt-sankarikoodaajat-2020/sankaristoorit')
  })

  test('post fails without a title', async () => {
    const username = 'jussi'
    const password = 'testipassu'
    await helper.createUser(username, password)
    const token = await api.post('/login').send({ username, password })
    const newTip = {
    }

    await api
      .post('/tips')
      .set({ 'Authorization': 'bearer ' + token.body.token })
      .send(newTip)
      .expect(400)
  })

  test('post fails with incorrect url-format', async () => {
    const username = 'jussi'
    const password = 'testipassu'
    await helper.createUser(username, password)
    const token = await api.post('/login').send({ username, password })
    const newTip = {
      title: 'WithoutUrl',
      url: 'htps://github.com/tkt-sankarikoodaajat-2020/sankaristoorit'
    }

    await api
      .post('/tips')
      .set({ 'Authorization': 'bearer ' + token.body.token })
      .send(newTip)
      .expect(400)
  })

  test('post works without url', async () => {
    const username = 'jussi'
    const password = 'testipassu'
    await helper.createUser(username, password)
    const token = await api.post('/login').send({ username, password })
    const newTip = {
      title: 'WithoutUrl',
      url: null
    }
    await api
      .post('/tips')
      .set({ 'Authorization': 'bearer ' + token.body.token })
      .send(newTip)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/tips')
    const titles = response.body.map(r => r.title)

    expect(response.body).toHaveLength(initialTips.length + 1)
    expect(titles).toContain(
      'WithoutUrl'
    )
  })

  test('post fails with a blank title', async () => {
    const username = 'jussi'
    const password = 'testipassu'
    await helper.createUser(username, password)
    const token = await api.post('/login').send({ username, password })
    const newTip = {
      title: ''
    }

    await api
      .post('/tips')
      .set({ 'Authorization': 'bearer ' + token.body.token })
      .send(newTip)
      .expect(400)
  })
})

describe('tips with user test', () => {
  test('a valid tip with a valid user can be created', async () => {
    const username = 'jussi'
    const password = 'testipassu'
    const user = await helper.createUser(username, password)
    const newTip = {
      title: 'Usertips',
      url: 'https://github.com/tkt-sankarikoodaajat-2020/sankaristoorit'
    }

    const token = await api.post('/login').send({ username, password })

    await api
      .post('/tips')
      .set({ 'Authorization': 'bearer ' + token.body.token })
      .send(newTip)
      .expect(200)

    const res = await api.get('/tips')
    const contents = res.body.map(r => r.title)
    const ids = res.body.map(r => r.user)

    expect(res.body).toHaveLength(initialTips.length + 1)
    expect(contents).toContain('Usertips')
    expect(ids).toContain(user.id)
  })

  test('after tip created user has tip id', async () => {
    const username = 'jussi'
    const password = 'testipassu'
    await helper.createUser(username, password)
    const newTip = {
      title: 'Usertips2',
      url: null
    }

    const token = await api.post('/login').send({ username, password })

    await api
      .post('/tips')
      .set({ 'Authorization': 'bearer ' + token.body.token })
      .send(newTip)
      .expect(200)

    const tips = await api.get('/tips')
    const createdTip = tips.body.find(t => t.title === 'Usertips2')
    const users = await helper.usersInDb()
    const testuser = users.find(u => u.username === username)
    const userTips = testuser.tips.map(String)
    expect(userTips).toContain(createdTip.id)
  })

  test('a valid tip without a valid user cannot be created', async () => {
    const newTip = {
      title: 'Usertips',
      url: 'https://github.com/tkt-sankarikoodaajat-2020/sankaristoorit'
    }

    await api
      .post('/tips')
      .send(newTip)
      .expect(401)

    const res = await api.get('/tips')
    const contents = res.body.map(r => r.title).filter(t => t === newTip.title)

    expect(res.body).toHaveLength(initialTips.length)
    expect(contents).toHaveLength(0)
  })
})

afterAll(() => {
  mongoose.connection.close()
})