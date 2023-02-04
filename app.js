const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')

const AppError = require('./src/utils/appError')
const globalErrorhandler = require('./src/utils/errors')
const authRoute = require('./src/auth/authroute')
const userRoute = require('./src/user/userRoute')
const trackRoute = require('./src/tracks/trackroute')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use(logger('dev'));
app.use(cookieParser());

/* ENDPOINTS */
app.get('/', (req, res) => {
    res.status(200).json({
        msg: "WELCOME TO MY MUSIC APP API!"
    })
})
app.use('/auth/', authRoute)
app.use('/user', userRoute)
app.use('/track', trackRoute)


/* ERROR HANDLERS */
app.use('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.method} ${req.originalUrl} on this server!`, 404))
})
app.use(globalErrorhandler)

module.exports = app;