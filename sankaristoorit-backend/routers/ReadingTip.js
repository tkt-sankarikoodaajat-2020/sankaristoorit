const tipsRouter = require('express').Router()
const Tips = require('../models/Tip')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const { validURL } = require('../utils/middleware')
const fetch = require('node-fetch')
const cheerio = require('cheerio')

const regexp = new RegExp('^(https?:\\/\\/)?'+ // protocol
'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{1,}|'+ // domain name
'((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
'(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
'(\\#[-a-z\\d_]*)?$','i')

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
 * @api {get} /tips/get_title/:url Search for a title based on ENCODED url
 * @apiName Tips
 * @apiGroup Tips
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 200 OK
 *    [
 *      {
 *        title: 'Title string'
 *      }
 *    ]
 */
tipsRouter.get('/get_title/:url', async (req, res) => {
  try {
    const url = req.params.url
    if (!url) {
      return res.status(400).end('Missing url parameter')
    }
    if (!regexp.test(url)) {
      throw 'not found'
    }
    const page = await fetch(url)
    const contentType = page.headers.get('content-type')
    if (contentType.indexOf('text/html') < 0 && contentType.indexOf('application/xml+xhtml') < 0) {
      throw 'wrong content-type header'
    }
    const text = await page.text()
    const $ = cheerio.load(text)
    const title = $('title').text()
    res.json({ title: title })
  } catch (e) {
    res.status(404).end('Title not found')
  }
})

/**
 * @api {post} /tips Post a HeroStory with title
 * @apiVersion 0.0.0
 * @apiName Tips
 * @apiGroup Tips
 * @apiParam {String} title
 * @apiHeader {String} Authorization OPTIONAL bearer auth
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

  if (id === '' || !await User.exists({ _id: id })) {
    return res.status(401).json({ error: 'not logged in' })
  }

  if (!body.title) {
    return res.status(400).json({
      error: 'title missing'
    })
  }

  if(body.url !== null) {
    if (!validURL(body.url)) {
      return res.status(400).json({
        error: 'url is incorrect'
      })
    }
  }

  const obj = {
    title: body.title,
    url: body.url
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
/**
 * @api {put} /tips/:id Update Tip with new information
 * @apiName Tips
 * @apiGroup Tips
 * @apiParam {String} title
 * @apiParam {String} url
 * @apiSuccessExample {json} Success-Response:
 *    HTTP/1.1 200 OK
 *      [
 *        {
 *          title: 'Edited title',
 *          url: '',
 *          user: '5fc97fadc244b11b5b5ae0m8',
 *          id: '5fcaa9cbc1b2873fdcfc9n2k'
 *        }
 *      ]
 */
tipsRouter.put('/:id', (req, res, next) => {
  const body = req.body

  if(!body.title) {
    return res.status(400).json({
      error: 'title missing'
    })
  }

  if(body.url !== null && body.url !== '') {
    if(!validURL(body.url)) {
      return res.status(400).json({
        error: 'url is incorrect'
      })
    }
  }

  const editedTip = {
    title: body.title,
    url: body.url,
    user: body.user
  }
  Tips.findByIdAndUpdate(req.params.id, editedTip, { new: true })
    .then(updatedTip => {
      res.json(updatedTip)
    })
    .catch(error => next(error))
})
module.exports = tipsRouter