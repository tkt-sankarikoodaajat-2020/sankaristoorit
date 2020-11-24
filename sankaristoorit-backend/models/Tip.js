const mongoose = require('mongoose')

const tipSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 1
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
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