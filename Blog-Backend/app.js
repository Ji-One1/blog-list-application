const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const Blog = require('./models/blog')
const blogRouter = require('./controllers/blogs')
const config = require('./utils/config')
const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')

const app = express()


mongoose.set('strictQuery', false)

logger.info('connecting to', config.MONGODB_URI)


mongoose.connect(config.MONGODB_URI)
	.then(result => logger.info('connected to mongo'))
	.catch(err => logger.info('error:', err.message))

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/blogs', blogRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)



module.exports = app