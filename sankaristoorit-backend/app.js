const conf = require('./utils/config')
const express = require('express')
require('express-async-errors')
const cors = require('cors')
const tipsRouter = require('./routers/ReadingTip')
const usersRouter = require('./routers/UsersRouter')
const loginRouter = require('./routers/LoginRouter')

const mongoose = require('mongoose')
const errors = require('./utils/errors')
const middleware = require('./utils/middleware')
const app = express()

console.log('connecting to MongoDB: ' + conf.MONGODB_URI)
mongoose.set('useFindAndModify', false)
mongoose.connect(conf.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to MongoDB')
    if (process.env.NODE_ENV === 'test') {
      console.log('Initializing test database')
      const testInitializer = require('./utils/testInitializer')
      testInitializer.run()
      testInitializer.addSecond()
    }
  })
  .catch((error) => {
    console.log('error connecting to MongoDB: ', error.message)
  })

app.use(cors())
app.use(express.json())
app.use(middleware.tokenExtractor)
app.use('/tips', tipsRouter)
app.use('/users', usersRouter)
app.use('/login', loginRouter)
app.use(errors.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app