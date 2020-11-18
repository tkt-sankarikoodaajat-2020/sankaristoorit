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