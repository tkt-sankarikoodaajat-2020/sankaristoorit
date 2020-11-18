const app = require('./app')
const conf = require('./utils/config')

app.listen(conf.PORT, () => {
  console.log('Running on port: ' + conf.PORT)
})