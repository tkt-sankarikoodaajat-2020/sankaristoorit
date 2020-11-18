require('dotenv').config()

let PORT = process.env.PORT
let MONGODB_URI = process.env.MONGODB_URI

if (process.env.NODE_ENV === 'test') {
  MONGODB_URI = process.env.MONGODB_TEST_URI
}

if (process.env.NODE_ENV === 'development') {
  MONGODB_URI = process.env.MONGODB_DEV_URI
}

module.exports = {
  PORT,
  MONGODB_URI
}