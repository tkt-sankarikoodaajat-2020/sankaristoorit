const app = require('./app')
const http = require('http')
const conf = require('./utils/config')

const server = http.createServer(app)
server.listen(conf.PORT, () => {
  console.log('Running on port: ' + conf.PORT)
})