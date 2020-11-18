const conf = require('./utils/config')
const tipsRouter = require('./routers/ReadingTip')
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const errors = require('./utils/errors')
const app = express()

console.log('connecting to MongoDB: ' + conf.MONGODB_URI)
mongoose.connect(conf.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB: ', error.message)
  })

app.use(express.json())

app.use(cors())

app.use('/tips', tipsRouter)

app.use(errors.unknownEndpoint)

module.exports = app