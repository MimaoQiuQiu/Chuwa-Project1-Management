const mongoose = require('mongoose')
require('dotenv').config()

console.log(process.env.MONGODB_URI)

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MogoDB')
  })
  .catch((err) => {
    console.log('Failed to connect to MongoDB', err)
  })

module.exports = mongoose
module.exports.User = require('./user')
module.exports.Product = require('./product')
