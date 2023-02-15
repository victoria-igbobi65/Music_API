/* FILE IMPORTS */

const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimit = require('express-rate-limit')
const mongoSanitize = require('express-mongo-sanitize')

const AppError = require('./src/utils/appError')
const globalErrorhandler = require('./src/utils/errors')
const authRoute = require('./src/auth/authroute')
const userRoute = require('./src/user/userRoute')
const trackRoute = require('./src/tracks/trackroute')
const meRoute = require('./src/me/router')
const artistRoute = require('./src/artists/routes')
const categoryRoute = require('./src/category/routes')
const rootRoute = require('./src/general/routes')
const HELPER = require('./src/utils/helper')
const app = express()


/* MIDDLEWARES */
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(logger('dev'));
app.use(cookieParser());
app.use(cors())
app.use(helmet())
app.use(xss())
app.use( mongoSanitize())
app.use( rateLimit( HELPER.rateLimitObject ))


/* ENDPOINTS */
app.use('/auth/', authRoute)
app.use('/user', userRoute)
app.use('/track', trackRoute)
app.use('/me', meRoute)
app.use('/artist', artistRoute)
app.use('/category', categoryRoute)
app.use('/', rootRoute)



/* ERROR HANDLERS */
app.use('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.method} ${req.originalUrl} on this server!`, 404))
})
app.use(globalErrorhandler)

module.exports = app;