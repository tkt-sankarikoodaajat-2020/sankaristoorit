const tipsRouter = require('express').Router()

tipsRouter.get('/', (req, res) => {
  res.status(200).send("Hello backend!")
})

module.exports = tipsRouter