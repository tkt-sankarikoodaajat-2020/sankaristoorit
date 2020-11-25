const tipsRouter = require('express').Router()
const Tips = require('../models/Tip')
const User = require('../models/User')
const jwt = require('jsonwebtoken')

/**
 * @api {get} /tips Request List of Tips
 * @apiName Tips
 * @apiGroup Tips
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *      [
 *        {
 *          title: 'First test title',
 *          id: '5fb5644081f7ceda89ee1451'
 *        }
 *      ]
 */
tipsRouter.get('/', (req, res) => {
  Tips.find({}).then(tips => {
    res.json(tips)
  })
})

/**
 * @api {post} /tips Post a HeroStory with title
 * @apiVersion 0.0.0
 * @apiName Tips
 * @apiGroup Tips
 *
 *
 * @apiHeader          Accept application/json
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *      [
 *        {
 *          title: 'HeroStory',
 *          id: '5fb5642081f7ceda89ee2020'
 *        }
 *      ]
 */
tipsRouter.post('/', async (req, res, next) => {
  const body = req.body

  const token = req.token

  let id = ''
  if (token && token.length > 0) {
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!decodedToken.id) {
      return res.status(401).json({ error: 'token invalid' })
    }
    id = decodedToken.id
  }

  if (!body.title) {
    return res.status(400).json({
      error: 'title missing'
    })
  }

  const obj = {
    title: body.title
  }

  if (id !== '') obj.user = id

  const tip = new Tips(obj)
  try {
    const savedTip = await tip.save()

    if (id !== '') {
      await User.updateOne(
        { _id: id },
        { $push: { tips: savedTip.id } }
      )
    }
    return res.json(savedTip)
  } catch (e) {
    next(e)
  }
})
/**
 * @api {delete} /tips/:id Delete Tip with id
 * @apiName Tips
 * @apiGroup Tips
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 204 OK
 */
tipsRouter.delete('/:id', (req, res, next) => {
  Tips.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

module.exports = tipsRouter