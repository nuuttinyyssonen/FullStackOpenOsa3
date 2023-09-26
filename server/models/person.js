const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('connecting to', url)
mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.error('Failed to connect to MongoDB: ', error.message)
  })

const personSchema = mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
  },
  number: {
    type: String,
    validate: {
      validator: function(v) {
        return /^(0\d{1,2}-\d{7,}|[1-9]\d{0,2}-\d{8,})$/.test(v)
      },
      message: props => `${props.value} is not a valid phone number!`
    }
  }
})

module.exports = mongoose.model('Person', personSchema)