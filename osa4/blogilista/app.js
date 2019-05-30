const config = require('./utils/config')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const blogsRouter = require('./controllers/blogs')
const mongoose = require('mongoose')

mongoose.connect(config.mongodb_uri, { useNewUrlParser: true })

app.use(bodyParser.json())
app.use('/api/blogs', blogsRouter)

module.exports = app
