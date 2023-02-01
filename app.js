const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser');

const AppError = require('./src/utils/appError')
const globalErrorhandler = require('./src/utils/errors')
const authRoute = require('./src/auth/authroute')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(logger('dev'))

/*ENDPOINTS*/
app.get('/', (req, res) => {
    res.status(200).json({
        msg: "WELCOME TO THE MUSIC APP API!"
    })
})
app.use('/auth/', authRoute)


app.use('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404))
})
app.use(globalErrorhandler)

module.exports = app;