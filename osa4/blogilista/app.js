const config = require('./utils/config')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const blogsRouter = require('./controllers/blogs')
app.use('/api/blogs', blogsRouter)

const cors = require('cors')
const mongoose = require('mongoose')

const mongoUrl = config.mongodb_uri
mongoose.connect(mongoUrl, { useNewUrlParser: true })

app.use(cors())
app.use(bodyParser.json())

module.exports = app
