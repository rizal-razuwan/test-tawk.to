const express = require('express')

const filter = require('./filter')

const app = express()

app.use([filter])

module.exports = app
