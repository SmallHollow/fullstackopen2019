const config = require('./utils/config')
const express = require('express')
const app = express()
const blogsRouter = require('./controllers/blogs')
const mongoose = require('mongoose')

mongoose.connect(config.mongodb_uri, { useNewUrlParser: true, useUnifiedTopology: true })

app.use(express.json())
app.use('/api/blogs', blogsRouter)

module.exports = app
