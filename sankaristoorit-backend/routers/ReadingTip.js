const tipsRouter = require('express').Router()
const Tips = require('../models/Tip')

tipsRouter.get('/', (req, res) => {
  Tips.find({}).then(tips => {
    res.json(tips)
  })
})

tipsRouter.delete('/:id', (req, res, next) => {
  Tips.findByIdAndRemove(req.params.id)
    .then(result => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

module.exports = tipsRouter