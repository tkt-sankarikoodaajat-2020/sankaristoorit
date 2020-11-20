const tipsRouter = require('express').Router()
const Tips = require('../models/Tip')

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
tipsRouter.post('/', (req, res, next) => {
  const body = req.body
  
  if (!body.title) {
    return res.status(400).json({
      error:'title missing'
    })
  }

  const tip = new Tips({
    title: body.title,
  })

  tip
  .save()
  .then(savedTip => savedTip.toJSON())
  .then(savedAndFormattedTip => {
    res.json(savedAndFormattedTip)
  }) 
  .catch(error => next(error)) 
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
    .then(result => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

module.exports = tipsRouter