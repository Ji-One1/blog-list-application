const url = require('../utils/config').MONGODB_URI

const mongoose = require('mongoose')



mongoose.connect(url)
    .then(result => console.log('connected to mongo'))
    .catch(err => console.log('error:', err.message))

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
  })
blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Blog', blogSchema)