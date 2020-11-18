const mongoose = require('mongoose')

const tipSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  }
})

tipSchema.set('toJSON', {
  transform: (doc, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Tip', tipSchema)