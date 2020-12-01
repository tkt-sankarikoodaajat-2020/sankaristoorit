const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/User')
const jwt = require('jsonwebtoken')

/**
 * @api {post} /login post credentials to login
 * @apiVersion 0.0.0
 * @apiName Login
 * @apiGroup Login
 * @apiParam {String} username
 * @apiParam {String} password
 *
 * @apiHeader          Accept application/json
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *      {
 *        token: 'jwtSignedToken',
 *        username: 'username'
 *      }
 */
loginRouter.post('/', async (request, response) => {
  const body = request.body

  const user = await User.findOne({ username: body.username })
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(body.password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  }
  const token = jwt.sign(userForToken, process.env.SECRET)

  response
    .status(200)
    .send({ username: user.username, id: user._id, token })
})

module.exports = loginRouter