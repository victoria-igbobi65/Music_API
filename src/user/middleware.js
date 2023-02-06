const { StatusCodes } = require('http-status-codes')

const AppError = require('../utils/appError')
const CONSTANTS = require('../constants/ts')
const { getUser } = require('../auth/authservices')
const HELPER = require('../utils/helper')
const catchAsync = require('../utils/catchAsync')

exports.validateId = catchAsync( async( req, res, next ) => {
    const id = req.params.id;

    const found = await getUser( { _id: id, usertype: CONSTANTS.ACCOUNT_TYPES.USER} );
    if ( !found ){
        throw new AppError( `user with id: ${id} doesn't exist!`, StatusCodes.BAD_REQUEST )
    }
    next();
}) 

exports.checkToken = catchAsync(async (req, res, next) => {
    const token = req.cookies.jwt_token
    if (!token) {
        throw new AppError('You are not logged in!', StatusCodes.FORBIDDEN)
    }

    const userId = (await HELPER.decodeToken(token)).id
    if (!userId) {
        throw new AppError('Invalid token!', StatusCodes.FORBIDDEN)
    }

    req.user = userId
    next()
})

exports.protect = catchAsync(async (req, res, next) => {
    const userId = req.user

    const user = await getUser({ id: userId })
    if (user.usertype === CONSTANTS.ACCOUNT_TYPES.USER) {
        throw new AppError('Unauthorized action', StatusCodes.UNAUTHORIZED)
    }

    next()
})