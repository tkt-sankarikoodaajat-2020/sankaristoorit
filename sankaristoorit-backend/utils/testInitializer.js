const User = require('../models/User')
const Tip = require('../models/Tip')
const bcrypt = require('bcrypt')

const run = async () => {
  await Tip.deleteMany({})
  await User.deleteMany({})
  const passwordHash = await bcrypt.hash('passWord', 10)
  const user = new User({ username: 'testuser', passwordHash })
  await user.save()
}
const addSecond = async () => {
  await Tip.deleteMany({})
  await User.deleteMany({})
  const passwordHash = await bcrypt.hash('passWord', 10)
  const user = new User({ username: 'secondUser', passwordHash })
  await user.save()
}

module.exports = { run, addSecond }