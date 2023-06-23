require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const { default: helmet } = require('helmet')
const compression = require('compression')

const { countConnect, checkOverLoad } = require('./helpers/check.connect')

const app = express()

// init middlewares
app.use(morgan('dev'))
// morgan('combined')
// morgan('common')
// morgan('short')
// morgan('tiny')
// morgan('dev')
app.use(helmet())
app.use(compression())

// init db
require('./dbs/init.mongodb')

// countConnect()
// checkOverLoad()

// init routes
app.get('/', (req, res, next) => {
  // const strCompress = 'Hello Factipjs'

  return res.status(200).json({
    message: 'Welcome Fantipjs',
    // metaData: strCompress.repeat(100000)
  })
})

// handling error

module.exports = app
