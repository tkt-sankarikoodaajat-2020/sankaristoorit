const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/User')

/**
 * @api {get} /users Request List of Users
 * @apiName Tips
 * @apiGroup Users
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *      [
 *        {
 *          "tips": [],
 *          "username": "tipuser",
 *          "id": "5fbd326d94d1e20806c40673"
 *        }
 *      ]
 */
usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('tips', '-user')
  response.json(users.map((u) => u.toJSON()))
})
/**
 * @api {get} /users/:name Check username availability
 * @apiName Tips
 * @apiGroup Users
 * @apiParam {String} name Username to check
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "usernameAvailable": true,
 *     }
 */
usersRouter.get('/:name', async (request, response) => {
  const user = await User.findOne({ username: request.params.name })
  if (user) {
    return response.status(200).json({ usernameAvailable: false })
  } else {
    return response.status(200).json({ usernameAvailable: true })
  }
})

/**
 * @api {post} /users Register a new user
 * @apiVersion 0.0.0
 * @apiName Tips
 * @apiGroup Users
 * @apiParam {String} username User's unique username.
 * @apiParam {String} password User's password.
 *
 * @apiHeader          Accept application/json
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *      [
 *        {
 *          "tips": [],
 *          "username": "newuser",
 *          "id": "5fbd326d94d1e20806c40673"
 *        }
 *      ]
 */
usersRouter.post('/', async (request, response) => {
  const body = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  if (body.username.length < 2) {
    return response
      .status(400)
      .send({ error: 'username less than 2 characters' })
      .end()
  }

  if (body.password.length < 6) {
    return response
      .status(400)
      .send({ error: 'password less than 6 characters' })
      .end()
  }

  const user = new User({
    username: body.username,
    passwordHash,
  })

  const savedUser = await user.save()

  response.json(savedUser)
})

// Uncomment the block if you need this method for testing this API
/* usersRouter.post('/reset', async (request, response) => {
  await User.deleteMany({})
  response.status(200).json({ message: 'Database is now reset for testing' })
}) */

module.exports = usersRouter