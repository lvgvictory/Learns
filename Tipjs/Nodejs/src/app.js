require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const { default: helmet } = require('helmet')
const compression = require('compression')

// const { countConnect, checkOverLoad } = require('./helpers/check.connect')
const e = require('express')

const app = express()

// init middlewares
app.use(morgan('dev')) // Hiển thị các log
app.use(helmet()) // che dấu Header
app.use(compression()) // nén dữ liệu trước khi gửi đến máy chủ
app.use(express.json())
app.use(express.urlencoded({ extended: true}))

// init db
require('./dbs/init.mongodb')

// countConnect()
// checkOverLoad()

// init routes
app.use('/', require('./routes'))

// handling error
app.use((req, res, next) => {
    const error = new Error('Not found')
    error.status = 404

    next(error)
})

app.use((error, req, res, next) => {
    const statusCode = error.status || 500

    return res.status(statusCode).json({
        status: 'error',
        code: statusCode,
        message: error.message || 'Internal Server Error',
    })
})

module.exports = app
