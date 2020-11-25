const User = require('../models/User')
const bcrypt = require('bcrypt')

const usersInDb = async () => {
  const users = await User.find({})
  return users.map((u) => u.toJSON())
}

const createUser = async (username, password) => {
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash(password, 10)
  const user = new User({ username: username, passwordHash })

  const saved = await user.save()
  return saved
}

module.exports = {
  usersInDb,
  createUser
}
